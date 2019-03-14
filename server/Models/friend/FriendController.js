var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Friend = require('./Friend');
var User = require('../user/User');

//------------------------------------------------------------------------------

router.route('/')
// get friends list
.get(function(req, res){
  if(isLoggedIn(req)){
    Friend.find({ user_id: req.session.user_id}).exec(function(err, doc){
      res.json({friends : doc, methode : req.method});
    });
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

router.route('/add')
// add friend
.post(function(req, res){
  if(isLoggedIn(req)){
    const body = req.body;
    if(body.user_id !== undefined && body.user_id !== '') {
      var ObjectId_user = mongoose.Types.ObjectId(req.session.user_id);
      var ObjectId_friend = mongoose.Types.ObjectId(req.body.user_id);
      var newFriend = new Friend({
        user_id: ObjectId_user,
        friend_id: ObjectId_friend
      });
      newFriend.save(function(err){
        if(err) res.json({message : "friend not added", methode : req.method});
        else res.json({message : "friend added", methode : req.method});
      });
    }
    else res.json({message : "missing user id", methode : req.method});
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

function isLoggedIn(req){
  return (req.session.user_id !== undefined ? true : false);
}

module.exports = router;
