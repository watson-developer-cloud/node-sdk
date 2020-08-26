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

const fs = require('fs');
const path = require('path');
const { IamAuthenticator } = require('../../dist/auth');
const DiscoveryV2 = require('../../dist/discovery/v2');
const authHelper = require('../resources/auth_helper.js');
const { CreateProjectConstants } = require('../../dist/discovery/v2');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

// travis cant connect to disco v2, so skip these in ci
describe('discovery v2 integration @slow', () => {
  const options = authHelper.auth.discoveryV2;
  options.version = '2019-11-11';
  options.disableSslVerification = true;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });

  const discovery = new DiscoveryV2(options);

  const projectId = options.projectId;
  const collectionId = options.collectionId;

  let documentId;

  const EXTENDED_TIMEOUT = 30000;

  describe('projects', () => {
    let erasableProjectId;

    test('createProject', async () => {
      const randomString = Math.random().toString(36).slice(2);
      const params = {
        name: `Unique Erasable Project: ${randomString}`,
        type: CreateProjectConstants.Type.CONTENT_MINING,
      };

      const res = await discovery.createProject(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.project_id).toBeDefined();

      erasableProjectId = result.project_id;
    });
    test('getProject', async () => {
      const params = {
        projectId: erasableProjectId,
      };

      const res = await discovery.getProject(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });
    test(
      'updateProject',
      async () => {
        const params = {
          projectId: erasableProjectId,
        };

        const res = await discovery.updateProject(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );
    test(
      'deleteProject',
      async () => {
        const params = {
          projectId: erasableProjectId,
        };

        const res = await discovery.deleteProject(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );

    test('listProjects', async done => {
      let res;
      try {
        res = await discovery.listProjects();
      } catch (err) {
        expect(err).toBeNull();
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('collections', () => {
    let erasableCollectionId;

    test(
      'createCollection',
      async () => {
        const randomString = Math.random().toString(36).slice(2);
        const params = {
          projectId,
          name: `Unique Erasable Collection: ${randomString}`,
        };

        const res = await discovery.createCollection(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.collection_id).toBeDefined();

        erasableCollectionId = result.collection_id;
      },
      EXTENDED_TIMEOUT
    );
    test('getCollection', async () => {
      const params = {
        projectId,
        collectionId: erasableCollectionId,
      };

      const res = await discovery.getCollection(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });
    test(
      'updateCollection',
      async () => {
        const params = {
          projectId,
          collectionId: erasableCollectionId,
        };

        const res = await discovery.updateCollection(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );
    test(
      'deleteCollection',
      async () => {
        const params = {
          projectId,
          collectionId: erasableCollectionId,
        };

        const res = await discovery.deleteCollection(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );

    test(
      'listCollections',
      async () => {
        const params = {
          projectId,
        };

        const res = await discovery.listCollections(params);

        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );
  });

  describe('queries', () => {
    test('query', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.query(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('getAutocompletion', async done => {
      const params = {
        projectId,
        prefix: 'ye',
      };

      let res;
      try {
        res = await discovery.getAutocompletion(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('queryNotices', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.queryNotices(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('listFields', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.listFields(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('componentSettings', () => {
    test('getComponentSettings', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.getComponentSettings(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('documents', () => {
    test('addDocument', async done => {
      const params = {
        projectId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
      };

      let res;
      try {
        res = await discovery.addDocument(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.document_id).toBeDefined();
      documentId = result.document_id;
      done();
    });

    test('updateDocument', async done => {
      if (!documentId) {
        return done();
      }
      const params = {
        projectId,
        collectionId,
        documentId,
        metadata: '{"metadata": "value"}',
      };

      let res;
      try {
        res = await discovery.updateDocument(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('deleteDocument', async done => {
      if (!documentId) {
        return done();
      }
      const params = {
        projectId,
        collectionId,
        documentId,
      };

      let res;
      try {
        res = await discovery.deleteDocument(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    // For later use
    // test('analyzeDocument', async done => {
    //   if (!documentId) {
    //     return done();
    //   }
    //   const params = {
    //     projectId,
    //     collectionId,
    //     file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
    //     filename: 'sampleWord.docx',
    //   };

    //   let res;
    //   try {
    //     res = await discovery.analyzeDocument(params);
    //   } catch (err) {
    //     expect(err).toBeNull();
    //     return done();
    //   }

    //   expect(res).toBeDefined();
    //   const { result } = res || {};
    //   expect(result).toBeDefined();
    //   done();
    // });
  });

  describe('trainingData', () => {
    let queryId;
    test('listTrainingQueries', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.listTrainingQueries(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('createTrainingQuery', async done => {
      const params = {
        projectId,
        naturalLanguageQuery: 'the original query',
      };

      let res;
      try {
        res = await discovery.createTrainingQuery(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.query_id).toBeDefined();
      queryId = result.query_id;
      done();
    });

    test('getTrainingQuery', async done => {
      if (!queryId) {
        return done();
      }
      const params = {
        projectId,
        queryId,
      };

      let res;
      try {
        res = await discovery.getTrainingQuery(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('updateTrainingQuery', async done => {
      if (!queryId) {
        return done();
      }
      const params = {
        projectId,
        queryId,
        naturalLanguageQuery: 'the new query',
        examples: [
          {
            document_id: documentId,
            collection_id: collectionId,
            relevance: 1,
          },
        ],
      };

      let res;
      try {
        res = await discovery.updateTrainingQuery(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('deleteTrainingQueries', async done => {
      const params = {
        projectId,
      };

      let res;
      try {
        res = await discovery.deleteTrainingQueries(params);
      } catch (err) {
        expect(err).toBeNull();
        return done();
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('enrichments', () => {
    let erasableEnrichmentId;

    test(
      'createEnrichment',
      async () => {
        const randomString = Math.random().toString(36).slice(2);
        const enrichment = {
          name: 'Random Erasable Enrichment: ' + randomString,
          description: 'test dictionary',
          type: 'dictionary',
          options: {
            languages: ['en'],
            entity_type: 'keyword',
          },
        };

        const params = {
          projectId,
          enrichment,
          file: fs.createReadStream(path.join(__dirname, '../resources/TestEnrichments.csv')),
        };

        const res = await discovery.createEnrichment(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.enrichment_id).toBeDefined();

        erasableEnrichmentId = result.enrichment_id;
      },
      EXTENDED_TIMEOUT
    );
    test(
      'getEnrichment',
      async () => {
        const params = {
          projectId,
          enrichmentId: erasableEnrichmentId,
        };

        const res = await discovery.getEnrichment(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );
    test(
      'updateEnrichment',
      async () => {
        const params = {
          projectId,
          enrichmentId: erasableEnrichmentId,
          name: 'Erasable Enrichment',
          description: 'Uhh idk a description fit for a developer',
        };

        const res = await discovery.updateEnrichment(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );
    test(
      'deleteEnrichment',
      async () => {
        const params = {
          projectId,
          enrichmentId: erasableEnrichmentId,
        };

        const res = await discovery.deleteEnrichment(params);
        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
      },
      EXTENDED_TIMEOUT
    );

    test(
      'listEnrichments',
      async done => {
        const params = {
          projectId,
        };

        const res = await discovery.listEnrichments(params);

        expect(res).toBeDefined();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      },
      EXTENDED_TIMEOUT
    );
  });
});
