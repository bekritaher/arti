const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    idsender: {
        type: String,
    },
    idreceiver: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
    },
    fullname: {
        type: String,
    },
    image: {
        type: String,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification