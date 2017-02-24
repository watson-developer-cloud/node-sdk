'use strict';

const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const path = require('path');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

describe('tone_analyzer_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let tone_analyzer;

  before(function() {
    tone_analyzer = watson.tone_analyzer(auth.tone_analyzer);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('tone()', function(done) {
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
    tone_analyzer.tone({ text: mobydick }, done);
  });
});
