'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const fs = require('fs');

describe('language_translation', function() {
  const noop = function() {};

  const service = {
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

  const language_translation = watson.language_translation(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  describe('VCAP_SERVICES', function() {
    let env;
    before(function() {
      env = process.env;
      process.env = {};
    });
    after(function() {
      process.env = env;
    });

    const details = [
      {
        credentials: {
          password: 'FAKE_PASSWORD',
          url: 'https://gateway.watsonplatform.net/language-translation/api',
          username: 'FAKE_USERNAME'
        },
        label: 'language_translation',
        name: 'Language Translation-4t',
        plan: 'standard',
        provider: null,
        syslog_drain_url: null,
        tags: ['watson', 'ibm_created', 'ibm_dedicated_public']
      }
    ];

    it('should initialize with old-style VCAP_SERVICES credentials', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        language_translation: details
      });
      const instance = watson.language_translation({
        version: 'v2',
        version_date: '2016-07-01'
      });
      assert(instance._options.headers.Authorization);
    });

    it('should initialize with new-style VCAP_SERVICES credentials', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        language_translation: details
      });
      const instance = watson.language_translation({
        version: 'v2',
        version_date: '2016-07-01'
      });
      assert(instance._options.headers.Authorization);
    });
  });

  describe('getModels()', function() {
    it('should generate a valid payload', function() {
      const corpus = {};
      const path = '/v2/models';

      nock(service.url).persist().get(path).reply(200, corpus);

      const req = language_translation.getModels(null, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('translate()', function() {
    it('should check no parameters provided', function() {
      language_translation.translate({ source: '' }, missingParameter);
      language_translation.translate({ target: '' }, missingParameter);
      language_translation.translate({ text: '' }, missingParameter);
      language_translation.translate({ model_id: '' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v2/translate';
      const service_request = {
        text: 'bar',
        model_id: 'foo'
      };
      nock(service.url).persist().post(path, service_request).reply(200);

      const req = language_translation.translate(service_request, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(body, JSON.stringify(service_request));
    });
  });

  describe('getIdentifiableLanguages()', function() {
    it('should generate a valid payload', function() {
      const path = '/v2/identifiable_languages';

      nock(service.url).persist().get(path).reply(200);

      const req = language_translation.getIdentifiableLanguages(null, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('identify()', function() {
    it('should check no parameters provided', function() {
      language_translation.identify({}, missingParameter);
      language_translation.identify(null, missingParameter);
      language_translation.identify(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v2/identify';
      const service_request = { text: 'foo' };
      nock(service.url).persist().post(path, service_request).reply(200);

      const req = language_translation.identify(service_request, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(body, service_request.text);
    });
  });

  describe('createModel()', function() {
    it('should check no parameters provided', function() {
      language_translation.createModel({}, missingParameter);
      language_translation.createModel(null, missingParameter);
      language_translation.createModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v2/models';
      const service_request = {
        base_model_id: 'foo',
        forced_glossary: fs.createReadStream(__dirname + '/../resources/glossary.tmx'),
        parallel_corpus: fs.createReadStream(__dirname + '/../resources/glossary.tmx'),
        monolingual_corpus: fs.createReadStream(__dirname + '/../resources/glossary.tmx')
      };

      nock(service.url).persist().post(path, service_request).reply(200);

      const req = language_translation.createModel(service_request, noop);
      assert.equal(req.uri.href, service.url + path + '?base_model_id=foo');
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteModel()', function() {
    it('should check no parameters provided', function() {
      language_translation.deleteModel({}, missingParameter);
      language_translation.deleteModel(null, missingParameter);
      language_translation.deleteModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v2/models/foo';
      const service_request = {
        model_id: 'foo'
      };

      nock(service.url).persist().delete(path, service_request).reply(200);

      const req = language_translation.deleteModel(service_request, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getModel()', function() {
    it('should check no parameters provided', function() {
      language_translation.getModel({}, missingParameter);
      language_translation.getModel(null, missingParameter);
      language_translation.getModel(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v2/models/foo';
      const service_request = {
        model_id: 'foo'
      };

      nock(service.url).persist().get(path, service_request).reply(200);

      const req = language_translation.getModel(service_request, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });
});
