(function() {

var config = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/indyhacker',
  port: process.env.PORT || 8080
}

module.exports = config;

})();