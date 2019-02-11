'use strict';

const watson = require('../../index');
const wav = require('wav');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('text_to_speech_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const text_to_speech = new watson.TextToSpeechV1(auth.text_to_speech);

  it('listVoices()', function(done) {
    text_to_speech.listVoices(null, done);
  });

  describe('synthesize', function() {
    const params = {
      text: 'test',
      accept: 'audio/wav',
      voice: 'en-US_LisaVoice',
    };

    it('synthesize using http', function(done) {
      // wav.Reader parses the wav header and will throw if it isn't valid
      const reader = new wav.Reader();
      text_to_speech.synthesize(params, (err, res) => {
        expect(err).toBeNull();
        res.pipe(reader).on('format', done.bind(null, null));
      });
    });

    it('synthesize using websocket', function(done) {
      const synthStream = text_to_speech.synthesizeUsingWebSocket(params);
      synthStream.resume();

      synthStream.on('message', function(message, data) {
        expect(data).not.toBeNull();
      });

      synthStream.on('error', function(err) {
        // fail assertation
        throw err;
      });

      synthStream.on('close', function(code, reason) {
        done();
      });
    });
  });

  it('getPronunciation()', function(done) {
    const checkPronunciation = function(err, res) {
      expect(err).toBeNull();
      expect(JSON.stringify(res)).toBe(
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
          expect(response.customization_id).toBeDefined();
          customization_id = response.customization_id;
          done();
        }
      );
    });

    it('should return promise with entire response if return_response is true (listVoiceModels)', function(done) {
      text_to_speech
        .listVoiceModels({ return_response: true })
        .then(response => {
          expect(Array.isArray(response.data.customizations)).toBe(true);
          expect(response.data).toBeDefined();
          expect(response.headers).toBeDefined();
          expect(response.status).toBeDefined();
          expect(response.statusText).toBeDefined();
          expect(response.request).toBeDefined();
          expect(response.config).toBeDefined();
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('listVoiceModels() with language', function(done) {
      text_to_speech.listVoiceModels({ language: 'en-GB' }, function(err, response) {
        // console.log(JSON.stringify(err || response, null, 2));
        if (err) {
          return done(err);
        }
        expect(Array.isArray(response.customizations)).toBe(true);
        const hasOtherLanguages = response.customizations.some(function(c) {
          return c.language !== 'en-GB';
        });
        expect(hasOtherLanguages).toBe(false);
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
        expect(res.customization_id).toBe(customization_id);
        expect(res.words.length).toBeTruthy();
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
        expect(response).toBeDefined();
        expect(response.words).toBeDefined();
        expect(response.words.length).toBe(3); // NCAA, iPhone, IEEE
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
        expect(response.translation).toBe('N C double A');
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
