'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var fs     = require('fs');
var concat = require('concat-stream');
var nock   = require('nock');

if (fs.existsSync(__dirname + '/resources/auth.js')) {

  var auth = require('./resources/auth.js');

  var speech_to_text = watson.speech_to_text(auth.speech_to_text);

  describe('speech_to_text integration', function() {


    before(function() {
      nock.enableNetConnect();
    });

    describe('createRecognizeStream()', function () {
      it('should recognize the supplied audio', function (done) {
        this.timeout(10000);
        var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
        recognizeStream.setEncoding('utf8');
        fs.createReadStream(__dirname + '/resources/audio.wav')
          .pipe(recognizeStream)
          .on('error', done)
          .pipe(concat(function (transcription) {
            assert.equal(transcription.trim(), 'thunderstorms could produce large hail isolated tornadoes and heavy rain');
            done();
          }));
      });
    });
  });

} else {
  console.warn('no test/reosources/auth.js, skipping integration tests');
}
