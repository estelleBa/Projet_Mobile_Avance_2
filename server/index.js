var express = require('express');
var app = express();
var db = require('./db');
var session = require('express-session');
var cookieParser = require('cookie-parser');

express().use(cookieParser());
app.use(session({
  secret: "toto",
  resave: true,
  saveUninitialized: true
}));

var PostController = require('./Models/post/PostController');
// var UserController = require('./Models/user/UserController');
//var FriendController = require('./Models/friend/FriendController');
app.use('/posts', PostController);
//app.use('/friends', FriendController);

var server = app.listen(8000, function(){
  var port = server.address().port
  console.log("Listening on port " + port)
});

module.exports = app;
