var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  addTime: Date
});
mongoose.model('Friend', FriendSchema);

module.exports = mongoose.model('Friend');
