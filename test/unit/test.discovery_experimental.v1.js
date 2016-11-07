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
    environments : '/v1/environments'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(paths.environments + '?version=' + service.version_date)
      .reply(200, {});
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
  });
});
