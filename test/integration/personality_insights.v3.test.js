'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const PersonalityInsightsV3 = require('../../personality-insights/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('personality_insights_v3_integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
  const options = authHelper.auth.personality_insights;
  options.version = '2019-03-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const personality_insights = new PersonalityInsightsV3(options);

  it('profile with text content', done => {
    const params = {
      content: mobydick,
      contentType: 'text/plain',
    };
    personality_insights.profile(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('profile with text content and all params', done => {
    const params = {
      content: mobydick,
      contentType: 'text/plain',
      contentLanguage: 'en',
      acceptLanguage: 'en',
      rawScores: true,
      consumptionPreferences: true,
    };
    personality_insights.profile(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('profile with html content', done => {
    const params = {
      content: '<div>' + mobydick + '</div>',
      contentType: 'text/html',
    };
    personality_insights.profile(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('profile with csv response', done => {
    const params = {
      content: mobydick,
      contentType: 'text/plain',
      rawScores: true,
      consumptionPreferences: true,
      csvHeaders: true,
      headers: {
        accept: 'text/csv',
      },
    };
    personality_insights.profileAsCsv(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });
});
