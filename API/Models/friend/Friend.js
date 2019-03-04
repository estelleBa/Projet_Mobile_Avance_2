var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
  user_id: String,
  friend_id: String
});
mongoose.model('Friend', FriendSchema);

module.exports = mongoose.model('Friend');
