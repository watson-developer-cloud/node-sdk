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

describe('personality_insights_v3_integration', function() {
  this.retries(1);

  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.timeout(TWENTY_SECONDS);
  let personality_insights;
  let mobydick;

  before(function() {
    mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
    auth.personality_insights.v3.version = '2016-10-19';
    personality_insights = new watson.PersonalityInsightsV3(auth.personality_insights.v3);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('profile with text content', function(done) {
    const params = {
      content: mobydick,
      content_type: 'text/plain',
    };
    personality_insights.profile(params, done);
  });

  it('profile with text content and all params', function(done) {
    const params = {
      content: mobydick,
      content_type: 'text/plain',
      content_language: 'en',
      accept_language: 'en',
      raw_scores: true,
      consumption_preferences: true,
    };
    personality_insights.profile(params, done);
  });

  it('profile with html content', function(done) {
    const params = {
      content: '<div>' + mobydick + '</div>',
      content_type: 'text/html',
    };
    personality_insights.profile(params, done);
  });

  it('profile with csv response', function(done) {
    const params = {
      content: mobydick,
      content_type: 'text/plain',
      raw_scores: true,
      consumption_preferences: true,
      csv_headers: true,
      headers: {
        accept: 'text/csv',
      },
    };
    personality_insights.profile_csv(params, done);
  });
});
