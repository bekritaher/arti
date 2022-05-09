const mongoose = require("mongoose");
const usersEventSchema = mongoose.Schema(
    {
        evenement:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Evenement"
        },
        utilisateur: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Utilisateur"
            }
          ,
        
    }
);



const UsersEvent = mongoose.model("UsersEvent", usersEventSchema);

module.exports = { UsersEvent }