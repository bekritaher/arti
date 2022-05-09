const express = require('express')
const router  = express.Router()

const notificationController = require('../controllers/notification.controller')

router.post("/add",notificationController.add)
router.post("/getbyid",notificationController.getbyid)
router.delete("/delete",(req,res)=>{
    Notification.deleteMany((err,doc)=>{
        if(err) throw(err);
        else res.json(doc);
    })
})
module.exports=router