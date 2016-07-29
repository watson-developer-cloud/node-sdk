'use strict';

var assert = require('assert');
var watson = require('../index');
var qs     = require('qs');
var nock   = require('nock');

describe('relationship_extraction', function() {
  // Test params
  var noop = function() {};
  var service_request = {
    text: 'Messi is the best',
    dataset: 'ie-en-news'
  };
  var service_response = {
    doc: {
      entities: {
        entity: ['foo']
      }
    }
  };
  var service_path = '/v1/sire/0';
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1-beta'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, qs.stringify({
        rt: 'json',
        sid: service_request.dataset,
        txt: service_request.text
      }))
      .reply(200, service_response)
      .post(service_path, qs.stringify({
        rt: 'json',
        sid: 'foo',
        txt: 'bar'
      }))
      .reply(400);
  });

  after(function() {
    nock.cleanAll();
  });

  var relationship_extraction = watson.relationship_extraction(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    relationship_extraction.extract({}, missingParameter);
    relationship_extraction.extract(null, missingParameter);
    relationship_extraction.extract(undefined, missingParameter);
    relationship_extraction.extract({text:''}, missingParameter);
    relationship_extraction.extract({dataset:''}, missingParameter);

  });

  it('should generate a valid payload', function() {
    var req = relationship_extraction.extract(service_request, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, qs.stringify({
      rt: 'json',
      sid: service_request.dataset,
      txt: service_request.text
    }));
    assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    relationship_extraction.extract(service_request, function(err, response) {
      if (err){
        done(err);
      } else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

  it('should format errors', function(done) {
    relationship_extraction.extract({text: 'bar', dataset: 'foo'}, function(err) {
      assert.equal(err.code,400);
      done();
    });
  });
});
