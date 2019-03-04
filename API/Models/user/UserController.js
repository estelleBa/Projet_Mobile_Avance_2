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
  if(isLoggedIn(req)){
    console.log(req.session)
    User.find({}).exec(function(err, doc){
      res.json({users : doc, methode : req.method});
    });
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('/create')
// create user
.post(function(req, res){
  if(!isLoggedIn(req)){
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
  }
  else res.json({message : "user in", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('find/:id')
// find user by id
.get(function(req, res){
  if(isLoggedIn(req)){
    var ObjectId = mongoose.Types.ObjectId(req.params.id);
    User.findOne({ _id : ObjectId}).exec(function(err, doc){
      res.json({user : doc, methode : req.method});
    });
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('update/:id')
// update user
.put(function(req, res){
  if(isLoggedIn(req)){
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
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('delete/:id')
// delete user
.delete(function(req, res){
  if(isLoggedIn(req)){
    var ObjectId = mongoose.Types.ObjectId(req.params.id);
    User.deleteOne({ _id : ObjectId}).exec(function(err, doc){
      if(err) res.json({message : "delete fail", methode : req.method});
      else res.json({message : "user deleted", methode : req.method});
    });
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('/login')
// login user
.post(function(req, res){
  if(!isLoggedIn(req)){
    const body = req.body;
    if(body.login !== undefined && body.login !== '' &&
    body.password !== undefined && body.password !== '') {
      User.findOne({ login: body.login }).exec(function(err, doc){
        if(doc){
          if(comparePass(body.password, doc.password)){
            req.session.user_id = mongoose.Types.ObjectId(doc._id);console.log(req.session.user_id)
            res.json({user : doc, methode : req.method});
          }
          else res.json({message : "password fail", methode : req.method});
        }
        else res.json({message : "can't find login", methode : req.method});
      });
    }
    else res.json({message : "login and password required", methode : req.method});
  }
  else res.json({message : "user in", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('/logout')
// logout user
.get(function(req, res){
  if(isLoggedIn(req)){
    req.session.destroy();
    res.json({message : "user out", method : req.method});
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

function isLoggedIn(req){
  return (req.session.user_id !== undefined ? true : false);
}
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
function comparePass(password, cryptedpass){
  return  bcrypt.compareSync(password, cryptedpass);
}

module.exports = router;
