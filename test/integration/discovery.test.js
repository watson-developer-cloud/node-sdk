'use strict';

const { IamAuthenticator } = require('../../auth');
const DiscoveryV1 = require('../../discovery/v1');
const authHelper = require('../resources/auth_helper.js');
const options = authHelper.auth.discovery;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const async = require('async');
const fs = require('fs');
const path = require('path');

const THIRTY_SECONDS = 30000;

describe('discovery_integration', function() {
  jest.setTimeout(THIRTY_SECONDS);

  options.authenticator = new IamAuthenticator({ apikey: options.apikey });

  const environmentId = options.environmentId;
  const configurationId = options.configurationId;
  const collectionId = options.collectionId;
  const collectionId2 = options.collectionId_2;
  const japaneseCollectionId = options.japaneseCollectionId;

  const discovery = new DiscoveryV1(
    Object.assign({}, options, {
      version: '2019-03-27',
    })
  );

  it('should listEnvironments()', function(done) {
    discovery.listEnvironments(null, (err, { result }) => {
      expect(err).toBeNull();
      expect(Array.isArray(result.environments)).toBe(true);
      const environmentIds = result.environments.map(e => e.environment_id);
      expect(environmentIds.indexOf(environmentId) > -1).toBe(true);
      done();
    });
  });

  it('should getEnvironment()', function(done) {
    discovery.getEnvironment({ environmentId }, (err, { result }) => {
      expect(err).toBeNull();
      expect(result).toBeDefined();
      expect(result.environment_id).toBe(environmentId);
      done();
    });
  });

  it('should listConfigurations()', function(done) {
    discovery.listConfigurations({ environmentId }, (err, { result }) => {
      expect(err).toBeNull();
      expect(Array.isArray(result.configurations)).toBeDefined();
      expect(result.configurations[0]).toBeDefined();
      done();
    });
  });

  it('should getConfiguration()', function(done) {
    discovery.getConfiguration(
      {
        environmentId,
        configurationId: configurationId,
      },
      (err, { result }) => {
        expect(err).toBeNull();
        expect(result).toBeDefined();
        expect(result.configuration_id).toBe(configurationId);
        done();
      }
    );
  });

  // todo: delete the collection after the testing is complete
  it.skip('should createCollection()', function(done) {
    discovery.createCollection(
      {
        environmentId,
        name: 'node-sdk-test-' + Date.now(),
        description:
          'Test collection created by the Node.js SDK integration tests on ' +
          new Date() +
          '. Should be deleted shortly',
        configurationId: configurationId,
        languageCode: 'en_us',
      },
      function(err, { result }) {
        expect(err).toBeNull(); // Error: This operation is invalid for read-only environments. (?)
        // todo: extract collectionId, use it in subsequent tests, delete it
        done(err, result);
      }
    );
  });

  it('listCollections()', function(done) {
    discovery.listCollections(
      {
        environmentId,
        configurationId: configurationId,
      },
      (err, { result }) => {
        expect(err).toBeNull();
        expect(result).toBeDefined();
        expect(Array.isArray(result.collections)).toBeDefined();
        done(err);
      }
    );
  });

  it('should perform a federated query for notices', function(done) {
    discovery.federatedQueryNotices(
      {
        environmentId,
        configurationId: configurationId,
        collectionIds: [collectionId, collectionId2],
        filter: 'yesplease',
        count: 10,
        sort: ['+field_1', '-field_2'],
        natural_language_query: 'a question about stuff and things',
      },
      (err, { result }) => {
        expect(err).toBeNull();
        expect(result).toBeDefined();
        expect(Array.isArray(result.results)).toBeDefined();
        done(err);
      }
    );
  });

  describe('add-query-delete', function() {
    it('addDocument()', function(done) {
      const document_obj = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
        filename: 'sampleWord.docx',
      };

      discovery.addDocument(document_obj, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.document_id).toBeDefined();
        done(err);
      });
    });

    it('addDocument()', function(done) {
      const jsonFile = {
        foo: 'bar',
        from: 'node-sdk integration test',
        test_date: new Date().toString(),
      };

      const document_obj = {
        environmentId,
        collectionId,
        file: {
          value: JSON.stringify(jsonFile),
          options: {
            filename: '_.json',
          },
        },
      };

      discovery.addDocument(document_obj, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.document_id).toBeDefined();
        done(err);
      });
    });

    it('query()', function(done) {
      discovery.query(
        {
          environmentId,
          collectionId,
          query: '',
        },
        (err, { result }) => {
          expect(err).toBeNull();
          expect(result).toBeDefined();
          expect(typeof result.matching_results).toBe('number');
          expect(Array.isArray(result.results)).toBe(true);
          done(err);
        }
      );
    });

    it('delete all documents', function(done) {
      discovery.query(
        {
          environmentId,
          collectionId,
          query: '',
        },
        (err, { result }) => {
          expect(err).toBeNull();
          async.eachSeries(
            result.results,
            function(result, next) {
              discovery.deleteDocument(
                {
                  environmentId,
                  collectionId,
                  documentId: result.id,
                },
                (err, { result }) => {
                  next(err);
                }
              );
            },
            done
          );
        }
      );
    });
  });

  describe('credentials tests @slow', function() {
    let credentialId;
    const sourceType = 'sharepoint';

    it('should createCredentials', function(done) {
      discovery.createCredentials(
        {
          environmentId,
          sourceType,
          credentialDetails: {
            credential_type: 'saml',
            username: 'myUserName',
            password: 'pass1234',
            organization_url: 'www.sharepoint-org.com/organization',
          },
        },
        function(err, { result }) {
          expect(err).toBeNull();
          expect(result.credential_id).toBeDefined();
          expect(result.source_type).toBe(sourceType);
          // save the credential id for later tests
          credentialId = result.credential_id;
          done();
        }
      );
    });

    it('should listCredentials', function(done) {
      discovery.listCredentials(
        {
          environmentId,
        },
        function(err, { result }) {
          expect(err).toBeNull();
          expect(Array.isArray(result.credentials)).toBe(true);
          done();
        }
      );
    });

    it('should updateCredentials', function(done) {
      discovery.updateCredentials(
        {
          environmentId,
          credentialId,
          sourceType,
          credentialDetails: {
            credential_type: 'saml',
            username: 'myUserName',
            password: 'new!longer!password!123',
            organization_url: 'www.sharepoint-org.com/organization',
          },
        },
        function(err, { result }) {
          expect(err).toBeNull();
          expect(result.credential_id).toBe(credentialId);
          expect(result.source_type).toBe(sourceType);
          done();
        }
      );
    });

    it('should getCredentials', function(done) {
      discovery.getCredentials(
        {
          environmentId,
          credentialId,
        },
        function(err, { result }) {
          expect(err).toBeNull();
          expect(result.credential_id).toBe(credentialId);
          expect(result.source_type).toBe(sourceType);
          done();
        }
      );
    });

    it('should deleteCredentials', function(done) {
      discovery.deleteCredentials(
        {
          environmentId,
          credentialId,
        },
        function(err, { result }) {
          expect(err).toBeNull();
          expect(result.credential_id).toBe(credentialId);
          expect(result.status).toBe('deleted');
          done();
        }
      );
    });
  });

  describe('events tests', function() {
    let documentId;
    let sessionToken;

    beforeAll(function(done) {
      const addDocParams = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
      };

      discovery.addDocument(addDocParams, function(error, { result }) {
        if (error) {
          done(error.code);
        }
        documentId = result.document_id;

        const queryParams = {
          environmentId,
          collectionId,
          naturalLanguageQuery: 'jeopardy',
        };

        discovery.query(queryParams, function(err, { result }) {
          if (err) done(err);
          sessionToken = result.session_token;
          done();
        });
      });
    });

    it('should create event', function(done) {
      const type = 'click';
      const createEventParams = {
        type,
        data: {
          environment_id: environmentId,
          session_token: sessionToken,
          collection_id: collectionId,
          document_id: documentId,
        },
      };

      discovery.createEvent(createEventParams, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.type).toBe(type);
        expect(result.data.environment_id).toBe(environmentId);
        expect(result.data.collection_id).toBe(collectionId);
        expect(result.data.document_id).toBe(documentId);
        expect(result.data.session_token).toBe(sessionToken);
        expect(result.data.result_type).toBeDefined();
        expect(result.data.query_id).toBeDefined();
        done();
      });
    });

    afterAll(function(done) {
      const params = {
        environmentId,
        collectionId,
        documentId,
      };
      discovery.deleteDocument(params, function(err, { result }) {
        done();
      });
    });
  });

  describe('metrics tests', function() {
    it('should get metrics event rate', function(done) {
      discovery.getMetricsEventRate((err, { result }) => {
        expect(err).toBeNull();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].event_rate).toBeDefined();
        done();
      });
    });
    it('should get metrics query', function(done) {
      discovery.getMetricsQuery((err, { result }) => {
        expect(err).toBeNull();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].matching_results).toBeDefined();
        done();
      });
    });
    it('should get metrics query event', function(done) {
      discovery.getMetricsQueryEvent((err, { result }) => {
        expect(err).toBeNull();
        expect(result.aggregations).toBeDefined();
        done();
      });
    });
    it('should get metrics query no results', function(done) {
      discovery.getMetricsQueryNoResults((err, { result }) => {
        expect(err).toBeNull();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].matching_results).toBeDefined();
        done();
      });
    });
    it('should get metrics query token event', function(done) {
      const count = 2;
      const params = { count };
      discovery.getMetricsQueryTokenEvent(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results.length).toBe(count);
        expect(result.aggregations[0].results[0].event_rate).toBeDefined();
        done();
      });
    }, 40000);
  });

  describe('logs tests', function() {
    it('should query log', function(done) {
      const count = 2;
      const filter = 'stuff';
      const params = {
        count,
        offset: 1,
        filter,
        sort: ['created_timestamp'],
      };
      discovery.queryLog(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.matching_results).toBeDefined();
        expect(result.results).toBeDefined();
        done();
      });
    });
  });

  describe('tokenization dictionary tests @slow', function() {
    it('should createTokenizationDictionary', function(done) {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
        tokenizationRules: [
          {
            text: 'すしネコ',
            tokens: ['すし', 'ネコ'],
            readings: ['寿司', 'ネコ'],
            part_of_speech: 'カスタム名詞',
          },
        ],
      };

      discovery.createTokenizationDictionary(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.status).toBeDefined();
        expect(result.type).toBeDefined();
        done();
      });
    });

    it('should getTokenizationDictionaryStatus', function(done) {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      discovery.getTokenizationDictionaryStatus(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.status).toBeDefined();
        expect(result.type).toBeDefined();
        done();
      });
    });

    it('should deleteTokenizationDictionary', function(done) {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      discovery.deleteTokenizationDictionary(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result).toBe('');
        done();
      });
    });
  });
  describe('stopwords tests @slow', function() {
    it('should createStopwordList', function(done) {
      const params = {
        environmentId,
        collectionId,
        stopwordFile: fs.createReadStream(path.join(__dirname, '../resources/stopwords.txt')),
        stopwordFilename: 'stopwords.txt',
      };
      discovery.createStopwordList(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.type).toBeDefined();
        expect(result.status).toBeDefined();
        done();
      });
    });
    it('should getStopwordListStatus', function(done) {
      const params = {
        environmentId,
        collectionId,
      };
      discovery.getStopwordListStatus(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.type).toBeDefined();
        expect(result.status).toBeDefined();
        done();
      });
    });
    it('should deleteStopwordList', function(done) {
      const params = {
        environmentId,
        collectionId,
      };
      discovery.deleteStopwordList(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result).toBe('');
        done();
      });
    });
  });
  describe('gateways tests', function() {
    let gatewayId;
    it('should createGateway', function(done) {
      const params = {
        environmentId,
        name: 'node-sdk-test',
      };
      discovery.createGateway(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.name).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.token_id).toBeDefined();
        expect(result.token).toBeDefined();
        expect(result.gateway_id).toBeDefined();

        gatewayId = result.gateway_id;

        done();
      });
    });
    it('should getGateway', function(done) {
      if (!gatewayId) {
        // We cannot run this test when gateway creation failed.
        return done();
      }

      const params = {
        environmentId,
        gatewayId,
      };
      discovery.getGateway(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.name).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.token_id).toBeDefined();
        expect(result.token).toBeDefined();
        expect(result.gateway_id).toBeDefined();
        done();
      });
    });
    it('should listGateways', function(done) {
      const params = {
        environmentId,
      };
      discovery.listGateways(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.gateways).toBeDefined();
        expect(result.gateways.length).toBeTruthy();
        done();
      });
    }, 60000);
    it('should deleteGateway', function(done) {
      if (!gatewayId) {
        // We cannot run this test when gateway creation failed.
        return done();
      }
      const params = {
        environmentId,
        gatewayId,
      };
      discovery.deleteGateway(params, (err, { result }) => {
        expect(err).toBeNull();
        expect(result.gateway_id).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.status).toBe('deleted');
        done();
      });
    });
  });
});
