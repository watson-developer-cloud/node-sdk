'use strict';

const isStream = require('isstream');
const SpeechToTextV1 = require('../../speech-to-text/v1');

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'http://ibm.com:80',
  version: 'v1',
  silent: true, // hide deprecation warnings for recognizeLive and friends
  httpsAgent: 'fake https agent',
  httpAgent: 'fake http agent',
};

const rc_service = {
  iam_apikey: 'abc123',
  url: 'http://ibm.com:80',
  version: 'v1',
  silent: true, // hide deprecation warnings for recognizeLive and friends
  httpAgent: 'fake http agent',
};

const speech_to_text = new SpeechToTextV1(service);
const rc_speech_to_text = new SpeechToTextV1(rc_service);

describe('speech_to_text', () => {
  describe('recognizeUsingWebSocket()', () => {
    it('should return a stream', () => {
      expect(isStream(speech_to_text.recognizeUsingWebSocket())).toBe(true);
    });

    it('should pass the correct parameters into RecognizeStream', () => {
      const stream = speech_to_text.recognizeUsingWebSocket();
      expect(stream.options.url).toBe(service.url);
      expect(stream.options.headers.authorization).toBeTruthy();
      expect(stream.options.headers['User-Agent']).toBeTruthy();
      expect(stream.options.headers['X-IBMCloud-SDK-Analytics']).toBe(
        'service_name=speech_to_text;service_version=v1;operation_id=recognizeUsingWebSocket;async=true'
      );
      expect(stream.options.token_manager).toBeUndefined();
      expect(stream.options.agent).toBe(service.httpsAgent);
    });

    it('should create a token manager in RecognizeStream if using IAM', () => {
      const stream = rc_speech_to_text.recognizeUsingWebSocket();
      expect(stream.options.url).toBe(service.url);
      expect(stream.options.headers.authorization).toBeUndefined();
      expect(stream.options.token_manager).toBeDefined();
      expect(stream.options.agent).toBe(rc_service.httpAgent);
    });

    it('should override stored header with new token on refresh', done => {
      // create stream object
      const stream = rc_speech_to_text.recognizeUsingWebSocket();

      // mock the token request method
      stream.options.token_manager.getToken = jest.fn(cb => cb(null, 'abc'));

      // verify no header is set
      expect(stream.options.headers.authorization).toBeUndefined();

      // explicitly set a new header, simulating the first token call
      stream.options.headers.authorization = 'Bearer xyz';

      // request a new token and verify it has overriden the old one
      stream.setAuthorizationHeaderToken(err => {
        expect(err).toBeNull();
        expect(stream.options.headers.authorization).toBe('Bearer abc');
        done();
      });
    });
  });
});
