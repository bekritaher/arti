const { colours } = require("nodemon/lib/config/defaults");
const { Art } = require("../models/art.model");
const { Utilisateur } = require("../models/utilisateur.model");
const nodemailer = require("nodemailer")

//afficher

const index=(req, res, next) => 
{




    Utilisateur.find()
    .then((utilisateur) =>{
    
        for (let i=0 ; i<utilisateur.length;i++) {
          if (utilisateur[i].arts.length==0){
              utilisateur.splice(i,1);
              i--; 
          }
        }
        
        res.json({utilisateur})
    
    
    })
    .catch(error=>{res.json({error})})      
}


const indexsorted=(req, res, next) => 
{

    Utilisateur.find()
    .then((utilisateur) =>{
    
        utilisateur.sort((a, b) => {
            return a.followers.length - b.followers.length;
        });
      var  reversed=utilisateur.reverse();
        res.json({reversed})
    
    
    })
    .catch(error=>{res.json({error})})      
}


const gets = (req, res, next) => {
    Utilisateur.find()
      .then((utilisateur) => {
        res.json({ utilisateur });
      })
      .catch((error) => {
        res.json({ error });
      });
  };
  


  const  unfollow= (req, res, next)  => 
{
    Utilisateur.findByIdAndUpdate(
        req.body.follower,
        {$pull: {followings: req.body.user}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }

      );
      Utilisateur.findByIdAndUpdate(
        req.body.user,
        {$pull: {followers: req.body.follower}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );


}


const  follow= (req, res, next)  => 
{
    Utilisateur.findByIdAndUpdate(
        req.body.follower,
        {$push: {followings: req.body.user}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );
      Utilisateur.findByIdAndUpdate(
        req.body.user,
        {$push: {followers: req.body.follower}},
        { upsert: true,new : true},
        function(err, model) {
        
         
        
            console.log(err);
        }
      );
      
    
}


///////////////


//  const test=(req, res, next) => 
//  {
//     Art.findById(utilisateur.arts[i], function (err, art) {
//         if (err)
//             res.send(err)
         
//         x.push(art)
//        if (i==utilisateur.arts.length-1)
//        {res.json(x); }
       
    
       
//     })    
//  }



const  getarts= (req, res, next)  => 
{
    var x =[]
    console.log(req.body.id)


   // var utilisateur = (await Utilisateur.findById(other_id, 'name photo').exec()).toObject();

 Utilisateur.findOne({_id:req.body.id}, (err,utilisateur)=>{
//   console.log(utilisateur.arts);
//   console.log(utilisateur.nom);
    if (utilisateur.arts.length > 0){
    for (let i=0 ; i<utilisateur.arts.length;i++) {
        Art.findById(utilisateur.arts[i], function (err, art) {
            if (err)
                res.send(err)
             
            x.push(art)
           if (i==utilisateur.arts.length-1)
           {res.json(x); }
           
         
           
        })
        }
    }
    else {res.json(x);}
})
}




//ajouter


const add = (req, res, next) => {

    console.log(req.file);
        let utilisateur= new Utilisateur({
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    
        });
    
            
        console.log(utilisateur)
    
        utilisateur.save()

        .then(response => {
            res.json({
                message:'Utilisateur Added Sucessfull!'
            })
        })
    .catch(eroor => {
        res.json({
            message:'An error Occured!'
        })
    })
    }
    
    
//modifier
const update =(req, res, next)=>
{
    let id=req.body.id
    let updateData={
        nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    }
    Utilisateur.findByIdAndUpdate(id, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Utilisateur updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'An error Occured!'
    })
})
}


//supprimer

const destroy=(req,res,next) =>{
    let _id = req.params.id;
    console.log(_id);
    Utilisateur.findByIdAndDelete(_id)
    .then(() => {
        res.json({
          message: "Delete sucess!",
        });
      })
      .catch((error) => {
          res.statusCode = 400;
  
        console.log(error);
        res.json({
          error,
        });
      });
      
}


const signup=(req,res)=>{
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            
            if(utilisateur==null){
                const utilisateur = Utilisateur({
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    email:req.body.email,
                    password:req.body.password,
                    numero:req.body.numero,
                    bio:req.body.bio,
                    datenaissance:req.body.datenaissance,
                    adresse:req.body.adresse,
                    role:req.body.role,
                    image:req.body.image
                })
                utilisateur.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json(err)
                    }else{
                        if(utilisateur==null){ res.status(401).json({
                            message:'User is null!'
                        })}
                        else{
                        console.log(utilisateur)
                        res.status(200).json(utilisateur)
                    }
                }
                })
            }else{

                res.status(404).json({
                    message:'Email already exists!'
            })   
            }
        }
        console.log("statusCode: ", res.statusCode);
    })
    
}

const findbyid=(req,res)=>{
    Utilisateur.findById(req.body.id, function (err, utilisateur) {
        if (err)
            res.send(err)
         
     
    res.json(utilisateur);
    
       
    })  

}


const emailcheck=(req,res)=>{
  
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
            
          
        }else{
            
            if(utilisateur==null){ res.status(200).json({
                message:'Email available'
            });   }
            else{
                res.status(401).json({
                    errorMessage: "Email unavailable.",
                  
                })
               
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}






const signin=(req,res)=>{
    Utilisateur.findOne({email:req.body.email,password:req.body.password},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
          
        }else{
            if(utilisateur==null){ res.status(401).json({
                message:'Wrong informations'
            })}
            else{
            res.status(200).json(utilisateur)  
            console.log(utilisateur)
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}


const send = (req, res, next) => {
        console.log(req.body.nombre)
        nombr=req.body.nombre
        eventId= req.body.event
        x=nombr.substring(0,2);
        console.log(x)
        parseInt(x)
        console.log(x)
        Utilisateur.find().limit(x).then((data)=>{
            console.log("aaazze",data[0].id)
            sendEmail(data.map((el)=>({email:el.email,userId:el.id})),eventId)
            return  res.status(200).json(data.map((el)=>el.email))
        })
       /* res.status(200).send(emails)
       console.log(emails) */
      // sendEmail(emails)


    }


module.exports={
    index,gets,add,update,destroy,signin,signup,emailcheck,getarts,indexsorted,findbyid,follow,unfollow,send
}




function sendEmail(users,eventId) {
console.log("usersssss",users, "-- ",eventId) 
   let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'artiky4group@gmail.com',
        pass: 'artiky42022'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
  
  for(var i=0; i<users.length; i++){
    const mailOptions = {
        from: 'Arti app',
      to: users[i].email,
      text: 'Our artists',
      subject: 'You are invited to the next event',
      html: `<html>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome to </h1> <img src=" https://ky4-arti.onrender.com/uploads/partenaires/artilogo3.png" width="200" height="60" style="display: block; border: 0px;" />
                          </td>
                      </tr>
                  </table>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px ; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">We are excited to invite you to join our event. Just press the button below to accept invitation.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="#FF7868"><a href="http://localhost:9090/api/utilisateurs/addusertoevent/${users[i].userId}/${eventId}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FF7868; display: inline-block;">Accept</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If you have any questions, just contact us.</p>
                              <p style="margin: 0;">email : artiky4group@gmail.com</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>Arti</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          
          
      </table>
  
  </html>`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });}
  
}