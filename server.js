const express  = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({entended:true}))
app.use(cors());



app.use(express.static('public'))
const Contact = require('./models/contactModel')

app.get("/", function(req, res){
  // res.json("express working")
    res.sendFile(__dirname + "index.html")

})

app.post("/contact", async function(req, res){
  
      // console.log(req.body)
      const {fullname,email, text} = req.body


       let date = new Date().toDateString();

      const newContact = new Contact({
           fullname,
          email,
          message: text,
           createdon: date,
          statusOf_text: false,
          reply_on: "",

      })
      
      try{

    
    
        const savedContact = await newContact.save()  


         console.log(savedContact);
         
         return res.status(200).json({message: savedContact})
        //  return res.json({message: savedContact})
        
 

      } catch(err){
              console.log("err dw", err);
              return res.status(500).json({message: err})
          }


})

// connect to db
 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true} ,()=>{
        console.log("connected");
})

const PORT = 3001
app.listen(PORT,function(){
  console.log("express on");
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
    });
  });
});