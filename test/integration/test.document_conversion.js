'use strict';

const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const path = require('path');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

describe('document_conversion_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  describe('v1', function() {
    let document_conversion;

    before(function() {
      document_conversion = watson.document_conversion(auth.document_conversion);
      nock.enableNetConnect();
    });

    after(function() {
      nock.disableNetConnect();
    });

    it('convertFile()', function(done) {
      document_conversion.convert(
        {
          file: fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')),
          conversion_target: 'ANSWER_UNITS'
          // word: {
          //   heading: {
          //     fonts: [
          //       { level: 1, min_size: 24 },
          //       { level: 2, min_size: 16, max_size: 24 }
          //     ]
          //   }
          // },,,,,,,,,,
        },
        done
      );
    });

    it('convertFile() with overridden content-type', function(done) {
      document_conversion.convert(
        {
          conversion_target: 'ANSWER_UNITS',
          file: fs.createReadStream(path.join(__dirname, '../resources/sampleWordWrongExtension.html')),
          content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        function(err, res) {
          if (err) {
            return done(err);
          }
          assert(res);
          assert(res.media_type_detected, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
          assert(res.answer_units);
          assert(res.answer_units.length);
          assert(res.answer_units[0].id);
          done();
        }
      );
    });

    it('convertFile() buffer with content-type', function(done) {
      document_conversion.convert(
        {
          conversion_target: 'ANSWER_UNITS',
          file: new Buffer(fs.readFileSync(path.join(__dirname, '../resources/sampleWordWrongExtension.html'))),
          content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        function(err, res) {
          if (err) {
            return done(err);
          }
          assert(res);
          assert(res.media_type_detected, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
          assert(res.answer_units);
          assert(res.answer_units.length);
          assert(res.answer_units[0].id);
          done();
        }
      );
    });
  });
});
