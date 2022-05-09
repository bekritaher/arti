
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const mongoose= require('mongoose')
var Web3 = require('web3');
var configuration = require('./build/contracts/Arts.json')
const { Utilisateur } = require("./models/utilisateur.model");
const { Art } = require("./models/art.model");
const BigNumber = require('bignumber.js');
const socketIO=require('socket.io');
const http=require('http')
let server = http.createServer(app);
var io=socketIO(server);
const morgan = require('morgan');



io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${msg}`);
  })
});


class Arta {
  constructor(id,titre, description,date,image,price,utilisateur) {
    this.id=id;
    this.titre = titre;
    this.description = description;
    this.date = date;
    this.image = image;
    this.price = price;
    this.utilisateur = utilisateur;
  }
}



const PORT = 9090;
mongoose.connect("mongodb://localhost:27017/arti",{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Database connected");
    })
    .catch((ex)=>{
        console.log(ex);
        console.log("Unable to connect to database");
    })


// require('dotenv').config()



// //Connecting DataBase
// mongoose.connect(process.env.CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'Arti-DB',
  
// })
// .then(()=> {
//   console.log('DATABASE CONNECTED')
// })
// .catch((err) => {
//   console.log(err)
// })

// app.use(morgan('dev'))
// const PORT = process.env.PORT || 9090




app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cors")());
app.use(express.static("uploads"))
app.use('/uploads', express.static(__dirname +'/uploads'));


const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;

  const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://192.168.1.12:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

// var account="0xebf2c4A752d1092AE50604Be6C4A4D7062B52dD1"
// const main = async () => {
// // const accounts = await web3.eth.requestAccounts();
// //  account = accounts[0];


// }
// main();
const mintArt = async (art,adresse) => {
  console.log("mintArt")

    await contract.methods
      .mintArt(art.id,art.titre,art.description,art.date,art.image,art.price,art.utilisateur)
      .send({ from: art.utilisateur, gas:3000000});
     
  };

app.post("/api/arts/add", (req,res)=>{
  console.log("addblockchain")
 
 


      console.log(req.file);

      let art= new Art({
      
          titre:req.body.titre,
          description:req.body.description,
          date:req.body.date,  
          image: req.body.image,
          prix: req.body.prix,
          utilisateur: req.body.utilisateur
      });
      
       
      


      console.log(art._id)
  art.save()
.then(response => {
  res.json({
      message:'Art Added Sucessfull!'
  })
})
.catch(eroor => {
res.json({
  message:'An error Occured!'
})
})
if (res.statusCode==200)
{
 
  var artx  =  new Arta(art._id.toString(),req.body.titre,req.body.description,req.body.date,req.body.image,req.body.prix,req.body.adresse)
      mintArt(artx);



Utilisateur.findByIdAndUpdate(
  req.body.utilisateur,
  {$push: {arts: art._id}},
  { upsert: true,new : true},
  function(err, model) {
  
   
  
      console.log(err);
  }
);

}

      console.log(art)


  });
  

  const buyArtBlockchain = async (req) => {
    let z = new BigNumber(1e17);

    await contract.methods
    .buyArt(req.body.id)
    .send({ from: req.body.adresse,value:z, gas:3000000});
  };

  app.post("/buyartblockchain",  (req,res) => {

    console.log("BUY ART BC");
      buyArtBlockchain(req);


 
   
  });
  app.get('/mail', (req, res) => {
    res.sendFile(__dirname + '/mail.html');
  });


  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.post("/buyart", (req,res)=>{

 
Utilisateur.findById(req.body.olduser, function (err, utilisateur) {
  console.log("BUY ART");
  if (err)
      res.send(err)
   

      Utilisateur.findByIdAndUpdate(
        req.body.olduser,
        {$pull: {arts: req.body.artid}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );
      
 
})  

Utilisateur.findByIdAndUpdate(
  req.body.newuser,
  {$push: {arts: req.body.artid}},
  { upsert: true,new : true},
  function(err, model) {
  
   
  
      console.log(err);
  }
);

      });
      

////////////////////Rroutes
app.use("/api/utilisateurs", require("./routes/utilisateur.route"));
app.use("/api/arts", require("./routes/art.route"));

app.use('/api/partenaires', require("./routes/partenaire.route"))
app.use('/api/evenement', require("./routes/evenement.route"))
app.use('/api/badges', require("./routes/badge.route"))
app.use('/api/notifications', require("./routes/notification.route"))
app.use("/api/Commande", require("./routes/commande.route"));
app.use("/api/Panier", require("./routes/panier.route"));
app.use('/api/myevent', require("./routes/myevent.route"))


//const utilisateursController = require("./controllers/utilisateur.controller");

server.listen(PORT, ()=>{
  console.log("Server is running on port ", 9090);
})



//////////////////////Blockchain











