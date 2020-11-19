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

const DiscoveryV2 = require('../../dist/discovery/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  version: 'testString',
};

const discoveryService = new DiscoveryV2(service);

// dont actually create a request
const createRequestMock = jest.spyOn(discoveryService, 'createRequest');
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

describe('DiscoveryV2', () => {
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
        const serviceObj = new DiscoveryV2(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('listCollections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCollections
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const listCollectionsResult = discoveryService.listCollections(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.listCollections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listCollectionsPromise = discoveryService.listCollections();
        expectToBePromise(listCollectionsPromise);

        listCollectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCollection
        const projectId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const language = 'testString';
        const enrichments = [collectionEnrichmentModel];
        const params = {
          projectId: projectId,
          name: name,
          description: description,
          language: language,
          enrichments: enrichments,
        };

        const createCollectionResult = discoveryService.createCollection(params);

        // all methods should return a Promise
        expectToBePromise(createCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['language']).toEqual(language);
        expect(options.body['enrichments']).toEqual(enrichments);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.createCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createCollectionPromise = discoveryService.createCollection();
        expectToBePromise(createCollectionPromise);

        createCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const params = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const getCollectionResult = discoveryService.getCollection(params);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCollectionPromise = discoveryService.getCollection();
        expectToBePromise(getCollectionPromise);

        getCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const enrichments = [collectionEnrichmentModel];
        const params = {
          projectId: projectId,
          collectionId: collectionId,
          name: name,
          description: description,
          enrichments: enrichments,
        };

        const updateCollectionResult = discoveryService.updateCollection(params);

        // all methods should return a Promise
        expectToBePromise(updateCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections/{collection_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['enrichments']).toEqual(enrichments);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateCollectionPromise = discoveryService.updateCollection();
        expectToBePromise(updateCollectionPromise);

        updateCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCollection
        const projectId = 'testString';
        const collectionId = 'testString';
        const params = {
          projectId: projectId,
          collectionId: collectionId,
        };

        const deleteCollectionResult = discoveryService.deleteCollection(params);

        // all methods should return a Promise
        expectToBePromise(deleteCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/collections/{collection_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCollectionPromise = discoveryService.deleteCollection();
        expectToBePromise(deleteCollectionPromise);

        deleteCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        count: 100,
        characters: 50,
      };

      test('should pass the right params to createRequest', () => {
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
        const params = {
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
        };

        const queryResult = discoveryService.query(params);

        // all methods should return a Promise
        expectToBePromise(queryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['collection_ids']).toEqual(collectionIds);
        expect(options.body['filter']).toEqual(filter);
        expect(options.body['query']).toEqual(query);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['aggregation']).toEqual(aggregation);
        expect(options.body['count']).toEqual(count);
        expect(options.body['return']).toEqual(_return);
        expect(options.body['offset']).toEqual(offset);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['highlight']).toEqual(highlight);
        expect(options.body['spelling_suggestions']).toEqual(spellingSuggestions);
        expect(options.body['table_results']).toEqual(tableResults);
        expect(options.body['suggested_refinements']).toEqual(suggestedRefinements);
        expect(options.body['passages']).toEqual(passages);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.query(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.query({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const queryPromise = discoveryService.query();
        expectToBePromise(queryPromise);

        queryPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAutocompletion', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAutocompletion
        const projectId = 'testString';
        const prefix = 'testString';
        const collectionIds = ['testString'];
        const field = 'testString';
        const count = 38;
        const params = {
          projectId: projectId,
          prefix: prefix,
          collectionIds: collectionIds,
          field: field,
          count: count,
        };

        const getAutocompletionResult = discoveryService.getAutocompletion(params);

        // all methods should return a Promise
        expectToBePromise(getAutocompletionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/autocompletion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['prefix']).toEqual(prefix);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.qs['field']).toEqual(field);
        expect(options.qs['count']).toEqual(count);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const prefix = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getAutocompletion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAutocompletionPromise = discoveryService.getAutocompletion();
        expectToBePromise(getAutocompletionPromise);

        getAutocompletionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('queryNotices', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation queryNotices
        const projectId = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const count = 38;
        const offset = 38;
        const params = {
          projectId: projectId,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          count: count,
          offset: offset,
        };

        const queryNoticesResult = discoveryService.queryNotices(params);

        // all methods should return a Promise
        expectToBePromise(queryNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.qs['count']).toEqual(count);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.queryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const queryNoticesPromise = discoveryService.queryNotices();
        expectToBePromise(queryNoticesPromise);

        queryNoticesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listFields', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listFields
        const projectId = 'testString';
        const collectionIds = ['testString'];
        const params = {
          projectId: projectId,
          collectionIds: collectionIds,
        };

        const listFieldsResult = discoveryService.listFields(params);

        // all methods should return a Promise
        expectToBePromise(listFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.listFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listFieldsPromise = discoveryService.listFields();
        expectToBePromise(listFieldsPromise);

        listFieldsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getComponentSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getComponentSettings
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const getComponentSettingsResult = discoveryService.getComponentSettings(params);

        // all methods should return a Promise
        expectToBePromise(getComponentSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/component_settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getComponentSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getComponentSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getComponentSettingsPromise = discoveryService.getComponentSettings();
        expectToBePromise(getComponentSettingsPromise);

        getComponentSettingsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const xWatsonDiscoveryForce = true;
        const params = {
          projectId: projectId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const addDocumentResult = discoveryService.addDocument(params);

        // all methods should return a Promise
        expectToBePromise(addDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/collections/{collection_id}/documents',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['metadata']).toEqual(metadata);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.addDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addDocumentPromise = discoveryService.addDocument();
        expectToBePromise(addDocumentPromise);

        addDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const xWatsonDiscoveryForce = true;
        const params = {
          projectId: projectId,
          collectionId: collectionId,
          documentId: documentId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const updateDocumentResult = discoveryService.updateDocument(params);

        // all methods should return a Promise
        expectToBePromise(updateDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['metadata']).toEqual(metadata);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.updateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateDocumentPromise = discoveryService.updateDocument();
        expectToBePromise(updateDocumentPromise);

        updateDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const xWatsonDiscoveryForce = true;
        const params = {
          projectId: projectId,
          collectionId: collectionId,
          documentId: documentId,
          xWatsonDiscoveryForce: xWatsonDiscoveryForce,
        };

        const deleteDocumentResult = discoveryService.deleteDocument(params);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Discovery-Force', xWatsonDiscoveryForce);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDocumentPromise = discoveryService.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listTrainingQueries', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTrainingQueries
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const listTrainingQueriesResult = discoveryService.listTrainingQueries(params);

        // all methods should return a Promise
        expectToBePromise(listTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/training_data/queries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.listTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listTrainingQueriesPromise = discoveryService.listTrainingQueries();
        expectToBePromise(listTrainingQueriesPromise);

        listTrainingQueriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTrainingQueries', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTrainingQueries
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const deleteTrainingQueriesResult = discoveryService.deleteTrainingQueries(params);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/training_data/queries', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteTrainingQueriesPromise = discoveryService.deleteTrainingQueries();
        expectToBePromise(deleteTrainingQueriesPromise);

        deleteTrainingQueriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTrainingQuery
        const projectId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const filter = 'testString';
        const params = {
          projectId: projectId,
          naturalLanguageQuery: naturalLanguageQuery,
          examples: examples,
          filter: filter,
        };

        const createTrainingQueryResult = discoveryService.createTrainingQuery(params);

        // all methods should return a Promise
        expectToBePromise(createTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/training_data/queries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['examples']).toEqual(examples);
        expect(options.body['filter']).toEqual(filter);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          naturalLanguageQuery,
          examples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.createTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createTrainingQueryPromise = discoveryService.createTrainingQuery();
        expectToBePromise(createTrainingQueryPromise);

        createTrainingQueryPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTrainingQuery', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTrainingQuery
        const projectId = 'testString';
        const queryId = 'testString';
        const params = {
          projectId: projectId,
          queryId: queryId,
        };

        const getTrainingQueryResult = discoveryService.getTrainingQuery(params);

        // all methods should return a Promise
        expectToBePromise(getTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/training_data/queries/{query_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getTrainingQueryPromise = discoveryService.getTrainingQuery();
        expectToBePromise(getTrainingQueryPromise);

        getTrainingQueryPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateTrainingQuery
        const projectId = 'testString';
        const queryId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const filter = 'testString';
        const params = {
          projectId: projectId,
          queryId: queryId,
          naturalLanguageQuery: naturalLanguageQuery,
          examples: examples,
          filter: filter,
        };

        const updateTrainingQueryResult = discoveryService.updateTrainingQuery(params);

        // all methods should return a Promise
        expectToBePromise(updateTrainingQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/training_data/queries/{query_id}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['examples']).toEqual(examples);
        expect(options.body['filter']).toEqual(filter);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const queryId = 'testString';
        const naturalLanguageQuery = 'testString';
        const examples = [trainingExampleModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          queryId,
          naturalLanguageQuery,
          examples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.updateTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateTrainingQueryPromise = discoveryService.updateTrainingQuery();
        expectToBePromise(updateTrainingQueryPromise);

        updateTrainingQueryPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('analyzeDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation analyzeDocument
        const projectId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const params = {
          projectId: projectId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const analyzeDocumentResult = discoveryService.analyzeDocument(params);

        // all methods should return a Promise
        expectToBePromise(analyzeDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/collections/{collection_id}/analyze',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['metadata']).toEqual(metadata);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.analyzeDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.analyzeDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const analyzeDocumentPromise = discoveryService.analyzeDocument();
        expectToBePromise(analyzeDocumentPromise);

        analyzeDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listEnrichments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEnrichments
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const listEnrichmentsResult = discoveryService.listEnrichments(params);

        // all methods should return a Promise
        expectToBePromise(listEnrichmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listEnrichments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.listEnrichments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listEnrichmentsPromise = discoveryService.listEnrichments();
        expectToBePromise(listEnrichmentsPromise);

        listEnrichmentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
      };

      // CreateEnrichment
      const createEnrichmentModel = {
        name: 'testString',
        description: 'testString',
        type: 'dictionary',
        options: enrichmentOptionsModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEnrichment
        const projectId = 'testString';
        const enrichment = createEnrichmentModel;
        const file = Buffer.from('This is a mock file.');
        const params = {
          projectId: projectId,
          enrichment: enrichment,
          file: file,
        };

        const createEnrichmentResult = discoveryService.createEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(createEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['enrichment']).toEqual(enrichment);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].contentType).toEqual('application/octet-stream');
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichment = createEnrichmentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          enrichment,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.createEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createEnrichmentPromise = discoveryService.createEnrichment();
        expectToBePromise(createEnrichmentPromise);

        createEnrichmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getEnrichment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const params = {
          projectId: projectId,
          enrichmentId: enrichmentId,
        };

        const getEnrichmentResult = discoveryService.getEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(getEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getEnrichmentPromise = discoveryService.getEnrichment();
        expectToBePromise(getEnrichmentPromise);

        getEnrichmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateEnrichment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const params = {
          projectId: projectId,
          enrichmentId: enrichmentId,
          name: name,
          description: description,
        };

        const updateEnrichmentResult = discoveryService.updateEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(updateEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          enrichmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.updateEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateEnrichmentPromise = discoveryService.updateEnrichment();
        expectToBePromise(updateEnrichmentPromise);

        updateEnrichmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEnrichment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEnrichment
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const params = {
          projectId: projectId,
          enrichmentId: enrichmentId,
        };

        const deleteEnrichmentResult = discoveryService.deleteEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(deleteEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/projects/{project_id}/enrichments/{enrichment_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const enrichmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteEnrichmentPromise = discoveryService.deleteEnrichment();
        expectToBePromise(deleteEnrichmentPromise);

        deleteEnrichmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listProjects', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listProjects
        const params = {};

        const listProjectsResult = discoveryService.listProjects(params);

        // all methods should return a Promise
        expectToBePromise(listProjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects', 'GET');
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

        discoveryService.listProjects(params);
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createProject
        const name = 'testString';
        const type = 'document_retrieval';
        const defaultQueryParameters = defaultQueryParamsModel;
        const params = {
          name: name,
          type: type,
          defaultQueryParameters: defaultQueryParameters,
        };

        const createProjectResult = discoveryService.createProject(params);

        // all methods should return a Promise
        expectToBePromise(createProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['type']).toEqual(type);
        expect(options.body['default_query_parameters']).toEqual(defaultQueryParameters);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const type = 'document_retrieval';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.createProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createProjectPromise = discoveryService.createProject();
        expectToBePromise(createProjectPromise);

        createProjectPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getProject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getProject
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const getProjectResult = discoveryService.getProject(params);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.getProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getProjectPromise = discoveryService.getProject();
        expectToBePromise(getProjectPromise);

        getProjectPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateProject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateProject
        const projectId = 'testString';
        const name = 'testString';
        const params = {
          projectId: projectId,
          name: name,
        };

        const updateProjectResult = discoveryService.updateProject(params);

        // all methods should return a Promise
        expectToBePromise(updateProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.updateProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateProjectPromise = discoveryService.updateProject();
        expectToBePromise(updateProjectPromise);

        updateProjectPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteProject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteProject
        const projectId = 'testString';
        const params = {
          projectId: projectId,
        };

        const deleteProjectResult = discoveryService.deleteProject(params);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteProjectPromise = discoveryService.deleteProject();
        expectToBePromise(deleteProjectPromise);

        deleteProjectPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const params = {
          customerId: customerId,
        };

        const deleteUserDataResult = discoveryService.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await discoveryService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteUserDataPromise = discoveryService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
