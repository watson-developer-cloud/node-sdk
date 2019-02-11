'use strict';

const ToneAnalyzerV3 = require('../../tone-analyzer/v3-generated');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const missingParamsError = utils.missingParamsError;
const missingParamsSuccess = utils.missingParamsSuccess;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const checkUserHeader = utils.checkUserHeader;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const getOptions = utils.getOptions;
const expectToBePromise = utils.expectToBePromise;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  version: '2018-10-18',
};

const tone_analyzer = new ToneAnalyzerV3(service);
const createRequestMock = jest.spyOn(tone_analyzer, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('tone', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const tone_input = 'fake_tone_input';
      const content_type = 'fake_content_type';
      const sentences = 'fake_sentences';
      const tones = 'fake_tones';
      const content_language = 'fake_content_language';
      const accept_language = 'fake_accept_language';
      const params = {
        tone_input,
        content_type,
        sentences,
        tones,
        content_language,
        accept_language,
      };

      // invoke method
      tone_analyzer.tone(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/tone', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      checkUserHeader(createRequestMock, 'Content-Language', content_language);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      expect(options.body).toEqual(tone_input);
      expect(options.json).toEqual(content_type === 'application/json');
      expect(options.qs['sentences']).toEqual(sentences);
      expect(options.qs['tones']).toEqual(tones);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const tone_input = 'fake_tone_input';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        tone_input,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      tone_analyzer.tone(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const tone_input = 'fake_tone_input';
      const params = {
        tone_input,
      };

      // invoke method
      const tonePromise = tone_analyzer.tone(params);
      expectToBePromise(tonePromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      tone_analyzer.tone(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['tone_input'];

      tone_analyzer.tone({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['tone_input'];

      const tonePromise = tone_analyzer.tone();
      expectToBePromise(tonePromise);

      tonePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('toneChat', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const utterances = 'fake_utterances';
      const content_language = 'fake_content_language';
      const accept_language = 'fake_accept_language';
      const params = {
        utterances,
        content_language,
        accept_language,
      };

      // invoke method
      tone_analyzer.toneChat(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/tone_chat', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Language', content_language);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      expect(options.body['utterances']).toEqual(utterances);
      expect(options.json).toEqual(true);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const utterances = 'fake_utterances';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        utterances,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      tone_analyzer.toneChat(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const utterances = 'fake_utterances';
      const params = {
        utterances,
      };

      // invoke method
      const toneChatPromise = tone_analyzer.toneChat(params);
      expectToBePromise(toneChatPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      tone_analyzer.toneChat(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['utterances'];

      tone_analyzer.toneChat({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['utterances'];

      const toneChatPromise = tone_analyzer.toneChat();
      expectToBePromise(toneChatPromise);

      toneChatPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
