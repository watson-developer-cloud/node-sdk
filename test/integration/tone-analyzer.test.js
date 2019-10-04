'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const ToneAnalyzerV3 = require('../../tone-analyzer/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('tone analyzer integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.toneAnalyzer;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  options.version = '2019-03-27';
  const toneAnalyzer = new ToneAnalyzerV3(options);

  it('tone()', done => {
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8');
    toneAnalyzer.tone({ toneInput: mobydick, contentType: 'text/plain' }, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  it('failing tone()', done => {
    // this is a failing test
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8');
    toneAnalyzer.tone({ toneInput: mobydick, contentType: 'invalid content type' }, (err, res) => {
      expect(err).toBeTruthy();
      expect(err.code).toBe(400);
      expect(err.headers['x-global-transaction-id']).toBeDefined();
      expect(typeof err.headers['x-global-transaction-id']).toBe('string');
      done();
    });
  });

  it('toneChat()', done => {
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
    toneAnalyzer.toneChat(utterances, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });
});
