/**
 * (C) Copyright IBM Corp. 2022.
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

      test('should pass the right params to createRequest', () => {
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const analyzePromise = naturalLanguageUnderstandingService.analyze();
        expectToBePromise(analyzePromise);

        analyzePromise.catch((err) => {
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

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
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

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteModelPromise = naturalLanguageUnderstandingService.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSentimentModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSentimentModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const params = {
          language: language,
          trainingData: trainingData,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const createSentimentModelResult = naturalLanguageUnderstandingService.createSentimentModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createSentimentModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSentimentModelPromise = naturalLanguageUnderstandingService.createSentimentModel();
        expectToBePromise(createSentimentModelPromise);

        createSentimentModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSentimentModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSentimentModels
        const params = {};

        const listSentimentModelsResult = naturalLanguageUnderstandingService.listSentimentModels(params);

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

        naturalLanguageUnderstandingService.listSentimentModels(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSentimentModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const getSentimentModelResult = naturalLanguageUnderstandingService.getSentimentModel(params);

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

        naturalLanguageUnderstandingService.getSentimentModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSentimentModelPromise = naturalLanguageUnderstandingService.getSentimentModel();
        expectToBePromise(getSentimentModelPromise);

        getSentimentModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSentimentModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSentimentModel
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const params = {
          modelId: modelId,
          language: language,
          trainingData: trainingData,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const updateSentimentModelResult = naturalLanguageUnderstandingService.updateSentimentModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateSentimentModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSentimentModelPromise = naturalLanguageUnderstandingService.updateSentimentModel();
        expectToBePromise(updateSentimentModelPromise);

        updateSentimentModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSentimentModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSentimentModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const deleteSentimentModelResult = naturalLanguageUnderstandingService.deleteSentimentModel(params);

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

        naturalLanguageUnderstandingService.deleteSentimentModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteSentimentModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSentimentModelPromise = naturalLanguageUnderstandingService.deleteSentimentModel();
        expectToBePromise(deleteSentimentModelPromise);

        deleteSentimentModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCategoriesModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCategoriesModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const params = {
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const createCategoriesModelResult = naturalLanguageUnderstandingService.createCategoriesModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createCategoriesModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createCategoriesModelPromise = naturalLanguageUnderstandingService.createCategoriesModel();
        expectToBePromise(createCategoriesModelPromise);

        createCategoriesModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCategoriesModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCategoriesModels
        const params = {};

        const listCategoriesModelsResult = naturalLanguageUnderstandingService.listCategoriesModels(params);

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

        naturalLanguageUnderstandingService.listCategoriesModels(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCategoriesModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const getCategoriesModelResult = naturalLanguageUnderstandingService.getCategoriesModel(params);

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

        naturalLanguageUnderstandingService.getCategoriesModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCategoriesModelPromise = naturalLanguageUnderstandingService.getCategoriesModel();
        expectToBePromise(getCategoriesModelPromise);

        getCategoriesModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCategoriesModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateCategoriesModelResult = naturalLanguageUnderstandingService.updateCategoriesModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateCategoriesModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateCategoriesModelPromise = naturalLanguageUnderstandingService.updateCategoriesModel();
        expectToBePromise(updateCategoriesModelPromise);

        updateCategoriesModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCategoriesModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCategoriesModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const deleteCategoriesModelResult = naturalLanguageUnderstandingService.deleteCategoriesModel(params);

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

        naturalLanguageUnderstandingService.deleteCategoriesModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteCategoriesModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCategoriesModelPromise = naturalLanguageUnderstandingService.deleteCategoriesModel();
        expectToBePromise(deleteCategoriesModelPromise);

        deleteCategoriesModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createClassificationsModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createClassificationsModel
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const trainingDataContentType = 'json';
        const name = 'testString';
        const description = 'testString';
        const modelVersion = 'testString';
        const workspaceId = 'testString';
        const versionDescription = 'testString';
        const params = {
          language: language,
          trainingData: trainingData,
          trainingDataContentType: trainingDataContentType,
          name: name,
          description: description,
          modelVersion: modelVersion,
          workspaceId: workspaceId,
          versionDescription: versionDescription,
        };

        const createClassificationsModelResult = naturalLanguageUnderstandingService.createClassificationsModel(params);

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
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.createClassificationsModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.createClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createClassificationsModelPromise = naturalLanguageUnderstandingService.createClassificationsModel();
        expectToBePromise(createClassificationsModelPromise);

        createClassificationsModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listClassificationsModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listClassificationsModels
        const params = {};

        const listClassificationsModelsResult = naturalLanguageUnderstandingService.listClassificationsModels(params);

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

        naturalLanguageUnderstandingService.listClassificationsModels(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getClassificationsModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const getClassificationsModelResult = naturalLanguageUnderstandingService.getClassificationsModel(params);

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

        naturalLanguageUnderstandingService.getClassificationsModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.getClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getClassificationsModelPromise = naturalLanguageUnderstandingService.getClassificationsModel();
        expectToBePromise(getClassificationsModelPromise);

        getClassificationsModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateClassificationsModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateClassificationsModelResult = naturalLanguageUnderstandingService.updateClassificationsModel(params);

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
        expect(mockRequestOptions.qs.version).toEqual(naturalLanguageUnderstandingServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const language = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          language,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageUnderstandingService.updateClassificationsModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.updateClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateClassificationsModelPromise = naturalLanguageUnderstandingService.updateClassificationsModel();
        expectToBePromise(updateClassificationsModelPromise);

        updateClassificationsModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteClassificationsModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteClassificationsModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const deleteClassificationsModelResult = naturalLanguageUnderstandingService.deleteClassificationsModel(params);

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

        naturalLanguageUnderstandingService.deleteClassificationsModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageUnderstandingService.deleteClassificationsModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteClassificationsModelPromise = naturalLanguageUnderstandingService.deleteClassificationsModel();
        expectToBePromise(deleteClassificationsModelPromise);

        deleteClassificationsModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
