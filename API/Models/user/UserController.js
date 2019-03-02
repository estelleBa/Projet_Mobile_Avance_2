var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

express().use(cookieParser());
express().use(session({
  secret: "toto",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

var User = require('./User');
var UserFriend = require('./User_friend');

//------------------------------------------------------------------------------

router.route('/')
// get all users
.get(function(req, res){
  User.find({}).exec(function(err, doc){
    res.json({users : doc, methode : req.method});
  });
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
          if(err) res.json({message : "user not registered", methode : req.method});
          else res.json({message : "user registered", methode : req.method});
        });
      }
      else res.json({message : "login already taken", methode : req.method});
    })
  }
  else res.json({message : "login and password required", methode : req.method});
});
//------------------------------------------------------------------------------
router.route('/:id')
// find user by id
.get(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.params.id);
  User.findOne({ _id : ObjectId}).exec(function(err, doc){
    res.json({user : doc, methode : req.method});
  });
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
          if(err) res.json({message : "update fail", methode : req.method});
          else res.json({message : "login updated", methode : req.method});
        });
      }
      else res.json({message : "login already taken", methode : req.method});
    })
  }
  // avatar
  if(body.avatar !== undefined && body.avatar !== ''){
    User.findOneAndUpdate({ _id : ObjectId}, {$set: {avatar: body.avatar}}).exec(function(err, doc){
      if(err) res.json({message : "update fail", methode : req.method});
      else res.json({message : "avatar updated", methode : req.method});
    });
  }
  // password
  if(body.password !== undefined && body.password !== ''){
    var pass = cryptPass(body.password)
    User.findOneAndUpdate({ _id : ObjectId}, {$set: {password: pass}}).exec(function(err, doc){
      if(err) res.json({message : "update fail", methode : req.method});
      else res.json({message : "password updated", methode : req.method});
    });
  }
})
// delete user
.delete(function(req, res){
  var ObjectId = mongoose.Types.ObjectId(req.params.id);
  User.deleteOne({ _id : ObjectId}).exec(function(err, doc){
    if(err) res.json({message : "delete fail", methode : req.method});
    else res.json({message : "user deleted", methode : req.method});
  });
});

//------------------------------------------------------------------------------

router.route('/login')
// login user
.post(function(req, res){
  const body = req.body;
  if(body.login !== undefined && body.login !== '' &&
  body.password !== undefined && body.password !== '') {
    var toto = comparePass(body.password);
    console.log(toto)
    // if(comparePass(body.password)){
    //   User.findOne({ login: body.login, password: pass }).exec(function(err, doc){
    //     if(doc){
    //       req.session.user_id = doc.user_id;
    //       res.json({user : doc, methode : req.method});
    //     }
    //     else res.json({message : "can't find user", methode : req.method});
    //   });
    // }
  }
});

//------------------------------------------------------------------------------

router.route('/friend')
// get friend list
.get(function(req, res){
  UserFriend.find({ user_id: req.session.user_id}).exec(function(err, doc){
    res.json({friends : doc, methode : req.method});
  });
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
function comparePass(password){
  //return  bcrypt.compareSync(password, 10);
  if(bcrypt.compareSync("password", 10)) return true;
  else return false;
}

module.exports = router;
