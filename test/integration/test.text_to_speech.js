'use strict';

const nock = require('nock');
const watson = require('../../index');
const wav = require('wav');
const assert = require('assert');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const FIVE_SECONDS = 5000;

describe('text_to_speech_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(FIVE_SECONDS);

  let text_to_speech;

  before(function() {
    text_to_speech = new watson.TextToSpeechV1(auth.text_to_speech);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('voices()', function(done) {
    text_to_speech.voices(null, done);
  });

  it('synthesize()', function(done) {
    const params = {
      text: 'test',
      accept: 'audio/wav',
    };
    // wav.Reader parses the wav header and will throw if it isn't valid
    const reader = new wav.Reader();
    text_to_speech
      .synthesize(params)
      .pipe(reader)
      .on('format', done.bind(null, null));
  });

  it('pronunciation()', function(done) {
    const checkPronunciation = function(err, res) {
      assert.ifError(err);
      assert.equal(
        JSON.stringify(res),
        JSON.stringify({
          pronunciation: '.ˈaɪ .ˈi .ˈi .ˈi',
        })
      );
      done();
    };

    text_to_speech.pronunciation({ text: 'IEEE' }, checkPronunciation);
  });

  describe('customization', function() {
    let customization_id;

    // todo: before task that cleans up any leftover customizations from previous runs

    it('createCustomization()', function(done) {
      text_to_speech.createCustomization(
        {
          name: 'temporary-node-sdk-test',
          language: 'en-US',
          description:
            'Created by Node.js SDK integration tests on ' +
            new Date() +
            '. Should be automatically deleted within 10 minutes.',
        },
        function(err, response) {
          // console.log(JSON.stringify(err || response, null, 2));
          if (err) {
            return done(err);
          }
          assert(response.customization_id);
          customization_id = response.customization_id;
          done();
        }
      );
    });

    it('getCustomizations()', function(done) {
      text_to_speech.getCustomizations({}, function(err, response) {
        // console.log(JSON.stringify(err || response, null, 2));
        if (err) {
          return done(err);
        }
        assert(Array.isArray(response.customizations));
        done();
      });
    });

    it('getCustomizations() with language', function(done) {
      text_to_speech.getCustomizations({ language: 'en-GB' }, function(err, response) {
        // console.log(JSON.stringify(err || response, null, 2));
        if (err) {
          return done(err);
        }
        assert(Array.isArray(response.customizations));
        const hasOtherLanguages = response.customizations.some(function(c) {
          return c.language !== 'en-GB';
        });
        assert.equal(
          hasOtherLanguages,
          false,
          'Expecting no customizations with a different language than the requested one (en-GB)'
        );
        done();
      });
    });

    it('updateCustomization()', function(done) {
      text_to_speech.updateCustomization(
        {
          customization_id: customization_id,
          description: 'Updated. Should be automatically deleted within 10 minutes.',
          words: [{ word: 'NCAA', translation: 'N C double A' }],
        },
        done
      );
    });

    it('getCustomization()', function(done) {
      text_to_speech.getCustomization({ customization_id: customization_id }, function(
        err,
        response
      ) {
        // console.log(JSON.stringify(err || response, null, 2));
        if (err) {
          return done(err);
        }
        assert.equal(response.customization_id, customization_id);
        assert(response.words.length);
        done();
      });
    });

    it('addWords()', function(done) {
      text_to_speech.addWords(
        {
          customization_id: customization_id,
          words: [{ word: 'iPhone', translation: 'I phone' }],
        },
        done
      );
    });

    it('addWord()', function(done) {
      text_to_speech.addWord(
        {
          customization_id: customization_id,
          word: 'IEEE',
          translation: 'I tipple E',
        },
        done
      );
    });

    it('getWords()', function(done) {
      text_to_speech.getWords({ customization_id: customization_id }, function(err, response) {
        if (err) {
          return done(err);
        }
        assert(response);
        assert(response.words);
        assert.equal(response.words.length, 3); // NCAA, iPhone, IEEE
        done();
      });
    });

    it('getWord()', function(done) {
      text_to_speech.getWord({ customization_id: customization_id, word: 'NCAA' }, function(
        err,
        response
      ) {
        if (err) {
          return done(err);
        }
        assert.equal(response.translation, 'N C double A');
        done();
      });
    });

    it('deleteWord()', function(done) {
      text_to_speech.deleteWord(
        {
          customization_id: customization_id,
          word: 'NCAA',
        },
        done
      );
    });

    it('deleteCustomization()', function(done) {
      text_to_speech.deleteCustomization({ customization_id: customization_id }, done);
    });
  });
});
