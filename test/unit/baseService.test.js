'use strict';

const BaseService = require('../../lib/base_service').BaseService;
const requestwrapper = require('../../lib/requestwrapper');
const util = require('util');

function TestService(options) {
  BaseService.call(this, options);
}
util.inherits(TestService, BaseService);
TestService.prototype.name = 'test';
TestService.prototype.version = 'v1';
TestService.URL = 'https://gateway.watsonplatform.net/test/api';

// set up mock for sendRequest
const sendRequestMock = jest.spyOn(requestwrapper, 'sendRequest');
const responseMessage = 'response';
sendRequestMock.mockImplementation((params, cb) => {
  cb(null, responseMessage);
});
afterEach(() => {
  sendRequestMock.mockClear();
});

describe('BaseService', function() {
  let env;
  beforeEach(function() {
    env = process.env;
    process.env = {};
  });
  afterEach(function() {
    process.env = env;
  });

  it('should not fail without credentials if use_unauthenticated is true', function() {
    expect(function() {
      new TestService({
        use_unauthenticated: true,
        version: 'v1',
      });
    }).not.toThrow();
  });

  it('should fail without credentials if use_unauthenticated is false', function() {
    expect(function() {
      new TestService({
        use_unauthenticated: false,
        version: 'v1',
      });
    }).toThrow(/Insufficient credentials/);
  });

  it('should check for missing authentication', function() {
    expect(function() {
      new TestService({
        version: 'v1',
        username: 'user',
      });
    }).toThrow(/password/);

    expect(function() {
      new TestService({
        version: 'v1',
        password: 'pass',
      });
    }).toThrow(/username/);

    expect(function() {
      new TestService({
        password: 'pass',
        username: 'user',
        version: 'v1',
      });
    }).not.toThrow();
  });

  it('should support token auth', function() {
    const instance = new BaseService({ token: 'foo' });
    expect(instance._options.headers['X-Watson-Authorization-Token']).toBe('foo');
  });

  it('should return hard-coded credentials', function() {
    const instance = new TestService({ username: 'user', password: 'pass' });
    const actual = instance.getCredentials();
    const expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
    expect(instance.tokenManager).toBeDefined();
    expect(instance.tokenManager).not.toBeNull();
  });

  it('should prefer hard-coded credentials over ibm credentials file', function() {
    process.env.IBM_CREDENTIALS_FILE = __dirname + '../resources/ibm-credentials.env';
    const instance = new TestService({ username: 'user', password: 'pass' });
    const actual = instance.getCredentials();
    const expected = {
      username: 'user',
      password: 'pass',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    expect(actual).toEqual(expected);
  });

  it('should prefer ibm credentials file over environment properties', function() {
    process.env.IBM_CREDENTIALS_FILE = __dirname + '/../resources/ibm-credentials.env';
    process.env.TEST_USERNAME = 'env_user';
    process.env.TEST_PASSWORD = 'env_pass';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      username: '123456789',
      password: 'abcd',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
  });

  it('should set authorization header after getting a token from the token manager', function(done) {
    const instance = new TestService({ iam_apikey: 'abcd-1234' });
    const accessToken = '567890';
    const parameters = {
      defaultOptions: {
        headers: {},
      },
    };

    const getTokenMock = jest.spyOn(instance.tokenManager, 'getToken');
    getTokenMock.mockImplementation(cb => {
      cb(null, accessToken);
    });

    instance.createRequest(parameters, function(err, res) {
      const authHeader = sendRequestMock.mock.calls[0][0].defaultOptions.headers.Authorization;
      expect(`Bearer ${accessToken}`).toBe(authHeader);
      expect(res).toBe(responseMessage);

      getTokenMock.mockReset();
      done();
    });
  });

  it('should send an error back to the user if the token request went bad', function(done) {
    const instance = new TestService({ iam_apikey: 'abcd-1234' });
    const errorMessage = 'Error in the token request.';

    const getTokenMock = jest.spyOn(instance.tokenManager, 'getToken');
    getTokenMock.mockImplementation(cb => {
      cb(errorMessage);
    });

    instance.createRequest({}, function(err, res) {
      expect(err).toBe(errorMessage);
      expect(sendRequestMock).not.toHaveBeenCalled();
      getTokenMock.mockReset();
      done();
    });
  });

  it('should call sendRequest right away if token manager is null', function(done) {
    const instance = new TestService({ username: 'user', password: 'pass' });
    instance.createRequest({}, function(err, res) {
      expect(res).toBe(responseMessage);
      expect(instance.tokenManager).toBeNull();
      done();
    });
  });

  it('should not fail if setAccessToken is called and token manager is null', function() {
    const instance = new TestService({ username: 'user', password: 'pass' });
    expect(instance.tokenManager).toBeNull();

    instance.setAccessToken('abcd-1234');
    expect(instance.tokenManager).toBeDefined();
    expect(instance.tokenManager).not.toBeNull();
  });

  it('should create a token manager instance if env variables specify iam credentials', function() {
    process.env.TEST_IAM_APIKEY = 'test1234';
    const instance = new TestService();
    const actual = instance.getCredentials();
    const expected = {
      iam_apikey: 'test1234',
      url: 'https://gateway.watsonplatform.net/test/api',
    };
    expect(actual).toEqual(expected);
    expect(instance.tokenManager).toBeDefined();
    expect(instance.tokenManager).not.toBeNull();
  });

  it('should create a token manager instance if username is `apikey` and use the password as the API key', function() {
    const apikey = 'abcd-1234';
    const instance = new TestService({
      username: 'apikey',
      password: apikey,
    });
    expect(instance.tokenManager).toBeDefined();
    expect(instance.tokenManager).not.toBeNull();
    expect(instance.tokenManager.iamApikey).toBe(apikey);
    expect(instance._options.headers).toBeUndefined();
  });

  it('should not create a basic auth header if iam creds are given', function() {
    const apikey = 'abcd-1234';
    const instance = new TestService({
      iam_apikey: apikey,
      username: 'notarealuser',
      password: 'badpassword1',
    });
    expect(instance.tokenManager).toBeDefined();
    expect(instance.tokenManager).not.toBeNull();
    expect(instance.tokenManager.iamApikey).toBe(apikey);
    expect(instance._options.headers).toBeUndefined();
  });

  it('should create a basic auth header if username is `apikey` and password starts with `icp-`', function() {
    const instance = new TestService({
      username: 'apikey',
      password: 'icp-1234',
    });
    const authHeader = instance._options.headers.Authorization;
    expect(instance.tokenManager).toBeNull();
    expect(authHeader.startsWith('Basic')).toBe(true);
  });

  it('should set rejectUnauthorized to `false` if `disable_ssl_verification` is `true`', function() {
    const instance = new TestService({
      username: 'apikey',
      password: 'icp-1234',
      disable_ssl_verification: true,
    });
    expect(instance._options.rejectUnauthorized).toBe(false);
  });

  it('should set rejectUnauthorized to `true` if `disable_ssl_verification` is `false`', function() {
    const instance = new TestService({
      username: 'apikey',
      password: 'icp-1234',
      disable_ssl_verification: false,
    });
    expect(instance._options.rejectUnauthorized).toBe(true);
  });

  it('should set rejectUnauthorized to `true` if `disable_ssl_verification` is not set', function() {
    const instance = new TestService({
      username: 'apikey',
      password: 'icp-1234',
    });
    expect(instance._options.rejectUnauthorized).toBe(true);
  });

  describe('check credentials for common problems', function() {
    function assertConstructorThrows(params) {
      expect(() => {
        new TestService(params);
      }).toThrowError(
        'Revise these credentials - they should not start or end with curly brackets or quotes.'
      );
    }

    it('should throw when username starts with {', function() {
      assertConstructorThrows({
        username: '{batman}',
        password: 'goodpass',
      });
    });

    it('should throw when username starts with "', function() {
      assertConstructorThrows({
        username: '"<batman">',
        password: 'goodpass',
      });
    });

    it('should throw when password starts with {', function() {
      assertConstructorThrows({
        username: 'batman',
        password: '{badpass}',
      });
    });

    it('should throw when password starts with "', function() {
      assertConstructorThrows({
        username: 'batman',
        password: '"badpass"',
      });
    });

    it('should throw when iam_apikey starts with {', function() {
      assertConstructorThrows({
        iam_apikey: '{abc123}',
      });
    });

    it('should throw when iam_apikey starts with "', function() {
      assertConstructorThrows({
        iam_apikey: '"<abc123',
      });
    });

    it('should throw when url starts with {', function() {
      assertConstructorThrows({
        username: 'batman',
        password: 'goodpass',
        url: '{watson-url}/some-api/v1/endpoint',
      });
    });

    it('should throw when url ends with }', function() {
      assertConstructorThrows({
        username: 'batman',
        password: 'goodpass',
        url: 'watson-url.com/some-api/v1/endpoint}',
      });
    });

    it('should throw when url starts with "', function() {
      assertConstructorThrows({
        username: 'batman',
        password: 'goodpass',
        url: '"watson-url.com/some-api/v1/endpoint',
      });
    });

    it('should throw when mutiple creds are bad', function() {
      assertConstructorThrows({
        username: '{batman}',
        password: '"<badpass>"',
        url: '{watson-url}/some-api/v1/endpoint',
      });
    });
  });
});
