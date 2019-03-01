var mongoose = require('mongoose');

var UserFriendSchema = new mongoose.Schema({
  user_id: String,
  friend_id: String
});
mongoose.model('UserFriend', UserFriendSchema);

module.exports = mongoose.model('UserFriend');
