const Notification = require('../models/notification.model')
const { Utilisateur } = require("../models/utilisateur.model");
const add = (req, res, next) => {

    console.log(req.file);
        let notification= new Notification({
            idsender:req.body.idsender,
            idreceiver:req.body.idreceiver,
            message:req.body.message,
            fullname:req.body.fullname,
            image:req.body.image,
            date:Date.now()
    
        });
    
            
        console.log(notification)
    
        notification.save()
        .then(response => {
            res.json({
                message:'Notification Added Sucessfull!'
            })
         
        })
    .catch(eroor => {
        res.json({
            message:'An error Occured!'
        })
    })

   
    Utilisateur.findByIdAndUpdate(
        req.body.idreceiver,
        {$push: {notifications: notification._id}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );

    }
    
    const getbyid = (req, res, next) => {
        var x = []
        Notification.find()
    .then((notification) =>{
    
        for (let i=0 ; i<notification.length;i++) {
          if (notification[i].idreceiver==req.body.idreceiver){
              notification[i].xx="xxa"
            x.push(notification[i])
          }
        }
        
      var  reversed = x.reverse();
      res.json(reversed);
    
    
    })
    .catch(error=>{res.json({error})}) 
    
        }
        

module.exports={
   add,getbyid
}
