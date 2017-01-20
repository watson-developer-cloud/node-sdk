// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
var BaseService = require('../../lib/base_service');
var assert = require('assert');
var util = require('util');


function TestService(options) {
  BaseService.call(this, options);
}
util.inherits(TestService, BaseService);
TestService.prototype.name = 'test';
TestService.prototype.version = 'v1';
TestService.URL = 'https://gateway.watsonplatform.net/test/api';

describe('BaseService', function() {

  var env;
  beforeEach(function() {
    env = process.env;
    process.env = {};
  });
  afterEach(function() {
    process.env = env;
  });

  it('should support token auth', function() {
    var instance = new BaseService({token: 'foo'});
    assert.equal(instance._options.headers['X-Watson-Authorization-Token'],'foo');
  });


  it('should return hard-coded credentials', function() {
    var instance = new TestService({username: 'user', password: 'pass'});
    var actual = instance.getCredentials();
    var expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api'
    };
    assert.deepEqual(actual, expected);
  });

  it('should return credentials from the environment', function() {
    process.env.TEST_USERNAME='env_user';
    process.env.TEST_PASSWORD='env_pass';
    var instance = new TestService();
    var actual = instance.getCredentials();
    var expected = {
      username: 'env_user',
      password: 'env_pass',
      url: 'https://gateway.watsonplatform.net/test/api'
    };
    assert.deepEqual(actual, expected);
  });

  it('should return credentials from VCAP_SERVICES', function() {
    process.env.VCAP_SERVICES = JSON.stringify({
      test: [{
        credentials: {
          password: 'vcap_pass',
          url: 'https://gateway.watsonplatform.net/test/api',
          username: 'vcap_user'
        }
      }]
    });
    var instance = new TestService();
    var actual = instance.getCredentials();
    var expected = {
      username: 'vcap_user',
      password: 'vcap_pass',
      url: 'https://gateway.watsonplatform.net/test/api'
    };
    assert.deepEqual(actual, expected);
  });


  it('should prefer hard-coded credentials over environment properties', function() {
    process.env.TEST_USERNAME='env_user';
    process.env.TEST_PASSWORD='env_pass';
    var instance = new TestService({username: 'user', password: 'pass'});
    var actual = instance.getCredentials();
    var expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api'
    };
    assert.deepEqual(actual, expected);
  });

  it('should prefer environment properties over vcap_services', function() {
    process.env.VCAP_SERVICES = JSON.stringify({
      test: [{
        credentials: {
          password: 'vcap_pass',
          url: 'https://gateway.watsonplatform.net/test/api',
          username: 'vcap_user'
        }
      }]
    });
    process.env.TEST_USERNAME='env_user';
    process.env.TEST_PASSWORD='env_pass';
    var instance = new TestService();
    var actual = instance.getCredentials();
    var expected = {
      username: 'env_user',
      password: 'env_pass',
      url: 'https://gateway.watsonplatform.net/test/api'
    };
    assert.deepEqual(actual, expected);
  });

});
