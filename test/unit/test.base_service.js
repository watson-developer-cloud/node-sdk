'use strict';
// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
const BaseService = require('../../lib/base_service').BaseService;
const assert = require('assert');
const util = require('util');

function TestService(options) {
  BaseService.call(this, options);
}
util.inherits(TestService, BaseService);
TestService.prototype.name = 'test';
TestService.prototype.version = 'v1';
TestService.URL = 'https://gateway.watsonplatform.net/test/api';

describe('BaseService', function() {
  let env;
  beforeEach(function() {
    env = process.env;
    process.env = {};
  });
  afterEach(function() {
    process.env = env;
  });

  it('should support token auth', function() {
    const instance = new BaseService({ token: 'foo' });
    assert.equal(instance._options.headers['X-Watson-Authorization-Token'], 'foo');
  });

  it('should return hard-coded credentials', function() {
    const instance = new TestService({ username: 'user', password: 'pass' });
    const actual = instance.getCredentials();
    const expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
  });

  it('should return credentials and url from the environment', function() {
    process.env.TEST_USERNAME = 'env_user';
    process.env.TEST_PASSWORD = 'env_pass';
    process.env.TEST_URL = 'http://foo';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      username: 'env_user',
      password: 'env_pass',
      url: 'http://foo',
    };
    assert.deepEqual(actual, expected);
  });

  it('should allow mixing credentials from the environment and the default url', function() {
    process.env.TEST_USERNAME = 'env_user';
    process.env.TEST_PASSWORD = 'env_pass';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      username: 'env_user',
      password: 'env_pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
  });

  it('should return credentials from VCAP_SERVICES', function() {
    process.env.VCAP_SERVICES = JSON.stringify({
      test: [
        {
          credentials: {
            password: 'vcap_pass',
            url: 'https://gateway.watsonplatform.net/test/api',
            username: 'vcap_user',
          },
        },
      ],
    });
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      username: 'vcap_user',
      password: 'vcap_pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
  });

  it('should prefer hard-coded credentials over environment properties', function() {
    process.env.TEST_USERNAME = 'env_user';
    process.env.TEST_PASSWORD = 'env_pass';
    const instance = new TestService({ username: 'user', password: 'pass' });
    const actual = instance.getCredentials();
    const expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
  });

  it('should prefer environment properties over vcap_services', function() {
    process.env.VCAP_SERVICES = JSON.stringify({
      test: [
        {
          credentials: {
            password: 'vcap_pass',
            url: 'https://gateway.watsonplatform.net/test/api',
            username: 'vcap_user',
          },
        },
      ],
    });
    process.env.TEST_USERNAME = 'env_user';
    process.env.TEST_PASSWORD = 'env_pass';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      username: 'env_user',
      password: 'env_pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
  });
});
