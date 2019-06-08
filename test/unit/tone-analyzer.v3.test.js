/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const helper = require('ibm-cloud-sdk-core');
const ToneAnalyzerV3 = require('../../tone-analyzer/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
} = utils;

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
      toneAnalyzer.tone(params, noop);

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

      toneAnalyzer.tone(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const tone_input = 'fake_tone_input';
      const params = {
        tone_input,
      };

      // invoke method
      const tonePromise = toneAnalyzer.tone(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['tone_input'];

      const tonePromise = toneAnalyzer.tone();
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
      toneAnalyzer.toneChat(params, noop);

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

      toneAnalyzer.toneChat(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const utterances = 'fake_utterances';
      const params = {
        utterances,
      };

      // invoke method
      const toneChatPromise = toneAnalyzer.toneChat(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['utterances'];

      const toneChatPromise = toneAnalyzer.toneChat();
      expectToBePromise(toneChatPromise);

      toneChatPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
