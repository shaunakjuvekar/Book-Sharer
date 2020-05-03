const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(passport.initialize()); 
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB",{ useNewUrlParser: true , useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  username : String,
  password: String
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  res.render("cover");
});

app.get("/register",function(req,res){
  res.render("register",{success:""});
})

app.post("/register",function(req,res){
  const userName = req.body.username;
  const passWord = req.body.password;
  
  User.register({username:userName}, passWord, function(err, user){
    if (err){
      console.log(err);
      res.redirect("/register");
    }
    else{
      passport.authenticate("local")(req,res,function(){
        let Name = user.username;
        req.session.Name = Name;
        res.redirect("/dashboard");
      })
    }
  })
})

app.get("/login",function(req,res){
  res.render("login");
})

app.post("/login",function(req,res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  req.login(user,function(err){
    if (err){
      console.log(err)
    }
    else{
      passport.authenticate("local")(req,res,function(){
        let Name = user.username;
        req.session.Name = Name;
        res.redirect("/dashboard");
      })
    }
  })

})

app.get("/dashboard",function(req,res){
  const Name = req.session.Name
  if (req.isAuthenticated()){
    res.render("dashboard",{username: Name});
  }
  else{
    res.redirect("register");
  }
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
})
