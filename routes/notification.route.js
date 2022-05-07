const express = require('express')
const router  = express.Router()

const notificationController = require('../controllers/notification.controller')

router.post("/add",notificationController.add)
router.post("/getbyid",notificationController.getbyid)

module.exports=router