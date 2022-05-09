const mongoose = require("mongoose");

const panierSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentResponse: { type: String },
  arts: [
    {
      artId: { type: mongoose.Schema.Types.ObjectId, ref: "Art" },
      quantity: { type: Number, required: true, min: 1 },
      prix: { type: Number },
    },
  ],
  myevents: [
    {
      myeventId: { type: mongoose.Schema.Types.ObjectId, ref: "Myevent" },
      quantity: { type: Number, required: true, min: 1 },
      prix: { type: Number },
    },
  ],
});

const Panier = mongoose.model("Panier", panierSchema);

module.exports = { Panier };