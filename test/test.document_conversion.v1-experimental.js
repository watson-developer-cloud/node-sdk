'use strict';

var assert  = require('assert');
var pick    = require('object.pick');
var extend  = require('extend');
var watson  = require('../lib/index');
var nock    = require('nock');
var fs      = require('fs');

describe('document_conversion', function() {

  var noop = function() {};

  // Test params
  var service_options = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1-experimental'
  };
  var convertPath = '/v1/convert_document';

  var payload = {
    conversion_target: 'ANSWER_UNITS',
    word: {
      heading: {
        fonts: [
          { level: 1, min_size: 24 },
          { level: 2, min_size: 16, max_size: 24 }
        ]
      }
    },
    file: fs.createReadStream(__dirname + '/resources/sampleWORD.docx'),
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var servInstance = watson.document_conversion(service_options);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('convert()', function() {

    it('should check no parameters provided', function() {
      servInstance.convert({}, missingParameter);
      servInstance.convert(null, missingParameter);
      servInstance.convert(undefined, missingParameter);
      servInstance.convert(pick(payload,['file']), missingParameter);
      servInstance.convert(pick(payload,['conversion_target']), missingParameter);
    });

    it('should validate conversion_target', function() {
      servInstance.convert({
        file: payload.file,
        conversion_target: 'foo'
      }, missingParameter);
    });

    it('should validate file as Stream', function() {
      servInstance.convert({
        file: 'not a file',
        conversion_target: payload.conversion_target
      }, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = servInstance.convert(payload, noop);
      assert(req.uri.href.startsWith(service_options.url + convertPath));
      assert.equal(req.method, 'POST');
      assert(req.formData);
    });

    it('should send extra config params', function() {
      var req = servInstance.convert(payload, noop);
      var config = JSON.parse(req.formData.config.value);
      assert(config.word.heading.fonts);
    });

    it('should send the version query param', function() {
      var req = servInstance.convert(payload, noop);
      assert(req.uri.query);
      assert(req.uri.query.indexOf("version=") > -1)
    });

    it('should allow the version query param to be overridden', function() {
      var custServInstance = watson.document_conversion(extend(service_options, { version_date: "2015-11-30"}));
      var req = custServInstance.convert(payload, noop);
      assert(req.uri.query.indexOf("version=2015-11-30" > -1));
    });
  });
});
