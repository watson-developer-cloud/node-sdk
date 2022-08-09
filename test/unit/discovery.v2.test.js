/**
 * (C) Copyright IBM Corp. 2019, 2022.
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

const DiscoveryV2 = require('../../dist/discovery/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const discoveryServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  version: 'testString',
};

const discoveryService = new DiscoveryV2(discoveryServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(discoveryService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('DiscoveryV2', () => {

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

      const testInstance = new DiscoveryV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DiscoveryV2.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV2(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV2(options);

      expect(testInstance.baseOptions.serviceName).toBe(DiscoveryV2.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV2(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new DiscoveryV2(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DiscoveryV2(discoveryServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(discoveryServiceOptions.version);
      });
    });
  });

  describe('listProjects', () => {
    describe('positive tests', () => {
      function __listProjectsTest() {
        // Construct the params object for operation listProjects
        const listProjectsParams = {};

        const listProjectsResult = discoveryService.listProjects(listProjectsParams);

        // all methods should return a Promise
        expectToBePromise(listProjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listProjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listProjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProjectsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listProjects(listProjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.listProjects({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createProject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DefaultQueryParamsPassages
      const defaultQueryParamsPassagesModel = {
        enabled: true,
        count: 38,
        fields: ['testString'],
        characters: 38,
        per_document: true,
        max_per_document: 38,
      };

      // DefaultQueryParamsTableResults
      const defaultQueryParamsTableResultsModel = {
        enabled: true,
        count: 38,
        per_document: 38,
      };

      // DefaultQueryParamsSuggestedRefinements
      const defaultQueryParamsSuggestedRefinementsModel = {
        enabled: true,
        count: 38,
      };

      // DefaultQueryParams
      const defaultQueryParamsModel = {
        collection_ids: ['testString'],
        passages: defaultQueryParamsPassagesModel,
        table_results: defaultQueryParamsTableResultsModel,
        aggregation: 'testString',
        suggested_refinements: defaultQueryParamsSuggestedRefinementsModel,
        spelling_suggestions: true,
        highlight: true,
        count: 38,
        sort: 'testString',
        return: ['testString'],
      };

      function __createProjectTest() {
        // Construct the params object for operation createProject
        const name = 'testString';
        const type = 'document_retrieval';
        const defaultQueryParameters = defaultQueryParamsModel;
        const createProjectParams = {
          name: name,
          type: type,
          defaultQueryParameters: defaultQueryParameters,
        };

        const createProjectResult = discoveryService.createProject(createProjectParams);

        // all methods should return a Promise
        expectToBePromise(createProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.default_query_parameters).toEqual(defaultQueryParameters);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const type = 'document_retrieval';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectParams = {
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createProject(createProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProject', () => {
    describe('positive tests', () => {
      function __getProjectTest() {
        // Construct the params object for operation getProject
        const projectId = 'testString';
        const getProjectParams = {
          projectId: projectId,
        };

        const getProjectResult = discoveryService.getProject(getProjectParams);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getProject(getProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateProject', () => {
    describe('positive tests', () => {
      function __updateProjectTest() {
        // Construct the params object for operation updateProject
        const projectId = 'testString';
        const name = 'testString';
        const updateProjectParams = {
          projectId: projectId,
          name: name,
        };

        const updateProjectResult = discoveryService.updateProject(updateProjectParams);

        // all methods should return a Promise
        expectToBePromise(updateProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProjectParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateProject(updateProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProject', () => {
    describe('positive tests', () => {
      function __deleteProjectTest() {
        // Construct the params object for operation deleteProject
        const projectId = 'testString';
        const deleteProjectParams = {
          projectId: projectId,
        };

        const deleteProjectResult = discoveryService.deleteProject(deleteProjectParams);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteProject(deleteProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listFields', () => {
    describe('positive tests', () => {
      function __listFieldsTest() {
        // Construct the params object for operation listFields
        const projectId = 'testString';
        const collectionIds = ['testString'];
        const listFieldsParams = {
          projectId: projectId,
          collectionIds: collectionIds,
        };

        const listFieldsResult = discoveryService.listFields(listFieldsParams);

        // all methods should return a Promise
        expectToBePromise(listFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listFieldsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listFieldsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listFieldsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listFieldsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listFields(listFieldsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listFields();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCollections', () => {
    describe('positive tests', () => {
      function __listCollectionsTest() {
        // Construct the params object for operation listCollections
        const projectId = 'testString';
        const listCollectionsParams = {
          projectId: projectId,
        };

        const listCollectionsResult = discoveryService.listCollections(listCollectionsParams);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCollectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listCollectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listCollectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCollectionsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollections(listCollectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listCollections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listCollections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCollection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionEnrichment
      const collectionEnrichmentModel = {
        enrichment_id: 'testString',
        fields: ['testString'],
      };

      // CollectionDetailsSmartDocumentUnderstanding
      const collectionDetailsSmartDocumentUnderstandingModel = {
        enabled: true,
        model: 'custom',
      };

      function __createCollectionTest() {
        // Construct the params object for operation createCollection
        const projectId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const language = 'en';
        const enrichments = [collectionEnrichmentModel];
        const smartDocumentUnderstanding = collectionDetailsSmartDocumentUnderstandingModel;
        const createCollectionParams = {
          projectId: projectId,
          name: name,
          description: description,
          language: language,
          enrichments: enrichments,
          smartDocumentUnderstanding: smartDocumentUnderstanding,
        };

        const createCollectionResult = discoveryService.createCollection(createCollectionParams);

        // all methods should return a Promise
        expectToBePromise(createCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.enrichments).toEqual(enrichments);
        expect(mockRequestOptions.body.smart_document_understanding).toEqual(smartDocumentUnderstanding);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCollectionParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCollection(createCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCollection', () => {
    describe('positive tests', () => {
      function __getCollectionTest() {
        // Construct the params object for operation getCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const getCollectionParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const getCollectionResult = discoveryService.getCollection(getCollectionParams);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCollectionParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCollection(getCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCollection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionEnrichment
      const collectionEnrichmentModel = {
        enrichment_id: 'testString',
        fields: ['testString'],
      };

      function __updateCollectionTest() {
        // Construct the params object for operation updateCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const enrichments = [collectionEnrichmentModel];
        const updateCollectionParams = {
          projectId: projectId,
          collectionId: collectionId,
          name: name,
          description: description,
          enrichments: enrichments,
        };

        const updateCollectionResult = discoveryService.updateCollection(updateCollectionParams);

        // all methods should return a Promise
        expectToBePromise(updateCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enrichments).toEqual(enrichments);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCollectionParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCollection(updateCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCollection', () => {
    describe('positive tests', () => {
      function __deleteCollectionTest() {
        // Construct the params object for operation deleteCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const deleteCollectionParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const deleteCollectionResult = discoveryService.deleteCollection(deleteCollectionParams);

        // all methods should return a Promise
        expectToBePromise(deleteCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCollectionParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCollection(deleteCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDocuments', () => {
    describe('positive tests', () => {
      function __listDocumentsTest() {
        // Construct the params object for operation listDocuments
        const projectId = 'testString';
        const collectionId = 'testString';
        const count = 38;
        const status = 'testString';
        const hasNotices = true;
        const isParent = true;
        const parentDocumentId = 'testString';
        const sha256 = 'testString';
        const listDocumentsParams = {
          projectId: projectId,
          collectionId: collectionId,
          count: count,
          status: status,
          hasNotices: hasNotices,
          isParent: isParent,
          parentDocumentId: parentDocumentId,
          sha256: sha256,
        };

        const listDocumentsResult = discoveryService.listDocuments(listDocumentsParams);

        // all methods should return a Promise
        expectToBePromise(listDocumentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/documents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.has_notices).toEqual(hasNotices);
        expect(mockRequestOptions.qs.is_parent).toEqual(isParent);
        expect(mockRequestOptions.qs.parent_document_id).toEqual(parentDocumentId);
        expect(mockRequestOptions.qs.sha256).toEqual(sha256);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDocumentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listDocumentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listDocumentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDocumentsParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listDocuments(listDocumentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listDocuments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listDocuments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addDocument', () => {
    describe('positive tests', () => {
      function __addDocumentTest() {
        // Construct the params object for operation addDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const xWatsonDiscoveryForce = false;
        const addDocumentParams = {
          projectId: projectId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const addDocumentResult = discoveryService.addDocument(addDocumentParams);

        // all methods should return a Promise
        expectToBePromise(addDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/documents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __addDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __addDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addDocumentParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addDocument(addDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.addDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.addDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocument', () => {
    describe('positive tests', () => {
      function __getDocumentTest() {
        // Construct the params object for operation getDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const getDocumentParams = {
          projectId: projectId,
          collectionId: collectionId,
          documentId: documentId,
        };

        const getDocumentResult = discoveryService.getDocument(getDocumentParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentParams = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getDocument(getDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDocument', () => {
    describe('positive tests', () => {
      function __updateDocumentTest() {
        // Construct the params object for operation updateDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const xWatsonDiscoveryForce = false;
        const updateDocumentParams = {
          projectId: projectId,
          collectionId: collectionId,
          documentId: documentId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const updateDocumentResult = discoveryService.updateDocument(updateDocumentParams);

        // all methods should return a Promise
        expectToBePromise(updateDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDocumentParams = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocument(updateDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocument', () => {
    describe('positive tests', () => {
      function __deleteDocumentTest() {
        // Construct the params object for operation deleteDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const xWatsonDiscoveryForce = false;
        const deleteDocumentParams = {
          projectId: projectId,
          collectionId: collectionId,
          documentId: documentId,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const deleteDocumentResult = discoveryService.deleteDocument(deleteDocumentParams);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentParams = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocument(deleteDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('query', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // QueryLargeTableResults
      const queryLargeTableResultsModel = {
        enabled: true,
        count: 38,
      };

      // QueryLargeSuggestedRefinements
      const queryLargeSuggestedRefinementsModel = {
        enabled: true,
        count: 1,
      };

      // QueryLargePassages
      const queryLargePassagesModel = {
        enabled: true,
        per_document: true,
        max_per_document: 38,
        fields: ['testString'],
        count: 400,
        characters: 50,
        find_answers: false,
        max_answers_per_passage: 38,
      };

      // QueryLargeSimilar
      const queryLargeSimilarModel = {
        enabled: false,
        document_ids: ['testString'],
        fields: ['testString'],
      };

      function __queryTest() {
        // Construct the params object for operation query
        const projectId = 'testString';
        const collectionIds = ['testString'];
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const aggregation = 'testString';
        const count = 38;
        const _return = ['testString'];
        const offset = 38;
        const sort = 'testString';
        const highlight = true;
        const spellingSuggestions = true;
        const tableResults = queryLargeTableResultsModel;
        const suggestedRefinements = queryLargeSuggestedRefinementsModel;
        const passages = queryLargePassagesModel;
        const similar = queryLargeSimilarModel;
        const queryParams = {
          projectId: projectId,
          collectionIds: collectionIds,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          aggregation: aggregation,
          count: count,
          _return: _return,
          offset: offset,
          sort: sort,
          highlight: highlight,
          spellingSuggestions: spellingSuggestions,
          tableResults: tableResults,
          suggestedRefinements: suggestedRefinements,
          passages: passages,
          similar: similar,
        };

        const queryResult = discoveryService.query(queryParams);

        // all methods should return a Promise
        expectToBePromise(queryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.aggregation).toEqual(aggregation);
        expect(mockRequestOptions.body.count).toEqual(count);
        expect(mockRequestOptions.body.return).toEqual(_return);
        expect(mockRequestOptions.body.offset).toEqual(offset);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.highlight).toEqual(highlight);
        expect(mockRequestOptions.body.spelling_suggestions).toEqual(spellingSuggestions);
        expect(mockRequestOptions.body.table_results).toEqual(tableResults);
        expect(mockRequestOptions.body.suggested_refinements).toEqual(suggestedRefinements);
        expect(mockRequestOptions.body.passages).toEqual(passages);
        expect(mockRequestOptions.body.similar).toEqual(similar);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.query(queryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.query({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.query();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAutocompletion', () => {
    describe('positive tests', () => {
      function __getAutocompletionTest() {
        // Construct the params object for operation getAutocompletion
        const projectId = 'testString';
        const prefix = 'testString';
        const collectionIds = ['testString'];
        const field = 'testString';
        const count = 38;
        const getAutocompletionParams = {
          projectId: projectId,
          prefix: prefix,
          collectionIds: collectionIds,
          field: field,
          count: count,
        };

        const getAutocompletionResult = discoveryService.getAutocompletion(getAutocompletionParams);

        // all methods should return a Promise
        expectToBePromise(getAutocompletionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/autocompletion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.prefix).toEqual(prefix);
        expect(mockRequestOptions.qs.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.qs.field).toEqual(field);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAutocompletionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getAutocompletionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getAutocompletionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const prefix = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAutocompletionParams = {
          projectId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getAutocompletion(getAutocompletionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getAutocompletion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('queryCollectionNotices', () => {
    describe('positive tests', () => {
      function __queryCollectionNoticesTest() {
        // Construct the params object for operation queryCollectionNotices
        const projectId = 'testString';
        const collectionId = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const count = 38;
        const offset = 38;
        const queryCollectionNoticesParams = {
          projectId: projectId,
          collectionId: collectionId,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          count: count,
          offset: offset,
        };

        const queryCollectionNoticesResult = discoveryService.queryCollectionNotices(queryCollectionNoticesParams);

        // all methods should return a Promise
        expectToBePromise(queryCollectionNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryCollectionNoticesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryCollectionNoticesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryCollectionNoticesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryCollectionNoticesParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryCollectionNotices(queryCollectionNoticesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.queryCollectionNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.queryCollectionNotices();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('queryNotices', () => {
    describe('positive tests', () => {
      function __queryNoticesTest() {
        // Construct the params object for operation queryNotices
        const projectId = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const count = 38;
        const offset = 38;
        const queryNoticesParams = {
          projectId: projectId,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          count: count,
          offset: offset,
        };

        const queryNoticesResult = discoveryService.queryNotices(queryNoticesParams);

        // all methods should return a Promise
        expectToBePromise(queryNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryNoticesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryNoticesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryNoticesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryNoticesParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryNotices(queryNoticesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.queryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.queryNotices();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getStopwordList', () => {
    describe('positive tests', () => {
      function __getStopwordListTest() {
        // Construct the params object for operation getStopwordList
        const projectId = 'testString';
        const collectionId = 'testString';
        const getStopwordListParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const getStopwordListResult = discoveryService.getStopwordList(getStopwordListParams);

        // all methods should return a Promise
        expectToBePromise(getStopwordListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/stopwords', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getStopwordListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getStopwordListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getStopwordListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getStopwordListParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getStopwordList(getStopwordListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getStopwordList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createStopwordList', () => {
    describe('positive tests', () => {
      function __createStopwordListTest() {
        // Construct the params object for operation createStopwordList
        const projectId = 'testString';
        const collectionId = 'testString';
        const stopwords = ['testString'];
        const createStopwordListParams = {
          projectId: projectId,
          collectionId: collectionId,
          stopwords: stopwords,
        };

        const createStopwordListResult = discoveryService.createStopwordList(createStopwordListParams);

        // all methods should return a Promise
        expectToBePromise(createStopwordListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/stopwords', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.stopwords).toEqual(stopwords);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createStopwordListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createStopwordListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createStopwordListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createStopwordListParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createStopwordList(createStopwordListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createStopwordList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteStopwordList', () => {
    describe('positive tests', () => {
      function __deleteStopwordListTest() {
        // Construct the params object for operation deleteStopwordList
        const projectId = 'testString';
        const collectionId = 'testString';
        const deleteStopwordListParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const deleteStopwordListResult = discoveryService.deleteStopwordList(deleteStopwordListParams);

        // all methods should return a Promise
        expectToBePromise(deleteStopwordListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/stopwords', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteStopwordListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteStopwordListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteStopwordListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteStopwordListParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteStopwordList(deleteStopwordListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteStopwordList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listExpansions', () => {
    describe('positive tests', () => {
      function __listExpansionsTest() {
        // Construct the params object for operation listExpansions
        const projectId = 'testString';
        const collectionId = 'testString';
        const listExpansionsParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const listExpansionsResult = discoveryService.listExpansions(listExpansionsParams);

        // all methods should return a Promise
        expectToBePromise(listExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/expansions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listExpansionsParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listExpansions(listExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createExpansions', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Expansion
      const expansionModel = {
        input_terms: ['testString'],
        expanded_terms: ['testString'],
      };

      function __createExpansionsTest() {
        // Construct the params object for operation createExpansions
        const projectId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const createExpansionsParams = {
          projectId: projectId,
          collectionId: collectionId,
          expansions: expansions,
        };

        const createExpansionsResult = discoveryService.createExpansions(createExpansionsParams);

        // all methods should return a Promise
        expectToBePromise(createExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/expansions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.expansions).toEqual(expansions);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createExpansionsParams = {
          projectId,
          collectionId,
          expansions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createExpansions(createExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteExpansions', () => {
    describe('positive tests', () => {
      function __deleteExpansionsTest() {
        // Construct the params object for operation deleteExpansions
        const projectId = 'testString';
        const collectionId = 'testString';
        const deleteExpansionsParams = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const deleteExpansionsResult = discoveryService.deleteExpansions(deleteExpansionsParams);

        // all methods should return a Promise
        expectToBePromise(deleteExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/expansions', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteExpansionsParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteExpansions(deleteExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getComponentSettings', () => {
    describe('positive tests', () => {
      function __getComponentSettingsTest() {
        // Construct the params object for operation getComponentSettings
        const projectId = 'testString';
        const getComponentSettingsParams = {
          projectId: projectId,
        };

        const getComponentSettingsResult = discoveryService.getComponentSettings(getComponentSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getComponentSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/component_settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getComponentSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getComponentSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getComponentSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getComponentSettingsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getComponentSettings(getComponentSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getComponentSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getComponentSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTrainingQueries', () => {
    describe('positive tests', () => {
      function __listTrainingQueriesTest() {
        // Construct the params object for operation listTrainingQueries
        const projectId = 'testString';
        const listTrainingQueriesParams = {
          projectId: projectId,
        };

        const listTrainingQueriesResult = discoveryService.listTrainingQueries(listTrainingQueriesParams);

        // all methods should return a Promise
        expectToBePromise(listTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTrainingQueriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listTrainingQueriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listTrainingQueriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTrainingQueriesParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingQueries(listTrainingQueriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listTrainingQueries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTrainingQueries', () => {
    describe('positive tests', () => {
      function __deleteTrainingQueriesTest() {
        // Construct the params object for operation deleteTrainingQueries
        const projectId = 'testString';
        const deleteTrainingQueriesParams = {
          projectId: projectId,
        };

        const deleteTrainingQueriesResult = discoveryService.deleteTrainingQueries(deleteTrainingQueriesParams);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTrainingQueriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteTrainingQueriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteTrainingQueriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTrainingQueriesParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingQueries(deleteTrainingQueriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingQueries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTrainingQuery', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TrainingExample
      const trainingExampleModel = {
        document_id: 'testString',
        collection_id: 'testString',
        relevance: 38,
      };

      function __createTrainingQueryTest() {
        // Construct the params object for operation createTrainingQuery
        const projectId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const filter = 'testString';
        const createTrainingQueryParams = {
          projectId: projectId,
          naturalLanguageQuery: naturalLanguageQuery,
          examples: examples,
          filter: filter,
        };

        const createTrainingQueryResult = discoveryService.createTrainingQuery(createTrainingQueryParams);

        // all methods should return a Promise
        expectToBePromise(createTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.examples).toEqual(examples);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTrainingQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createTrainingQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createTrainingQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTrainingQueryParams = {
          projectId,
          naturalLanguageQuery,
          examples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTrainingQuery(createTrainingQueryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createTrainingQuery();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTrainingQuery', () => {
    describe('positive tests', () => {
      function __getTrainingQueryTest() {
        // Construct the params object for operation getTrainingQuery
        const projectId = 'testString';
        const queryId = 'testString';
        const getTrainingQueryParams = {
          projectId: projectId,
          queryId: queryId,
        };

        const getTrainingQueryResult = discoveryService.getTrainingQuery(getTrainingQueryParams);

        // all methods should return a Promise
        expectToBePromise(getTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries/{query_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTrainingQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getTrainingQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getTrainingQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTrainingQueryParams = {
          projectId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingQuery(getTrainingQueryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getTrainingQuery();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTrainingQuery', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TrainingExample
      const trainingExampleModel = {
        document_id: 'testString',
        collection_id: 'testString',
        relevance: 38,
      };

      function __updateTrainingQueryTest() {
        // Construct the params object for operation updateTrainingQuery
        const projectId = 'testString';
        const queryId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const filter = 'testString';
        const updateTrainingQueryParams = {
          projectId: projectId,
          queryId: queryId,
          naturalLanguageQuery: naturalLanguageQuery,
          examples: examples,
          filter: filter,
        };

        const updateTrainingQueryResult = discoveryService.updateTrainingQuery(updateTrainingQueryParams);

        // all methods should return a Promise
        expectToBePromise(updateTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries/{query_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.examples).toEqual(examples);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTrainingQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateTrainingQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateTrainingQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const queryId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTrainingQueryParams = {
          projectId,
          queryId,
          naturalLanguageQuery,
          examples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateTrainingQuery(updateTrainingQueryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateTrainingQuery();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTrainingQuery', () => {
    describe('positive tests', () => {
      function __deleteTrainingQueryTest() {
        // Construct the params object for operation deleteTrainingQuery
        const projectId = 'testString';
        const queryId = 'testString';
        const deleteTrainingQueryParams = {
          projectId: projectId,
          queryId: queryId,
        };

        const deleteTrainingQueryResult = discoveryService.deleteTrainingQuery(deleteTrainingQueryParams);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/training_data/queries/{query_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTrainingQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteTrainingQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteTrainingQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTrainingQueryParams = {
          projectId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingQuery(deleteTrainingQueryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingQuery();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEnrichments', () => {
    describe('positive tests', () => {
      function __listEnrichmentsTest() {
        // Construct the params object for operation listEnrichments
        const projectId = 'testString';
        const listEnrichmentsParams = {
          projectId: projectId,
        };

        const listEnrichmentsResult = discoveryService.listEnrichments(listEnrichmentsParams);

        // all methods should return a Promise
        expectToBePromise(listEnrichmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/enrichments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnrichmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listEnrichmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listEnrichmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnrichmentsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listEnrichments(listEnrichmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listEnrichments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listEnrichments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEnrichment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnrichmentOptions
      const enrichmentOptionsModel = {
        languages: ['testString'],
        entity_type: 'testString',
        regular_expression: 'testString',
        result_field: 'testString',
        classifier_id: 'testString',
        model_id: 'testString',
        confidence_threshold: 0,
        top_k: 38,
      };

      // CreateEnrichment
      const createEnrichmentModel = {
        name: 'testString',
        description: 'testString',
        type: 'classifier',
        options: enrichmentOptionsModel,
      };

      function __createEnrichmentTest() {
        // Construct the params object for operation createEnrichment
        const projectId = 'testString';
        const enrichment = createEnrichmentModel;
        const file = Buffer.from('This is a mock file.');
        const createEnrichmentParams = {
          projectId: projectId,
          enrichment: enrichment,
          file: file,
        };

        const createEnrichmentResult = discoveryService.createEnrichment(createEnrichmentParams);

        // all methods should return a Promise
        expectToBePromise(createEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/enrichments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.enrichment).toEqual(enrichment);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.contentType).toEqual('application/octet-stream');
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEnrichmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createEnrichmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createEnrichmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichment = createEnrichmentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEnrichmentParams = {
          projectId,
          enrichment,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEnrichment(createEnrichmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createEnrichment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getEnrichment', () => {
    describe('positive tests', () => {
      function __getEnrichmentTest() {
        // Construct the params object for operation getEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const getEnrichmentParams = {
          projectId: projectId,
          enrichmentId: enrichmentId,
        };

        const getEnrichmentResult = discoveryService.getEnrichment(getEnrichmentParams);

        // all methods should return a Promise
        expectToBePromise(getEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.enrichment_id).toEqual(enrichmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnrichmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getEnrichmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getEnrichmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnrichmentParams = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getEnrichment(getEnrichmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getEnrichment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEnrichment', () => {
    describe('positive tests', () => {
      function __updateEnrichmentTest() {
        // Construct the params object for operation updateEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateEnrichmentParams = {
          projectId: projectId,
          enrichmentId: enrichmentId,
          name: name,
          description: description,
        };

        const updateEnrichmentResult = discoveryService.updateEnrichment(updateEnrichmentParams);

        // all methods should return a Promise
        expectToBePromise(updateEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.enrichment_id).toEqual(enrichmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEnrichmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateEnrichmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateEnrichmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEnrichmentParams = {
          projectId,
          enrichmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateEnrichment(updateEnrichmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateEnrichment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEnrichment', () => {
    describe('positive tests', () => {
      function __deleteEnrichmentTest() {
        // Construct the params object for operation deleteEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const deleteEnrichmentParams = {
          projectId: projectId,
          enrichmentId: enrichmentId,
        };

        const deleteEnrichmentResult = discoveryService.deleteEnrichment(deleteEnrichmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.enrichment_id).toEqual(enrichmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEnrichmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteEnrichmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteEnrichmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEnrichmentParams = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteEnrichment(deleteEnrichmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteEnrichment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDocumentClassifiers', () => {
    describe('positive tests', () => {
      function __listDocumentClassifiersTest() {
        // Construct the params object for operation listDocumentClassifiers
        const projectId = 'testString';
        const listDocumentClassifiersParams = {
          projectId: projectId,
        };

        const listDocumentClassifiersResult = discoveryService.listDocumentClassifiers(listDocumentClassifiersParams);

        // all methods should return a Promise
        expectToBePromise(listDocumentClassifiersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDocumentClassifiersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listDocumentClassifiersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listDocumentClassifiersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDocumentClassifiersParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listDocumentClassifiers(listDocumentClassifiersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listDocumentClassifiers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listDocumentClassifiers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDocumentClassifier', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DocumentClassifierEnrichment
      const documentClassifierEnrichmentModel = {
        enrichment_id: 'testString',
        fields: ['testString'],
      };

      // ClassifierFederatedModel
      const classifierFederatedModelModel = {
        field: 'testString',
      };

      // CreateDocumentClassifier
      const createDocumentClassifierModel = {
        name: 'testString',
        description: 'testString',
        language: 'en',
        answer_field: 'testString',
        enrichments: [documentClassifierEnrichmentModel],
        federated_classification: classifierFederatedModelModel,
      };

      function __createDocumentClassifierTest() {
        // Construct the params object for operation createDocumentClassifier
        const projectId = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const classifier = createDocumentClassifierModel;
        const testData = Buffer.from('This is a mock file.');
        const createDocumentClassifierParams = {
          projectId: projectId,
          trainingData: trainingData,
          classifier: classifier,
          testData: testData,
        };

        const createDocumentClassifierResult = discoveryService.createDocumentClassifier(createDocumentClassifierParams);

        // all methods should return a Promise
        expectToBePromise(createDocumentClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.formData.classifier).toEqual(classifier);
        expect(mockRequestOptions.formData.test_data.data).toEqual(testData);
        expect(mockRequestOptions.formData.test_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDocumentClassifierTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createDocumentClassifierTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createDocumentClassifierTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const trainingData = Buffer.from('This is a mock file.');
        const classifier = createDocumentClassifierModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDocumentClassifierParams = {
          projectId,
          trainingData,
          classifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createDocumentClassifier(createDocumentClassifierParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createDocumentClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createDocumentClassifier();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentClassifier', () => {
    describe('positive tests', () => {
      function __getDocumentClassifierTest() {
        // Construct the params object for operation getDocumentClassifier
        const projectId = 'testString';
        const classifierId = 'testString';
        const getDocumentClassifierParams = {
          projectId: projectId,
          classifierId: classifierId,
        };

        const getDocumentClassifierResult = discoveryService.getDocumentClassifier(getDocumentClassifierParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentClassifierTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getDocumentClassifierTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getDocumentClassifierTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentClassifierParams = {
          projectId,
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getDocumentClassifier(getDocumentClassifierParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getDocumentClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getDocumentClassifier();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDocumentClassifier', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UpdateDocumentClassifier
      const updateDocumentClassifierModel = {
        name: 'testString',
        description: 'testString',
      };

      function __updateDocumentClassifierTest() {
        // Construct the params object for operation updateDocumentClassifier
        const projectId = 'testString';
        const classifierId = 'testString';
        const classifier = updateDocumentClassifierModel;
        const trainingData = Buffer.from('This is a mock file.');
        const testData = Buffer.from('This is a mock file.');
        const updateDocumentClassifierParams = {
          projectId: projectId,
          classifierId: classifierId,
          classifier: classifier,
          trainingData: trainingData,
          testData: testData,
        };

        const updateDocumentClassifierResult = discoveryService.updateDocumentClassifier(updateDocumentClassifierParams);

        // all methods should return a Promise
        expectToBePromise(updateDocumentClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.classifier).toEqual(classifier);
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.formData.test_data.data).toEqual(testData);
        expect(mockRequestOptions.formData.test_data.contentType).toEqual('text/csv');
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDocumentClassifierTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateDocumentClassifierTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateDocumentClassifierTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const classifier = updateDocumentClassifierModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDocumentClassifierParams = {
          projectId,
          classifierId,
          classifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocumentClassifier(updateDocumentClassifierParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateDocumentClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateDocumentClassifier();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocumentClassifier', () => {
    describe('positive tests', () => {
      function __deleteDocumentClassifierTest() {
        // Construct the params object for operation deleteDocumentClassifier
        const projectId = 'testString';
        const classifierId = 'testString';
        const deleteDocumentClassifierParams = {
          projectId: projectId,
          classifierId: classifierId,
        };

        const deleteDocumentClassifierResult = discoveryService.deleteDocumentClassifier(deleteDocumentClassifierParams);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentClassifierTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteDocumentClassifierTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteDocumentClassifierTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentClassifierParams = {
          projectId,
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocumentClassifier(deleteDocumentClassifierParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteDocumentClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteDocumentClassifier();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDocumentClassifierModels', () => {
    describe('positive tests', () => {
      function __listDocumentClassifierModelsTest() {
        // Construct the params object for operation listDocumentClassifierModels
        const projectId = 'testString';
        const classifierId = 'testString';
        const listDocumentClassifierModelsParams = {
          projectId: projectId,
          classifierId: classifierId,
        };

        const listDocumentClassifierModelsResult = discoveryService.listDocumentClassifierModels(listDocumentClassifierModelsParams);

        // all methods should return a Promise
        expectToBePromise(listDocumentClassifierModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDocumentClassifierModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listDocumentClassifierModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listDocumentClassifierModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDocumentClassifierModelsParams = {
          projectId,
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listDocumentClassifierModels(listDocumentClassifierModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listDocumentClassifierModels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listDocumentClassifierModels();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDocumentClassifierModel', () => {
    describe('positive tests', () => {
      function __createDocumentClassifierModelTest() {
        // Construct the params object for operation createDocumentClassifierModel
        const projectId = 'testString';
        const classifierId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const learningRate = 0;
        const l1RegularizationStrengths = [1.0E-6];
        const l2RegularizationStrengths = [1.0E-6];
        const trainingMaxSteps = 0;
        const improvementRatio = 0;
        const createDocumentClassifierModelParams = {
          projectId: projectId,
          classifierId: classifierId,
          name: name,
          description: description,
          learningRate: learningRate,
          l1RegularizationStrengths: l1RegularizationStrengths,
          l2RegularizationStrengths: l2RegularizationStrengths,
          trainingMaxSteps: trainingMaxSteps,
          improvementRatio: improvementRatio,
        };

        const createDocumentClassifierModelResult = discoveryService.createDocumentClassifierModel(createDocumentClassifierModelParams);

        // all methods should return a Promise
        expectToBePromise(createDocumentClassifierModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.learning_rate).toEqual(learningRate);
        expect(mockRequestOptions.body.l1_regularization_strengths).toEqual(l1RegularizationStrengths);
        expect(mockRequestOptions.body.l2_regularization_strengths).toEqual(l2RegularizationStrengths);
        expect(mockRequestOptions.body.training_max_steps).toEqual(trainingMaxSteps);
        expect(mockRequestOptions.body.improvement_ratio).toEqual(improvementRatio);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDocumentClassifierModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createDocumentClassifierModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createDocumentClassifierModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDocumentClassifierModelParams = {
          projectId,
          classifierId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createDocumentClassifierModel(createDocumentClassifierModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createDocumentClassifierModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createDocumentClassifierModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentClassifierModel', () => {
    describe('positive tests', () => {
      function __getDocumentClassifierModelTest() {
        // Construct the params object for operation getDocumentClassifierModel
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const getDocumentClassifierModelParams = {
          projectId: projectId,
          classifierId: classifierId,
          modelId: modelId,
        };

        const getDocumentClassifierModelResult = discoveryService.getDocumentClassifierModel(getDocumentClassifierModelParams);

        // all methods should return a Promise
        expectToBePromise(getDocumentClassifierModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentClassifierModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getDocumentClassifierModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getDocumentClassifierModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentClassifierModelParams = {
          projectId,
          classifierId,
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getDocumentClassifierModel(getDocumentClassifierModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getDocumentClassifierModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getDocumentClassifierModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDocumentClassifierModel', () => {
    describe('positive tests', () => {
      function __updateDocumentClassifierModelTest() {
        // Construct the params object for operation updateDocumentClassifierModel
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateDocumentClassifierModelParams = {
          projectId: projectId,
          classifierId: classifierId,
          modelId: modelId,
          name: name,
          description: description,
        };

        const updateDocumentClassifierModelResult = discoveryService.updateDocumentClassifierModel(updateDocumentClassifierModelParams);

        // all methods should return a Promise
        expectToBePromise(updateDocumentClassifierModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDocumentClassifierModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateDocumentClassifierModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateDocumentClassifierModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDocumentClassifierModelParams = {
          projectId,
          classifierId,
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocumentClassifierModel(updateDocumentClassifierModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateDocumentClassifierModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateDocumentClassifierModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocumentClassifierModel', () => {
    describe('positive tests', () => {
      function __deleteDocumentClassifierModelTest() {
        // Construct the params object for operation deleteDocumentClassifierModel
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const deleteDocumentClassifierModelParams = {
          projectId: projectId,
          classifierId: classifierId,
          modelId: modelId,
        };

        const deleteDocumentClassifierModelResult = discoveryService.deleteDocumentClassifierModel(deleteDocumentClassifierModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentClassifierModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentClassifierModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteDocumentClassifierModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteDocumentClassifierModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const classifierId = 'testString';
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentClassifierModelParams = {
          projectId,
          classifierId,
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocumentClassifierModel(deleteDocumentClassifierModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteDocumentClassifierModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteDocumentClassifierModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('analyzeDocument', () => {
    describe('positive tests', () => {
      function __analyzeDocumentTest() {
        // Construct the params object for operation analyzeDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const analyzeDocumentParams = {
          projectId: projectId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const analyzeDocumentResult = discoveryService.analyzeDocument(analyzeDocumentParams);

        // all methods should return a Promise
        expectToBePromise(analyzeDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/projects/{project_id}/collections/{collection_id}/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __analyzeDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __analyzeDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __analyzeDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const analyzeDocumentParams = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.analyzeDocument(analyzeDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.analyzeDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.analyzeDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteUserData', () => {
    describe('positive tests', () => {
      function __deleteUserDataTest() {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const deleteUserDataParams = {
          customerId: customerId,
        };

        const deleteUserDataResult = discoveryService.deleteUserData(deleteUserDataParams);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteUserDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteUserDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteUserDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteUserDataParams = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteUserData(deleteUserDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteUserData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
