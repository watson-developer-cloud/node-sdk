'use strict';
var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var expressBrowserify = require('express-browserify'); // eslint-disable-line node/no-missing-require
var dotenv = require('dotenv');
var AuthorizationV1 = require('ibm-watson/authorization/v1');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

var isDev = app.get('env') === 'development';
app.get(
  '/bundle.js',
  expressBrowserify('public/client.js', {
    watch: isDev,
    debug: isDev
  })
);

app.use(express.static('public/'));

// optional: load environment properties from a .env file
dotenv.load({ silent: true });

// For local development, specify the username and password or set env properties
var ltAuthService = new AuthorizationV1({
  username: process.env.TONE_ANALYZER_USERNAME || '<username>',
  password: process.env.TONE_ANALYZER_PASSWORD || '<password>',
  url: ToneAnalyzerV3.URL
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
