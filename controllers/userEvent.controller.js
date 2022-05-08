
const { Art } = require("../models/art.model");
const { UsersEvent } = require("../models/usersEvents");
const { Utilisateur } = require("../models/utilisateur.model");

const add = (req, res, next) => {
    let userEvent= new UsersEvent({
        evenement:req.params.evenement,
        utilisateur:req.params.utilisateur,

    })      
    userEvent.save()
    .then(response => {
        res.sendFile(__dirname + '/mail.html');
    })
.catch(error => {
    res.json({
        message:'an error Occured here!'
    })
})
}




  module.exports={
    add

}







