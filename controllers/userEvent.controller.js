
const { Art } = require("../models/art.model");
const { UsersEvent } = require("../models/usersEvents");
const { Utilisateur } = require("../models/utilisateur.model");

const add = (req, res, next) => {
    let userEvent = new UsersEvent({
      evenement: req.params.evenement,
      utilisateur: req.params.utilisateur,
    });
    UsersEvent.findOne({ utilisateur: req.params.utilisateur }).then((pannn) => {
      if (!pannn) {
        userEvent
          .save()
          .then((response) => {
            res.sendFile(__dirname + "/mail.html");
          })
          .catch((error) => {
            res.json({
              message: "an error Occured here!",
            });
          });
      } else {
        res.sendFile(__dirname + "/DejaMail.html");
      }
    });
  };
const GetCartsbyUserid = (req, res, next) => {
    Panier.find()
      .select("-_id -__v -userId ")
      .then((carts) => {
        res.json(carts[0]);
      })
      .catch((err) => console.log(err));
  };

  const getuserDetails = async (req, res, next) => {
    Utilisateur.findById({ _id: req.body.utilisateur }).exec(function (err, data) {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  };


  const Showall = (req, res, next) => {
    UsersEvent.find().exec(function (err, data) {
        if (err) res.status(500).send(err);
        else res.send(data);
      });
  };
 




  module.exports={
    add,
    Showall,
    getuserDetails
}







