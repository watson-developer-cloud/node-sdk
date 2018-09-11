'use strict';

const nock = require('nock');
const DiscoveryV1 = require('../../discovery/v1');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const assert = require('assert');
const async = require('async');
const fs = require('fs');
const path = require('path');

const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

describe('discovery_integration', function() {
  this.timeout(THIRTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  let discovery;
  let environment_id;
  let configuration_id;
  let collection_id;
  let collection_id2;

  before(function() {
    environment_id = auth.discovery.environment_id;
    configuration_id = auth.discovery.configuration_id;
    collection_id = auth.discovery.collection_id;
    collection_id2 = auth.discovery.collection_id_2;

    nock.enableNetConnect();
    discovery = new DiscoveryV1(
      Object.assign({}, auth.discovery, {
        version: '2017-11-07',
      })
    );
    environment_id = auth.discovery.environment_id;
    configuration_id = auth.discovery.configuration_id;
    collection_id = auth.discovery.collection_id;
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('should getEnvironments()', function(done) {
    discovery.getEnvironments(null, function(err, res) {
      assert.ifError(err);
      assert(Array.isArray(res.environments));
      assert(res.environments.length);
      assert(res.environments[0]);
      assert.equal(res.environments[0].environment_id, environment_id);
      done();
    });
  });

  it('should getEnvironment()', function(done) {
    discovery.getEnvironment({ environment_id: environment_id }, function(err, env) {
      assert.ifError(err);
      assert(env);
      assert.equal(env.environment_id, environment_id);
      done();
    });
  });

  it('should getConfigurations()', function(done) {
    discovery.getConfigurations({ environment_id: environment_id }, function(err, res) {
      assert.ifError(err);
      assert(Array.isArray(res.configurations));
      assert(res.configurations.length);
      assert(res.configurations[0]);
      done();
    });
  });

  it('should getConfiguration()', function(done) {
    discovery.getConfiguration(
      {
        environment_id: environment_id,
        configuration_id: configuration_id,
      },
      function(err, conf) {
        assert.ifError(err);
        assert(conf);
        assert.equal(conf.configuration_id, configuration_id);
        done();
      }
    );
  });

  // todo: delete the collection after the testing is complete
  it.skip('should createCollection()', function(done) {
    discovery.createCollection(
      {
        environment_id: environment_id,
        name: 'node-sdk-test-' + Date.now(),
        description:
          'Test collection created by the Node.js SDK integration tests on ' +
          new Date() +
          '. Should be deleted shortly',
        configuration_id: configuration_id,
        language_code: 'en_us',
      },
      function(err, res) {
        assert.ifError(err); // Error: This operation is invalid for read-only environments. (?)
        // console.log(res);
        // todo: extract collection_id, use it in subsequent tests, delete it
        done(err, res);
      }
    );
  });

  it('getCollections()', function(done) {
    discovery.getCollections(
      {
        environment_id: environment_id,
        configuration_id: configuration_id,
      },
      function(err, res) {
        assert.ifError(err);
        assert(res);
        // console.log(res);
        assert(Array.isArray(res.collections));
        done(err);
      }
    );
  });

  it('should perform a federated query for notices', function(done) {
    discovery.federatedQueryNotices(
      {
        environment_id: environment_id,
        configuration_id: configuration_id,
        collection_ids: [collection_id, collection_id2],
        filter: 'yesplease',
        count: 10,
        sort: ['+field_1', '-field_2'],
        natural_language_query: 'a question about stuff and things',
      },
      function(err, res) {
        assert.ifError(err);
        assert(res);
        assert(Array.isArray(res.results));
        done(err);
      }
    );
  });

  describe('add-query-delete', function() {
    it('addDocument()', function(done) {
      const document_obj = {
        environment_id: environment_id,
        collection_id: collection_id,
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
        filename: 'sampleWord.docx',
      };

      discovery.addDocument(document_obj, function(err, response) {
        assert.ifError(err);
        assert(response.document_id);
        done(err);
      });
    });

    it('addJsonDocument()', function(done) {
      const document_obj = {
        environment_id: environment_id,
        collection_id: collection_id,
        file: {
          foo: 'bar',
          from: 'node-sdk integration test',
          test_date: new Date().toString(),
        },
      };

      discovery.addJsonDocument(document_obj, function(err, response) {
        assert.ifError(err);
        assert(response.document_id);
        done(err);
      });
    });

    it('query()', function(done) {
      discovery.query(
        {
          environment_id: environment_id,
          collection_id: collection_id,
          query: '',
        },
        function(err, res) {
          assert.ifError(err);
          assert(res);
          assert.equal(typeof res.matching_results, 'number');
          assert(Array.isArray(res.results));
          done(err);
        }
      );
    });

    it('delete all documents', function(done) {
      discovery.query(
        {
          environment_id: environment_id,
          collection_id: collection_id,
          query: '',
        },
        function(err, res) {
          assert.ifError(err);
          async.eachSeries(
            res.results,
            function(doc, next) {
              // console.log('deleting ', doc);
              discovery.deleteDocument(
                {
                  environment_id: environment_id,
                  collection_id: collection_id,
                  document_id: doc.id,
                },
                function(err, res) {
                  // console.log('deleted', err, res);
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
          environment_id,
          source_type: sourceType,
          credential_details: {
            credential_type: 'saml',
            username: 'myUserName',
            password: 'pass1234',
            organization_url: 'www.sharepoint-org.com/organization',
          },
        },
        function(err, res) {
          assert.ifError(err);
          assert(Object.keys(res).length);
          assert(res.credential_id);
          assert.equal(res.source_type, sourceType);
          // save the credential id for later tests
          credentialId = res.credential_id;
          done();
        }
      );
    });

    it('should listCredentials', function(done) {
      discovery.listCredentials(
        {
          environment_id,
        },
        function(err, res) {
          assert.ifError(err);
          assert(Array.isArray(res.credentials));
          assert(res.credentials.length);
          done();
        }
      );
    });

    it('should updateCredentials', function(done) {
      discovery.updateCredentials(
        {
          environment_id,
          credential_id: credentialId,
          source_type: sourceType,
          credential_details: {
            credential_type: 'saml',
            username: 'myUserName',
            password: 'new!longer!password!123',
            organization_url: 'www.sharepoint-org.com/organization',
          },
        },
        function(err, res) {
          assert.ifError(err);
          assert(Object.keys(res).length);
          assert.equal(res.credential_id, credentialId);
          assert.equal(res.source_type, sourceType);
          done();
        }
      );
    });

    it('should getCredentials', function(done) {
      discovery.getSourceCredentials(
        {
          environment_id,
          credential_id: credentialId,
        },
        function(err, res) {
          assert.ifError(err);
          assert(Object.keys(res).length);
          assert.equal(res.credential_id, credentialId);
          assert.equal(res.source_type, sourceType);
          done();
        }
      );
    });

    it('should deleteCredentials', function(done) {
      discovery.deleteCredentials(
        {
          environment_id,
          credential_id: credentialId,
        },
        function(err, res) {
          assert.ifError(err);
          assert.equal(res.credential_id, credentialId);
          assert.equal(res.status, 'deleted');
          done();
        }
      );
    });
  });

  describe('events tests', function() {
    let document_id;
    let session_token;

    before(function(done) {
      const addDocParams = {
        environment_id,
        collection_id,
        file: fs.createReadStream('./test/resources/sampleWord.docx'),
      };

      discovery.addDocument(addDocParams, function(error, response) {
        document_id = response.document_id;

        const queryParams = {
          environment_id,
          collection_id,
          natural_language_query: 'jeopardy',
        };

        discovery.query(queryParams, function(err, res) {
          session_token = res.session_token;
          done();
        });
      });
    });

    it('should create event', function(done) {
      const type = 'click';
      const createEventParams = {
        type,
        data: {
          environment_id,
          session_token,
          collection_id,
          document_id,
        },
      };
      discovery.createEvent(createEventParams, function(err, res) {
        assert.ifError(err);
        assert.equal(res.type, type);
        assert.equal(res.data.environment_id, environment_id);
        assert.equal(res.data.collection_id, collection_id);
        assert.equal(res.data.document_id, document_id);
        assert.equal(res.data.session_token, session_token);
        assert(res.data.result_type);
        assert(res.data.query_id);
        done();
      });
    });

    after(function(done) {
      const params = {
        environment_id,
        collection_id,
        document_id,
      };
      discovery.deleteDocument(params, function(err, res) {
        done();
      });
    });
  });

  describe('metrics tests', function() {
    it('should get metrics event rate', function(done) {
      discovery.getMetricsEventRate(function(err, res) {
        assert.ifError(err);
        assert(res.aggregations);
        assert(Array.isArray(res.aggregations));
        assert(res.aggregations.length);
        assert(res.aggregations[0].results);
        assert(Array.isArray(res.aggregations[0].results));
        assert(res.aggregations[0].results.length);
        assert.notEqual(res.aggregations[0].results[0].event_rate, undefined);
        done();
      });
    });
    it('should get metrics query', function(done) {
      discovery.getMetricsQuery(function(err, res) {
        assert.ifError(err);
        assert(res.aggregations);
        assert(Array.isArray(res.aggregations));
        assert(res.aggregations.length);
        assert(res.aggregations[0].results);
        assert(Array.isArray(res.aggregations[0].results));
        assert(res.aggregations[0].results.length);
        assert.notEqual(res.aggregations[0].results[0].matching_results, undefined);
        done();
      });
    });
    it('should get metrics query event', function(done) {
      discovery.getMetricsQueryEvent(function(err, res) {
        assert.ifError(err);
        assert(res.aggregations);
        assert(Array.isArray(res.aggregations));
        assert(res.aggregations.length);
        assert(res.aggregations[0].results);
        assert(Array.isArray(res.aggregations[0].results));
        assert(res.aggregations[0].results.length);
        assert.notEqual(res.aggregations[0].results[0].matching_results, undefined);
        done();
      });
    });
    it('should get metrics query no results', function(done) {
      discovery.getMetricsQueryNoResults(function(err, res) {
        assert.ifError(err);
        assert(res.aggregations);
        assert(Array.isArray(res.aggregations));
        assert(res.aggregations.length);
        assert(res.aggregations[0].results);
        assert(Array.isArray(res.aggregations[0].results));
        assert(res.aggregations[0].results.length);
        assert.notEqual(res.aggregations[0].results[0].matching_results, undefined);
        done();
      });
    });
    it('should get metrics query token event', function(done) {
      const count = 2;
      const params = { count };
      discovery.getMetricsQueryTokenEvent(params, function(err, res) {
        assert.ifError(err);
        assert(res.aggregations);
        assert(Array.isArray(res.aggregations));
        assert(res.aggregations.length);
        assert(res.aggregations[0].results);
        assert(Array.isArray(res.aggregations[0].results));
        assert.equal(res.aggregations[0].results.length, count);
        assert.notEqual(res.aggregations[0].results[0].event_rate, undefined);
        done();
      });
    });
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
      discovery.queryLog(params, function(err, res) {
        assert.ifError(err);
        assert(res.matching_results);
        assert(res.results);
        assert(Array.isArray(res.results));
        assert.equal(res.results.length, count);
        assert.notEqual(res.results[0].natural_language_query.indexOf(filter), -1);
        done();
      });
    });
  });
});
