var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Friend = require('./Friend');

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
    var ObjectId = mongoose.Types.ObjectId(req.body.id);
  }
  else res.json({message : "user out", methode : req.method});
});

//------------------------------------------------------------------------------

function isLoggedIn(req){
  return (req.session.user_id !== undefined ? true : false);
}

module.exports = router;
