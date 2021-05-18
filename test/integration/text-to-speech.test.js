'use strict';

const { IamAuthenticator } = require('../../dist/auth');
const TextToSpeechV1 = require('../../dist/text-to-speech/v1');
const fs = require('fs');
const path = require('path');
const wav = require('wav');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('text to speech_integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.textToSpeech;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const textToSpeech = new TextToSpeechV1(options);

  it('should listVoices()', async () => {
    const res = await textToSpeech.listVoices();
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  describe('synthesize', () => {
    const params = {
      text: 'test',
      accept: 'audio/wav',
      voice: 'en-US_LisaVoice',
    };

    it('should synthesize using http', async () => {
      // wav.Reader parses the wav header and will throw if it isn't valid
      const reader = new wav.Reader();
      const res = await textToSpeech.synthesize(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      result.pipe(reader);
    });

    it('should synthesize using websocket', done => {
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

  it('should getPronunciation()', async () => {
    const params = {
      text: 'IEEE',
    };

    const res = await textToSpeech.getPronunciation(params);
    const { result } = res || {};
    expect(result).toBeDefined();

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        pronunciation: '.ˈaɪ .ˈi .ˈi .ˈi',
      })
    );
  });

  describe('customization', () => {
    let customizationId;

    // todo: before task that cleans up any leftover customizations from previous runs

    it('should createCustomModel()', async () => {
      const params = {
        name: 'temporary-node-sdk-test',
        language: 'en-US',
        description:
          'Created by Node.js SDK integration tests on ' +
          new Date() +
          '. Should be automatically deleted within 10 minutes.',
      };
      const res = await textToSpeech.createCustomModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(result.customization_id).toBeDefined();
      customizationId = result.customization_id;
    });

    describe('custom prompts', () => {
      const promptId = 'Hello';

      it('should addCustomPrompt()', async () => {
        expect(customizationId).toBeTruthy();

        const params = {
          customizationId,
          promptId,
          metadata: {
            prompt_text: 'Hello, how are you today?',
          },
          file: fs.createReadStream(path.join(__dirname, '../resources/tts_audio.wav')),
          filename: 'tts_audio.wav',
        };

        const res = await textToSpeech.addCustomPrompt(params);
        const { result } = res || {};
        expect(result.prompt_id).toBe('Hello');
      });

      it('should listCustomPrompts()', async () => {
        expect(customizationId).toBeTruthy();

        const params = {
          customizationId,
        };

        const res = await textToSpeech.listCustomPrompts(params);
        const { result } = res || {};
        expect(result.prompts.length).toBeTruthy();
      });

      it('should getCustomPrompt()', async () => {
        expect(customizationId).toBeTruthy();

        const params = {
          customizationId,
          promptId,
        };

        const res = await textToSpeech.getCustomPrompt(params);
        const { result } = res || {};
        expect(result.prompt_id).toBe('Hello');
      });

      it('should deleteCustomPrompt()', async () => {
        expect(customizationId).toBeTruthy();

        const params = {
          customizationId,
          promptId,
        };

        const res = await textToSpeech.deleteCustomPrompt(params);
        const { result } = res || {};
        expect(result).toBeDefined();
      });
    });

    it('should listCustomModels() with language', async () => {
      const params = {
        language: 'en-GB',
      };
      const res = await textToSpeech.listCustomModels(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(Array.isArray(result.customizations)).toBe(true);
      const hasOtherLanguages = result.customizations.some(c => {
        return c.language !== 'en-GB';
      });
      expect(hasOtherLanguages).toBe(false);
    });

    it('should updateCustomModel()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
        description: 'Updated. Should be automatically deleted within 10 minutes.',
        words: [{ word: 'NCAA', translation: 'N C double A' }],
      };

      const res = await textToSpeech.updateCustomModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should getCustomModel()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
      };

      const res = await textToSpeech.getCustomModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(result.customization_id).toBe(customizationId);
      expect(result.words.length).toBeTruthy();
    });

    it('should addWords()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
        words: [{ word: 'iPhone', translation: 'I phone' }],
      };

      const res = await textToSpeech.addWords(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should addWord()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
        word: 'IEEE',
        translation: 'I tipple E',
      };

      const res = await textToSpeech.addWord(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should listWords()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
      };

      const res = await textToSpeech.listWords(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(result.words).toBeDefined();
      expect(result.words.length).toBe(3); // NCAA, iPhone, IEEE
    });

    it('should getWord()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
        word: 'NCAA',
      };

      const res = await textToSpeech.getWord(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      expect(result.translation).toBe('N C double A');
    });

    it('should deleteWord()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
        word: 'NCAA',
      };

      const res = await textToSpeech.deleteWord(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should deleteCustomModel()', async () => {
      // We cannot run this test when voice model creation failed.
      expect(customizationId).toBeTruthy();
      const params = {
        customizationId,
      };

      const res = await textToSpeech.deleteCustomModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('speaker models', () => {
    let speakerId;

    it('should createSpeakerModel()', async () => {
      const params = {
        speakerName: 'Angelo',
        audio: fs.createReadStream(path.join(__dirname, '../resources/tts_audio.wav')),
      };

      const res = await textToSpeech.createSpeakerModel(params);
      const { result } = res || {};
      expect(result.speaker_id).toBeDefined();
      speakerId = result.speaker_id;
    });

    it('should listSpeakerModels()', async () => {
      expect(speakerId).toBeTruthy();

      const res = await textToSpeech.listSpeakerModels();
      const { result } = res || {};
      expect(result.speakers.length).toBeTruthy();
    });

    it('should getSpeakerModel()', async () => {
      expect(speakerId).toBeTruthy();

      const params = {
        speakerId,
      };

      const res = await textToSpeech.getSpeakerModel(params);
      const { result } = res || {};
      expect(result.customizations).toBeDefined();
    });

    it('should deleteSpeakerModel()', async () => {
      expect(speakerId).toBeTruthy();

      const params = {
        speakerId,
      };

      const res = await textToSpeech.deleteSpeakerModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });
});
