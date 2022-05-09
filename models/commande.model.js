const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const panierSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idPanier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Panier",
  },
  total: { type: Number },
  token: { type: String },
  email: { type: String },
  numero: { type: String },
});

const Commande = mongoose.model("Commande", panierSchema);

module.exports = Commande;