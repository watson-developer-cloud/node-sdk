'use strict';

const { IamAuthenticator } = require('../../dist/auth');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const SpeechToTextV1 = require('../../dist/speech-to-text/v1');
const fs = require('fs');
const concat = require('concat-stream');
const path = require('path');
const async = require('async');

const TWENTY_SECONDS = 20000;
const TWO_MINUTES = 2 * 60 * 1000;

describe('speech to text integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.speechToText;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const speechToText = new SpeechToTextV1(options);

  it('should recognize()', async () => {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      contentType: 'audio/ogg; codec=opus',
    };
    const res = await speechToText.recognize(params);
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  it('should recognize() keywords', async () => {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      keywords: ['hail', 'tornadoes', 'rain'],
      keywordsThreshold: 0.6,
      contentType: 'audio/ogg; codec=opus',
    };
    const res = await speechToText.recognize(params);
    const { result } = res || {};
    expect(result).toBeDefined();

    expect(result.results).toBeDefined();
    expect(result.results[0]).toBeDefined();
    expect(result.results[0].keywords_result).toBeDefined();
    const keywords_result = result.results[0].keywords_result;
    expect(keywords_result.tornadoes).toBeDefined();
    expect(keywords_result.hail).toBeDefined();
    expect(keywords_result.rain).toBeDefined();
  });

  it('should listModels()', async () => {
    const res = await speechToText.listModels();
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  describe('recognizeUsingWebSocket()', () => {
    it('should transcribe audio over a websocket @slow', done => {
      const recognizeStream = speechToText.recognizeUsingWebSocket();
      recognizeStream.setEncoding('utf8');
      fs.createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(transcription => {
            expect(typeof transcription).toBe('string');
            expect(transcription.trim()).toBe(
              'thunderstorms could produce large hail isolated tornadoes and heavy rain'
            );
            done();
          })
        );
    });

    it('should work when stream has no words', done => {
      const recognizeStream = speechToText.recognizeUsingWebSocket({
        contentType: 'audio/l16; rate=44100',
      });
      recognizeStream.setEncoding('utf8');
      fs.createReadStream(path.join(__dirname, '../resources/blank.wav'))
        .pipe(recognizeStream)
        .on('error', done)
        .on('data', text => {
          expect(text).toBeFalsy();
        })
        .on('end', done);
    });
  });

  describe('customization @slow', () => {
    jest.setTimeout(TWO_MINUTES);

    let customizationId;

    beforeAll(async () => {
      const res = await speechToText.listLanguageModels();
      const { result } = res || {};
      expect(result).toBeDefined();

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 1);
      const toDelete = result.customizations.filter(cust => {
        const old = new Date(cust.created) < cutoffDate;
        const permanent = cust.name.indexOf('permanent') !== -1;
        return old && !permanent;
      });

      for (const cust of toDelete) {
        const params = {
          customizationId: cust.customization_id,
        };
        try {
          await speechToText.deleteLanguageModel(params);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('error deleting old customization model', cust, err);
        }
      }
    });

    it('should createLanguageModel()', async () => {
      const params = {
        name: 'js-sdk-test-temporary',
        baseModelName: 'en-US_BroadbandModel',
        description:
          'Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes.',
      };
      const res = await speechToText.createLanguageModel(params);
      const { result } = res || {};
      expect(result.customization_id).toBeDefined();
      customizationId = result.customization_id;
    });

    it('should listCustomizations()', async () => {
      const res = await speechToText.listLanguageModels();
      const { result } = res || {};
      expect(result.customizations.length).toBeDefined();
    });

    it('should getLanguageModel()', async () => {
      const params = {
        customizationId,
      };
      const res = await speechToText.getLanguageModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.name).toBe('js-sdk-test-temporary');
    });

    // note: no waitUntilReady() on the first one because it'll never be ready until after the first word or corpus is added
    it('should addCorpus() - stream', async () => {
      const params = {
        customizationId,
        corpusName: 'test_corpus_1',
        corpusFile: fs.createReadStream(
          path.join(__dirname, '../resources/speech_to_test/corpus-short-1.txt')
        ),
      };
      await speechToText.addCorpus(params);
    });

    it('addCorpus() - buffer', async () => {
      const params = {
        customizationId,
        corpusName: 'test_corpus_2',
        corpusFile: fs.readFileSync(
          path.join(__dirname, '../resources/speech_to_test/corpus-short-2.txt')
        ),
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.addCorpus(params);
    });

    it('should addCorpus() - string, overwrite', async () => {
      const params = {
        customizationId,
        corpusName: 'test_corpus_3',
        corpusFile: fs
          .readFileSync(path.join(__dirname, '../resources/speech_to_test/corpus-short-2.txt'))
          .toString(),
        allow_overwrite: true,
      };

      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.addCorpus(params);
    });

    it('should listCorpora()', async () => {
      const params = {
        customizationId,
      };
      await speechToText.listCorpora(params);
    });

    it('addWords()', async () => {
      const params = {
        customizationId,
        words: [
          {
            word: 'hhonors',
            sounds_like: ['hilton honors', 'h honors'],
            display_as: 'HHonors',
          },
          {
            word: 'ieee',
            sounds_like: ['i triple e'],
            display_as: 'IEEE',
          },
        ],
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.addWords(params);
    });

    it('addWord()', async () => {
      const params = {
        customizationId,
        wordName: 'tomato',
        soundsLike: ['tomatoh', 'tomayto'],
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.addWord(params);
    });

    it('should listWords()', async () => {
      const params = {
        customizationId,
        sort: '+alphabetical',
      };
      await speechToText.listWords(params);
    });

    it('should getWord()', async () => {
      const params = {
        customizationId,
        wordName: 'ieee',
      };
      await speechToText.getWord(params);
    });

    it('deleteWord()', async () => {
      const params = {
        customizationId,
        wordName: 'tomato',
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteWord(params);
    });

    it('deleteWord()', async () => {
      const params = {
        customizationId,
        wordName: 'hhonors',
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteWord(params);
    });

    it('addAudio()', async () => {
      const params = {
        customizationId,
        audioName: 'blank',
        audioResource: fs.readFileSync(path.join(__dirname, '../resources/blank.wav')),
        contentType: 'audio/wav',
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.addAudio(params);
    });

    it('deleteAudio()', async () => {
      const params = {
        customizationId,
        audioName: 'blank',
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteAudio(params);
    });

    it('deleteCorpus()', async () => {
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteCorpus({ customizationId, corpusName: 'test_corpus_1' });
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteCorpus({ customizationId, corpusName: 'test_corpus_2' });
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteCorpus({ customizationId, corpusName: 'test_corpus_3' });
    });

    it('trainLanguageModel()', async () => {
      const params = {
        customizationId,
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.trainLanguageModel(params);
    });

    it('recognize() - with customization', async () => {
      const params = {
        audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
        contentType: 'audio/ogg; codec=opus',
        customizationId,
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.recognize(params);
    });

    describe('grammar tests', () => {
      const grammarName = 'node-sdk-test-grammar';

      it('should addGrammar', async () => {
        const params = {
          customizationId,
          grammarName,
          grammarFile: path.join(__dirname, '../resources/confirm.abnf'),
          contentType: 'application/srgs',
          allow_overwrite: true,
        };
        const res = await speechToText.addGrammar(params);
        expect(res).toEqual({});
      });
      it('should getGrammar', async () => {
        const params = {
          customizationId,
          grammarName,
        };

        const res = await speechToText.getGrammar(params);
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.out_of_vocabulary_words).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.status).toBeDefined();
      });
      it('should listGrammars', async () => {
        const params = {
          customizationId,
        };
        const res = await speechToText.listGrammars(params);
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.grammars).toBeDefined();
        expect(result.grammars.length).toBeTruthy();
      });
      it('should deleteGrammar', async () => {
        const params = {
          customizationId,
          grammarName,
        };
        await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
        const res = await speechToText.deleteGrammar(params);
        const { result } = res || {};
        expect(result).toBeDefined();
      });
    });
    it('resetLanguageModel()', async () => {
      const params = {
        customizationId,
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.resetLanguageModel(params);
    });

    it('should deleteLanguageModel()', async () => {
      const params = {
        customizationId,
      };
      await speechToText.whenCustomizationReady({ customizationId, interval: 1000, times: 300 });
      await speechToText.deleteLanguageModel(params);
      customizationId = null;
    });
  });

  describe('asynchronous api', () => {
    let jobId = null;

    const deleteAfterRecognitionCompleted = async jobId => {
      try {
        const res = await speechToText.checkJob({ id: jobId });
        const { result } = res || {};
        expect(result).toBeDefined();

        if (result.status !== 'completed') {
          setTimeout(deleteAfterRecognitionCompleted.bind(null, jobId), 300);
        } else {
          try {
            const resp = await speechToText.deleteJob({ id: result.id });
            expect(resp).toBeDefined();
          } catch (err) {
            expect(err).toBeNull();
          }
        }
      } catch (err) {
        expect(err).toBeNull();
      }
    };

    it('should registerCallback()', async () => {
      const params = {
        // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
        callbackUrl:
          'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
        userSecret: 'ThisIsMySecret',
      };
      const res = await speechToText.registerCallback(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should createJob()', async () => {
      const params = {
        audio: fs.createReadStream(__dirname + '/../resources/weather.ogg'),
        contentType: 'audio/ogg; codec=opus',
        // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
        callbackUrl:
          'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
        userToken: 'Node.js SDK Integration Test at ' + new Date(),
        events: 'recognitions.completed',
        resultsTtl: 1,
      };
      const res = await speechToText.createJob(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      jobId = result.id;
    });

    it('should checkJobs() @slow', async () => {
      const res = await speechToText.checkJobs();
      expect(res).toBeDefined();
    });

    it('should checkJob()', async () => {
      // We cannot run this test when job creation failed.
      expect(jobId).toBeTruthy();
      const params = {
        id: jobId,
      };

      const res = await speechToText.checkJob(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should deleteJob()', async () => {
      // We cannot run this test when job creation failed.
      expect(jobId).toBeTruthy();

      await deleteAfterRecognitionCompleted(jobId);
    });
  });
});
