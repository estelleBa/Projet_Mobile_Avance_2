var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Location = require('./Location');

//------------------------------------------------------------------------------

router.route('/')
// get last loc
.get(function(req, res){
  Location.find({}).sort({_id:-1}).limit(1).exec(function(err, doc){
    console.log(doc[0].loc)
    res.json({loc : doc[0], methode : req.method});
  });
});

//------------------------------------------------------------------------------

router.route('/')
// store loc
.post(function(req, res){
  const body = req.body;
  var newLoc = new Location({
    loc: body.loc
  });
  newLoc.save(function(err){
    if(err) res.json({message : "error", methode : req.method});
    else res.json({message : "ok", methode : req.method});
  });
});

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

module.exports = router;
