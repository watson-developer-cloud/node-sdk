/**
 * (C) Copyright IBM Corp. 2018, 2020.
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

const { NoAuthAuthenticator, unitTestUtils } = require('ibm-cloud-sdk-core');
const NaturalLanguageUnderstandingV1 = require('../../dist/natural-language-understanding/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com',
  version: '2018-10-18',
};

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(service);
const createRequestMock = jest.spyOn(naturalLanguageUnderstanding, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('NaturalLanguageUnderstandingV1', () => {
  describe('analyze', () => {
    describe('positive tests', () => {
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

        const analyzeResult = naturalLanguageUnderstanding.analyze(params);

        // all methods should return a Promise
        expectToBePromise(analyzeResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['features'];

        let err;
        try {
          await naturalLanguageUnderstanding.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['features'];

        const analyzePromise = naturalLanguageUnderstanding.analyze();
        expectToBePromise(analyzePromise);

        analyzePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listModelsResult = naturalLanguageUnderstanding.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

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

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        naturalLanguageUnderstanding.listModels({});
        checkForSuccessfulExecution(createRequestMock);
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        const deleteModelResult = naturalLanguageUnderstanding.deleteModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteModelResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        let err;
        try {
          await naturalLanguageUnderstanding.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        const deleteModelPromise = naturalLanguageUnderstanding.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
