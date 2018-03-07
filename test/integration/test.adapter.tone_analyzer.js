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

describe('tone_analyzer_adapter_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let tone_analyzer;

  before(function() {
    auth.tone_analyzer.version = 'v3';
    auth.tone_analyzer.version_date = '2016-06-19';
    tone_analyzer = watson.tone_analyzer(auth.tone_analyzer);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('tone()', function(done) {
    const mobydick = fs.readFileSync(path.join(__dirname, '../resources/tweet.txt'), 'utf8');
    tone_analyzer.tone({ text: mobydick }, done);
  });

  it('tone_chat()', function(done) {
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
    tone_analyzer.tone_chat(utterances, done);
  });
});
