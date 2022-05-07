
const { Art } = require("../models/art.model");
const { Utilisateur } = require("../models/utilisateur.model");
//const {contract} = require("../index");


//afficher

const index=(req, res, next) => 
{
    Art.find()
    .then((art) =>{res.json({art})



})
    .catch(error=>{res.json({error})})      
}


const getartlastimage=(req, res, next) => 
{
    var x =[]
    
    Utilisateur.find()
    .then((utilisateur) =>{      if (utilisateur.length > 0){
            for (let i=0 ; i<utilisateur.length;i++) {

                Art.findById(utilisateur[i].arts[utilisateur[i].arts.length-1], function (err, art) {
                    if (err)
                        res.send(err)
                     
                 
                  if(art!==null){
                 x.push(art.image)}
                 if (i==utilisateur.length-1)
                 {res.json(x);
                console.log(x) }
                
                   
                })  
    
            }
        }
        else {res.json(x);}
    
});
   
  
    
    // if (utilisateur.length > 0){
    //     for (let i=0 ; i<utilisateur.length;i++) {
    //         Art.findById(utilisateur[i].arts[utilisateur[i].arts.length-1], function (err, art) {
    //             if (err)
    //                 res.send(err)
                 
    //           //res.json(art.image);
    //          console.log(art.image);
         
            
               
    //         })  

    //     }
    // }
    // else {}

  
}

//ajouter


const add = async (req, res, next)  =>  {


//     console.log(req.file);

//         let art= new Art({
        
//             titre:req.body.titre,
//             description:req.body.description,
//             date:req.body.date,  
//             image: req.body.image,
//             prix: req.body.prix,
//             utilisateur: req.body.utilisateur
//         });
        
         
        
     

//         console.log(art._id)
//     art.save()
// .then(response => {
//     res.json({
//         message:'Art Added Sucessfull!'
//     })
// })
// .catch(eroor => {
// res.json({
//     message:'An error Occured!'
// })
// })
// if (res.statusCode==200)
// {
   



// Utilisateur.findByIdAndUpdate(
//     req.body.utilisateur,
//     {$push: {arts: art._id}},
//     { upsert: true,new : true},
//     function(err, model) {
    
     
    
//         console.log(err);
//     }
// );

// }

//         console.log(art)
  
    }
    

//modifier
const update =(req, res, next)=>
{
    let id=req.body.id
    let updateData={
        titre:req.body.titre,
        description:req.body.description,
        date:req.body.date,  
        image: req.body.image
    }
    Art.findByIdAndUpdate(id, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Art updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'An error Occured!'
    })
})
}


//supprimer

const destroy =(req,res,next) =>{
  let id= req.body.id
  Art.findByIdAndRemove(id)
  .then(()=>{
      req.json({
          message: 'Art deleted successfully!'
      })
  })
  .catch(error =>{
      res.json({
          message:'An error Occured!'
      })
  })
}


  module.exports={
    index,add,update,destroy,getartlastimage

}







