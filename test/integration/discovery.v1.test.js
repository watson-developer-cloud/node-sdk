'use strict';

const { IamAuthenticator } = require('../../dist/auth');
const DiscoveryV1 = require('../../dist/discovery/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
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

  it('should listEnvironments()', async () => {
    const res = await discovery.listEnvironments();
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(Array.isArray(result.environments)).toBe(true);
    const environmentIds = result.environments.map(e => e.environment_id);
    expect(environmentIds.indexOf(environmentId) > -1).toBe(true);
  });

  it('should getEnvironment()', async () => {
    const params = {
      environmentId,
    };

    const res = await discovery.getEnvironment(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(result.environment_id).toBe(environmentId);
  });

  it('should listConfigurations()', async () => {
    const params = {
      environmentId,
    };

    const res = await discovery.listConfigurations(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(Array.isArray(result.configurations)).toBeDefined();
    expect(result.configurations[0]).toBeDefined();
  });

  it('should getConfiguration()', async () => {
    const params = {
      environmentId,
      configurationId: configurationId,
    };

    const res = await discovery.getConfiguration(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(result.configuration_id).toBe(configurationId);
  });

  // todo: delete the collection after the testing is complete
  it.skip('should createCollection()', async () => {
    const params = {
      environmentId,
      name: 'node-sdk-test-' + Date.now(),
      description:
        'Test collection created by the Node.js SDK integration tests on ' +
        new Date() +
        '. Should be deleted shortly',
      configurationId: configurationId,
      languageCode: 'en_us',
    };

    const res = await discovery.createCollection(params);
    const { result } = res || {};
    expect(result).toBeDefined(); // Error: This operation is invalid for read-only environments. (?)
    // todo: extract collectionId, use it in subsequent tests, delete it
  });

  it('should listCollections()', async () => {
    const params = {
      environmentId,
      configurationId: configurationId,
    };

    const res = await discovery.listCollections(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(Array.isArray(result.collections)).toBeDefined();
  });

  it('should perform a federated query for notices', async () => {
    const params = {
      environmentId,
      configurationId: configurationId,
      collectionIds: [collectionId, collectionId2],
      filter: 'yesplease',
      count: 10,
      sort: ['+field_1', '-field_2'],
      natural_language_query: 'a question about stuff and things',
    };

    const res = await discovery.federatedQueryNotices(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(Array.isArray(result.results)).toBeDefined();
  });

  describe('add-query-delete', () => {
    let documentId;

    it('should addDocument()', async () => {
      const params = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
        filename: 'sampleWord.docx',
      };

      const res = await discovery.addDocument(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.document_id).toBeDefined();
      documentId = result.document_id;
    });

    it('should addDocument()', async () => {
      const jsonFile = {
        foo: 'bar',
        from: 'node-sdk integration test',
        test_date: new Date().toString(),
      };

      const params = {
        environmentId,
        collectionId,
        file: {
          value: JSON.stringify(jsonFile),
          options: {
            filename: '_.json',
          },
        },
      };

      const res = await discovery.addDocument(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.document_id).toBeDefined();
    });

    it('should getDocumentStatus()', async () => {
      const params = {
        environmentId,
        collectionId,
        documentId,
      };

      const res = await discovery.getDocumentStatus(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.document_id).toBeDefined();
    });

    it('should query()', async () => {
      const params = {
        environmentId,
        collectionId,
        query: '',
      };

      const res = await discovery.query(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(typeof result.matching_results).toBe('number');
      expect(Array.isArray(result.results)).toBe(true);
    });

    it('should delete all documents', async () => {
      const params = {
        environmentId,
        collectionId,
        query: '',
      };
      const res = await discovery.query(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      for (const document of result.results) {
        const params = {
          environmentId,
          collectionId,
          documentId: document.id,
        };

        await discovery.deleteDocument(params);
      }
    });
  });

  describe('credentials tests @slow', () => {
    let credentialId;
    const sourceType = 'sharepoint';

    it('should createCredentials', async () => {
      const params = {
        environmentId,
        sourceType,
        credentialDetails: {
          credential_type: 'saml',
          username: 'myUserName',
          password: 'pass1234',
          organization_url: 'www.sharepoint-org.com/organization',
        },
      };

      const res = await discovery.createCredentials(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.credential_id).toBeDefined();
      expect(result.source_type).toBe(sourceType);
      // save the credential id for later tests
      credentialId = result.credential_id;
    });

    it('should listCredentials', async () => {
      const params = {
        environmentId,
      };

      const res = await discovery.listCredentials(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(Array.isArray(result.credentials)).toBe(true);
    });

    it('should updateCredentials', async () => {
      const params = {
        environmentId,
        credentialId,
        sourceType,
        credentialDetails: {
          credential_type: 'saml',
          username: 'myUserName',
          password: 'new!longer!password!123',
          organization_url: 'www.sharepoint-org.com/organization',
        },
      };

      const res = await discovery.updateCredentials(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.credential_id).toBe(credentialId);
      expect(result.source_type).toBe(sourceType);
    });

    it('should getCredentials', async () => {
      const params = {
        environmentId,
        credentialId,
      };

      const res = await discovery.getCredentials(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.credential_id).toBe(credentialId);
      expect(result.source_type).toBe(sourceType);
    });

    it('should deleteCredentials', async () => {
      const params = {
        environmentId,
        credentialId,
      };

      const res = await discovery.deleteCredentials(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.credential_id).toBe(credentialId);
      expect(result.status).toBe('deleted');
    });
  });

  describe('events tests', () => {
    let documentId;
    let sessionToken;

    beforeAll(async () => {
      const params = {
        environmentId,
        collectionId,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
      };

      let queryParams;
      try {
        const res = await discovery.addDocument(params);
        const { result } = res || {};
        expect(result).toBeDefined();

        documentId = result.document_id;

        queryParams = {
          environmentId,
          collectionId,
          naturalLanguageQuery: 'jeopardy',
        };
      } catch (err) {
        expect(err).toBeNull(); // Will halt rest of test unlike fail()
      }

      try {
        const res = await discovery.query(queryParams);
        const result2 = res.result;
        expect(result2).toBeDefined();
        sessionToken = result2.session_token;
      } catch (err) {
        expect(err).toBeNull(); // Will halt rest of test unlike fail()
      }
    });

    it('should create event', async () => {
      const type = 'click';
      const params = {
        type,
        data: {
          environment_id: environmentId,
          session_token: sessionToken,
          collection_id: collectionId,
          document_id: documentId,
        },
      };

      const res = await discovery.createEvent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.type).toBe(type);
      expect(result.data.environment_id).toBe(environmentId);
      expect(result.data.collection_id).toBe(collectionId);
      expect(result.data.document_id).toBe(documentId);
      expect(result.data.session_token).toBe(sessionToken);
      expect(result.data.result_type).toBeDefined();
      expect(result.data.query_id).toBeDefined();
    });

    afterAll(async () => {
      const params = {
        environmentId,
        collectionId,
        documentId,
      };

      try {
        const res = await discovery.deleteDocument(params);
      } catch (err) {
        expect(err).toBeNull(); // Will halt rest of test unlike fail()
      }
    });
  });

  describe('metrics tests', () => {
    it('should get metrics event rate', async () => {
      const res = await discovery.getMetricsEventRate();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.aggregations).toBeDefined();
      expect(Array.isArray(result.aggregations)).toBe(true);
      expect(result.aggregations[0].results).toBeDefined();
      expect(Array.isArray(result.aggregations[0].results)).toBe(true);
      expect(result.aggregations[0].results[0].event_rate).toBeDefined();
    });
    it('should get metrics query', async () => {
      const res = await discovery.getMetricsQuery();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.aggregations).toBeDefined();
      expect(Array.isArray(result.aggregations)).toBe(true);
      expect(result.aggregations[0].results).toBeDefined();
      expect(Array.isArray(result.aggregations[0].results)).toBe(true);
      expect(result.aggregations[0].results[0].matching_results).toBeDefined();
    });
    it('should get metrics query event', async () => {
      const res = await discovery.getMetricsQueryEvent();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.aggregations).toBeDefined();
    });
    it('should get metrics query no results', async () => {
      const res = await discovery.getMetricsQueryNoResults();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.aggregations).toBeDefined();
      expect(Array.isArray(result.aggregations)).toBe(true);
      expect(result.aggregations[0].results).toBeDefined();
      expect(Array.isArray(result.aggregations[0].results)).toBe(true);
      expect(result.aggregations[0].results[0].matching_results).toBeDefined();
    });
    it('should get metrics query token event', async () => {
      const count = 2;
      const params = { count };

      const res = await discovery.getMetricsQueryTokenEvent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.aggregations).toBeDefined();
      expect(Array.isArray(result.aggregations)).toBe(true);
      expect(result.aggregations[0].results).toBeDefined();
      expect(Array.isArray(result.aggregations[0].results)).toBe(true);
      expect(result.aggregations[0].results[0].event_rate).toBeDefined();
    }, 40000);
  });

  describe('logs tests', () => {
    it('should query log', async () => {
      const count = 2;
      const filter = 'stuff';
      const params = {
        count,
        offset: 1,
        filter,
        sort: ['created_timestamp'],
      };

      const res = await discovery.queryLog(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.matching_results).toBeDefined();
      expect(result.results).toBeDefined();
    });
  });

  describe('tokenization dictionary tests @slow', () => {
    it('should createTokenizationDictionary', async () => {
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

      const res = await discovery.createTokenizationDictionary(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.type).toBeDefined();
    });

    it('should getTokenizationDictionaryStatus', async () => {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      const res = await discovery.getTokenizationDictionaryStatus(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.type).toBeDefined();
    });

    it('should deleteTokenizationDictionary', async () => {
      const params = {
        environmentId,
        collectionId: japaneseCollectionId,
      };

      const res = await discovery.deleteTokenizationDictionary(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result).toBe('');
    });
  });
  describe('stopwords tests @slow', () => {
    it('should createStopwordList', async () => {
      const params = {
        environmentId,
        collectionId,
        stopwordFile: fs.createReadStream(path.join(__dirname, '../resources/stopwords.txt')),
        stopwordFilename: 'stopwords.txt',
      };

      const res = await discovery.createStopwordList(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
      expect(result.status).toBeDefined();
    });
    it('should getStopwordListStatus', async () => {
      const params = {
        environmentId,
        collectionId,
      };

      const res = await discovery.getStopwordListStatus(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
      expect(result.status).toBeDefined();
    });
    it('should deleteStopwordList', async () => {
      const params = {
        environmentId,
        collectionId,
      };

      const res = await discovery.deleteStopwordList(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result).toBe('');
    });
  });
  describe('gateways tests', () => {
    let gatewayId;
    it('should createGateway', async () => {
      const params = {
        environmentId,
        name: 'node-sdk-test',
      };

      const res = await discovery.createGateway(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.token_id).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.gateway_id).toBeDefined();
      gatewayId = result.gateway_id;
    });
    it('should getGateway', async () => {
      // We cannot run this test when gateway creation failed.
      expect(gatewayId).toBeTruthy();

      const params = {
        environmentId,
        gatewayId,
      };

      const res = await discovery.getGateway(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.token_id).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.gateway_id).toBeDefined();
    });
    it('should listGateways', async () => {
      const params = {
        environmentId,
      };

      const res = await discovery.listGateways(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.gateways).toBeDefined();
      expect(result.gateways.length).toBeTruthy();
    }, 60000);
    it('should deleteGateway', async () => {
      // We cannot run this test when gateway creation failed.
      expect(gatewayId).toBeTruthy();
      const params = {
        environmentId,
        gatewayId,
      };

      const res = await discovery.deleteGateway(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.gateway_id).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.status).toBe('deleted');
    });
  });
});
