'use strict';

const { IamAuthenticator } = require('../../dist/auth');
const DiscoveryV1 = require('../../dist/discovery/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const async = require('async');
const fs = require('fs');
const path = require('path');

const THIRTY_SECONDS = 30000;

describe('discovery v1 integration', () => {
  jest.setTimeout(THIRTY_SECONDS);

  const options = authHelper.auth.discovery;
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

  it('should listEnvironments()', done => {
    discovery.listEnvironments(null, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(Array.isArray(result.environments)).toBe(true);
      const environmentIds = result.environments.map(e => e.environment_id);
      expect(environmentIds.indexOf(environmentId) > -1).toBe(true);
      done();
    });
  });

  it('should getEnvironment()', done => {
    discovery.getEnvironment({ environmentId }, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.environment_id).toBe(environmentId);
      done();
    });
  });

  it('should listConfigurations()', done => {
    discovery.listConfigurations({ environmentId }, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(Array.isArray(result.configurations)).toBeDefined();
      expect(result.configurations[0]).toBeDefined();
      done();
    });
  });

  it('should getConfiguration()', done => {
    discovery.getConfiguration(
      {
        environmentId,
        configurationId: configurationId,
      },
      (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.configuration_id).toBe(configurationId);
        done();
      }
    );
  });

  // todo: delete the collection after the testing is complete
  it.skip('should createCollection()', done => {
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
      (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined(); // Error: This operation is invalid for read-only environments. (?)
        // todo: extract collectionId, use it in subsequent tests, delete it
        done(err, result);
      }
    );
  });

  it('listCollections()', done => {
    discovery.listCollections(
      {
        environmentId,
        configurationId: configurationId,
      },
      (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(Array.isArray(result.collections)).toBeDefined();
        done(err);
      }
    );
  });

  it('should perform a federated query for notices', done => {
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
      (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(Array.isArray(result.results)).toBeDefined();
        done(err);
      }
    );
  });

  describe('add-query-delete', () => {
    it('addDocument()', done => {
      const document_obj = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
        filename: 'sampleWord.docx',
      };

      discovery.addDocument(document_obj, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.document_id).toBeDefined();
        done(err);
      });
    });

    it('addDocument()', done => {
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

      discovery.addDocument(document_obj, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.document_id).toBeDefined();
        done(err);
      });
    });

    it('query()', done => {
      discovery.query(
        {
          environmentId,
          collectionId,
          query: '',
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(typeof result.matching_results).toBe('number');
          expect(Array.isArray(result.results)).toBe(true);
          done(err);
        }
      );
    });

    it('delete all documents', done => {
      discovery.query(
        {
          environmentId,
          collectionId,
          query: '',
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          async.eachSeries(
            result.results,
            (result, next) => {
              discovery.deleteDocument(
                {
                  environmentId,
                  collectionId,
                  documentId: result.id,
                },
                (err, res) => {
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

  describe('credentials tests @slow', () => {
    let credentialId;
    const sourceType = 'sharepoint';

    it('should createCredentials', done => {
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
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(result.credential_id).toBeDefined();
          expect(result.source_type).toBe(sourceType);
          // save the credential id for later tests
          credentialId = result.credential_id;
          done();
        }
      );
    });

    it('should listCredentials', done => {
      discovery.listCredentials(
        {
          environmentId,
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(Array.isArray(result.credentials)).toBe(true);
          done();
        }
      );
    });

    it('should updateCredentials', done => {
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
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(result.credential_id).toBe(credentialId);
          expect(result.source_type).toBe(sourceType);
          done();
        }
      );
    });

    it('should getCredentials', done => {
      discovery.getCredentials(
        {
          environmentId,
          credentialId,
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(result.credential_id).toBe(credentialId);
          expect(result.source_type).toBe(sourceType);
          done();
        }
      );
    });

    it('should deleteCredentials', done => {
      discovery.deleteCredentials(
        {
          environmentId,
          credentialId,
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          expect(result.credential_id).toBe(credentialId);
          expect(result.status).toBe('deleted');
          done();
        }
      );
    });
  });

  describe('events tests', () => {
    let documentId;
    let sessionToken;

    beforeAll(done => {
      const addDocParams = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
      };

      discovery.addDocument(addDocParams, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        documentId = result.document_id;

        const queryParams = {
          environmentId,
          collectionId,
          naturalLanguageQuery: 'jeopardy',
        };

        discovery.query(queryParams, (error, resp) => {
          expect(error).toBeNull();
          const result2 = resp.result;
          expect(result2).toBeDefined();
          sessionToken = result2.session_token;
          done();
        });
      });
    });

    it('should create event', done => {
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

      discovery.createEvent(createEventParams, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
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

    afterAll(done => {
      const params = {
        environmentId,
        collectionId,
        documentId,
      };
      discovery.deleteDocument(params, (err, res) => {
        done();
      });
    });
  });

  describe('metrics tests', () => {
    it('should get metrics event rate', done => {
      discovery.getMetricsEventRate((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].event_rate).toBeDefined();
        done();
      });
    });
    it('should get metrics query', done => {
      discovery.getMetricsQuery((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].matching_results).toBeDefined();
        done();
      });
    });
    it('should get metrics query event', done => {
      discovery.getMetricsQueryEvent((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.aggregations).toBeDefined();
        done();
      });
    });
    it('should get metrics query no results', done => {
      discovery.getMetricsQueryNoResults((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].matching_results).toBeDefined();
        done();
      });
    });
    it('should get metrics query token event', done => {
      const count = 2;
      const params = { count };
      discovery.getMetricsQueryTokenEvent(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.aggregations).toBeDefined();
        expect(Array.isArray(result.aggregations)).toBe(true);
        expect(result.aggregations[0].results).toBeDefined();
        expect(Array.isArray(result.aggregations[0].results)).toBe(true);
        expect(result.aggregations[0].results[0].event_rate).toBeDefined();
        done();
      });
    }, 40000);
  });

  describe('logs tests', () => {
    it('should query log', done => {
      const count = 2;
      const filter = 'stuff';
      const params = {
        count,
        offset: 1,
        filter,
        sort: ['created_timestamp'],
      };
      discovery.queryLog(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.matching_results).toBeDefined();
        expect(result.results).toBeDefined();
        done();
      });
    });
  });

  describe('tokenization dictionary tests @slow', () => {
    it('should createTokenizationDictionary', done => {
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

      discovery.createTokenizationDictionary(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.type).toBeDefined();
        done();
      });
    });

    it('should getTokenizationDictionaryStatus', done => {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      discovery.getTokenizationDictionaryStatus(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.type).toBeDefined();
        done();
      });
    });

    it('should deleteTokenizationDictionary', done => {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      discovery.deleteTokenizationDictionary(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result).toBe('');
        done();
      });
    });
  });
  describe('stopwords tests @slow', () => {
    it('should createStopwordList', done => {
      const params = {
        environmentId,
        collectionId,
        stopwordFile: fs.createReadStream(path.join(__dirname, '../resources/stopwords.txt')),
        stopwordFilename: 'stopwords.txt',
      };
      discovery.createStopwordList(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.type).toBeDefined();
        expect(result.status).toBeDefined();
        done();
      });
    });
    it('should getStopwordListStatus', done => {
      const params = {
        environmentId,
        collectionId,
      };
      discovery.getStopwordListStatus(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.type).toBeDefined();
        expect(result.status).toBeDefined();
        done();
      });
    });
    it('should deleteStopwordList', done => {
      const params = {
        environmentId,
        collectionId,
      };
      discovery.deleteStopwordList(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result).toBe('');
        done();
      });
    });
  });
  describe('gateways tests', () => {
    let gatewayId;
    it('should createGateway', done => {
      const params = {
        environmentId,
        name: 'node-sdk-test',
      };
      discovery.createGateway(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.token_id).toBeDefined();
        expect(result.token).toBeDefined();
        expect(result.gateway_id).toBeDefined();

        gatewayId = result.gateway_id;

        done();
      });
    });
    it('should getGateway', done => {
      if (!gatewayId) {
        // We cannot run this test when gateway creation failed.
        return done();
      }

      const params = {
        environmentId,
        gatewayId,
      };
      discovery.getGateway(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.token_id).toBeDefined();
        expect(result.token).toBeDefined();
        expect(result.gateway_id).toBeDefined();
        done();
      });
    });
    it('should listGateways', done => {
      const params = {
        environmentId,
      };
      discovery.listGateways(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.gateways).toBeDefined();
        expect(result.gateways.length).toBeTruthy();
        done();
      });
    }, 60000);
    it('should deleteGateway', done => {
      if (!gatewayId) {
        // We cannot run this test when gateway creation failed.
        return done();
      }
      const params = {
        environmentId,
        gatewayId,
      };
      discovery.deleteGateway(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.gateway_id).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.status).toBe('deleted');
        done();
      });
    });
  });
});
