(function() {

var HighScore = require('./highscoreModel.js');

module.exports = {

  checkAndUpdate: function(req, res) {
    
    var userScore = req.body.userScore;
    
    HighScore.find({}, function(err, score) {
      if (err) throw err;

      if (score[0].score < userScore) {
        score[0].score = userScore;
        score[0].save(function(err) {
          if (err) {
            throw err;
          }
        })
        res.json({
          score: userScore
        })
        return;
      }

      res.json({
        score: score[0].score
      })

    })
  }

}

})();
