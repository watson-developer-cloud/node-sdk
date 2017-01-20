'use strict';

var fs = require('fs');
var nock = require('nock');
var watson = require('../../index');
var path = require('path');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

var TWENTY_SECONDS = 20000;
var TWO_SECONDS = 2000;

describe('tone_analyzer_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.retries(1);

  var tone_analyzer;

  before(function() {
    tone_analyzer = watson.tone_analyzer(auth.tone_analyzer);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });


  it('tone()', function(done) {
    var mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
    tone_analyzer.tone({text: mobydick}, done);
  });
});
