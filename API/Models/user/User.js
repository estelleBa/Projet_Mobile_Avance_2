var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  login: String,
  avatar: String,
  password: String,
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}]
});

var FriendSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  friend_id: mongoose.Types.ObjectId,
  addTime: Date
});

const User = mongoose.model('User', UserSchema);
const Friend = mongoose.model('Friend', FriendSchema);

module.exports = { User, Friend };
