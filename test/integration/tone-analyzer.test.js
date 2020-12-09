'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../dist/auth');
const ToneAnalyzerV3 = require('../../dist/tone-analyzer/v3');
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

  it('tone()', async () => {
    const params = {
      toneInput: fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8'),
      contentType: 'text/plain',
    };
    const res = await toneAnalyzer.tone(params);
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  it('failing tone()', async () => {
    // this is a failing test
    const params = {
      toneInput: fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8'),
      contentType: 'invalid content type',
    };
    try {
      const res = await toneAnalyzer.tone(params);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.code).toBe(400);
      expect(err.headers['x-global-transaction-id']).toBeDefined();
      expect(typeof err.headers['x-global-transaction-id']).toBe('string');
    }
  });

  it('toneChat()', async () => {
    const params = {
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
    const res = await toneAnalyzer.toneChat(params);
    expect(res).toBeDefined();
  });
});
