const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
});

module.exports = mongoose.model('Url', URLSchema);
