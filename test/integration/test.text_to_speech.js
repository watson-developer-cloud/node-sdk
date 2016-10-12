'use strict';

var nock = require('nock');
var watson = require('../../index');
var wav = require('wav');
var assert = require('assert');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

var TWENTY_SECONDS = 20000;
var FIVE_SECONDS = 5000;


describe('text_to_speech_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(FIVE_SECONDS);

  var text_to_speech;

  before(function() {
    text_to_speech = watson.text_to_speech(auth.text_to_speech);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('voices()', function(done) {
    text_to_speech.voices(null, done);
  });

  it('synthesize()', function(done) {
    var params = {
      text: 'test',
      accept: 'audio/wav'
    };
    // wav.Reader parses the wav header and will throw if it isn't valid
    var reader = new wav.Reader();
    text_to_speech.synthesize(params)
      .pipe(reader)
      .on('format', done.bind(null,null));
  });

  it('pronunciation()', function(done) {
    var checkPronunciation = function(err, res) {
      assert.ifError(err);
      assert.equal(JSON.stringify(res), JSON.stringify({
        "pronunciation": ".ˈaɪ .ˈi .ˈi .ˈi"
      }));
      done();
    };

    text_to_speech.pronunciation({text: 'IEEE'}, checkPronunciation);
  });
});
