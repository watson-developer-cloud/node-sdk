'use strict';

const assert = require('assert');
const pick = require('object.pick');
const extend = require('extend');
const watson = require('../../index');
const nock = require('nock');
const fs = require('fs');

describe('document_conversion', function() {
  const noop = function() {};

  // Test params
  const service_options = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version_date: '2015-12-15',
    version: 'v1'
  };
  const convertPath = '/v1/convert_document';

  const payload = {
    conversion_target: 'answer_units',
    word: {
      heading: {
        fonts: [{ level: 1, min_size: 24 }, { level: 2, min_size: 16, max_size: 24 }]
      }
    },
    file: fs.createReadStream(__dirname + '/../resources/sampleWord.docx')
  };

  before(function() {
    nock.disableNetConnect(); // for running tests
    // or
    // nock.recorder.rec();  // for creating tests
  });

  after(function() {
    nock.cleanAll();
  });

  const servInstance = watson.document_conversion(service_options);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  describe('convert()', function() {
    it('should error when empty parameters provided', function(done) {
      servInstance.convert({}, function(err) {
        missingParameter(err);
        done();
      });
    });

    it('should error when null parameters provided', function(done) {
      servInstance.convert(null, function(err) {
        missingParameter(err);
        done();
      });
    });

    it('should error when undefined parameters provided', function(done) {
      servInstance.convert(undefined, function(err) {
        missingParameter(err);
        done();
      });
    });

    it('should error when missing conversion_target', function(done) {
      servInstance.convert(pick(payload, ['file']), function(err) {
        missingParameter(err);
        done();
      });
    });

    it('should error when missing file', function(done) {
      servInstance.convert(pick(payload, ['conversion_target']), function(err) {
        missingParameter(err);
        done();
      });
    });

    it('should validate conversion_target', function(done) {
      servInstance.convert(
        {
          file: payload.file,
          conversion_target: 'foo'
        },
        function(err) {
          missingParameter(err);
          done();
        }
      );
    });

    it('should validate uppercase conversion_target', function(done) {
      servInstance.convert(
        {
          file: payload.file,
          conversion_target: 'answwer_units'
        },
        function(err) {
          missingParameter(err);
          done();
        }
      );
    });

    it('should validate file as Stream', function(done) {
      servInstance.convert(
        {
          file: 'not a file',
          conversion_target: payload.conversion_target
        },
        function(err) {
          missingParameter(err);
          done();
        }
      );
    });

    it('should generate a valid payload', function(done) {
      const expectation = nock('http://ibm.com:80')
        .post('/v1/convert_document?version=2015-12-15')
        .reply(201, '');

      const req = servInstance.convert(payload, function(err, res) {
        assert(req);
        const url = service_options.url + convertPath;
        assert.equal(req.uri.href.slice(0, url.length), url);
        assert.equal(req.method, 'POST');
        assert(req.formData);
        assert.ifError(err);
        assert(expectation.isDone());
        done();
      });
    });

    function hexToString(body) {
      return Buffer.from(body, 'hex').toString();
    }

    function checkContentType(params, contentType) {
      return new Promise(function(resolve, reject) {
        // the file content-type is in the body for form/multipart POST requests
        // so we're having nock intercept the request, check the body, then send a fake response
        const expectation = nock('http://ibm.com:80')
          .post('/v1/convert_document?version=2015-12-15', function(body) {
            const re = new RegExp('Content-Type: ' + contentType);
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

    it('should set a default content type based on the file extension', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.createReadStream(__dirname + '/../resources/sampleWord.docx')
        },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
    });

    it('should allow the content type to be manually set', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.createReadStream(__dirname + '/../resources/sampleWordWrongExtension.html'),
          content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
    });

    // be default, request sets the content-type, but not the charset.
    it('should NOT add the charset to the content-type for .htm files', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.createReadStream(__dirname + '/../resources/sampleHtml.htm')
        },
        'text/html'
      );
    });

    // same as above, except with .html instead of .htm
    it('should add the charset to the content-type for .html files', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.createReadStream(__dirname + '/../resources/sampleHtml.html')
        },
        'text/html'
      );
    });

    it('should not override the user-set content-type for html files', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.createReadStream(__dirname + '/../resources/sampleHtml.htm'),
          content_type: 'text/plain'
        },
        'text/plain'
      );
    });

    it('should accept Buffers', function() {
      return checkContentType(
        {
          conversion_target: 'answer_units',
          file: fs.readFileSync(__dirname + '/../resources/sampleHtml.htm'),
          content_type: 'text/plain'
        },
        'text/plain'
      );
    });

    it('should send extra config params', function() {
      const req = servInstance.convert(payload, noop);
      const config = JSON.parse(req.formData.config.value);
      assert(config.word.heading.fonts);
    });

    it('should send the version query param', function() {
      const req = servInstance.convert(payload, noop);
      assert(req.uri.query);
      assert(req.uri.query.indexOf('version=') > -1);
    });

    it('should allow the version query param to be overridden', function() {
      const custServInstance = watson.document_conversion(extend(service_options, { version_date: '2015-11-30' }));
      const req = custServInstance.convert(payload, noop);
      assert(req.uri.query.indexOf('version=2015-11-30' > -1));
    });
  });
});
