(function() {

var mongoose = require('mongoose');

var HighScoreSchema = new mongoose.Schema({
  score: Number
})

module.exports = mongoose.model('scores', HighScoreSchema);

})();
