'use strict';

var nock = require('nock');
var watson = require('../../index');

var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

var TWENTY_SECONDS = 20000;
var TWO_SECONDS = 2000;


describe('language_translation_integration', function() {
  this.timeout(TWENTY_SECONDS * 2);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.retries(1);

  var language_translation;


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
    var params = {
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
    var params = {
      text: 'this is an important test that needs to work'
    };
    language_translation.identify(params, done);
  });
});
