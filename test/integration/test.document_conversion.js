'use strict';

var fs = require('fs');
var nock = require('nock');
var watson = require('../../index');
var assert = require('assert');
var path = require('path');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

var TWENTY_SECONDS = 20000;
var TWO_SECONDS = 2000;


describe('document_conversion_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);


  describe('v1', function() {
    var document_conversion;

    before(function() {
      document_conversion = watson.document_conversion(auth.document_conversion);
      nock.enableNetConnect();
    });

    after(function() {
      nock.disableNetConnect();
    });

    it('convertFile()', function(done) {
      document_conversion.convert({
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
        conversion_target: 'ANSWER_UNITS',
        // word: {
        //   heading: {
        //     fonts: [
        //       { level: 1, min_size: 24 },
        //       { level: 2, min_size: 16, max_size: 24 }
        //     ]
        //   }
        // }
      }, done);
    });

    it('convertFile() with overridden content-type', function(done) {
      document_conversion.convert({
        conversion_target: 'ANSWER_UNITS',
        file: fs.createReadStream(path.join(__dirname, '../resources/sampleWordWrongExtension.html')),
        content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }, function(err, res) {
        if (err) {
          return done(err);
        }
        assert(res);
        assert(res.media_type_detected, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        assert(res.answer_units);
        assert(res.answer_units.length);
        assert(res.answer_units[0].id);
        done();
      });
    });

    it('convertFile() buffer with content-type', function(done) {
      document_conversion.convert({
        conversion_target: 'ANSWER_UNITS',
        file: new Buffer(fs.readFileSync(path.join(__dirname, '../resources/sampleWordWrongExtension.html'))),
        content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }, function(err, res) {
        if (err) {
          return done(err);
        }
        assert(res);
        assert(res.media_type_detected, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        assert(res.answer_units);
        assert(res.answer_units.length);
        assert(res.answer_units[0].id);
        done();
      });
    });
  });
});
