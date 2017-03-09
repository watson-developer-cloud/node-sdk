'use strict';

const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');

const FIVE_SECONDS = 5000;
const TWO_SECONDS = 2000;

describe('natural_language_understanding', function() {
  this.timeout(FIVE_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let nlu;

  before(function() {
    nlu = new watson.NaturalLanguageUnderstandingV1({
      username: 'user',
      password: 'pass',
      version_date: watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  it('should throw if no version is present', function(done) {
    assert.throws(function() {
      const badnlu = new watson.NaturalLanguageUnderstandingV1({
        username: 'user',
        password: 'pass'
      });
      assert(badnlu);
    });
    done();
  });

  describe('env', function() {
    // create a new, empty env for each test, then restore it at the end
    const env = process.env;
    beforeEach(function() {
      process.env = {};
    });
    after(function() {
      process.env = env;
    });

    it('should load its credentials from bluemix (hyphenated)', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        'natural-language-understanding': [
          {
            credentials: {
              url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
              username: 'hyphenated-user',
              password: 'hpyhenated-pass'
            },
            syslog_drain_url: null,
            label: 'natural-language-understanding',
            provider: null,
            plan: 'standard',
            name: 'my-nlu-service',
            tags: ['watson', 'ibm_created']
          }
        ]
      });
      const nluHyphenated = new watson.NaturalLanguageUnderstandingV1({
        version_date: watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
      });
      assert(nluHyphenated);
      assert.equal(nluHyphenated.getCredentials().username, 'hyphenated-user');
    });
  });

  it('2016_01_23 version should work', function(done) {
    const mockApi = nock(watson.NaturalLanguageUnderstandingV1.URL)
      .post('/v1/analyze?version=' + watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23)
      .reply(200, {});

    const nlu_old_version = new watson.NaturalLanguageUnderstandingV1({
      username: 'user',
      password: 'pass',
      version_date: watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23
    });

    const options = {
      features: { concepts: {}, keywords: {} },
      text: 'hello, this is a test'
    };

    nlu_old_version.analyze(options, err => {
      assert.ifError(err);
      mockApi.done();
      done();
    });
  });

  it('analyze()', function(done) {
    const mockApi = nock(watson.NaturalLanguageUnderstandingV1.URL)
      .post('/v1/analyze?version=' + watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27)
      .reply(200, {});

    const options = {
      features: { concepts: {}, keywords: {} },
      text: 'hello, this is a test'
    };

    nlu.analyze(options, err => {
      assert.ifError(err);
      mockApi.done();
      done();
    });
  });

  it('should list models', function(done) {
    const mockApi = nock(watson.NaturalLanguageUnderstandingV1.URL)
      .get('/v1/models?version=' + watson.NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27)
      .reply(200, {});

    nlu.listModels({}, err => {
      assert.ifError(err);
      mockApi.done();
      done();
    });
  });
});
