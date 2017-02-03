'use strict';

const assert = require('assert');
const Discovery = require('../../discovery/v1-experimental');
const nock = require('nock');

describe('discovery-v1-experimental', function() {
  const noop = function() {};

  // Test params
  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1-experimental',
    version_date: '2016-11-07'
  };

  const service1 = {
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    username: 'batman'
  };

  const paths = {
    environments: '/v1/environments',
    environmentinfo: '/v1/environments/env-guid',
    collections: '/v1/environments/env-guid/collections',
    collectioninfo: '/v1/environments/env-guid/collections/col-guid',
    query: '/v1/environments/env-guid/collections/col-guid/query'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(paths.environments + '?version=' + service.version_date)
      .reply(200, { environment_id: 'yes' })
      .get(paths.environmentinfo + '?version=' + service.version_date)
      .reply(200, { environment_id: 'info' })
      .get(paths.collections + '?version=' + service.version_date)
      .reply(200, { collection_id: 'yes' })
      .get(paths.collectioninfo + '?version=' + service.version_date)
      .reply(200, { collection_id: 'info' })
      .get(paths.query + '?version=' + service.version_date)
      .reply(200, { query: 'yes' });
  });

  after(function() {
    nock.cleanAll();
  });

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  const discovery = new Discovery(service);

  describe('discovery()', function() {
    it('should generate a valid payload', function() {
      const req = discovery.getEnvironments({}, noop);
      assert.equal(req.uri.href, service.url + paths.environments + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should check no parameters provided (negative test)', function() {
      discovery.getEnvironments({}, missingParameter);
      discovery.getEnvironments(null, missingParameter);
      discovery.getEnvironments(undefined, missingParameter);
    });

    it('should generate version_date was not specified (negative test)', function() {
      let threw = false;
      try {
        // eslint-disable-next-line
        var discovery = new Discovery(service1);
      } catch (err) {
        threw = true;
        assert.equal(err.message, 'Argument error: version_date was not specified, use DiscoveryV1Experimental.VERSION_DATE_2016_07_11');
      }
      assert(threw, 'should throw an error');
    });

    it('should get an environment information', function() {
      const req = discovery.getEnvironment({ environment_id: 'env-guid' }, noop);
      assert.equal(req.uri.href, service.url + paths.environmentinfo + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should get collections from an environment', function() {
      const req = discovery.getCollections({ environment_id: 'env-guid' }, noop);
      assert.equal(req.uri.href, service.url + paths.collections + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should get information about a specific collection and environment', function() {
      const req = discovery.getCollection(
        {
          environment_id: 'env-guid',
          collection_id: 'col-guid'
        },
        noop
      );
      assert.equal(req.uri.href, service.url + paths.collectioninfo + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });

    it('should perform a query', function() {
      const req = discovery.query(
        {
          environment_id: 'env-guid',
          collection_id: 'col-guid',
          filter: 'yesplease',
          count: 10
        },
        noop
      );
      assert.equal(req.uri.href, service.url + paths.query + '?version=' + service.version_date + '&filter=yesplease&count=10');
      assert.equal(req.method, 'GET');
    });
  });
});
