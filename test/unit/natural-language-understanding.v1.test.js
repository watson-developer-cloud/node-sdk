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
const NaturalLanguageUnderstandingV1 = require('../../natural-language-understanding/v1');
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
  checkDefaultSuccessArgs,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url:
    'https://gateway.watsonplatform.net/natural-language-understanding/api/natural-language-understanding/api',
  version: '2018-10-18',
};

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(service);
const createRequestMock = jest.spyOn(naturalLanguageUnderstanding, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('NaturalLanguageUnderstandingV1', () => {
  describe('analyze', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const features = 'fake_features';
        const text = 'fake_text';
        const html = 'fake_html';
        const url = 'fake_url';
        const clean = 'fake_clean';
        const xpath = 'fake_xpath';
        const fallbackToRaw = 'fake_fallbackToRaw';
        const returnAnalyzedText = 'fake_returnAnalyzedText';
        const language = 'fake_language';
        const limitTextCharacters = 'fake_limitTextCharacters';
        const params = {
          features,
          text,
          html,
          url,
          clean,
          xpath,
          fallbackToRaw,
          returnAnalyzedText,
          language,
          limitTextCharacters,
        };

        naturalLanguageUnderstanding.analyze(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['features']).toEqual(features);
        expect(options.body['text']).toEqual(text);
        expect(options.body['html']).toEqual(html);
        expect(options.body['url']).toEqual(url);
        expect(options.body['clean']).toEqual(clean);
        expect(options.body['xpath']).toEqual(xpath);
        expect(options.body['fallback_to_raw']).toEqual(fallbackToRaw);
        expect(options.body['return_analyzed_text']).toEqual(returnAnalyzedText);
        expect(options.body['language']).toEqual(language);
        expect(options.body['limit_text_characters']).toEqual(limitTextCharacters);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const features = 'fake_features';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          features,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstanding.analyze(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const features = 'fake_features';
        const params = {
          features,
        };

        // invoke method
        const analyzePromise = naturalLanguageUnderstanding.analyze(params);
        expectToBePromise(analyzePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        naturalLanguageUnderstanding.analyze(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['features'];

        let err;
        try {
          await naturalLanguageUnderstanding.analyze({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['features'];

        const analyzePromise = naturalLanguageUnderstanding.analyze();
        expectToBePromise(analyzePromise);

        analyzePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listModels', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        naturalLanguageUnderstanding.listModels(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstanding.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const listModelsPromise = naturalLanguageUnderstanding.listModels(params);
        expectToBePromise(listModelsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        naturalLanguageUnderstanding.listModels({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await naturalLanguageUnderstanding.listModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('deleteModel', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        naturalLanguageUnderstanding.deleteModel(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['model_id']).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'fake_modelId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstanding.deleteModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        // invoke method
        const deleteModelPromise = naturalLanguageUnderstanding.deleteModel(params);
        expectToBePromise(deleteModelPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        naturalLanguageUnderstanding.deleteModel(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        let err;
        try {
          await naturalLanguageUnderstanding.deleteModel({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        const deleteModelPromise = naturalLanguageUnderstanding.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
});
