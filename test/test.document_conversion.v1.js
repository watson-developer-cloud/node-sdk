'use strict';

var assert  = require('assert');
var pick    = require('object.pick');
var extend  = require('extend');
var watson  = require('../index');
var nock    = require('nock');
var fs      = require('fs');

describe('document_conversion', function() {

  var noop = function() {};

  // Test params
  var service_options = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version_date: '2015-12-15',
    version: 'v1'
  };
  var convertPath = '/v1/convert_document';

  var payload = {
    conversion_target: 'answer_units',
    word: {
      heading: {
        fonts: [
          { level: 1, min_size: 24 },
          { level: 2, min_size: 16, max_size: 24 }
        ]
      }
    },
    file: fs.createReadStream(__dirname + '/resources/sampleWord.docx'),
  };

  before(function() {
    nock.disableNetConnect(); // for running tests
    // or
    //nock.recorder.rec();  // for creating tests
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

    it('should validate uppercase conversion_target', function() {
      servInstance.convert({
        file: payload.file,
        conversion_target: 'ANSWER_UNITS'
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
      assert(req);
      var url = service_options.url + convertPath;
      assert.equal(req.uri.href.slice(0, url.length), url);
      assert.equal(req.method, 'POST');
      assert(req.formData);
    });

    function hexToString(body) {
      try {
        // newer node.js versions prefer using the Buffer.from constructor because it handles a couple of edge cases better
        return Buffer.from(body, 'hex').toString();
      } catch(ex) {
        // older node.js versions either don't have Buffer.from (0v.12), or have a broken Buffer.from implementation (v4.4.4 throws TypeError: hex is not a function)
        return new Buffer(body, 'hex').toString();
      }
    }

    function checkContentType(params, contentType) {
      return new Promise(function(resolve, reject) {
        // the file content-type is in the body for form/multipart POST requests
        // so we're having nock intercept the request, check the body, then send a fake response
        var expectation = nock('http://ibm.com:80')
          .post('/v1/convert_document?version=2015-12-15', function(body) {
            var re = new RegExp('Content-Type: ' + contentType);
            // if the first character is a - then it's ascii, other wise assume hex
            return body[0] === '-' ? re.exec(body) : re.exec(hexToString(body));
          })
          .reply(201, '');

        servInstance.convert(params, function(err) {
          if (err) {
            return reject(err);
          }
          assert(expectation.isDone());
          resolve();
        });
      });
    }

    // todo: check for flakyness in this test.
    // It failed on me once, but the error message included the full file contents, which were longer than the scroll-back in my console, so I couldn't see the actual error.
    it('should set a default content type based on the file extension', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.createReadStream(__dirname + '/resources/sampleWord.docx')
      }, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    });

    it('should allow the content type to be manually set', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.createReadStream(__dirname + '/resources/sampleWordWrongExtension.html'),
        content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    });

    // be default, request sets the content-type, but not the charset. the service requires both for html,
    // and only accepts utf-8
    it('should add the charset to the content-type for .htm files', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.createReadStream(__dirname + '/resources/sampleHtml.htm')
      }, 'text/html; charset=utf-8');
    });

    // same as above, except with .html instead of .htm
    it('should add the charset to the content-type for .html files', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.createReadStream(__dirname + '/resources/sampleHtml.html')
      }, 'text/html; charset=utf-8');
    });

    it('should not override the user-set content-type for html files', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.createReadStream(__dirname + '/resources/sampleHtml.htm'),
        content_type: 'text/plain'
      }, 'text/plain');
    });

    it ('should accept Buffers', function() {
      return checkContentType({
        conversion_target: 'answer_units',
        file: fs.readFileSync(__dirname + '/resources/sampleHtml.htm'),
        content_type: 'text/plain'
      }, 'text/plain');
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
