const express = require('express')
const router  = express.Router()
const multer=require('multer')

const EvenementController = require('../controllers/evenement.controller')

router.get('/index',EvenementController.index)
router.get('/show',EvenementController.show)
router.get('/shows',EvenementController.shows)
router.get('/',EvenementController.index)
router.post('/stores',EvenementController.stores)
router.put('/update/:id',EvenementController.update)
router.post('/delete/:id',EvenementController.destory)


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