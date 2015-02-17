'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');
var qs = require('qs');

describe('text_to_speech', function() {

  var noop = function() {};

  // Test params
  var service_request = {
    voice: 'VoiceEnUsMichael',
    accept: 'audio/ogg; codecs=opus',
    text: 'Hi test'
  };
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };
  var synthesize_path = '/v1/synthesize';
  var voices_path = '/v1/voices';

  var mock_voices = [{
    name: 'michael',
    language: 'en',
    gender: 'male',
    url: 'url'
  }, {
    name: 'jenny',
    language: 'en',
    gender: 'female',
    url: 'url2'
  }];

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .get(synthesize_path + '?' + qs.stringify(service_request))
      .replyWithFile(200, __dirname + '/resources/audio.ogg')
      .get(voices_path)
      .reply(200, mock_voices);
  });

  after(function() {
    nock.cleanAll();
  });

  var text_to_speech = watson.text_to_speech(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('synthesize()', function(){

    it('should check for missing text', function() {
      var params = {
        voice: service_request.voice,
        accept: service_request.accept
      };
      text_to_speech.synthesize(params, missingParameter);
    });

    it('should check no parameters provided', function() {
      text_to_speech.synthesize({}, missingParameter);
      text_to_speech.synthesize(null, missingParameter);
      text_to_speech.synthesize(undefined, missingParameter);
    });

    it('should generate a valid response', function(done) {
      text_to_speech.synthesize(service_request, function(err, response) {
        if (err)
          done(err);
        else {
          assert.notEqual(response, null);
          assert.notEqual(response, undefined);
          done();
        }
      });
    });

    it('should generate a valid payload', function() {
      var req = text_to_speech.synthesize(service_request, noop);
      assert.equal(req.uri.href, service.url + synthesize_path + '?' + qs.stringify(service_request));
      assert.equal(req.method, 'GET');
    });

  });

  describe('voices()', function(){

    it('should generate a valid payload', function() {
      var checkVoices = function(err, res) {
        assert.equal(JSON.stringify(res), JSON.stringify(mock_voices));
      };

      text_to_speech.voices({}, checkVoices);
      text_to_speech.voices(null, checkVoices);
      text_to_speech.voices(undefined, checkVoices);
    });

  });
});