const Partenaire = require('../models/partenaire.model')


//mrigl 
const index=(req, res, next) => 
{
    Partenaire.find()
    .then((partenaire) =>{res.json({partenaire})})
    .catch(error=>{res.json({error})})      
}


//mrigl 
const show = (req, res, next) => {
    let PartenaireID = req.body.PartenaireID
    Partenaire.findById(PartenaireID)
    .then(reponse => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}


//mrigl 
const stores = (req, res, next) => {
    
        let partenaire= new Partenaire({
            nom:req.body.nom,
            email:req.body.email,
            adresse:req.body.adresse,
            image:req.body.image,
            panorama:req.body.panorama

        })


    /* if (req.file){
            partenaire.image=req.file.path
        }*/
       
        partenaire.save()
        .then(response => {
            res.json({
                message:'partenaire Added Sucessfull!'
            })
        })
    .catch(error => {
        res.json({
            message:'an error Occured here!'
        })
    })
    }
    



//mrigll
const update =(req, res, next)=>
{
    let PartenaireID=req.body.PartenaireID
    let updateData={
        nom:req.body.nom,
        email:req.body.email,
        adresse:req.body.adresse,
        image:req.body.image,
        panorama:req.body.panorama,

    }
    Partenaire.findByIdAndUpdate(PartenaireID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Partenaire updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}


//mrigll
const destory=(req,res,next) =>{
    let id= req.params.id
    Partenaire.findByIdAndDelete(id)
    .then(()=>{
        res.json({
            message: 'Delete sucesse!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error Occured!'
        })
    })
}



module.exports={
    index,show,stores,update,destory
}
