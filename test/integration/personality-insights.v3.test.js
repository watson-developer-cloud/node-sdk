'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const PersonalityInsightsV3 = require('../../personality-insights/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('personality insights integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const mobydick = fs.readFileSync(path.join(__dirname, '../resources/mobydick.txt'), 'utf8');
  const options = authHelper.auth.personalityInsights;
  options.version = '2019-03-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const personalityInsights = new PersonalityInsightsV3(options);

  it('profile with text content', done => {
    const params = {
      content: mobydick,
      contentType: 'text/plain',
    };
    personalityInsights.profile(params, (err, res) => {
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
    personalityInsights.profile(params, (err, res) => {
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
    personalityInsights.profile(params, (err, res) => {
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
    personalityInsights.profileAsCsv(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });
});
