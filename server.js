var http = require('http');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var server = http.Server(app);
//var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect("mongodb://" + process.env.IP + ":27017/test");

mongoose.connection.on('erroe',function(){
  console.log('Could not connect to mongodb');
});
//define schema with mongoose
var userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: "Name is required"
  } ,
  email:String
});
var User = mongoose.model('User',userSchema);
//for local
//var db, url = "mongodb://localhost:27071";
//for c9
//var db, url = 'mongodb://' + process.env.IP + ":27017/test";
//mongo.MongoClient.connect(url,
 //           {useNewUrlParser:true},
 //           function(err,client){
 //             if(err){
  //              console.log(err);
  //              console.log("Could not connect to mongoDB");
 //             }else{
 //               db= client.db('node=cwD');
//              }
//            });
//            
//var save = function(from_data){
 // db.createCollection('users',function(err, collection){});
//  var collection= db.collection('users');
//  collection.save(from_data);
//};            



app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.get('/about',function(req,res){
  res.sendFile(__dirname+'/about.html');
});
app.get('/clss7',function(req,res){
  res.sendFile(__dirname+'/clss7.html');
});
app.post('/submit_user',function(req,res)
{
    console.log(req.body);
    var new_user = new User(req.body);
    new_user.save(function(err,data){
      if(err){
        return res.status(400)
                  .json({message:"couldn't save user"})
      }
      res.status(200).json(data);
    })
    //save(req.body);
    res.status(200);
});
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });