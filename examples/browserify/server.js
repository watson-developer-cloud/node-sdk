require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const expressBrowserify = require('express-browserify');
const { IamTokenManager } = require('ibm-watson/auth');

if (!process.env.TONE_ANALYZER_APIKEY) {
  console.log('This example requires the TONE_ANALYZER_APIKEY environment variable');
  process.exit(1);
}

const toneAuthenticator = new IamTokenManager({
  apikey: process.env.TONE_ANALYZER_APIKEY,
});

const isDev = app.get('env') === 'development';
app.get(
  '/bundle.js',
  expressBrowserify('public/client.js', {
    watch: isDev,
    debug: isDev,
  })
);

app.use(express.static('public/'));

app.get('/api/token', function (req, res) {
  return toneAuthenticator
    .requestToken()
    .then(({ result }) => {
      res.json({ accessToken: result.access_token, url: process.env.TONE_ANALYZER_URL });
    })
    .catch(console.error);
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function () {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});
