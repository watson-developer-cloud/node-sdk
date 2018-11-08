'use strict';

const fs = require('fs');
const watson = require('../../index');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('personality_insights_v2_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
  auth.personality_insights.v2.version = 'v2';
  const personality_insights = watson.personality_insights(auth.personality_insights.v2);

  it('profile()', function(done) {
    const params = {
      text: mobydick,
    };
    personality_insights.profile(params, done);
  });

  it('profile_html()', function(done) {
    const params = {
      text: '<div>' + mobydick + '</div>',
    };
    personality_insights.profile(params, done);
  });
});
