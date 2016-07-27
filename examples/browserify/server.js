var express = require('express');
var app = express();
var expressBrowserify = require('express-browserify');
var dotenv = require('dotenv');
var watson = require('watson-developer-cloud');

var isDev = app.get('env') === 'development';
app.get('/bundle.js', expressBrowserify('public/client.js', {
  watch: isDev,
  debug: isDev
}));

app.use(express.static('public/'));

// optional: load environment properties from a .env file
dotenv.load({silent: true});

// For local development, specify the username and password or set env properties
var ltAuthService = new watson.AuthorizationV1({
  username: process.env.TONE_ANALYZER_USERNAME || '<username>',
  password: process.env.TONE_ANALYZER_PASSWORD || '<password>',
  url: watson.ToneAnalyzerV3.URL
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});
