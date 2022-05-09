const Commande = require("../models/commande.model");

//mrigl
const index = (req, res, next) => {
  Commande.find({ idUser: req.headers.idUser }).exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
  //  console.log(req.headers)
};
const affich = (req, res, next) => {
  Evenement.find()
    .then((evenement) => {
      res.json({ evenement });
    })
    .catch((error) => {
      res.json({ error });
    });
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
  const { userId, idPanier, total, token, email, numero } = req.body;
  let pan = new Commande({
    userId: userId,
    idPanier: idPanier,
    total: total,
    token: token,
    email: email,
    numero: numero,
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
/////////////////////////////////////////////////////
const totalCommande = (req, res, next) => {
  Commande.find({}).exec(function (err, data) {
    let total = 0;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      total += data[i].total;
    }
    res.status(200).send(total.toString());
  });
};

const totalCommandeByUser = (req, res, next) => {
  Commande.find({ userId: req.body.idUser }).exec(function (err, data) {
    let total = 0;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      total += data[i].total;
    }
    res.status(200).send(total.toString());
  });
};

const nombreCommandeByUser = async (req, res, next) => {
  const panier = await Commande.find({
    userId: req.body.userId,
  });
  let total = 0;
  if (panier.length > 0) {
    for (let i = 0; i < panier.length; i++) {
      total += 1;
    }
    res.status(200).send(total.toString());
  }
  if (panier.length == 0) {
    res.status(200).send("0");
  }
};

module.exports = {
  index,
  show,
  AddCommande,
  destory,
  totalCommande,
  totalCommandeByUser,
  nombreCommandeByUser,
  affich
};