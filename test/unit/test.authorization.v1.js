'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');

const sinon = require('sinon');
const IamTokenManagerV1 = require('../../iam-token-manager/v1').IamTokenManagerV1;

describe('authorization', function() {
  // Test params
  const service_request = {
    url: 'http://ibm.com:80/text-to-speech-beta/api/foo/bar',
  };
  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: service_request.url,
    version: 'v1',
  };

  const rc_service = {
    iam_apikey: 'abc123',
    version: 'v1',
  };

  // tokens are URL-encoded when recieved from the service
  const mock_token = 'token';

  before(function() {
    nock.disableNetConnect();
    nock('http://ibm.com:80')
      .persist()
      .get('/authorization/api/v1/token')
      .query(function(params) {
        return params.url; // accept any querystring as long as it has a &url= parameter with some value set
      })
      .reply(200, mock_token);
  });

  after(function() {
    nock.cleanAll();
  });

  const authorization = watson.authorization(service);

  function missingParameter(done) {
    return function(err) {
      assert(err instanceof Error);
      assert(/required parameters/.test(err));
      done();
    };
  }

  function checkToken(done) {
    return function(err, res) {
      assert.ifError(err);
      assert.equal(res, mock_token);
      done();
    };
  }

  describe('getToken()', function() {
    it('should check for missing url param', function(done) {
      const params = {
        noturl: service_request.url,
      };
      authorization.getToken(params, missingParameter(done));
    });

    it('should generate a valid token payload', function(done) {
      authorization.getToken({ url: 'http://ibm.com/myservice/myresource' }, checkToken(done));
    });

    it('should default to url from credentials', function(done) {
      authorization.getToken(checkToken(done));
    });

    it('should return an iam access token if given iam_api_key', function(done) {
      const rc_authorization = watson.authorization(rc_service);
      assert.notEqual(rc_authorization.tokenManager, null);

      // mock the token manager
      const tokenManager = new IamTokenManagerV1({ iamApikey: rc_service.iam_apikey });
      const requestStub = sinon.stub(tokenManager, 'requestToken');
      requestStub.yields(null, { access_token: mock_token });

      // use the mocked token manager - we have already asserted that the
      // authorization object created a token manager for itself
      rc_authorization.tokenManager = tokenManager;

      rc_authorization.getToken(checkToken(done));
    });
  });
});
