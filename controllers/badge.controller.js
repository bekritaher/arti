const Badge = require('../models/badge.model')


//mrigl 
const index=(req, res, next) => 
{
    Badge.find()
    .then((badge) =>{res.json({badge})})
    .catch(error=>{res.json({error})})      
}



//mrigl 
const show = (req, res, next) => {
    let BadgeID = req.body.BadgeID
    Badge.findById(BadgeID)
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
    
        let badge= new Badge({
            nom:req.body.nom,
            image:req.body.image,

        })      
        badge.save()
        .then(response => {
            res.json({
                message:'badge Added Sucessfull!'
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
    let BadgeID=req.body.BadgeID
    let updateData={
        nom:req.body.nom,
        image:req.body.image,
    }
    Badge.findByIdAndUpdate(BadgeID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Badge updated successfully!'
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
    let _id = req.params.id;
    Badge.findByIdAndDelete(_id)
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

module.exports={
    index,show,stores,update,destory
}