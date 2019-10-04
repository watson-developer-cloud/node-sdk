'use strict';

const { IamAuthenticator } = require('../../auth');
const TextToSpeechV1 = require('../../text-to-speech/v1');
const wav = require('wav');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('text to speech_integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.textToSpeech;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const textToSpeech = new TextToSpeechV1(options);

  it('listVoices()', done => {
    textToSpeech.listVoices((err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('synthesize', () => {
    const params = {
      text: 'test',
      accept: 'audio/wav',
      voice: 'en-US_LisaVoice',
    };

    it('synthesize using http', done => {
      // wav.Reader parses the wav header and will throw if it isn't valid
      const reader = new wav.Reader();
      textToSpeech.synthesize(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        result.pipe(reader).on('format', done.bind(null, null));
      });
    });

    it('synthesize using websocket', done => {
      const synthStream = textToSpeech.synthesizeUsingWebSocket(params);
      synthStream.resume();

      synthStream.on('message', (message, data) => {
        expect(data).not.toBeNull();
      });

      synthStream.on('error', err => {
        // fail assertation
        throw err;
      });

      synthStream.on('close', (code, reason) => {
        done();
      });
    });
  });

  it('getPronunciation()', done => {
    const checkPronunciation = (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(JSON.stringify(result)).toBe(
        JSON.stringify({
          pronunciation: '.ˈaɪ .ˈi .ˈi .ˈi',
        })
      );
      done();
    };

    textToSpeech.getPronunciation({ text: 'IEEE' }, checkPronunciation);
  });

  describe('customization', () => {
    let customizationId;

    // todo: before task that cleans up any leftover customizations from previous runs

    it('createVoiceModel()', done => {
      textToSpeech.createVoiceModel(
        {
          name: 'temporary-node-sdk-test',
          language: 'en-US',
          description:
            'Created by Node.js SDK integration tests on ' +
            new Date() +
            '. Should be automatically deleted within 10 minutes.',
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          done();

          expect(result.customization_id).toBeDefined();
          customizationId = result.customization_id;
          done();
        }
      );
    });

    it('listVoiceModels() with language', done => {
      textToSpeech.listVoiceModels({ language: 'en-GB' }, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(Array.isArray(result.customizations)).toBe(true);
        const hasOtherLanguages = result.customizations.some(c => {
          return c.language !== 'en-GB';
        });
        expect(hasOtherLanguages).toBe(false);
        done();
      });
    });

    it('updateVoiceModel()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.updateVoiceModel(
        {
          customizationId,
          description: 'Updated. Should be automatically deleted within 10 minutes.',
          words: [{ word: 'NCAA', translation: 'N C double A' }],
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          done();
        }
      );
    });

    it('getVoiceModel()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.getVoiceModel({ customizationId }, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.customization_id).toBe(customizationId);
        expect(result.words.length).toBeTruthy();
        done();
      });
    });

    it('addWords()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.addWords(
        {
          customizationId,
          words: [{ word: 'iPhone', translation: 'I phone' }],
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          done();
        }
      );
    });

    it('addWord()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.addWord(
        {
          customizationId,
          word: 'IEEE',
          translation: 'I tipple E',
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          done();
        }
      );
    });

    it('listWords()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.listWords({ customizationId }, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.words).toBeDefined();
        expect(result.words.length).toBe(3); // NCAA, iPhone, IEEE
        done();
      });
    });

    it('getWord()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.getWord({ customizationId, word: 'NCAA' }, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.translation).toBe('N C double A');
        done();
      });
    });

    it('deleteWord()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.deleteWord(
        {
          customizationId,
          word: 'NCAA',
        },
        (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(result).toBeDefined();
          done();
        }
      );
    });

    it('deleteVoiceModel()', done => {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      textToSpeech.deleteVoiceModel({ customizationId }, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });
});
