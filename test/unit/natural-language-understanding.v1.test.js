/**
 * (C) Copyright IBM Corp. 2018, 2022.
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

const naturalLanguageUnderstandingServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com',
  version: 'testString',
};

const naturalLanguageUnderstandingService = new NaturalLanguageUnderstandingV1(naturalLanguageUnderstandingServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(naturalLanguageUnderstandingService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('NaturalLanguageUnderstandingV1', () => {

  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      version: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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

      expect(testInstance.baseOptions.serviceUrl).toBe(NaturalLanguageUnderstandingV1.DEFAULT_SERVICE_URL);
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

      expect(testInstance.baseOptions.serviceName).toBe(NaturalLanguageUnderstandingV1.DEFAULT_SERVICE_NAME);
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
        const serviceObj = new NaturalLanguageUnderstandingV1(naturalLanguageUnderstandingServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      });
    });
  });

  describe('analyze', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ClassificationsOptions
      const classificationsOptionsModel = {
        model: 'testString',
      };

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
        mentions: false,
        model: 'testString',
        sentiment: false,
        emotion: false,
      };

      // KeywordsOptions
      const keywordsOptionsModel = {
        limit: 250,
        sentiment: false,
        emotion: false,
      };

      // RelationsOptions
      const relationsOptionsModel = {
        model: 'testString',
      };

      // SemanticRolesOptions
      const semanticRolesOptionsModel = {
        limit: 38,
        keywords: false,
        entities: false,
      };

      // SentimentOptions
      const sentimentOptionsModel = {
        document: true,
        targets: ['testString'],
        model: 'testString',
      };

      // SummarizationOptions
      const summarizationOptionsModel = {
        limit: 10,
      };

      // CategoriesOptions
      const categoriesOptionsModel = {
        explanation: false,
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
        classifications: classificationsOptionsModel,
        concepts: conceptsOptionsModel,
        emotion: emotionOptionsModel,
        entities: entitiesOptionsModel,
        keywords: keywordsOptionsModel,
        metadata: { 'key1': 'testString' },
        relations: relationsOptionsModel,
        semantic_roles: semanticRolesOptionsModel,
        sentiment: sentimentOptionsModel,
        summarization: summarizationOptionsModel,
        categories: categoriesOptionsModel,
        syntax: syntaxOptionsModel,
      };

      function __analyzeTest() {
        // Construct the params object for operation analyze
        const features = featuresModel;
        const text = 'testString';
        const html = 'testString';
        const url = 'testString';
        const clean = true;
        const xpath = 'testString';
        const fallbackToRaw = true;
        const returnAnalyzedText = false;
        const language = 'testString';
        const limitTextCharacters = 38;
        const analyzeParams = {
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

        const analyzeResult = naturalLanguageUnderstandingService.analyze(analyzeParams);

        // all methods should return a Promise
        expectToBePromise(analyzeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.body.html).toEqual(html);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.clean).toEqual(clean);
        expect(mockRequestOptions.body.xpath).toEqual(xpath);
        expect(mockRequestOptions.body.fallback_to_raw).toEqual(fallbackToRaw);
        expect(mockRequestOptions.body.return_analyzed_text).toEqual(returnAnalyzedText);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.limit_text_characters).toEqual(limitTextCharacters);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __analyzeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __analyzeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __analyzeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const features = featuresModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const analyzeParams = {
          features,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.analyze(analyzeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.analyze();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listModels', () => {
    describe('positive tests', () => {
      function __listModelsTest() {
        // Construct the params object for operation listModels
        const listModelsParams = {};

        const listModelsResult = naturalLanguageUnderstandingService.listModels(listModelsParams);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __listModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __listModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.listModels(listModelsParams);
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
      function __deleteModelTest() {
        // Construct the params object for operation deleteModel
        const modelId = 'testString';
        const deleteModelParams = {
          modelId: modelId,
        };

        const deleteModelResult = naturalLanguageUnderstandingService.deleteModel(deleteModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __deleteModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __deleteModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.deleteModel(deleteModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSentimentModel', () => {
    describe('positive tests', () => {
      function __createSentimentModelTest() {
        // Construct the params object for operation createSentimentModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const createSentimentModelParams = {
          language: language,
          trainingData: trainingData,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const createSentimentModelResult = naturalLanguageUnderstandingService.createSentimentModel(createSentimentModelParams);

        // all methods should return a Promise
        expectToBePromise(createSentimentModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/sentiment', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSentimentModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __createSentimentModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __createSentimentModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSentimentModelParams = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createSentimentModel(createSentimentModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createSentimentModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSentimentModels', () => {
    describe('positive tests', () => {
      function __listSentimentModelsTest() {
        // Construct the params object for operation listSentimentModels
        const listSentimentModelsParams = {};

        const listSentimentModelsResult = naturalLanguageUnderstandingService.listSentimentModels(listSentimentModelsParams);

        // all methods should return a Promise
        expectToBePromise(listSentimentModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/sentiment', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSentimentModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __listSentimentModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __listSentimentModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSentimentModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.listSentimentModels(listSentimentModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        naturalLanguageUnderstandingService.listSentimentModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getSentimentModel', () => {
    describe('positive tests', () => {
      function __getSentimentModelTest() {
        // Construct the params object for operation getSentimentModel
        const modelId = 'testString';
        const getSentimentModelParams = {
          modelId: modelId,
        };

        const getSentimentModelResult = naturalLanguageUnderstandingService.getSentimentModel(getSentimentModelParams);

        // all methods should return a Promise
        expectToBePromise(getSentimentModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/sentiment/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSentimentModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __getSentimentModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __getSentimentModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSentimentModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.getSentimentModel(getSentimentModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getSentimentModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSentimentModel', () => {
    describe('positive tests', () => {
      function __updateSentimentModelTest() {
        // Construct the params object for operation updateSentimentModel
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const updateSentimentModelParams = {
          modelId: modelId,
          language: language,
          trainingData: trainingData,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const updateSentimentModelResult = naturalLanguageUnderstandingService.updateSentimentModel(updateSentimentModelParams);

        // all methods should return a Promise
        expectToBePromise(updateSentimentModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/sentiment/{model_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSentimentModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __updateSentimentModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __updateSentimentModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSentimentModelParams = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateSentimentModel(updateSentimentModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateSentimentModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSentimentModel', () => {
    describe('positive tests', () => {
      function __deleteSentimentModelTest() {
        // Construct the params object for operation deleteSentimentModel
        const modelId = 'testString';
        const deleteSentimentModelParams = {
          modelId: modelId,
        };

        const deleteSentimentModelResult = naturalLanguageUnderstandingService.deleteSentimentModel(deleteSentimentModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteSentimentModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/sentiment/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSentimentModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __deleteSentimentModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __deleteSentimentModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSentimentModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.deleteSentimentModel(deleteSentimentModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteSentimentModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCategoriesModel', () => {
    describe('positive tests', () => {
      function __createCategoriesModelTest() {
        // Construct the params object for operation createCategoriesModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const createCategoriesModelParams = {
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const createCategoriesModelResult = naturalLanguageUnderstandingService.createCategoriesModel(createCategoriesModelParams);

        // all methods should return a Promise
        expectToBePromise(createCategoriesModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/categories', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual(trainingDataContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCategoriesModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __createCategoriesModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __createCategoriesModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCategoriesModelParams = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createCategoriesModel(createCategoriesModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createCategoriesModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCategoriesModels', () => {
    describe('positive tests', () => {
      function __listCategoriesModelsTest() {
        // Construct the params object for operation listCategoriesModels
        const listCategoriesModelsParams = {};

        const listCategoriesModelsResult = naturalLanguageUnderstandingService.listCategoriesModels(listCategoriesModelsParams);

        // all methods should return a Promise
        expectToBePromise(listCategoriesModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/categories', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCategoriesModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __listCategoriesModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __listCategoriesModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCategoriesModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.listCategoriesModels(listCategoriesModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        naturalLanguageUnderstandingService.listCategoriesModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCategoriesModel', () => {
    describe('positive tests', () => {
      function __getCategoriesModelTest() {
        // Construct the params object for operation getCategoriesModel
        const modelId = 'testString';
        const getCategoriesModelParams = {
          modelId: modelId,
        };

        const getCategoriesModelResult = naturalLanguageUnderstandingService.getCategoriesModel(getCategoriesModelParams);

        // all methods should return a Promise
        expectToBePromise(getCategoriesModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/categories/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCategoriesModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __getCategoriesModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __getCategoriesModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCategoriesModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.getCategoriesModel(getCategoriesModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getCategoriesModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCategoriesModel', () => {
    describe('positive tests', () => {
      function __updateCategoriesModelTest() {
        // Construct the params object for operation updateCategoriesModel
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const updateCategoriesModelParams = {
          modelId: modelId,
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const updateCategoriesModelResult = naturalLanguageUnderstandingService.updateCategoriesModel(updateCategoriesModelParams);

        // all methods should return a Promise
        expectToBePromise(updateCategoriesModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/categories/{model_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual(trainingDataContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCategoriesModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __updateCategoriesModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __updateCategoriesModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCategoriesModelParams = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateCategoriesModel(updateCategoriesModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateCategoriesModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCategoriesModel', () => {
    describe('positive tests', () => {
      function __deleteCategoriesModelTest() {
        // Construct the params object for operation deleteCategoriesModel
        const modelId = 'testString';
        const deleteCategoriesModelParams = {
          modelId: modelId,
        };

        const deleteCategoriesModelResult = naturalLanguageUnderstandingService.deleteCategoriesModel(deleteCategoriesModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteCategoriesModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/categories/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCategoriesModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __deleteCategoriesModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __deleteCategoriesModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCategoriesModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.deleteCategoriesModel(deleteCategoriesModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteCategoriesModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createClassificationsModel', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ClassificationsTrainingParameters
      const classificationsTrainingParametersModel = {
        model_type: 'single_label',
      };

      function __createClassificationsModelTest() {
        // Construct the params object for operation createClassificationsModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const trainingParameters = classificationsTrainingParametersModel;
        const createClassificationsModelParams = {
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
          trainingParameters: trainingParameters,
        };

        const createClassificationsModelResult = naturalLanguageUnderstandingService.createClassificationsModel(createClassificationsModelParams);

        // all methods should return a Promise
        expectToBePromise(createClassificationsModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/classifications', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual(trainingDataContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.formData.training_parameters).toEqual(trainingParameters);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createClassificationsModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __createClassificationsModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __createClassificationsModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createClassificationsModelParams = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createClassificationsModel(createClassificationsModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createClassificationsModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listClassificationsModels', () => {
    describe('positive tests', () => {
      function __listClassificationsModelsTest() {
        // Construct the params object for operation listClassificationsModels
        const listClassificationsModelsParams = {};

        const listClassificationsModelsResult = naturalLanguageUnderstandingService.listClassificationsModels(listClassificationsModelsParams);

        // all methods should return a Promise
        expectToBePromise(listClassificationsModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/classifications', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listClassificationsModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __listClassificationsModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __listClassificationsModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listClassificationsModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.listClassificationsModels(listClassificationsModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        naturalLanguageUnderstandingService.listClassificationsModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getClassificationsModel', () => {
    describe('positive tests', () => {
      function __getClassificationsModelTest() {
        // Construct the params object for operation getClassificationsModel
        const modelId = 'testString';
        const getClassificationsModelParams = {
          modelId: modelId,
        };

        const getClassificationsModelResult = naturalLanguageUnderstandingService.getClassificationsModel(getClassificationsModelParams);

        // all methods should return a Promise
        expectToBePromise(getClassificationsModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/classifications/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getClassificationsModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __getClassificationsModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __getClassificationsModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getClassificationsModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.getClassificationsModel(getClassificationsModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getClassificationsModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateClassificationsModel', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ClassificationsTrainingParameters
      const classificationsTrainingParametersModel = {
        model_type: 'single_label',
      };

      function __updateClassificationsModelTest() {
        // Construct the params object for operation updateClassificationsModel
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const trainingParameters = classificationsTrainingParametersModel;
        const updateClassificationsModelParams = {
          modelId: modelId,
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
          trainingParameters: trainingParameters,
        };

        const updateClassificationsModelResult = naturalLanguageUnderstandingService.updateClassificationsModel(updateClassificationsModelParams);

        // all methods should return a Promise
        expectToBePromise(updateClassificationsModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/classifications/{model_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.language).toEqual(language);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual(trainingDataContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.model_version).toEqual(modelVersion);
        expect(mockRequestOptions.formData.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.formData.version_description).toEqual(versionDescription);
        expect(mockRequestOptions.formData.training_parameters).toEqual(trainingParameters);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateClassificationsModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __updateClassificationsModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __updateClassificationsModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateClassificationsModelParams = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateClassificationsModel(updateClassificationsModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateClassificationsModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteClassificationsModel', () => {
    describe('positive tests', () => {
      function __deleteClassificationsModelTest() {
        // Construct the params object for operation deleteClassificationsModel
        const modelId = 'testString';
        const deleteClassificationsModelParams = {
          modelId: modelId,
        };

        const deleteClassificationsModelResult = naturalLanguageUnderstandingService.deleteClassificationsModel(deleteClassificationsModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteClassificationsModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/classifications/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteClassificationsModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.enableRetries();
        __deleteClassificationsModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        naturalLanguageUnderstandingService.disableRetries();
        __deleteClassificationsModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteClassificationsModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.deleteClassificationsModel(deleteClassificationsModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteClassificationsModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
