'use strict';

const helper = require('ibm-cloud-sdk-core');
const ToneAnalyzerV3 = require('../../tone-analyzer/v3');
const utils = require('../resources/unitTestUtils');

const getOptions = utils.getOptions;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const missingParamsSuccess = utils.missingParamsSuccess;
const missingParamsError = utils.missingParamsError;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const checkUserHeader = utils.checkUserHeader;
const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/tone-analyzer/api',
  version: '2018-10-18',
};

const toneAnalyzer = new ToneAnalyzerV3(service);
const createRequestMock = jest.spyOn(toneAnalyzer, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

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
      const sentences = 'fake_sentences';
      const tones = 'fake_tones';
      const content_language = 'fake_content_language';
      const accept_language = 'fake_accept_language';
      const content_type = 'fake_content_type';
      const params = {
        tone_input,
        sentences,
        tones,
        content_language,
        accept_language,
        content_type,
      };

      // invoke method
      toneAnalyzer.tone(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/tone', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Language', content_language);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(tone_input);
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

      toneAnalyzer.tone(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      toneAnalyzer.tone(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['tone_input'];

      toneAnalyzer.tone({}, err => {
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
      toneAnalyzer.toneChat(params);

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

      toneAnalyzer.toneChat(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      toneAnalyzer.toneChat(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['utterances'];

      toneAnalyzer.toneChat({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
