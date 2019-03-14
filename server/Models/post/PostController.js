var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Post = require('./Post');

//------------------------------------------------------------------------------

router.route('/')
// get all posts
.get(function(req, res){
  Post.find({}).exec(function(err, doc){
    res.json({posts : doc, methode : req.method});
  });
});

//------------------------------------------------------------------------------

router.route('/add')
// create post
.post(function(req, res){
  const body = req.body;
    var newPost = new Post({
      content: body.content
    });
    newPost.save(function(err){
      if(err) res.json({message : "error", methode : req.method});
      else res.json({message : "ok", methode : req.method});
    });
});

//------------------------------------------------------------------------------

router.route('/count/:n')
// count post
.get(function(req, res){
  const count = req.params.n;
  Post.countDocuments({}, function(err, doc){
    console.log(doc)
    console.log(count)
    if(count < doc) res.json({count: doc, update : true, methode : req.method});
    else res.json({count: doc, update : false, methode : req.method});
   });
});

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

module.exports = router;
