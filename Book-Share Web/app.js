const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var JSAlert = require("js-alert");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB",{ useNewUrlParser: true , useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  username : String,
  password: String
})

const User = mongoose.model('User',userSchema);


app.get("/",function(req,res){
  res.render("home");
});

app.get("/register",function(req,res){
  res.render("register");
})

app.post("/register",function(req,res){
  const userName = req.body.username;
  const passWord = req.body.password;
  
 
  User.find({username: userName},function(err,user){
    if (!err){
     
      if (user){
        console.log(user)
        //res.render("register",{success: "User already exists, please create another"})
      }
      else{
        const user = new User({username: userName, password: passWord})
        user.save(function(err){
          if (!err){
            console.log("User inserted");
          }
        })
      }
    }
    
    
  })

})


app.get("/login",function(req,res){
  res.render("login");
})



app.listen(3000,function(){
    console.log("Server started on port 3000");
})
