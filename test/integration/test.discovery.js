'use strict';

var nock = require('nock');
var DiscoveryV1 = require('../../discovery/v1');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
var assert = require('assert');

var THIRTY_SECONDS = 30000;
var TEN_SECONDS = 10000;
var TWO_SECONDS = 2000;


describe('dialog_integration', function() {
  this.timeout(THIRTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  //this.retries(1);

  var discovery;
  var environment_id = auth.discovery.environment_id;
  var configuration_id = auth.discovery.configuration_id;
  //var collection_id;

  before(function() {
    nock.enableNetConnect();
    discovery = new DiscoveryV1(auth.discovery);
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
    discovery.getEnvironment({environment_id: environment_id}, function(err, env) {
      assert.ifError(err);
      assert(env);
      assert.equal(env.environment_id, environment_id);
      done();
    });
  });

  it('should getConfigurations()', function(done) {
    discovery.getConfigurations({environment_id: environment_id}, function(err, res) {
      console.log(err, res);
      assert.ifError(err);
      assert(Array.isArray(res.configurations));
      assert(res.configurations.length);
      assert(res.configurations[0]);
      assert.equal(res.configurations[0].configuration_id, configuration_id);
      done();
    });
  });

  it('should getConfiguration()', function(done) {
    discovery.getConfiguration({
      environment_id: environment_id,
      configuration_id: configuration_id
    }, function(err, conf) {
      assert.ifError(err);
      assert(conf);
      assert.equal(conf.configuration_id, configuration_id);
      done();
    });
  });

  it.skip('should createCollection()', function(done) {
    discovery.createCollection({
      environment_id: environment_id,
      collection_name: 'node-sdk-test-' + Date.now(),
      description: "Test collection created by the Node.js SDK integration tests on " + new Date() + ". Should be deleted shortly",
      configuration_id: configuration_id,
      language_code: 'en_us'
    }, function(err, res) {
      assert.ifError(err); // Error: This operation is invalid for read-only environments. (?)
      //console.log(res);
      // todo: extract collection_id, use it in subsequent tests, delete it
      done();
    })
  });

  // it('should getCollections()', function(done) {
  //
  // });
  //
  // it('should getCollection()', function(done) {
  //
  // });
  //
  // it('should deleteCollection()', function(done) {
  //
  // });
});
