'use strict';

const nock = require('nock');
const watson = require('../../index');

const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

describe('language_translation_integration', function() {
  this.timeout(TWENTY_SECONDS * 2);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let language_translation;

  before(function() {
    language_translation = watson.language_translation(auth.language_translation);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('getModels()', function(done) {
    language_translation.getModels(null, done);
  });

  it('translate()', function(done) {
    const params = {
      text: 'this is a test',
      source: 'en',
      target: 'es'
    };
    language_translation.translate(params, done);
  });

  it('getIdentifiableLanguages()', function(done) {
    language_translation.getIdentifiableLanguages(null, done);
  });

  it('identify()', function(done) {
    const params = {
      text: 'this is an important test that needs to work'
    };
    language_translation.identify(params, done);
  });
});
