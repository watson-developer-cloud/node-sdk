'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');

describe('authorization', function() {


  // Test params
  var service_request = {
    url: 'http://ibm.com:80/text-to-speech-beta/api/foo/bar'
  };
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: service_request.url,
    version: 'v1'
  };

  // tokens are URL-encoded when recieved from the service
  var mock_token = 'token';

  before(function() {
    nock.disableNetConnect();
    nock('http://ibm.com:80')
      .persist()
      .get('/authorization/api/v1/token')
      .query(function(params){
        return params.url; // accept any querystring as long as it has a &url= parameter with some value set
      })
      .reply(200, mock_token);
  });

  after(function() {
    nock.cleanAll();
  });

  var authorization = watson.authorization(service);

  function missingParameter(done) {
    return function(err) {
      assert(err instanceof Error);
      assert(/required parameters/.test(err));
      done();
    }
  }

  function checkToken(done) {
    return function(err, res) {
      assert.ifError(err);
      assert.equal(res, mock_token);
      done();
    };
  }

  describe('getToken()', function(){

    it('should check for missing url param', function(done) {
      var params = {
        noturl: service_request.url
      };
      authorization.getToken(params, missingParameter(done));
    });

    it('should generate a valid token payload', function(done) {
      authorization.getToken({url: 'http://ibm.com/myservice/myresource'}, checkToken(done));
    });

    it('should default to url from credentials', function(done) {
      authorization.getToken(checkToken(done));
    });

  });

});
