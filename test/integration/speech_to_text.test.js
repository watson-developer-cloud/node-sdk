'use strict';

const { IamAuthenticator } = require('../../auth');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const SpeechToTextV1 = require('../../speech-to-text/v1');
const fs = require('fs');
const concat = require('concat-stream');
const path = require('path');
const async = require('async');
const serviceErrorUtils = require('../resources/service_error_util');

const TWENTY_SECONDS = 20000;
const TWO_MINUTES = 2 * 60 * 1000;

describe('speech_to_text_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.speech_to_text;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const speech_to_text = new SpeechToTextV1(options);

  it('recognize()', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      contentType: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(params, serviceErrorUtils.checkErrorCode(200, done));
  });

  it('recognize() keywords', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      keywords: ['hail', 'tornadoes', 'rain'],
      keywordsThreshold: 0.6,
      contentType: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(
      params,
      serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
        expect(result.results).toBeDefined();
        expect(result.results[0]).toBeDefined();
        expect(result.results[0].keywords_result).toBeDefined();
        const keywords_result = result.results[0].keywords_result;
        expect(keywords_result.tornadoes).toBeDefined();
        expect(keywords_result.hail).toBeDefined();
        expect(keywords_result.rain).toBeDefined();

        done();
      })
    );
  });

  it('listModels()', function(done) {
    speech_to_text.listModels({}, serviceErrorUtils.checkErrorCode(200, done));
  });

  describe('recognizeUsingWebSocket()', () => {
    it('transcribes audio over a websocket @slow', function(done) {
      const recognizeStream = speech_to_text.recognizeUsingWebSocket();
      recognizeStream.setEncoding('utf8');
      fs.createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(function(transcription) {
            expect(typeof transcription).toBe('string');
            expect(transcription.trim()).toBe(
              'thunderstorms could produce large hail isolated tornadoes and heavy rain'
            );
            done();
          })
        );
    });

    it('works when stream has no words', function(done) {
      const recognizeStream = speech_to_text.recognizeUsingWebSocket({
        contentType: 'audio/l16; rate=44100',
      });
      recognizeStream.setEncoding('utf8');
      fs.createReadStream(path.join(__dirname, '../resources/blank.wav'))
        .pipe(recognizeStream)
        .on('error', done)
        .on('data', function(text) {
          expect(text).toBeFalsy();
        })
        .on('end', done);
    });
  });

  describe('customization @slow', function() {
    let customizationId;

    // many API calls leave the customization in a pending state.
    // this prevents tests from starting until the API is ready again
    function waitUntilReady(test) {
      return function(done) {
        jest.setTimeout(TWO_MINUTES);
        speech_to_text.whenCustomizationReady(
          { customizationId, interval: 250, times: 400 },
          function(err) {
            if (err && err.code !== SpeechToTextV1.ERR_NO_CORPORA) {
              return done(err);
            }
            test(done);
          }
        );
      };
    }

    beforeAll(function(done) {
      speech_to_text.listLanguageModels({}, function(err, { result }) {
        if (err) {
          // eslint-disable-next-line no-console
          console.warn('Error retrieving old customization models for cleanup', err);
          return done();
        }
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 1);
        const toDelete = result.customizations.filter(function(cust) {
          const old = new Date(cust.created) < cutoffDate;
          const permanent = cust.name.indexOf('permanent') !== -1;
          return old && !permanent;
        });
        async.forEach(
          toDelete,
          function(cust, next) {
            speech_to_text.deleteLanguageModel(cust, function(err) {
              if (err) {
                // eslint-disable-next-line no-console
                console.warn('error deleting old customization model', cust, err);
              }
              next();
            });
          },
          done
        );
      });
    });

    it('createLanguageModel()', function(done) {
      speech_to_text.createLanguageModel(
        {
          name: 'js-sdk-test-temporary',
          baseModelName: 'en-US_BroadbandModel',
          description:
            'Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes.',
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.customization_id).toBeDefined();
          customizationId = result.customization_id;
          done();
        }
      );
    });

    it('listCustomizations()', function(done) {
      speech_to_text.listLanguageModels({}, function(err, result) {
        expect(err).toBeNull();
        expect(result.customizations.length).toBeDefined();
        done();
      });
    });

    it('getLanguageModel()', function(done) {
      speech_to_text.getLanguageModel({ customizationId }, function(err, { result }) {
        if (err) {
          return done(err);
        }
        // console.log(result);
        expect(result).toBeDefined();
        expect(result.name).toBe('js-sdk-test-temporary');
        done();
      });
    });

    // note: no waitUntilReady() on the first one because it'll never be ready until after the first word or corpus is added
    it('addCorpus() - stream', function(done) {
      speech_to_text.addCorpus(
        {
          customizationId,
          corpusName: 'test_corpus_1',
          corpusFile: fs.createReadStream(
            path.join(__dirname, '../resources/speech_to_text/corpus-short-1.txt')
          ),
        },
        done
      );
    });

    it.skip(
      'addCorpus() - buffer',
      waitUntilReady(function(done) {
        // var customization_id='adfab4c0-9708-11e6-be92-bb627d4684b9';
        speech_to_text.addCorpus(
          {
            customizationId,
            corpusName: 'test_corpus_2',
            corpusFile: fs.readFileSync(
              path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt')
            ),
          },
          done
        );
      })
    );

    it(
      'addCorpus() - string, overwrite',
      waitUntilReady(function(done) {
        speech_to_text.addCorpus(
          {
            customizationId,
            corpusName: 'test_corpus_2',
            corpusFile: fs
              .readFileSync(path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt'))
              .toString(),
            allow_overwrite: true,
          },
          done
        );
      })
    );

    it('listCorpora()', function(done) {
      speech_to_text.listCorpora({ customizationId }, done);
    });

    it(
      'addWords()',
      waitUntilReady(function(done) {
        speech_to_text.addWords(
          {
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
          },
          done
        );
      })
    );

    it(
      'addWord()',
      waitUntilReady(function(done) {
        speech_to_text.addWord(
          {
            customizationId,
            wordName: 'tomato',
            soundsLike: ['tomatoh', 'tomayto'],
          },
          done
        );
      })
    );

    it('listWords()', function(done) {
      speech_to_text.listWords({ customizationId, sort: '+alphabetical' }, done);
    });

    it('getWord()', function(done) {
      speech_to_text.getWord(
        {
          customizationId,
          wordName: 'ieee',
        },
        done
      );
    });

    it(
      'deleteWord()',
      waitUntilReady(function(done) {
        speech_to_text.deleteWord(
          {
            customizationId,
            wordName: 'tomato',
          },
          done
        );
      })
    );

    it(
      'deleteWord()',
      waitUntilReady(function(done) {
        speech_to_text.deleteWord(
          {
            customizationId,
            wordName: 'hhonors',
          },
          done
        );
      })
    );

    it(
      'addAudio()',
      waitUntilReady(function(done) {
        speech_to_text.addAudio(
          {
            customizationId,
            audioName: 'blank',
            audioResource: fs.readFileSync(path.join(__dirname, '../resources/blank.wav')),
            contentType: 'audio/wav',
          },
          done
        );
      })
    );

    it(
      'deleteAudio()',
      waitUntilReady(function(done) {
        speech_to_text.deleteAudio(
          {
            customizationId,
            audioName: 'blank',
          },
          done
        );
      })
    );

    it(
      'deleteCorpus()',
      waitUntilReady(function(done) {
        speech_to_text.deleteCorpus({ customizationId, corpusName: 'test_corpus_1' }, done);
      })
    );

    it(
      'trainLanguageModel()',
      waitUntilReady(function(done) {
        speech_to_text.trainLanguageModel({ customizationId }, done);
      })
    );

    it(
      'recognize() - with customization',
      waitUntilReady(function(done) {
        const params = {
          audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
          contentType: 'audio/ogg; codec=opus',
          customizationId,
        };
        speech_to_text.recognize(params, done);
      })
    );

    describe('grammar tests', function() {
      const grammarName = 'node-sdk-test-grammar';

      it(
        'should addGrammar',
        waitUntilReady(function(done) {
          const params = {
            customizationId,
            grammarName,
            grammar_file: path.join(__dirname, '../resources/confirm.abnf'),
            contentType: 'application/srgs',
            allow_overwrite: true,
          };
          speech_to_text.addGrammar(params, (err, res) => {
            expect(err).toBeNull();
            expect(res).toEqual({});
            done();
          });
        })
      );
      it(
        'should getGrammar',
        waitUntilReady(function(done) {
          const params = {
            customizationId,
            grammarName,
          };
          speech_to_text.getGrammar(params, (err, { result }) => {
            expect(err).toBeNull();
            expect(result.out_of_vocabulary_words).toBeDefined();
            expect(result.name).toBeDefined();
            expect(result.status).toBeDefined();
            done();
          });
        })
      );
      it(
        'should listGrammars',
        waitUntilReady(function(done) {
          const params = {
            customizationId,
          };
          speech_to_text.listGrammars(params, (err, { result }) => {
            expect(err).toBeNull();
            expect(result.grammars).toBeDefined();
            expect(result.grammars.length).toBeTruthy();
            done();
          });
        })
      );
      it(
        'should deleteGrammar',
        waitUntilReady(function(done) {
          const params = {
            customizationId,
            grammarName,
          };
          speech_to_text.deleteGrammar(params, (err, res) => {
            expect(err).toBeNull();
            expect(res).toEqual({});
            done();
          });
        })
      );
    });
    it(
      'resetLanguageModel()',
      waitUntilReady(function(done) {
        speech_to_text.resetLanguageModel({ customizationId }, done);
      })
    );

    it('deleteLanguageModel()', function(done) {
      // var customizationId = '7964f4c0-97ab-11e6-8ac8-6333954f158e';
      speech_to_text.deleteLanguageModel({ customizationId }, done);
      customizationId = null;
    });
  });

  describe('asynchronous api', function() {
    let jobId = null;

    const deleteAfterRecognitionCompleted = (jobId, done) => {
      speech_to_text.checkJob(
        { id: jobId },
        serviceErrorUtils.checkErrorCode(200, (err, { result }) => {
          if (result.status !== 'completed') {
            setTimeout(deleteAfterRecognitionCompleted.bind(null, jobId, done), 300);
          } else {
            speech_to_text.deleteJob(
              { id: result.id },
              serviceErrorUtils.checkErrorCode(200, done)
            );
          }
        })
      );
    };

    it('registerCallback()', function(done) {
      speech_to_text.registerCallback(
        {
          // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
          callbackUrl:
            'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
          userSecret: 'ThisIsMySecret',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('createJob()', function(done) {
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
      speech_to_text.createJob(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, { result }) {
          expect(err).toBeNull();
          jobId = result.id;
          done();
        })
      );
    });

    it('checkJobs() @slow', function(done) {
      speech_to_text.checkJobs(done);
    });

    it('checkJob()', function(done) {
      if (!jobId) {
        // We cannot run this test when job creation failed.
        return done();
      }
      speech_to_text.checkJob({ id: jobId }, serviceErrorUtils.checkErrorCode(200, done));
    });

    it('deleteJob()', function(done) {
      if (!jobId) {
        // We cannot run this test when job creation failed.
        return done();
      }

      deleteAfterRecognitionCompleted(jobId, serviceErrorUtils.checkErrorCode(200, done));
    });
  });

  describe('createLanguageModel', function() {
    it('should create a language model', function(done) {
      speech_to_text.createLanguageModel(
        {
          name: 'testName',
          baseModelName: 'en-US_BroadbandModel',
          contentType: 'application/json',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });
  });
});
