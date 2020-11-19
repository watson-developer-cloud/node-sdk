/**
 * (C) Copyright IBM Corp. 2020.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

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
  version: 'testString',
};

const naturalLanguageUnderstandingService = new NaturalLanguageUnderstandingV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(naturalLanguageUnderstandingService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('NaturalLanguageUnderstandingV1', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new NaturalLanguageUnderstandingV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new NaturalLanguageUnderstandingV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        NaturalLanguageUnderstandingV1.DEFAULT_SERVICE_URL
      );
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new NaturalLanguageUnderstandingV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new NaturalLanguageUnderstandingV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(
        NaturalLanguageUnderstandingV1.DEFAULT_SERVICE_NAME
      );
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new NaturalLanguageUnderstandingV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new NaturalLanguageUnderstandingV1(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new NaturalLanguageUnderstandingV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('analyze', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConceptsOptions
      const conceptsOptionsModel = {
        limit: 50,
      };

      // EmotionOptions
      const emotionOptionsModel = {
        document: true,
        targets: ['testString'],
      };

      // EntitiesOptions
      const entitiesOptionsModel = {
        limit: 250,
        mentions: true,
        model: 'testString',
        sentiment: true,
        emotion: true,
      };

      // KeywordsOptions
      const keywordsOptionsModel = {
        limit: 250,
        sentiment: true,
        emotion: true,
      };

      // RelationsOptions
      const relationsOptionsModel = {
        model: 'testString',
      };

      // SemanticRolesOptions
      const semanticRolesOptionsModel = {
        limit: 38,
        keywords: true,
        entities: true,
      };

      // SentimentOptions
      const sentimentOptionsModel = {
        document: true,
        targets: ['testString'],
      };

      // CategoriesOptions
      const categoriesOptionsModel = {
        explanation: true,
        limit: 10,
        model: 'testString',
      };

      // SyntaxOptionsTokens
      const syntaxOptionsTokensModel = {
        lemma: true,
        part_of_speech: true,
      };

      // SyntaxOptions
      const syntaxOptionsModel = {
        tokens: syntaxOptionsTokensModel,
        sentences: true,
      };

      // Features
      const featuresModel = {
        concepts: conceptsOptionsModel,
        emotion: emotionOptionsModel,
        entities: entitiesOptionsModel,
        keywords: keywordsOptionsModel,
        metadata: { foo: 'bar' },
        relations: relationsOptionsModel,
        semantic_roles: semanticRolesOptionsModel,
        sentiment: sentimentOptionsModel,
        categories: categoriesOptionsModel,
        syntax: syntaxOptionsModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation analyze
        const features = featuresModel;
        const text = 'testString';
        const html = 'testString';
        const url = 'testString';
        const clean = true;
        const xpath = 'testString';
        const fallbackToRaw = true;
        const returnAnalyzedText = true;
        const language = 'testString';
        const limitTextCharacters = 38;
        const params = {
          features: features,
          text: text,
          html: html,
          url: url,
          clean: clean,
          xpath: xpath,
          fallbackToRaw: fallbackToRaw,
          returnAnalyzedText: returnAnalyzedText,
          language: language,
          limitTextCharacters: limitTextCharacters,
        };

        const analyzeResult = naturalLanguageUnderstandingService.analyze(params);

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
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const features = featuresModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          features,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.analyze(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await naturalLanguageUnderstandingService.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const analyzePromise = naturalLanguageUnderstandingService.analyze();
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
        // Construct the params object for operation listModels
        const params = {};

        const listModelsResult = naturalLanguageUnderstandingService.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        naturalLanguageUnderstandingService.listModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const deleteModelResult = naturalLanguageUnderstandingService.deleteModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['model_id']).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.deleteModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteModelPromise = naturalLanguageUnderstandingService.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
