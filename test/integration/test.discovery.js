'use strict';

const nock = require('nock');
const DiscoveryV1 = require('../../discovery/v1');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const assert = require('assert');
const async = require('async');
const fs = require('fs');

const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

describe.skip('discovery_integration', function() {
  this.timeout(THIRTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  // this.retries(1);

  let discovery;
  let environment_id; // = auth.discovery.environment_id;
  let configuration_id; // = auth.discovery.configuration_id;
  let collection_id;

  before(function() {
    nock.enableNetConnect();
    discovery = new DiscoveryV1(
      Object.assign({}, auth.discovery, {
        version_date: DiscoveryV1.VERSION_DATE_2017_04_27
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
      assert.equal(res.configurations[0].configuration_id, configuration_id);
      done();
    });
  });

  it('should getConfiguration()', function(done) {
    discovery.getConfiguration(
      {
        environment_id: environment_id,
        configuration_id: configuration_id
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
        description: 'Test collection created by the Node.js SDK integration tests on ' + new Date() + '. Should be deleted shortly',
        configuration_id: configuration_id,
        language_code: 'en_us'
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
        configuration_id: configuration_id
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

  describe('add-query-delete', function() {
    it('addDocument()', function(done) {
      const document_obj = {
        environment_id: environment_id,
        collection_id: collection_id,
        file: fs.createReadStream(__dirname + '../resources/sample-docx.docx')
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
          test_date: new Date().toString()
        }
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
          query: ''
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
          query: ''
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
                  document_id: doc.id
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
});
