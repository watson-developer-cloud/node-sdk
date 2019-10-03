/**
 * (C) Copyright IBM Corp. 2019.
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

const helper = require('ibm-cloud-sdk-core'); // for mocking `getMissingParams`
const { NoAuthAuthenticator } = require('ibm-cloud-sdk-core');
const ToneAnalyzerV3 = require('../../tone-analyzer/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/tone-analyzer/api',
  version: '2018-10-18',
};

const toneAnalyzer = new ToneAnalyzerV3(service);
const createRequestMock = jest.spyOn(toneAnalyzer, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('ToneAnalyzerV3', () => {
  describe('tone', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const toneInput = 'fake_toneInput';
        const contentType = 'fake_contentType';
        const sentences = 'fake_sentences';
        const tones = 'fake_tones';
        const contentLanguage = 'fake_contentLanguage';
        const acceptLanguage = 'fake_acceptLanguage';
        const params = {
          toneInput,
          contentType,
          sentences,
          tones,
          contentLanguage,
          acceptLanguage,
        };

        toneAnalyzer.tone(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tone', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body).toEqual(toneInput);
        expect(options.qs['sentences']).toEqual(sentences);
        expect(options.qs['tones']).toEqual(tones);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toneInput = 'fake_toneInput';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          toneInput,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        toneAnalyzer.tone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const toneInput = 'fake_toneInput';
        const params = {
          toneInput,
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
        toneAnalyzer.tone(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['toneInput'];

        let err;
        try {
          await toneAnalyzer.tone({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['toneInput'];

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
        const contentLanguage = 'fake_contentLanguage';
        const acceptLanguage = 'fake_acceptLanguage';
        const params = {
          utterances,
          contentLanguage,
          acceptLanguage,
        };

        toneAnalyzer.toneChat(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tone_chat', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body['utterances']).toEqual(utterances);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const utterances = 'fake_utterances';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          utterances,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        toneAnalyzer.toneChat(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
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
        toneAnalyzer.toneChat(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['utterances'];

        let err;
        try {
          await toneAnalyzer.toneChat({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
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
});
