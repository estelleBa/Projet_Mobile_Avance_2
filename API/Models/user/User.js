var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  login: String,
  avatar: String,
  password: String
});
mongoose.model('User', UserSchema);

var db = mongoose.connection;
db.once('open', function(){
  	console.log('Connected to MongoDB');
});

module.exports = mongoose.model('User');
