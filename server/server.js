(function() {

  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
  var config = require('./config/config.js');
  var bodyParser = require('body-parser');
  var highscoreController = require('./highscore/highscoreController.js');

  mongoose.connect(config.db);

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist'));

  app.post('/highscore', highscoreController.checkAndUpdate);

  module.exports = app;
})();