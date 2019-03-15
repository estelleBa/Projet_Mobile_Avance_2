var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  content: String,
  time: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
