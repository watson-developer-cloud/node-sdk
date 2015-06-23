'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock   = require('nock');

describe('language_translation', function() {

  var noop = function() {};

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v2'
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var language_translation = watson.language_translation(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('getModels()', function(){

    it('should generate a valid payload', function() {
        var corpus = {},
          path = '/v2/models';

        nock(service.url).persist()
        .get(path)
        .reply(200, corpus);

        var req = language_translation.getModels(null, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('translate()', function(){

    it('should check no parameters provided', function() {
      language_translation.translate({source:''}, missingParameter);
      language_translation.translate({target:''}, missingParameter);
      language_translation.translate({text:''}, missingParameter);
      language_translation.translate({model_id:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/translate';
        var service_request = {
          text:'bar',
          model_id: 'foo'
        };
        nock(service.url).persist()
        .post(path,service_request)
        .reply(200);

        var req = language_translation.translate(service_request, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'POST');
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, JSON.stringify(service_request));
    });
  });

  describe('getIdentifiableLanguages()', function(){

    it('should generate a valid payload', function() {
        var path = '/v2/identifiable_languages';

        nock(service.url).persist()
        .get(path)
        .reply(200);

        var req = language_translation.getIdentifiableLanguages(null, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('identify()', function(){

    it('should check no parameters provided', function() {
      language_translation.identify({}, missingParameter);
      language_translation.identify(null, missingParameter);
      language_translation.identify(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/identify';
        var service_request = { text: 'foo' };
        nock(service.url).persist()
        .post(path,service_request)
        .reply(200);

        var req = language_translation.identify(service_request, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'POST');
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, service_request.text);
    });
  });

});
