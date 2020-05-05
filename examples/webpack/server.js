require('dotenv').config({ silent: true });
const express = require('express');
const app = express();

const { IamTokenManager } = require('ibm-watson/auth');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

if (!process.env.TONE_ANALYZER_APIKEY) {
  console.log('This example requires the TONE_ANALYZER_APIKEY environment variable');
  process.exit(1);
}

const toneAuthenticator = new IamTokenManager({
  apikey: process.env.TONE_ANALYZER_APIKEY,
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/', // Same as `output.publicPath` in most cases.
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

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});
