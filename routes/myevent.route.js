const express = require('express')
const router  = express.Router()
const multer=require('multer')

const myEvenementController = require('../controllers/myevent.controller')

router.get('/index',myEvenementController.index)
router.get('/show',myEvenementController.show)
router.get('/',myEvenementController.index)
router.post('/stores',myEvenementController.stores)
router.put('/update/:id',myEvenementController.update)
router.post('/delete/:id',myEvenementController.destory)


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/partenaires')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var upload = multer({ storage: storage })
  router.post('/uploadpartenaire', upload.single('myFile'), async(req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("An error has occured!")
    }
  })

  router.get('/image',async(req, res)=>{
    const image = await Image.find()
    res.json(image)
    
   })

module.exports=router