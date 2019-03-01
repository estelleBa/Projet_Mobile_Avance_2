var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

//------------------------------------------------------------------------------

router.route('/')
// get all users
.get(function(req, res){
  User.find({}).exec(function(err, doc){
    if(doc) console.log(doc)
  });
  res.json({message : "Read all user", methode : req.method});
})
// create user
.post(function(req, res){
  if(body.login !== undefined && body.login !== '' &&
  body.avatar !== undefined && body.avatar !== '' &&
  body.password !== undefined && body.password !== '') {
    const body = req.body;
    isLoginValid(body.login, function(valid){
      if(valid==true){
        var pass = cryptPass(body.password)
        var newUser = new User({
          login: body.login,
          avatar: body.avatar,
          password: pass
        });
        newUser.save(function(err){
          if(err) console.log(err);
        });
        res.json({message : "Add user", methode : req.method});
      }
      else {
        res.json({message : "LOGIN NOT VALID", methode : req.method});
      }
    })
  }
});
//------------------------------------------------------------------------------
router.route('/:id')
// find user by id
.get(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.params.id);
  User.findOne({ _id : ObjectId}).exec(function(err, doc){
    if(doc) console.log(doc)
  });
  res.json({message : "Read one user", methode : req.method});
})
// update user
.put(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.params.id);
  const body = req.body;
  // login
  if(body.login !== undefined && body.login !== ''){
    isLoginValid(body.login, function(valid){
      if(valid==true){
        User.findOneAndUpdate({ _id : ObjectId}, {$set: {login: body.login}}).exec(function(err, doc){
          if(doc) console.log(doc)
        });
        res.json({message : "Update user login", methode : req.method});
      }
      else {
        res.json({message : "Update user login fail", methode : req.method});
      }
    })
  }
  // avatar
  if(body.avatar !== undefined && body.avatar !== ''){
    User.findOneAndUpdate({ _id : ObjectId}, {$set: {avatar: body.avatar}}).exec(function(err, doc){
      if(doc) console.log(doc)
    });
  }
  // password
  if(body.password !== undefined && body.password !== ''){
    var pass = cryptPass(body.password)
    User.findOneAndUpdate({ _id : ObjectId}, {$set: {password: pass}}).exec(function(err, doc){
      if(doc) res.json({message : "Update user pass", methode : req.method});
      else {
        res.json({message : "Update user pass fail", methode : req.method});
      }
    });
  }
})
// delete user
.delete(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.params.id);
  User.deleteOne({ _id : ObjectId}).exec(function(err, doc){
    if(doc) console.log(doc)
  });
  res.json({message : "delete user", methode : req.method});
});

//------------------------------------------------------------------------------

function isLoginValid(login, callback){
  User.find({ login: login }).exec(function(err, doc){
    if(doc.length > 0) valid=false;
    else valid=true;
    callback(valid);
  });
}
function cryptPass(password){
  return bcrypt.hashSync(password, 10);
}
function avatarValidity(){

}

module.exports = router;
