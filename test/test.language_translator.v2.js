'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var fs     = require('fs');

describe('language_translator', function() {

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

  var language_translator = watson.language_translator(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('VCAP_SERVICES', function() {

    var env;
    before(function() {
      env = process.env;
      process.env = {};
    });
    after(function() {
      process.env = env;
    });

    var details = [
      {
        "credentials": {
          "password": "FAKE_PASSWORD",
          "url": "https://gateway.watsonplatform.net/language-translation/api",
          "username": "FAKE_USERNAME"
        },
        "label": "language_translation",
        "name": "Language Translation-4t",
        "plan": "standard",
        "provider": null,
        "syslog_drain_url": null,
        "tags": [
          "watson",
          "ibm_created",
          "ibm_dedicated_public"
        ]
      }
    ];

    it('should initialize with old-style VCAP_SERVICES credentials', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        "language_translation": details
      });
      var instance = watson.language_translator({version: 'v2', version_date: '2016-07-01'});
      assert(instance._options.api_key);
    });

    it('should initialize with new-style VCAP_SERVICES credentials', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        "language_translator": details
      });
      var instance = watson.language_translator({version: 'v2', version_date: '2016-07-01'});
      assert(instance._options.api_key);
    });
  });


  describe('getModels()', function(){

    it('should generate a valid payload', function() {
        var corpus = {},
          path = '/v2/models';

        nock(service.url).persist()
        .get(path)
        .reply(200, corpus);

        var req = language_translator.getModels(null, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('translate()', function(){

    it('should check no parameters provided', function() {
      language_translator.translate({source:''}, missingParameter);
      language_translator.translate({target:''}, missingParameter);
      language_translator.translate({text:''}, missingParameter);
      language_translator.translate({model_id:''}, missingParameter);
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

        var req = language_translator.translate(service_request, noop);
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

        var req = language_translator.getIdentifiableLanguages(null, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('identify()', function(){

    it('should check no parameters provided', function() {
      language_translator.identify({}, missingParameter);
      language_translator.identify(null, missingParameter);
      language_translator.identify(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/identify';
        var service_request = { text: 'foo' };
        nock(service.url).persist()
        .post(path,service_request)
        .reply(200);

        var req = language_translator.identify(service_request, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'POST');
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, service_request.text);
    });
  });

  describe('createModel()', function(){

    it('should check no parameters provided', function() {
      language_translator.createModel({}, missingParameter);
      language_translator.createModel(null, missingParameter);
      language_translator.createModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/models';
        var service_request = {
          base_model_id: 'foo',
          forced_glossary: fs.createReadStream(__dirname + '/resources/glossary.tmx'),
          parallel_corpus: fs.createReadStream(__dirname + '/resources/glossary.tmx'),
          monolingual_corpus: fs.createReadStream(__dirname + '/resources/glossary.tmx')
        };

        nock(service.url).persist()
        .post(path,service_request)
        .reply(200);

        var req = language_translator.createModel(service_request, noop);
        assert.equal(req.uri.href, service.url + path+ '?base_model_id=foo');
        assert.equal(req.method, 'POST');
    });
  });

  describe('deleteModel()', function(){

    it('should check no parameters provided', function() {
      language_translator.deleteModel({}, missingParameter);
      language_translator.deleteModel(null, missingParameter);
      language_translator.deleteModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/models/foo';
        var service_request = {
          model_id: 'foo'
        };

        nock(service.url).persist()
        .delete(path,service_request)
        .reply(200);

        var req = language_translator.deleteModel(service_request, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'DELETE');
    });
  });

  describe('getModel()', function(){

    it('should check no parameters provided', function() {
      language_translator.getModel({}, missingParameter);
      language_translator.getModel(null, missingParameter);
      language_translator.getModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v2/models/foo';
        var service_request = {
          model_id: 'foo'
        };

        nock(service.url).persist()
        .get(path,service_request)
        .reply(200);

        var req = language_translator.getModel(service_request, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

});
