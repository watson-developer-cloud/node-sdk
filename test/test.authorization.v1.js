'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock   = require('nock');
var qs     = require('querystring');
var pick   = require('object.pick');
var omit   = require('object.omit');

describe('authorization', function() {

  var noop = function() {};

  // Test params
  var service_request = {
    url: 'http://ibm.com:80/text-to-speech-beta/api'
  };
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };
  var token_path = '/v1/token';
  var token_request = token_path + '?' + qs.stringify(service_request);

  var mock_token = 'token';

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .get(token_path)
      .reply(200, mock_token);
  });

  after(function() {
    nock.cleanAll();
  });

  var authorization = watson.authorization(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('getToken()', function(){

    it('should check for missing url param', function() {
      var params = {
        noturl: service_request.url
      };
      authorization.getToken(params, missingParameter);
    });

    it('should generate a valid token payload', function() {
      var checkToken = function(err, res) {
        assert.equal(res, mock_token);
      };

      authorization.getToken({url: 'http://ibm.com/myservice/myresource'}, checkToken);
    });

  });

});
