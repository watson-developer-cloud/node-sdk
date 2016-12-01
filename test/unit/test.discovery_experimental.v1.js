'use strict';

var assert = require('assert');
var Discovery = require('../../discovery/v1-experimental');
var nock   = require('nock');

describe('discovery-v1-experimental', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1-experimental',
    version_date: '2016-11-07'
  };

  var service1 = {
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    username: 'batman'
  };

  var paths = {
    environments : '/v1/environments',
    environmentinfo : '/v1/environments/env-guid',
    collections: '/v1/environments/env-guid/collections',
    collectioninfo: '/v1/environments/env-guid/collections/col-guid',
    query: '/v1/environments/env-guid/collections/col-guid/query'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(paths.environments + '?version=' + service.version_date)
      .reply(200, {'environment_id': 'yes'})
      .get(paths.environmentinfo + '?version=' + service.version_date)
      .reply(200, {'environment_id': 'info'})
      .get(paths.collections + '?version=' + service.version_date)
      .reply(200, {'collection_id': 'yes'})
      .get(paths.collectioninfo + '?version=' + service.version_date)
      .reply(200, {'collection_id': 'info'})
      .get(paths.query + '?version=' + service.version_date)
      .reply(200, {'query': 'yes'});
  });

  after(function() {
    nock.cleanAll();
  });

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var discovery = new Discovery(service);

  describe('discovery()', function() {
    it('should generate a valid payload', function() {
      var req = discovery.getEnvironments({}, noop);
      assert.equal(req.uri.href, service.url + paths.environments + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should check no parameters provided (negative test)', function() {
      discovery.getEnvironments({}, missingParameter);
      discovery.getEnvironments(null, missingParameter);
      discovery.getEnvironments(undefined, missingParameter);
    });

    it('should generate version_date was not specified (negative test)', function() {
      var threw = false;
      try {
        // eslint-disable-next-line
        var discovery = new Discovery(service1);
      }
      catch(err) {
        threw = true;
        assert.equal(err.message, 'Argument error: version_date was not specified, use 2016-11-07');
      }
      assert(threw, 'should throw an error')
    });

    it('should get an environment information', function() {
      var req = discovery.getEnvironment('env-guid', noop);
      assert.equal(req.uri.href, service.url + paths.environmentinfo + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should get collections from an environment', function() {
      var req = discovery.getCollections('env-guid', noop);
      assert.equal(req.uri.href, service.url + paths.collections + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should get information about a specific collection and environment', function() {
      var req = discovery.getCollection('env-guid', 'col-guid', noop);
      assert.equal(req.uri.href, service.url + paths.collectioninfo + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should perform a query', function() {
      var req = discovery.query('env-guid', 'col-guid', {'filter': 'yesplease', 'count': 10}, noop);
      assert.equal(req.uri.href, service.url + paths.query + '?version=' + service.version_date + '&filter=yesplease&count=10');
      assert.equal(req.method, 'GET');
      
    });
  });
});
