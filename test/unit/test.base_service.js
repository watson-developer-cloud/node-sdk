'use strict';
// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
const BaseService = require('../../lib/base_service').BaseService;
const assert = require('assert');
const util = require('util');
const sinon = require('sinon');
const requestwrapper = require('../../lib/requestwrapper');
const iamTokenManager = require('../../lib/iamTokenManager');

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

  it('should set header with access_token parameter', function() {
    const token = 'abc-1234';
    const instance = new TestService({ access_token: token });
    assert.equal(instance._options.headers['Authorization'], `Bearer ${token}`);
  });

  it('should update header with setAccessToken', function() {
    const instance = new TestService({ access_token: 'abc-1234' });
    const newToken = 'zyx-9876';
    instance.setAccessToken(newToken);
    assert.equal(instance._options.headers['Authorization'], `Bearer ${newToken}`);
  });

  it('should call send request immediately with header if has access_token', function() {
    const token = 'abc-1234';
    const requestSpy = sinon.spy(iamTokenManager, 'requestToken');
    const refreshSpy = sinon.spy(iamTokenManager, 'refreshToken');
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');

    sendRequestStub.returns(1);

    const instance = new TestService({ access_token: token });
    const response = instance.createRequest(null, null);

    assert.equal(response, 1);
    assert.equal(requestSpy.notCalled, true);
    assert.equal(refreshSpy.notCalled, true);

    sendRequestStub.restore();
    requestSpy.restore();
    refreshSpy.restore();
  });

  it('should request a token and set the auth header if given iam_apikey', function() {
    const apikey = 'abc-def-0';
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');
    const requestStub = sinon.stub(iamTokenManager, 'requestToken');
    const refreshStub = sinon.stub(iamTokenManager, 'refreshToken');

    const iamResponse = {
      access_token: '1234',
      refresh_token: '5678',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3600,
    };

    const parameters = {
      defaultOptions: {
        headers: {},
      },
    };

    const fakeUrl = 'iam.com/token';
    const params = {
      iam_apikey: apikey,
      iam_url: fakeUrl,
    };

    requestStub.yields(iamResponse);

    const instance = new TestService({ iam_apikey: apikey, iam_url: fakeUrl });
    instance.createRequest(parameters, null);
    const firstArgOfFirstCall = sendRequestStub.args[0][0];

    assert.equal(firstArgOfFirstCall.defaultOptions.headers.Authorization, 'Bearer 1234');
    assert.equal(sendRequestStub.calledOnce, true);
    assert.equal(requestStub.calledOnceWith(params), true);
    assert.equal(refreshStub.notCalled, true);
    assert.deepEqual(instance.tokenInfo, iamResponse);

    sendRequestStub.restore();
    requestStub.restore();
    refreshStub.restore();
  });

  it('should refresh the token and set the header if the token is expired', function() {
    const apikey = 'abc-def-0';
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');
    const requestStub = sinon.stub(iamTokenManager, 'requestToken');
    const refreshStub = sinon.stub(iamTokenManager, 'refreshToken');

    const initialRefreshToken = '3456';
    const currentTokenInfo = {
      access_token: '1234',
      refresh_token: initialRefreshToken,
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000),
    };

    const iamResponse = {
      access_token: '9012',
      refresh_token: '3456',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3600,
    };

    const parameters = {
      defaultOptions: {
        headers: {},
      },
    };

    const params = {
      refresh_token: initialRefreshToken,
      iam_url: 'https://iam.ng.bluemix.net/identity/token',
    };

    refreshStub.yields(iamResponse);

    const instance = new TestService({ iam_apikey: apikey });
    instance.tokenInfo = currentTokenInfo;

    instance.createRequest(parameters, null);
    const firstArgOfFirstCall = sendRequestStub.args[0][0];

    assert.equal(firstArgOfFirstCall.defaultOptions.headers.Authorization, 'Bearer 9012');
    assert.equal(sendRequestStub.calledOnce, true);
    assert.equal(requestStub.notCalled, true);
    assert.equal(refreshStub.calledOnceWith(params), true);
    assert.deepEqual(instance.tokenInfo, iamResponse);

    sendRequestStub.restore();
    requestStub.restore();
    refreshStub.restore();
  });

  it('should use the access_token in the header if it has already been retrieved', function() {
    const apikey = 'abc-def-0';
    const sendRequestStub = sinon.stub(requestwrapper, 'sendRequest');
    const requestStub = sinon.stub(iamTokenManager, 'requestToken');
    const refreshStub = sinon.stub(iamTokenManager, 'refreshToken');

    const currentTokenInfo = {
      access_token: '1234',
      refresh_token: '5678',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3600,
    };

    const parameters = {
      defaultOptions: {
        headers: {},
      },
    };

    const instance = new TestService({ iam_apikey: apikey });
    instance.tokenInfo = currentTokenInfo;

    instance.createRequest(parameters, null);
    const firstArgOfFirstCall = sendRequestStub.args[0][0];

    assert.equal(firstArgOfFirstCall.defaultOptions.headers.Authorization, 'Bearer 1234');
    assert.equal(sendRequestStub.calledOnce, true);
    assert.equal(requestStub.notCalled, true);
    assert.equal(refreshStub.notCalled, true);

    sendRequestStub.restore();
    requestStub.restore();
    refreshStub.restore();
  });
});
