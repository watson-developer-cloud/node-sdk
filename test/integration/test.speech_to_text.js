var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
var watson = require('../../index');
var fs = require('fs');
var concat = require('concat-stream');
var assert = require('assert');
var path = require('path');
var nock = require('nock');

var TWENTY_SECONDS = 20000;
var FIVE_SECONDS = 5000;

describe('speech_to_text_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(FIVE_SECONDS);

  before(function() {
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('recognize()', function(done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      content_type: 'audio/ogg; codec=opus'
    };
    speech_to_text.recognize(params, done);
  });

  it('getModels()', function(done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    speech_to_text.getModels({}, done);
  });

  it('createRecognizeStream()',  function (done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
    recognizeStream.setEncoding('utf8');
    fs.createReadStream(path.join(__dirname, '../resources/weather.flac'))
      .pipe(recognizeStream)
      .on('error', done)
      .pipe(concat(function (transcription) {
        assert.equal(transcription.trim(), 'thunderstorms could produce large hail isolated tornadoes and heavy rain');
        done();
      }));
  });

  it('createRecognizeStream() - no words',  function (done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
    recognizeStream.setEncoding('utf8');
    fs.createReadStream(path.join(__dirname, '../resources/blank.wav'))
      .pipe(recognizeStream)
      .on('error', done)
      .on('data', function(text) {
        assert(!text, 'no text expected for an audio file with no words');
      })
      .on('end', done);
  });
});
