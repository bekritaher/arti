const Commande = require("../models/commande.model");

//mrigl
const index = (req, res, next) => {
  Commande.find({ idUser: req.headers.idUser }).exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
  //  console.log(req.headers)
};

//mrigl
const show = (req, res, next) => {
  let Commandeid = req.body.Commandeid;
  Evenement.findById(Commandeid)
    .then((reponse) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "an error Occured",
      });
    });
};

//mrigl
const AddCommande = (req, res, next) => {
  const { userId, idPanier, total ,token } = req.body;
  let pan = new Commande({
    userId: userId,
    idPanier: idPanier,
    total: total,
    token: token,
  });
  pan
    .save()
    .then((pan) => {
      res.status(200).send(
        JSON.stringify({
          message: " Added Successfully!",
        })
      );
    })
    .catch((error) => {
      res.json({
        message: " An error occured when adding pan! ",
      });
    });
};

//mrigll
const destory = (req, res, next) => {
  var id = req.body._id;
  Commande.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
};

module.exports = {
  index,
  show,
  AddCommande,
  destory,
};