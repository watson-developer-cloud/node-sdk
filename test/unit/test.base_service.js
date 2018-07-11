'use strict';
// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
const BaseService = require('../../lib/base_service').BaseService;
const requestwrapper = require('../../lib/requestwrapper');
const assert = require('assert');
const util = require('util');
const sinon = require('sinon');

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

  it('should handle iam apikey credential from VCAP_SERVICES', function() {
    process.env.VCAP_SERVICES = JSON.stringify({
      test: [
        {
          credentials: {
            apikey: '123456789',
            iam_apikey_description: 'Auto generated apikey...',
            iam_apikey_name: 'auto-generated-apikey-111-222-333',
            iam_role_crn: 'crn:v1:bluemix:public:iam::::serviceRole:Manager',
            iam_serviceid_crn: 'crn:v1:staging:public:iam-identity::a/::serviceid:ServiceID-1234',
            url: 'https://gateway.watsonplatform.net/test/api',
          },
        },
      ],
    });
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      iam_apikey: '123456789',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
    assert.notEqual(instance.tokenManager, null);
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

  it('should set authorization header after getting a token from the token manager', function(done) {
    const instance = new TestService({ iam_apikey: 'abcd-1234' });
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');
    const getTokenStub = sinon.stub(instance.tokenManager, 'getToken');
    const accessToken = '567890';
    const responseMessage = 'response';
    const parameters = {
      defaultOptions: {
        headers: {},
      },
    };

    sendRequestStub.yields(null, responseMessage);
    getTokenStub.yields(null, accessToken);

    instance.createRequest(parameters, function(err, res) {
      const authHeader = sendRequestStub.args[0][0].defaultOptions.headers.Authorization;
      assert.equal(`Bearer ${accessToken}`, authHeader);
      assert.equal(responseMessage, res);

      sendRequestStub.restore();
      getTokenStub.restore();
      done();
    });
  });

  it('should send an error back to the user if the token request went bad', function(done) {
    const instance = new TestService({ iam_apikey: 'abcd-1234' });
    const sendRequestSpy = sinon.spy(requestwrapper, 'sendRequest');
    const getTokenStub = sinon.stub(instance.tokenManager, 'getToken');
    const errorMessage = 'Error in the token request.';

    getTokenStub.yields(errorMessage);

    instance.createRequest({}, function(err, res) {
      assert.equal(err, errorMessage);
      assert.equal(sendRequestSpy.notCalled, true);

      sendRequestSpy.restore();
      getTokenStub.restore();
      done();
    });
  });

  it('should call sendRequest right away if token manager is null', function(done) {
    const instance = new TestService({ username: 'user', password: 'pass' });
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');
    const responseMessage = 'response';

    sendRequestStub.yields(null, responseMessage);

    instance.createRequest({}, function(err, res) {
      assert.equal(res, responseMessage);
      assert.equal(instance.tokenManager, null);

      sendRequestStub.restore();
      done();
    });
  });

  it('should not fail if setAccessToken is called and token manager is null', function() {
    const instance = new TestService({ username: 'user', password: 'pass' });

    assert.equal(instance.tokenManager, null);
    instance.setAccessToken('abcd-1234');
    assert.notEqual(instance.tokenManager, null);
  });

  it('should create a token manager instance if env variables specify iam credentials', function() {
    process.env.TEST_IAM_APIKEY = 'test1234';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      iam_apikey: 'test1234',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    assert.deepEqual(actual, expected);
    assert.notEqual(instance.tokenManager, null);
  });

  it('should create a token manager instance if username is `apikey` and use the password as the API key', function() {
    const apikey = 'abcd-1234';
    const instance = new TestService({
      username: 'apikey',
      password: apikey,
    });
    assert.notEqual(instance.tokenManager, null);
    assert.equal(instance.tokenManager.iamApikey, apikey);
    assert.equal(instance._options.headers, undefined);
  });
});
