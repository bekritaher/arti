const { colours } = require("nodemon/lib/config/defaults");
const { Art } = require("../models/art.model");
const { Utilisateur } = require("../models/utilisateur.model");
const nodemailer = require("nodemailer")

//afficher

const index=(req, res, next) => 
{




    Utilisateur.find()
    .then((utilisateur) =>{
    
        for (let i=0 ; i<utilisateur.length;i++) {
          if (utilisateur[i].arts.length==0){
              utilisateur.splice(i,1);
              i--; 
          }
        }
        
        res.json({utilisateur})
    
    
    })
    .catch(error=>{res.json({error})})      
}


const indexsorted=(req, res, next) => 
{

    Utilisateur.find()
    .then((utilisateur) =>{
    
        utilisateur.sort((a, b) => {
            return a.followers.length - b.followers.length;
        });
      var  reversed=utilisateur.reverse();
        res.json({reversed})
    
    
    })
    .catch(error=>{res.json({error})})      
}


const gets = (req, res, next) => {
    Utilisateur.find()
      .then((utilisateur) => {
        res.json({ utilisateur });
      })
      .catch((error) => {
        res.json({ error });
      });
  };
  


  const  unfollow= (req, res, next)  => 
{
    Utilisateur.findByIdAndUpdate(
        req.body.follower,
        {$pull: {followings: req.body.user}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }

      );
      Utilisateur.findByIdAndUpdate(
        req.body.user,
        {$pull: {followers: req.body.follower}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );


}


const  follow= (req, res, next)  => 
{
    Utilisateur.findByIdAndUpdate(
        req.body.follower,
        {$push: {followings: req.body.user}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );
      Utilisateur.findByIdAndUpdate(
        req.body.user,
        {$push: {followers: req.body.follower}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );
      
    
}


///////////////


//  const test=(req, res, next) => 
//  {
//     Art.findById(utilisateur.arts[i], function (err, art) {
//         if (err)
//             res.send(err)
         
//         x.push(art)
//        if (i==utilisateur.arts.length-1)
//        {res.json(x); }
       
    
       
//     })    
//  }



const  getarts= (req, res, next)  => 
{
    var x =[]
    console.log(req.body.id)


   // var utilisateur = (await Utilisateur.findById(other_id, 'name photo').exec()).toObject();

 Utilisateur.findOne({_id:req.body.id}, (err,utilisateur)=>{
//   console.log(utilisateur.arts);
//   console.log(utilisateur.nom);
    if (utilisateur.arts.length > 0){
    for (let i=0 ; i<utilisateur.arts.length;i++) {
        Art.findById(utilisateur.arts[i], function (err, art) {
            if (err)
                res.send(err)
             
            x.push(art)
           if (i==utilisateur.arts.length-1)
           {res.json(x); }
           
         
           
        })
        }
    }
    else {res.json(x);}
})
}




//ajouter


const add = (req, res, next) => {

    console.log(req.file);
        let utilisateur= new Utilisateur({
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    
        });
    
            
        console.log(utilisateur)
    
        utilisateur.save()

        .then(response => {
            res.json({
                message:'Utilisateur Added Sucessfull!'
            })
        })
    .catch(eroor => {
        res.json({
            message:'An error Occured!'
        })
    })
    }
    
    
//modifier
const update =(req, res, next)=>
{
    let id=req.body.id
    let updateData={
        nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    }
    Utilisateur.findByIdAndUpdate(id, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Utilisateur updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'An error Occured!'
    })
})
}


//supprimer

const destroy=(req,res,next) =>{
    let _id = req.params.id;
    console.log(_id);
    Utilisateur.findByIdAndDelete(id)
    .then(() => {
        res.json({
          message: "Delete sucess!",
        });
      })
      .catch((error) => {
          res.statusCode = 400;
  
        console.log(error);
        res.json({
          error,
        });
      });
      
}


const signup=(req,res)=>{
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            
            if(utilisateur==null){
                const utilisateur = Utilisateur({
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    email:req.body.email,
                    password:req.body.password,
                    numero:req.body.numero,
                    bio:req.body.bio,
                    datenaissance:req.body.datenaissance,
                    adresse:req.body.adresse,
                    role:req.body.role,
                    image:req.body.image
                })
                utilisateur.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json(err)
                    }else{
                        if(utilisateur==null){ res.status(401).json({
                            message:'User is null!'
                        })}
                        else{
                        console.log(utilisateur)
                        res.status(200).json(utilisateur)
                    }
                }
                })
            }else{

                res.status(404).json({
                    message:'Email already exists!'
            })   
            }
        }
        console.log("statusCode: ", res.statusCode);
    })
    
}

const findbyid=(req,res)=>{
    Utilisateur.findById(req.body.id, function (err, utilisateur) {
        if (err)
            res.send(err)
         
     
    res.json(utilisateur);
    
       
    })  

}


const emailcheck=(req,res)=>{
  
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
            
          
        }else{
            
            if(utilisateur==null){ res.status(200).json({
                message:'Email available'
            });   }
            else{
                res.status(401).json({
                    errorMessage: "Email unavailable.",
                  
                })
               
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}






const signin=(req,res)=>{
    Utilisateur.findOne({email:req.body.email,password:req.body.password},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
          
        }else{
            if(utilisateur==null){ res.status(401).json({
                message:'Wrong informations'
            })}
            else{
            res.status(200).json(utilisateur)  
            console.log(utilisateur)
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}


const send = (req, res, next) => {
        console.log(req.body.nombre)
        nombr=req.body.nombre
        x=nombr.substring(0,2);
        console.log(x)
        parseInt(x)
        console.log(x)
        Utilisateur.find().limit(x).then((data)=>{
            sendEmail(data.map((el)=>el.email))
            res.status(200).json(data.map((el)=>el.email))
        })
       /* res.status(200).send(emails)
       console.log(emails) */
      // sendEmail(emails)


    }


module.exports={
    index,gets,add,update,destroy,signin,signup,emailcheck,getarts,indexsorted,findbyid,follow,unfollow,send
}




function sendEmail(emails) {
console.log(emails) 
   let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'artiky4group@gmail.com',
        pass: 'artiky42022'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
  
  for(var i=0; i<emails.length; i++){
    const mailOptions = {
        from: 'Arti app',
      to: emails[i],
      text: 'Our artists',
      subject: 'You are invited to the next event',
      html: "<h3>Please confirm your presence using this  </h3><a href=''>Link</a>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });}
  
}