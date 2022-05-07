const express = require('express')
const router  = express.Router()

const BadgeController = require('../controllers/badge.controller')

router.get('/index',BadgeController.index)
router.post('/show',BadgeController.show)
router.get('/',BadgeController.index)
router.post('/stores',BadgeController.stores)
router.post('/update',BadgeController.update)
router.post('/delete/:id',BadgeController.destory)

module.exports=router