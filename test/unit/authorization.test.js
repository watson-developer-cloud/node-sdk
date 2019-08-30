'use strict';

const Authorization = require('../../authorization/v1');
const { BasicAuthenticator, IamAuthenticator } = require('ibm-cloud-sdk-core');

describe('authorization', function() {
  const url = 'http://ibm.com:80/text-to-speech-beta/api/foo/bar';
  const service = {
    url,
    authenticator: new BasicAuthenticator({
      username: 'batman',
      password: 'bruce-wayne',
    }),
  };

  const serviceManagedToken = {
    url,
    authenticator: new IamAuthenticator({
      apikey: 'abc123',
    }),
  };

  const authorization = new Authorization(service);
  const authorizationIam = new Authorization(serviceManagedToken);

  const createRequestMock = jest.spyOn(authorization, 'createRequest');
  createRequestMock.mockImplementation((params, cb) => cb(null, mock_token));

  // tokens are URL-encoded when recieved from the service
  const mock_token = 'token';

  function missingParameter(done) {
    return function(err) {
      expect(err).toBeInstanceOf(Error);
      expect(/required parameters/.test(err)).toBe(true);
      done();
    };
  }

  function checkToken(done) {
    return function(err, res) {
      expect(err).toBeNull();
      expect(res).toBe(mock_token);
      done();
    };
  }

  describe('getToken()', function() {
    it('should check for missing url param', function(done) {
      const params = {
        noturl: url,
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
      expect(authorizationIam.tokenManager).not.toBeNull();

      // mock the token manager request method
      const requestMock = jest.spyOn(authorizationIam.authenticator.tokenManager, 'getToken');
      requestMock.mockImplementation(cb => cb(null, mock_token));

      authorizationIam.getToken(checkToken(done));
    });
  });
});
