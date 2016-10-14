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


describe('personality_insights_v3_integration', function() {
  this.retries(1);

  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.timeout(TWENTY_SECONDS);
  var personality_insights;
  var mobydick;

  before(function() {
    mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
    personality_insights = watson.personality_insights(auth.personality_insights.v3);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('profile()', function(done) {
    var params = {
      text: mobydick
    };
    personality_insights.profile(params, done);
  });

  it('profile_html()', function(done) {
    var params = {
      text: '<div>' + mobydick + '</div>'
    };
    personality_insights.profile(params, done);
  });

  it('profile_csv()', function(done) {
    var params = {
      text: mobydick,
      raw_scores: true,
      consumption_preferences: true,
      csv_headers: true,
      headers: {
        'Accept': 'text/csv'
      }
    };
    personality_insights.profile(params, done);
  });
});
