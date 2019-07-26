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
const NaturalLanguageUnderstandingV1 = require('../../natural-language-understanding/v1');
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
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url:
    'https://gateway.watsonplatform.net/natural-language-understanding/api/natural-language-understanding/api',
  version: '2018-10-18',
};

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(service);
const createRequestMock = jest.spyOn(naturalLanguageUnderstanding, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

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
      const fallback_to_raw = 'fake_fallback_to_raw';
      const return_analyzed_text = 'fake_return_analyzed_text';
      const language = 'fake_language';
      const limit_text_characters = 'fake_limit_text_characters';
      const params = {
        features,
        text,
        html,
        url,
        clean,
        xpath,
        fallback_to_raw,
        return_analyzed_text,
        language,
        limit_text_characters,
      };

      // invoke method
      naturalLanguageUnderstanding.analyze(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/analyze', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['features']).toEqual(features);
      expect(options.body['text']).toEqual(text);
      expect(options.body['html']).toEqual(html);
      expect(options.body['url']).toEqual(url);
      expect(options.body['clean']).toEqual(clean);
      expect(options.body['xpath']).toEqual(xpath);
      expect(options.body['fallback_to_raw']).toEqual(fallback_to_raw);
      expect(options.body['return_analyzed_text']).toEqual(return_analyzed_text);
      expect(options.body['language']).toEqual(language);
      expect(options.body['limit_text_characters']).toEqual(limit_text_characters);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const features = 'fake_features';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        features,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageUnderstanding.analyze(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      naturalLanguageUnderstanding.analyze(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['features'];

      naturalLanguageUnderstanding.analyze({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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

      // invoke method
      naturalLanguageUnderstanding.listModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageUnderstanding.listModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      naturalLanguageUnderstanding.listModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      naturalLanguageUnderstanding.listModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const model_id = 'fake_model_id';
      const params = {
        model_id,
      };

      // invoke method
      naturalLanguageUnderstanding.deleteModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models/{model_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const model_id = 'fake_model_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        model_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageUnderstanding.deleteModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const model_id = 'fake_model_id';
      const params = {
        model_id,
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
      naturalLanguageUnderstanding.deleteModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      naturalLanguageUnderstanding.deleteModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      const deleteModelPromise = naturalLanguageUnderstanding.deleteModel();
      expectToBePromise(deleteModelPromise);

      deleteModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
