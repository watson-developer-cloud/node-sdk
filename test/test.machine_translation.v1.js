'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var qs     = require('qs');
var nock   = require('nock');


describe('machine_translation', function() {
  // Test params
  var payload = {
    text : 'Messi is the best',
    from : 'en',
    to   : 'es'
  };
  var service_path = '/v1/smt/0';
  var service_request = {
    sid: 'mt-enus-eses',
    rt: 'text',
    txt: payload.text
  };
  var service_response = 'Messi es el mejor';

  var wrapper_response = { translation: service_response };

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var noop = function(){};

  var  missingParameter =function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var machine_translation = watson.machine_translation(service);

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

  it('should check for missing text', function() {
    var params = {from : 'en', to: 'es'};
    machine_translation.translate(params, missingParameter);
  });

  it('should check for missing "from"', function() {
    var params = {to: 'es', text:'Messi' };
    machine_translation.translate(params, missingParameter);
  });

  it('should check for missing "to"', function() {
    var params = {from : 'en', text:'Messi' };
    machine_translation.translate(params, missingParameter);
  });

  it('should check no parameters provided', function() {
    machine_translation.translate({}, missingParameter);
    machine_translation.translate(null, missingParameter);
    machine_translation.translate(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
    var req = machine_translation.translate(payload, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url+ service_path);
    assert.equal(body, qs.stringify(service_request));
    assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    machine_translation.translate(payload,function(err, response){
      if (err)
        done(err);
      else {
        assert.equal(
          JSON.stringify(response),
          JSON.stringify(wrapper_response));
        done();
      }
    });
  });

});