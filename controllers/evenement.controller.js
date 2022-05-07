const { response } = require("express");
const { where } = require("../models/evenement.model");
const Evenement = require("../models/evenement.model");

//mrigl
const index = (req, res, next) => {
  Evenement.find()
    .then((evenement) => {
      res.json({ evenement });
    })
    .catch((error) => {
      res.json({ error });
    });
};
//mrigl
const shows = (req, res, next) => {
  req= Evenement.findOne({ active: true })
   .then((reponse) => {
       res.json({
         reponse,
       }),
         console.log("azerty", reponse);
     })
     .catch((error) => { 
       res.json({
         message: "an error Occured",
       });
     });
 };
//mrigl
const show = (req, res, next) => {
  var x =[]
  Evenement.findOne({active:true}, (err,evenement)=>{
    //   console.log(utilisateur.arts);
    //   console.log(utilisateur.nom);
    res.json(evenement.uri);
 
       
    })
};

//mrigl
const stores = (req, res, next) => {
  let evenement = new Evenement({
    titre: req.body.titre,
    date: req.body.date,
    adresse: req.body.adresse,
    description: req.body.description,
    uri: req.body.uri,
    active: req.body.active,
    image: req.body.image,
    prix: req.body.prix,
  });
  let even = Evenement.findOne({ active: true }).then((reponse) => {
    if (reponse) {
        console.log('aahahha',reponse)
        if (req.body.active == true){
            res.statusCode = 400;
           res.json({

        message: "fama we7ed true",
      }); 
        }else{
            evenement
        .save()
        .then((response) => {
          res.json({
            message: "evenement Added Sucessfull!",
          });
        })
        .catch((error) => {
            res.statusCode = 400;
          res.json({
            message: "an error Occured here!",
          });
        });
        }
      
    } else {
      evenement
      .save()
      .then((response) => {
        res.json({
          message: "evenement Added Sucessfull!",
        });
      })
      .catch((error) => {
        res.statusCode = 400;
        res.json({
          message: "an error Occured here!",
        });
      });
    }
  })
  .catch((error) => {
    res.statusCode = 400;
    res.json({
      message: "an error Occured",
    });
  });

};

//mrigll
const update = (req, res, next) => {
  let id = req.params.id;
  let boolValue = req.body.active.toLowerCase() == 'true' ? true : false; //returns true

  let updateData = {
    titre: req.body.titre,
    date: req.body.date,
    adresse: req.body.adresse,
    description: req.body.description,
    uri: req.body.uri,
    active: boolValue,
    image: req.body.image,
    prix: req.body.prix,
  };
  console.log("marwen",id);
  console.log("taher",req.body.active);
console.log("123456",boolValue);
    Evenement.findOne({ active: true }).then((reponse) => {
    if (reponse) {

        if (boolValue == true){
            res.statusCode = 400;
           res.json({
        message: "fama we7ed true",
      }); 

      
        }
    
        else{
        Evenement.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      console.log(id);
      res.json({
        message: "Evenement updated successfully!",
      });
    })
    .catch((error) => {
        res.statusCode = 500;
      res.json({
        message: "an error Occured!",
      });
    });
    }
}    

else{
    Evenement.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      console.log(id);
      res.json({
        message: "Evenement updated successfully!",
      });
    })
    .catch((error) => {
        res.statusCode = 500;
      res.json({
        message: "an error Occured!",
      });
    });
}
})
.catch((error) => {
    res.statusCode = 500;
  res.json({
    message: "an error Occured",
  });
});
};



//mrigll
const destory = (req, res, next) => {
  let _id = req.params.id;
  console.log(_id);
  Evenement.findByIdAndDelete(_id)
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
    
};

module.exports = {
  index,
  show,
  stores,
  update,
  destory,
  shows,
};
