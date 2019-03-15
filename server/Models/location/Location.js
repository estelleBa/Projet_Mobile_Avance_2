var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  loc: Array,
  time: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
