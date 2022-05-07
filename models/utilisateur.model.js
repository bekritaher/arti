const mongoose = require("mongoose");
const utilisateurSchema = mongoose.Schema(
    {
        nom:{type:String,},
        prenom:{type:String,},
        email:{type:String,},
        password:{type:String,},
        numero:{type:String,},
        bio:{type:String,},
        datenaissance:{type:String,},
        adresse:{type:String,},
        role:{type:String,},
        image:{type:String,},
        nombre:{type:String,},
        arts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Art"
            }
          ],
          followings:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Utilisateur"
            }
          ],
          followers:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Utilisateur"
            }
          ],
          notifications:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Notification"
            }
          ],

    }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = { Utilisateur }