const mongoose = require("mongoose");
const artSchema = mongoose.Schema(
    {
        titre:{type:String,},
        description:{type:String,},
        date:{type:Date,},
        image:{type:String,},
        prix:{type:Number},
        utilisateur: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Utilisateur"
            }
          ,
        
    }
);



const Art = mongoose.model("Art", artSchema);

module.exports = { Art }