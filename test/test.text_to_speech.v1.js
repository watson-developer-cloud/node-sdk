'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var qs     = require('querystring');
var omit   = require('object.omit');

describe('text_to_speech', function() {

  var noop = function() {};

  // Test params
  var service_request = {
    accept: 'audio/ogg; codecs=opus',
    voice: 'VoiceEnUsMichael',
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
  var synthesize_request = synthesize_path + '?' + qs.stringify(omit(service_request,'text'));

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
      .post(synthesize_request, {text: service_request.text})
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
          assert(response instanceof Buffer);
          done();
        }
      });
    });

    it('should generate a valid payload', function() {
      var req = text_to_speech.synthesize(service_request, noop);
      assert.equal(req.uri.href, service.url + synthesize_request);
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['content-type'], 'application/json');
    });

    it('should support the X-Watson-Learning-Opt-Out option', function() {
      var params = {'X-Watson-Learning-Opt-Out': true, text: 'test'};
      var req = text_to_speech.synthesize(params, noop);
      assert.equal(req.headers['X-Watson-Learning-Opt-Out'], '1');
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
