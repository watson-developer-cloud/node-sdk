'use strict';

const fs = require('fs');
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

const noop = function() {};

const missingParameter = function(err) {
  expect(err).toBeInstanceOf(Error);
  expect(/required parameters/.test(err)).toBe(true);
};

describe('speech_to_text', function() {
  describe('recognize()', function() {
    it('should check no parameters provided', function() {
      speech_to_text.recognize({}, missingParameter);
      speech_to_text.recognize(null, missingParameter);
      speech_to_text.recognize({ content_type: 'bar' }, missingParameter);
      speech_to_text.recognize({ continuous: 'false' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v1/recognize';
      const createRequestMock = jest.spyOn(speech_to_text, 'createRequest');
      speech_to_text.recognize(
        {
          audio: fs.createReadStream(__dirname + '/../resources/weather.wav'),
          content_type: 'audio',
        },
        noop
      );
      expect(createRequestMock).toBeCalled();
      const req = createRequestMock.mock.results[0].value;

      expect(req.uri.href).toBe(service.url + path);
      expect(req.method).toBe('POST');
      createRequestMock.mockRestore();
    });
  });

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

    it('createRecognizeStream should return a stream - compatibility', function() {
      expect(isStream(speech_to_text.createRecognizeStream())).toBe(true);
    });
  });
});
