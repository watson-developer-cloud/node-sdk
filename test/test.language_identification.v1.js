'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var qs     = require('qs');
var nock   = require('nock');


describe('language_identification', function() {
  // Test params
  var payload = { text : 'Messi is the best' };
  var service_request = {
    sid: 'lid-generic',
    rt: 'json',
    txt: payload.text
  };
  var service_path = '/v1/txtlid/0';

  var service_response = { sts: 'OK', lang:'en-US'};
  var wrapper_response = {language: 'en-US'};
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var noop = function(){};

  var missingParameter =function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var language_identification = watson.language_identification(service);

  before(function(){
    nock.disableNetConnect();
    nock(service.url)
    .persist()
    .post(service_path, qs.stringify(service_request))
    .reply(200, service_response);
  });

  after(function(){
    nock.cleanAll();
  });

  it('should check no parameters provided', function() {
    language_identification.identify({},missingParameter);
    language_identification.identify(null,missingParameter);
    language_identification.identify(undefined,missingParameter);
  });

  it('should generate a valid payload', function() {
    var req = language_identification.identify(payload, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, qs.stringify(service_request));
    assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    language_identification.identify(payload,function(err, response){
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response),JSON.stringify(wrapper_response));
        done();
      }
    });
  });

});