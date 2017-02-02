'use strict';

var nock = require('nock');
var watson = require('../../index');
var assert = require('assert');

var FIVE_SECONDS = 5000;
var TWO_SECONDS = 2000;

describe('natural_language_understanding', function() {
  this.timeout(FIVE_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.retries(1);

  var nlu;

  before(function() {
    nlu = new watson.NaturalLanguageUnderstandingV1({username: 'user',
                                                     password: 'pass',
                                                     version_date: watson.NaturalLanguageUnderstandingV1.VERSION_DATE});
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  it('should throw if no version is present', function(done) {
    assert.throws(function() {
      const badnlu = new watson.NaturalLanguageUnderstandingV1({username: 'user',
                                                                password: 'pass'});
      assert(badnlu);
    });
    done();
  });

  it('analyze()', function(done) {
    nock(watson.NaturalLanguageUnderstandingV1.URL)
      .persist()
      .post(`/v1/analyze?version=${watson.NaturalLanguageUnderstandingV1.VERSION_DATE}`)
      .reply(200, {});

    const options = { 'features': {'concepts': {}, 'keywords': {}},
                      'text': 'hello, this is a test' };

    nlu.analyze(options, done);
  });
});
