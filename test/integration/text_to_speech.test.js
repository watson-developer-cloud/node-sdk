'use strict';

const { IamAuthenticator } = require('../../auth');
const TextToSpeechV1 = require('../../text-to-speech/v1');
const wav = require('wav');
const authHelper = require('../resources/auth_helper.js');
const options = authHelper.auth.text_to_speech;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const serviceErrorUtils = require('../resources/service_error_util');

describe('text_to_speech_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const text_to_speech = new TextToSpeechV1(options);

  it('listVoices()', function(done) {
    text_to_speech.listVoices(null, serviceErrorUtils.checkErrorCode(200, done));
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
      text_to_speech.synthesize(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, { result }) => {
          expect(err).toBeNull();
          result.pipe(reader).on('format', done.bind(null, null));
        })
      );
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
    const checkPronunciation = function(err, { result }) {
      expect(err).toBeNull();
      expect(JSON.stringify(result)).toBe(
        JSON.stringify({
          pronunciation: '.ˈaɪ .ˈi .ˈi .ˈi',
        })
      );
      done();
    };

    text_to_speech.getPronunciation(
      { text: 'IEEE' },
      serviceErrorUtils.checkErrorCode(200, checkPronunciation)
    );
  });

  describe('customization', function() {
    let customizationId;

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
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(result.customization_id).toBeDefined();
          customizationId = result.customization_id;
          done();
        })
      );
    });

    it('listVoiceModels() with language', function(done) {
      text_to_speech.listVoiceModels(
        { language: 'en-GB' },
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(Array.isArray(result.customizations)).toBe(true);
          const hasOtherLanguages = result.customizations.some(function(c) {
            return c.language !== 'en-GB';
          });
          expect(hasOtherLanguages).toBe(false);
          done();
        })
      );
    });

    it('updateVoiceModel()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.updateVoiceModel(
        {
          customizationId,
          description: 'Updated. Should be automatically deleted within 10 minutes.',
          words: [{ word: 'NCAA', translation: 'N C double A' }],
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('getVoiceModel()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.getVoiceModel(
        { customizationId },
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(result.customization_id).toBe(customizationId);
          expect(result.words.length).toBeTruthy();
          done();
        })
      );
    });

    it('addWords()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.addWords(
        {
          customizationId,
          words: [{ word: 'iPhone', translation: 'I phone' }],
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('addWord()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.addWord(
        {
          customizationId,
          word: 'IEEE',
          translation: 'I tipple E',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('listWords()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.listWords(
        { customizationId },
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(result).toBeDefined();
          expect(result.words).toBeDefined();
          expect(result.words.length).toBe(3); // NCAA, iPhone, IEEE
          done();
        })
      );
    });

    it('getWord()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.getWord(
        { customizationId, word: 'NCAA' },
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(result.translation).toBe('N C double A');
          done();
        })
      );
    });

    it('deleteWord()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.deleteWord(
        {
          customizationId,
          word: 'NCAA',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('deleteVoiceModel()', function(done) {
      if (!customizationId) {
        // We cannot run this test when voice model creation failed.
        return done();
      }

      text_to_speech.deleteVoiceModel(
        { customizationId },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });
  });
});
