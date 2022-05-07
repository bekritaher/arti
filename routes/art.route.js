const express = require("express");
const multer=require('multer')
const path= require('path');
const router = express.Router();



const artController = require("../controllers/art.controller");

router.get("/all",artController.index)
router.post("/add",artController.add)
router.put("/update/:id",artController.update)
router.delete("/delete/:id",artController.destroy)
router.get("/getartlastimage",artController.getartlastimage)

////Image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/arts')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
 router.post('/uploadart', upload.single('myFile'), async(req, res, next) => {
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
  
  

module.exports = router;