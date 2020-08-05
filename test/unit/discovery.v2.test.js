/**
 * (C) Copyright IBM Corp. 2019, 2020.
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
  url: 'ibm.com/123456',
  version: '2018-10-18',
};

const discovery = new DiscoveryV2(service);
const createRequestMock = jest.spyOn(discovery, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('DiscoveryV2', () => {
  describe('listCollections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const listCollectionsResult = discovery.listCollections(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.listCollections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const listCollectionsPromise = discovery.listCollections();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const name = 'fake_name';
        const description = 'fake_description';
        const language = 'fake_language';
        const enrichments = 'fake_enrichments';
        const params = {
          projectId,
          name,
          description,
          language,
          enrichments,
        };

        const createCollectionResult = discovery.createCollection(params);

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
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.createCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const createCollectionPromise = discovery.createCollection();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const params = {
          projectId,
          collectionId,
        };

        const getCollectionResult = discovery.getCollection(params);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        let err;
        try {
          await discovery.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        const getCollectionPromise = discovery.getCollection();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const name = 'fake_name';
        const description = 'fake_description';
        const language = 'fake_language';
        const enrichments = 'fake_enrichments';
        const params = {
          projectId,
          collectionId,
          name,
          description,
          language,
          enrichments,
        };

        const updateCollectionResult = discovery.updateCollection(params);

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
        expect(options.body['language']).toEqual(language);
        expect(options.body['enrichments']).toEqual(enrichments);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        let err;
        try {
          await discovery.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        const updateCollectionPromise = discovery.updateCollection();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const params = {
          projectId,
          collectionId,
        };

        const deleteCollectionResult = discovery.deleteCollection(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        let err;
        try {
          await discovery.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        const deleteCollectionPromise = discovery.deleteCollection();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionIds = 'fake_collectionIds';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const aggregation = 'fake_aggregation';
        const count = 'fake_count';
        const _return = 'fake__return';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const highlight = 'fake_highlight';
        const spellingSuggestions = 'fake_spellingSuggestions';
        const tableResults = 'fake_tableResults';
        const suggestedRefinements = 'fake_suggestedRefinements';
        const passages = 'fake_passages';
        const params = {
          projectId,
          collectionIds,
          filter,
          query,
          naturalLanguageQuery,
          aggregation,
          count,
          _return,
          offset,
          sort,
          highlight,
          spellingSuggestions,
          tableResults,
          suggestedRefinements,
          passages,
        };

        const queryResult = discovery.query(params);

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
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.query(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.query({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const queryPromise = discovery.query();
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
        // parameters
        const projectId = 'fake_projectId';
        const prefix = 'fake_prefix';
        const collectionIds = 'fake_collectionIds';
        const field = 'fake_field';
        const count = 'fake_count';
        const params = {
          projectId,
          prefix,
          collectionIds,
          field,
          count,
        };

        const getAutocompletionResult = discovery.getAutocompletion(params);

        // all methods should return a Promise
        expectToBePromise(getAutocompletionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/autocompletion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['prefix']).toEqual(prefix);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.qs['field']).toEqual(field);
        expect(options.qs['count']).toEqual(count);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const prefix = 'fake_prefix';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getAutocompletion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'prefix'];

        let err;
        try {
          await discovery.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'prefix'];

        const getAutocompletionPromise = discovery.getAutocompletion();
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
        // parameters
        const projectId = 'fake_projectId';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const count = 'fake_count';
        const offset = 'fake_offset';
        const params = {
          projectId,
          filter,
          query,
          naturalLanguageQuery,
          count,
          offset,
        };

        const queryNoticesResult = discovery.queryNotices(params);

        // all methods should return a Promise
        expectToBePromise(queryNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.qs['count']).toEqual(count);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.queryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.queryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const queryNoticesPromise = discovery.queryNotices();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionIds = 'fake_collectionIds';
        const params = {
          projectId,
          collectionIds,
        };

        const listFieldsResult = discovery.listFields(params);

        // all methods should return a Promise
        expectToBePromise(listFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.listFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const listFieldsPromise = discovery.listFields();
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
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const getComponentSettingsResult = discovery.getComponentSettings(params);

        // all methods should return a Promise
        expectToBePromise(getComponentSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/component_settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getComponentSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.getComponentSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const getComponentSettingsPromise = discovery.getComponentSettings();
        expectToBePromise(getComponentSettingsPromise);

        getComponentSettingsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateComponentSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const fieldsShown = 'fake_fieldsShown';
        const autocomplete = 'fake_autocomplete';
        const structuredSearch = 'fake_structuredSearch';
        const resultsPerPage = 'fake_resultsPerPage';
        const aggregations = 'fake_aggregations';
        const params = {
          projectId,
          fieldsShown,
          autocomplete,
          structuredSearch,
          resultsPerPage,
          aggregations,
        };

        const updateComponentSettingsResult = discovery.updateComponentSettings(params);

        // all methods should return a Promise
        expectToBePromise(updateComponentSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/component_settings', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['fields_shown']).toEqual(fieldsShown);
        expect(options.body['autocomplete']).toEqual(autocomplete);
        expect(options.body['structured_search']).toEqual(structuredSearch);
        expect(options.body['results_per_page']).toEqual(resultsPerPage);
        expect(options.body['aggregations']).toEqual(aggregations);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateComponentSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.updateComponentSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const updateComponentSettingsPromise = discovery.updateComponentSettings();
        expectToBePromise(updateComponentSettingsPromise);

        updateComponentSettingsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const metadata = 'fake_metadata';
        const xWatsonDiscoveryForce = 'fake_xWatsonDiscoveryForce';
        const params = {
          projectId,
          collectionId,
          file,
          filename,
          fileContentType,
          metadata,
          xWatsonDiscoveryForce,
        };

        const addDocumentResult = discovery.addDocument(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.addDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        let err;
        try {
          await discovery.addDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        const addDocumentPromise = discovery.addDocument();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const metadata = 'fake_metadata';
        const xWatsonDiscoveryForce = 'fake_xWatsonDiscoveryForce';
        const params = {
          projectId,
          collectionId,
          documentId,
          file,
          filename,
          fileContentType,
          metadata,
          xWatsonDiscoveryForce,
        };

        const updateDocumentResult = discovery.updateDocument(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId', 'documentId'];

        let err;
        try {
          await discovery.updateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId', 'documentId'];

        const updateDocumentPromise = discovery.updateDocument();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const xWatsonDiscoveryForce = 'fake_xWatsonDiscoveryForce';
        const params = {
          projectId,
          collectionId,
          documentId,
          xWatsonDiscoveryForce,
        };

        const deleteDocumentResult = discovery.deleteDocument(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId', 'documentId'];

        let err;
        try {
          await discovery.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId', 'documentId'];

        const deleteDocumentPromise = discovery.deleteDocument();
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
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const listTrainingQueriesResult = discovery.listTrainingQueries(params);

        // all methods should return a Promise
        expectToBePromise(listTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/training_data/queries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listTrainingQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.listTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const listTrainingQueriesPromise = discovery.listTrainingQueries();
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
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const deleteTrainingQueriesResult = discovery.deleteTrainingQueries(params);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingQueriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/training_data/queries', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteTrainingQueries(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.deleteTrainingQueries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const deleteTrainingQueriesPromise = discovery.deleteTrainingQueries();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const examples = 'fake_examples';
        const filter = 'fake_filter';
        const params = {
          projectId,
          naturalLanguageQuery,
          examples,
          filter,
        };

        const createTrainingQueryResult = discovery.createTrainingQuery(params);

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
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const examples = 'fake_examples';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          naturalLanguageQuery,
          examples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'naturalLanguageQuery', 'examples'];

        let err;
        try {
          await discovery.createTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'naturalLanguageQuery', 'examples'];

        const createTrainingQueryPromise = discovery.createTrainingQuery();
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
        // parameters
        const projectId = 'fake_projectId';
        const queryId = 'fake_queryId';
        const params = {
          projectId,
          queryId,
        };

        const getTrainingQueryResult = discovery.getTrainingQuery(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const queryId = 'fake_queryId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'queryId'];

        let err;
        try {
          await discovery.getTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'queryId'];

        const getTrainingQueryPromise = discovery.getTrainingQuery();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const queryId = 'fake_queryId';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const examples = 'fake_examples';
        const filter = 'fake_filter';
        const params = {
          projectId,
          queryId,
          naturalLanguageQuery,
          examples,
          filter,
        };

        const updateTrainingQueryResult = discovery.updateTrainingQuery(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const queryId = 'fake_queryId';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const examples = 'fake_examples';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        discovery.updateTrainingQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'queryId', 'naturalLanguageQuery', 'examples'];

        let err;
        try {
          await discovery.updateTrainingQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'queryId', 'naturalLanguageQuery', 'examples'];

        const updateTrainingQueryPromise = discovery.updateTrainingQuery();
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
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const metadata = 'fake_metadata';
        const params = {
          projectId,
          collectionId,
          file,
          filename,
          fileContentType,
          metadata,
        };

        const analyzeDocumentResult = discovery.analyzeDocument(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.analyzeDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        let err;
        try {
          await discovery.analyzeDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'collectionId'];

        const analyzeDocumentPromise = discovery.analyzeDocument();
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
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const listEnrichmentsResult = discovery.listEnrichments(params);

        // all methods should return a Promise
        expectToBePromise(listEnrichmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listEnrichments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.listEnrichments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const listEnrichmentsPromise = discovery.listEnrichments();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const file = 'fake_file';
        const enrichment = 'fake_enrichment';
        const params = {
          projectId,
          file,
          enrichment,
        };

        const createEnrichmentResult = discovery.createEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(createEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].contentType).toEqual('application/octet-stream');
        expect(options.formData['enrichment']).toEqual(enrichment);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.createEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const createEnrichmentPromise = discovery.createEnrichment();
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
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const params = {
          projectId,
          enrichmentId,
        };

        const getEnrichmentResult = discovery.getEnrichment(params);

        // all methods should return a Promise
        expectToBePromise(getEnrichmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}/enrichments/{enrichment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        let err;
        try {
          await discovery.getEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        const getEnrichmentPromise = discovery.getEnrichment();
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
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const name = 'fake_name';
        const description = 'fake_description';
        const params = {
          projectId,
          enrichmentId,
          name,
          description,
        };

        const updateEnrichmentResult = discovery.updateEnrichment(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        let err;
        try {
          await discovery.updateEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        const updateEnrichmentPromise = discovery.updateEnrichment();
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
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const params = {
          projectId,
          enrichmentId,
        };

        const deleteEnrichmentResult = discovery.deleteEnrichment(params);

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
        expect(options.path['project_id']).toEqual(projectId);
        expect(options.path['enrichment_id']).toEqual(enrichmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const enrichmentId = 'fake_enrichmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          enrichmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteEnrichment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        let err;
        try {
          await discovery.deleteEnrichment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId', 'enrichmentId'];

        const deleteEnrichmentPromise = discovery.deleteEnrichment();
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
        // parameters
        const params = {};

        const listProjectsResult = discovery.listProjects(params);

        // all methods should return a Promise
        expectToBePromise(listProjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects', 'GET');
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

        discovery.listProjects(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.listProjects({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.listProjects(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('createProject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const type = 'fake_type';
        const relevancyTrainingStatus = 'fake_relevancyTrainingStatus';
        const defaultQueryParameters = 'fake_defaultQueryParameters';
        const params = {
          name,
          type,
          relevancyTrainingStatus,
          defaultQueryParameters,
        };

        const createProjectResult = discovery.createProject(params);

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
        expect(options.body['relevancy_training_status']).toEqual(relevancyTrainingStatus);
        expect(options.body['default_query_parameters']).toEqual(defaultQueryParameters);
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

        discovery.createProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.createProject({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.createProject(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getProject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const getProjectResult = discovery.getProject(params);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.getProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const getProjectPromise = discovery.getProject();
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
        // parameters
        const projectId = 'fake_projectId';
        const name = 'fake_name';
        const params = {
          projectId,
          name,
        };

        const updateProjectResult = discovery.updateProject(params);

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
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.updateProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const updateProjectPromise = discovery.updateProject();
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
        // parameters
        const projectId = 'fake_projectId';
        const params = {
          projectId,
        };

        const deleteProjectResult = discovery.deleteProject(params);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/projects/{project_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['project_id']).toEqual(projectId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'fake_projectId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteProject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        let err;
        try {
          await discovery.deleteProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['projectId'];

        const deleteProjectPromise = discovery.deleteProject();
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
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        const deleteUserDataResult = discovery.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'fake_customerId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await discovery.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = discovery.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
