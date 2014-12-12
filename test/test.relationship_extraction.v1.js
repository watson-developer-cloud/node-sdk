'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var qs     = require('qs');
var nock   = require('nock');


describe('relationship_extraction', function() {
  // Test params
  var noop = function(){};
  var service_request = {
    text: 'Messi is the best',
    dataset: 'ie-en-news'
  };
  var service_response = {
    sts: 'OK',
    xml: '<xml>It works!</xml>'
  };
  var wrapper_response = service_response.xml;
  var service_path = '/v1/sire/0';
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  before(function(){
    nock.disableNetConnect();
    nock(service.url)
    .persist()
    .post(service_path, qs.stringify({
        rt: 'json',
        sid: service_request.dataset,
        txt: service_request.text
    }))
    .reply(200, service_response);
  });

  after(function(){
    nock.cleanAll();
  });

  var relationship_extraction = watson.relationship_extraction(service);

  var missingParameter =function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check for missing text', function() {
    var params = {dataset: service_request.dataset};
    relationship_extraction.extract(params,missingParameter);
  });

  it('should check for missing dataset', function() {
    var params = {text: service_request.text};
    relationship_extraction.extract(params,missingParameter);
  });

  it('should check no parameters provided', function() {
    relationship_extraction.extract({},missingParameter);
    relationship_extraction.extract(null,missingParameter);
    relationship_extraction.extract(undefined,missingParameter);
  });

  it('should generate a valid payload', function() {
    var req = relationship_extraction.extract(service_request, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, qs.stringify({
      rt:'json',
      sid:service_request.dataset,
      txt:service_request.text
    }));
    assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    relationship_extraction.extract(service_request,function(err, response){
      if (err)
        done(err);
      else {
        assert.equal(response, wrapper_response);
        done();
      }
    });
  });

});