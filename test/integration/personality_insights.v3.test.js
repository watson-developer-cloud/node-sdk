'use strict';

const fs = require('fs');
const PersonalityInsightsV3 = require('../../personality-insights/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const serviceErrorUtils = require('../resources/service_error_util');

describe('personality_insights_v3_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
  auth.personality_insights.version = '2019-03-27';
  const personality_insights = new PersonalityInsightsV3(auth.personality_insights);

  it('profile with text content', function(done) {
    const params = {
      content: mobydick,
      content_type: 'text/plain',
    };
    personality_insights.profile(params, serviceErrorUtils.checkErrorCode(200, done));
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
    personality_insights.profile(params, serviceErrorUtils.checkErrorCode(200, done));
  });

  it('profile with html content', function(done) {
    const params = {
      content: '<div>' + mobydick + '</div>',
      content_type: 'text/html',
    };
    personality_insights.profile(params, serviceErrorUtils.checkErrorCode(200, done));
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
    personality_insights.profileAsCsv(params, serviceErrorUtils.checkErrorCode(200, done));
  });
});
