'use strict';

var assert  = require('assert');
var pick    = require('object.pick');
var watson  = require('../lib/index');
var nock    = require('nock');
var fs      = require('fs');

describe('document_conversion', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1-experimental'
  };
  var convertPath = '/v1/convert_document';

  var payload = {
    conversion_target: 'ANSWER_UNITS',
    file: fs.createReadStream(__dirname + '/resources/sampleWORD.docx'),
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var servInstance = watson.document_conversion(service);

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
      assert.equal(req.uri.href, service.url + convertPath);
      assert.equal(req.method, 'POST');
      assert(req.formData);
    });
  });
});
