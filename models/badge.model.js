const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const badgeSchema = new Schema({
    nom: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge