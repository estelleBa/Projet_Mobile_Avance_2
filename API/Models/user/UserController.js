var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');
var UserFriend = require('./User_friend');

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
  const body = req.body;
  if(body.login !== undefined && body.login !== '' &&
  body.password !== undefined && body.password !== '') {
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

router.route('/friend')
// get friend list
.get(function(req, res){
  user_id = "5c794cc710bfae0f790c5901"
  UserFriend.find({ user_id: user_id}).exec(function(err, doc){
    if(doc) console.log(doc)
  });
  res.json({message : "Read user friends", methode : req.method});
})
// add friend
.post(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.body.id);

});

//------------------------------------------------------------------------------

function isLoginValid(login, callback){
  User.find({ login: login }).exec(function(err, doc){
    if(doc.length > 0) valid=false;
    else valid=true;
    callback(valid);
  });
}
function isAvatarValid(avatar){

}
function cryptPass(password){
  return bcrypt.hashSync(password, 10);
}

module.exports = router;
