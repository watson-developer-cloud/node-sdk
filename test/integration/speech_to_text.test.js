'use strict';

const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
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

  const speech_to_text = new SpeechToTextV1(auth.speech_to_text);

  it('recognize()', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      content_type: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(params, serviceErrorUtils.checkErrorCode(200, done));
  });

  it('recognize() keywords', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      keywords: ['hail', 'tornadoes', 'rain'],
      keywords_threshold: 0.6,
      content_type: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(
      params,
      serviceErrorUtils.checkErrorCode(200, function(err, res) {
        /*
      example result
      as of 12/1/2016, the keywords confidence seems to have some variance between test runs
      {
        "results": [
          {
            "keywords_result": {
              "tornadoes": [
                {
                  "normalized_text": "tornadoes",
                  "start_time": 4.43,
                  "confidence": 0.954,
                  "end_time": 5.04
                }
              ],
              "hail": [
                {
                  "normalized_text": "hail",
                  "start_time": 3.36,
                  "confidence": 0.954,
                  "end_time": 3.82
                }
              ],
              "rain": [
                {
                  "normalized_text": "rain",
                  "start_time": 5.59,
                  "confidence": 0.994,
                  "end_time": 6.14
                }
              ]
            },
            "alternatives": [
              {
                "confidence": 0.992,
                "transcript": "thunderstorms could produce large hail isolated tornadoes and heavy rain "
              }
            ],
            "final": true
          }
        ],
          "result_index": 0
      }
      */

        expect(res.results).toBeDefined();
        expect(res.results[0]).toBeDefined();
        expect(res.results[0].keywords_result).toBeDefined();
        const keywords_result = res.results[0].keywords_result;
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

  describe('recognizeUsingWebSocket() (credentials from environment/VCAP) @slow', () => {
    let env;
    beforeEach(function() {
      env = process.env;
      process.env = {};
    });
    afterEach(function() {
      process.env = env;
    });

    it('transcribes audio over a websocket, credentials from environment', function(done) {
      process.env.SPEECH_TO_TEXT_IAM_APIKEY = auth.speech_to_text.iam_apikey;
      process.env.SPEECH_TO_TEXT_URL = auth.speech_to_text.url;
      const speech_to_text_env = new SpeechToTextV1({});
      const recognizeStream = speech_to_text_env.recognizeUsingWebSocket();
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

    it('transcribes audio over a websocket, credentials from VCAP_SERVICES', function(done) {
      process.env.VCAP_SERVICES = JSON.stringify({
        speech_to_text: [
          {
            credentials: {
              iam_apikey: auth.speech_to_text.iam_apikey,
              url: auth.speech_to_text.url,
            },
          },
        ],
      });
      const speech_to_text_vcap = new SpeechToTextV1({});
      const recognizeStream = speech_to_text_vcap.recognizeUsingWebSocket();
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
        content_type: 'audio/l16; rate=44100',
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
    let customization_id;

    // many API calls leave the customization in a pending state.
    // this prevents tests from starting until the API is ready again
    function waitUntilReady(test) {
      return function(done) {
        jest.setTimeout(TWO_MINUTES);
        speech_to_text.whenCustomizationReady(
          { customization_id: customization_id, interval: 250, times: 400 },
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
      const speech_to_text = new SpeechToTextV1(auth.speech_to_text);
      speech_to_text.listLanguageModels({}, function(err, result) {
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
          base_model_name: 'en-US_BroadbandModel',
          description:
            'Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes.',
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.customization_id).toBeDefined();
          customization_id = result.customization_id;
          done();
        }
      );
    });

    it('listCustomizations()', function(done) {
      speech_to_text.listLanguageModels({}, function(err, result) {
        if (err) {
          return done(err);
        }
        expect(result.customizations.length).toBeDefined();
        done();
      });
    });

    it('getLanguageModel()', function(done) {
      speech_to_text.getLanguageModel({ customization_id: customization_id }, function(
        err,
        result
      ) {
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
          customization_id: customization_id,
          corpus_name: 'test_corpus_1',
          corpus_file: fs.createReadStream(
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
            customization_id: customization_id,
            corpus_name: 'test_corpus_2',
            corpus_file: fs.readFileSync(
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
            customization_id: customization_id,
            corpus_name: 'test_corpus_2',
            corpus_file: fs
              .readFileSync(path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt'))
              .toString(),
            allow_overwrite: true,
          },
          done
        );
      })
    );

    it('listCorpora()', function(done) {
      speech_to_text.listCorpora({ customization_id: customization_id }, done);
    });

    it(
      'addWords()',
      waitUntilReady(function(done) {
        speech_to_text.addWords(
          {
            customization_id: customization_id,
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
            customization_id: customization_id,
            word_name: 'tomato',
            sounds_like: ['tomatoh', 'tomayto'],
          },
          done
        );
      })
    );

    it('listWords()', function(done) {
      speech_to_text.listWords({ customization_id: customization_id, sort: '+alphabetical' }, done);
    });

    it('getWord()', function(done) {
      speech_to_text.getWord(
        {
          customization_id: customization_id,
          word_name: 'ieee',
        },
        done
      );
    });

    it(
      'deleteWord()',
      waitUntilReady(function(done) {
        speech_to_text.deleteWord(
          {
            customization_id: customization_id,
            word_name: 'tomato',
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
            customization_id: customization_id,
            word_name: 'hhonors',
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
            customization_id: customization_id,
            audio_name: 'blank',
            audio_resource: fs.readFileSync(path.join(__dirname, '../resources/blank.wav')),
            content_type: 'audio/wav',
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
            customization_id: customization_id,
            audio_name: 'blank',
          },
          done
        );
      })
    );

    it(
      'deleteCorpus()',
      waitUntilReady(function(done) {
        speech_to_text.deleteCorpus(
          { customization_id: customization_id, corpus_name: 'test_corpus_1' },
          done
        );
      })
    );

    it(
      'trainLanguageModel()',
      waitUntilReady(function(done) {
        speech_to_text.trainLanguageModel({ customization_id: customization_id }, done);
      })
    );

    it(
      'recognize() - with customization',
      waitUntilReady(function(done) {
        const params = {
          audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
          content_type: 'audio/ogg; codec=opus',
          customization_id: customization_id,
        };
        speech_to_text.recognize(params, done);
      })
    );

    describe('grammar tests', function() {
      const grammar_name = 'node-sdk-test-grammar';

      it(
        'should addGrammar',
        waitUntilReady(function(done) {
          const params = {
            customization_id,
            grammar_name,
            grammar_file: path.join(__dirname, '../resources/confirm.abnf'),
            content_type: 'application/srgs',
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
            customization_id,
            grammar_name,
          };
          speech_to_text.getGrammar(params, (err, res) => {
            expect(err).toBeNull();
            expect(res.out_of_vocabulary_words).toBeDefined();
            expect(res.name).toBeDefined();
            expect(res.status).toBeDefined();
            done();
          });
        })
      );
      it(
        'should listGrammars',
        waitUntilReady(function(done) {
          const params = {
            customization_id,
          };
          speech_to_text.listGrammars(params, (err, res) => {
            expect(err).toBeNull();
            expect(res.grammars).toBeDefined();
            expect(res.grammars.length).toBeTruthy();
            done();
          });
        })
      );
      it(
        'should deleteGrammar',
        waitUntilReady(function(done) {
          const params = {
            customization_id,
            grammar_name,
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
        speech_to_text.resetLanguageModel({ customization_id: customization_id }, done);
      })
    );

    it('deleteLanguageModel()', function(done) {
      // var customization_id = '7964f4c0-97ab-11e6-8ac8-6333954f158e';
      speech_to_text.deleteLanguageModel({ customization_id: customization_id }, done);
      customization_id = null;
    });
  });

  describe('asynchronous api', function() {
    let jobId = null;

    const deleteAfterRecognitionCompleted = (jobId, done) => {
      speech_to_text.checkJob(
        { id: jobId },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          if (res.status !== 'completed') {
            setTimeout(deleteAfterRecognitionCompleted.bind(null, jobId, done), 300);
          } else {
            speech_to_text.deleteJob({ id: res.id }, serviceErrorUtils.checkErrorCode(200, done));
          }
        })
      );
    };

    it('registerCallback()', function(done) {
      speech_to_text.registerCallback(
        {
          // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
          callback_url:
            'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
          user_secret: 'ThisIsMySecret',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });

    it('createJob()', function(done) {
      const params = {
        audio: fs.createReadStream(__dirname + '/../resources/weather.ogg'),
        content_type: 'audio/ogg; codec=opus',
        // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
        callback_url:
          'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
        user_token: 'Node.js SDK Integration Test at ' + new Date(),
        events: 'recognitions.completed',
        results_ttl: 1,
      };
      speech_to_text.createJob(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, res) {
          expect(err).toBeNull();
          jobId = res.id;
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
          base_model_name: 'en-US_BroadbandModel',
          content_type: 'application/json',
        },
        serviceErrorUtils.checkErrorCode(200, done)
      );
    });
  });
});
