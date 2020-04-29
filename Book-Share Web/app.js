const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home");
});

app.get("/register",function(req,res){
  res.render("register");
})

app.post("/register",function(req,res){
  const userName = req.body.username;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
})


app.get("/login",function(req,res){
  res.render("login");
})






app.listen(3000,function(){
    console.log("Server started on port 3000");
})
