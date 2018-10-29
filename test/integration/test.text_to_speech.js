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

  it('listVoices()', function(done) {
    text_to_speech.listVoices(null, done);
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

  it('getPronunciation()', function(done) {
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

    text_to_speech.getPronunciation({ text: 'IEEE' }, checkPronunciation);
  });

  describe('customization', function() {
    let customization_id;

    // todo: before task that cleans up any leftover customizations from previous runs

    it('createVoiceModel()', function(done) {
      text_to_speech.createVoiceModel(
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

    it('listVoiceModels()', function(done) {
      text_to_speech.listVoiceModels({}, function(err, response) {
        // console.log(JSON.stringify(err || response, null, 2));
        if (err) {
          return done(err);
        }
        assert(Array.isArray(response.customizations));
        done();
      });
    });

    it('listVoiceModels() with language', function(done) {
      text_to_speech.listVoiceModels({ language: 'en-GB' }, function(err, response) {
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

    it('updateVoiceModel()', function(done) {
      text_to_speech.updateVoiceModel(
        {
          customization_id: customization_id,
          description: 'Updated. Should be automatically deleted within 10 minutes.',
          words: [{ word: 'NCAA', translation: 'N C double A' }],
        },
        done
      );
    });

    it('getVoiceModel()', function(done) {
      text_to_speech.getVoiceModel({ customization_id: customization_id }, function(err, res) {
        // console.log(JSON.stringify(err || res, null, 2));
        if (err) {
          return done(err);
        }
        assert.equal(res.customization_id, customization_id);
        assert(res.words.length);
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

    it('listWords()', function(done) {
      text_to_speech.listWords({ customization_id: customization_id }, function(err, response) {
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

    it('deleteVoiceModel()', function(done) {
      text_to_speech.deleteVoiceModel({ customization_id: customization_id }, done);
    });
  });
});
