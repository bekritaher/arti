const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const evenementSchema = new Schema({

    titre: {
        type: String,
    },
    date: {
        type: String,
    },
    adresse: {
        type: String,
    },
    description: {
        type: String,
    },
    uri: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    prix: {
        type: Number,
    },
}, { timestamps: true});

const Evenement = mongoose.model('Evenement', evenementSchema);

module.exports = Evenement