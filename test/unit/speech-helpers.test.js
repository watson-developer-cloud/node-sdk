'use strict';

const { BasicAuthenticator } = require('ibm-cloud-sdk-core');
const isStream = require('isstream');
const websocket = require('websocket');
const SpeechToTextV1 = require('../../speech-to-text/v1');
const TextToSpeechV1 = require('../../text-to-speech/v1');

const url = 'http://ibm.com:80';
const version = 'v1';
const authenticator = new BasicAuthenticator({
  username: 'batman',
  password: 'bruce-wayne',
});

const sttService = {
  url,
  version,
  authenticator,
};

const ttsService = {
  url,
  version,
  authenticator,
};

const speechToText = new SpeechToTextV1(sttService);
const textToSpeech = new TextToSpeechV1(ttsService);

const socketSpy = jest.spyOn(websocket, 'w3cwebsocket').mockImplementation(() => {});

describe('speech to text helpers', () => {
  describe('recognizeUsingWebSocket()', () => {
    it('should return a stream', () => {
      expect(isStream(speechToText.recognizeUsingWebSocket())).toBe(true);
    });

    it('should pass the correct parameters into RecognizeStream', () => {
      const stream = speechToText.recognizeUsingWebSocket();
      expect(stream.options.url).toBe(sttService.url);
      expect(stream.options.headers['User-Agent']).toBeTruthy();
      expect(stream.options.headers['X-IBMCloud-SDK-Analytics']).toBe(
        'service_name=speech_to_text;service_version=v1;operation_id=recognizeUsingWebSocket;async=true'
      );

      expect(stream.authenticator).toBeDefined();
    });

    it('should construct the proper url from all query params', () => {
      const stream = speechToText.recognizeUsingWebSocket({
        accessToken: 'fake_value',
        watsonToken: 'fake_value',
        model: 'fake_value',
        languageCustomizationId: 'fake_value',
        acousticCustomizationId: 'fake_value',
        baseModelVersion: 'fake_value',
        xWatsonLearningOptOut: true,
        xWatsonMetadata: 'customer_id={1234}',
      });

      // query params get processed here
      stream.initialize();

      expect(socketSpy).toHaveBeenCalled();
      const finalUrl = socketSpy.mock.calls[0][0];
      // assert that all service-allowed params are present
      expect(finalUrl).toMatch(/access_token/);
      expect(finalUrl).toMatch(/watson-token/);
      expect(finalUrl).toMatch(/model/);
      expect(finalUrl).toMatch(/language_customization_id/);
      expect(finalUrl).toMatch(/acoustic_customization_id/);
      expect(finalUrl).toMatch(/base_model_version/);
      expect(finalUrl).toMatch(/x-watson-learning-opt-out/);
      expect(finalUrl).toMatch(/x-watson-metadata/);

      socketSpy.mockClear();
    });
  });
});

describe('text to speech helpers', () => {
  describe('synthesizeUsingWebSocket()', () => {
    it('should return a stream', () => {
      expect(isStream(textToSpeech.synthesizeUsingWebSocket())).toBe(true);
    });

    it('should pass the correct parameters into RecognizeStream', () => {
      const stream = textToSpeech.synthesizeUsingWebSocket();
      expect(stream.options.url).toBe(ttsService.url);
      expect(stream.options.headers.authorization).toBeUndefined();
      expect(stream.options.headers['User-Agent']).toBeTruthy();
      expect(stream.options.headers['X-IBMCloud-SDK-Analytics']).toBe(
        'service_name=text_to_speech;service_version=v1;operation_id=synthesizeUsingWebSocket;async=true'
      );
      expect(stream.authenticator).toBeDefined();
    });

    it('should construct the proper url from all query params', () => {
      const socketSpy = jest.spyOn(websocket, 'w3cwebsocket').mockImplementation(() => {});
      const stream = textToSpeech.synthesizeUsingWebSocket({
        accessToken: 'fake_value',
        watsonToken: 'fake_value',
        voice: 'fake_value',
        customizationId: 'fake_value',
        xWatsonLearningOptOut: true,
        xWatsonMetadata: 'customer_id={1234}',
      });

      // query params get processed here
      stream.initialize();

      expect(socketSpy).toHaveBeenCalled();
      const finalUrl = socketSpy.mock.calls[0][0];
      // assert that all service-allowed params are present
      expect(finalUrl).toMatch(/access_token/);
      expect(finalUrl).toMatch(/watson-token/);
      expect(finalUrl).toMatch(/voice/);
      expect(finalUrl).toMatch(/customization_id/);
      expect(finalUrl).toMatch(/x-watson-learning-opt-out/);
      expect(finalUrl).toMatch(/x-watson-metadata/);

      socketSpy.mockClear();
    });
  });
});
