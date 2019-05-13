'use strict';

const fs = require('fs');
const ToneAnalyzerV3 = require('../../tone-analyzer/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const serviceErrorUtils = require('../resources/service_error_util');

describe('tone_analyzer_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  auth.tone_analyzer.version = '2019-03-27';
  const tone_analyzer = new ToneAnalyzerV3(auth.tone_analyzer);

  it('tone()', function(done) {
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8');
    tone_analyzer.tone(
      { tone_input: mobydick, content_type: 'text/plain' },
      serviceErrorUtils.checkErrorCode(200, done)
    );
  });

  it('failing tone()', function(done) {
    // this is a failing test
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8');
    tone_analyzer.tone(
      { tone_input: mobydick, content_type: 'invalid content type' },
      (err, res) => {
        expect(err).toBeTruthy();
        expect(err.code).toBe(400);
        expect(err.headers['x-global-transaction-id']).toBeDefined();
        expect(typeof err.headers['x-global-transaction-id']).toBe('string');
        done();
      }
    );
  });

  it('toneChat()', function(done) {
    const utterances = {
      utterances: [
        { text: 'My charger isn’t working.', user: 'customer' },
        {
          text: 'Thanks for reaching out. Can you give me some more detail about the issue?',
          user: 'agent',
        },
        {
          text:
            "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
          user: 'customer',
        },
        {
          text: 'I’m sorry you’re having issues with charging. What kind of charger do you have?',
          user: 'agent',
        },
      ],
    };
    tone_analyzer.toneChat(utterances, serviceErrorUtils.checkErrorCode(200, done));
  });
});
