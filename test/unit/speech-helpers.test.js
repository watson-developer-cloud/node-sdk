'use strict';

const isStream = require('isstream');
const SpeechToTextV1 = require('../../speech-to-text/v1');

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'http://ibm.com:80',
  version: 'v1',
  silent: true, // hide deprecation warnings for recognizeLive and friends
};

const rc_service = {
  iam_apikey: 'abc123',
  url: 'http://ibm.com:80',
  version: 'v1',
  silent: true, // hide deprecation warnings for recognizeLive and friends
};

const speech_to_text = new SpeechToTextV1(service);
const rc_speech_to_text = new SpeechToTextV1(rc_service);

describe('speech_to_text', function() {
  describe('recognizeUsingWebSocket()', function() {
    it('should return a stream', function() {
      expect(isStream(speech_to_text.recognizeUsingWebSocket())).toBe(true);
    });

    it('should pass the correct parameters into RecognizeStream', function() {
      const stream = speech_to_text.recognizeUsingWebSocket();
      expect(stream.options.url).toBe(service.url);
      expect(stream.options.headers.authorization).toBeTruthy();
      expect(stream.authenticated).toBe(true);
      expect(stream.options.token_manager).toBeUndefined();
    });

    it('should create a token manager in RecognizeStream if using IAM', function() {
      const stream = rc_speech_to_text.recognizeUsingWebSocket();
      expect(stream.options.url).toBe(service.url);
      expect(stream.options.headers.authorization).toBeUndefined();
      expect(stream.authenticated).toBe(false);
      expect(stream.options.token_manager).toBeDefined();
    });
  });
});
