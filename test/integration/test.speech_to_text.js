'use strict';

const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const watson = require('../../index');
const fs = require('fs');
const concat = require('concat-stream');
const assert = require('assert');
const path = require('path');
const nock = require('nock');
const async = require('async');

const TWENTY_SECONDS = 20000;
const FIVE_SECONDS = 5000;
const TWO_MINUTES = 2 * 60 * 1000;

describe('speech_to_text_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(FIVE_SECONDS);

  before(function() {
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  let speech_to_text;
  let speech_to_text_rc;

  beforeEach(function() {
    speech_to_text = new watson.SpeechToTextV1(auth.speech_to_text);
    speech_to_text_rc = new watson.SpeechToTextV1(auth.speech_to_text_rc);
  });

  it('recognize() (RC)', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      content_type: 'audio/ogg; codec=opus',
    };
    speech_to_text_rc.recognize(params, done);
  });

  it('recognize()', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      content_type: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(params, done);
  });

  it('recognize() keywords', function(done) {
    const params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      keywords: ['hail', 'tornadoes', 'rain'],
      keywords_threshold: 0.6,
      content_type: 'audio/ogg; codec=opus',
    };
    speech_to_text.recognize(params, function(err, res) {
      if (err) {
        return done(err);
      }

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

      assert(res.results);
      assert(res.results[0]);
      assert(res.results[0].keywords_result);
      const keywords_result = res.results[0].keywords_result;
      assert(keywords_result.tornadoes);
      assert(keywords_result.hail);
      assert(keywords_result.rain);

      done();
    });
  });

  it('getModels()', function(done) {
    speech_to_text.getModels({}, done);
  });

  describe('createRecognizeStream() (RC) (credentials from environment/VCAP)', () => {
    let env;
    beforeEach(function() {
      env = process.env;
      process.env = {};
    });
    afterEach(function() {
      process.env = env;
    });

    it('transcribes audio over a websocket, credentials from environment', function(done) {
      process.env.SPEECH_TO_TEXT_IAM_APIKEY = auth.speech_to_text_rc.iam_apikey;
      process.env.SPEECH_TO_TEXT_URL = auth.speech_to_text_rc.url;
      const speech_to_text_env = new watson.SpeechToTextV1({});
      const recognizeStream = speech_to_text_env.createRecognizeStream();
      recognizeStream.setEncoding('utf8');
      fs
        .createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(function(transcription) {
            assert.equal(typeof transcription, 'string', 'should return a string transcription');
            assert.equal(
              transcription.trim(),
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
              iam_apikey: auth.speech_to_text_rc.iam_apikey,
              url: auth.speech_to_text_rc.url,
            },
          },
        ],
      });
      const speech_to_text_vcap = new watson.SpeechToTextV1({});
      const recognizeStream = speech_to_text_vcap.createRecognizeStream();
      recognizeStream.setEncoding('utf8');
      fs
        .createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(function(transcription) {
            assert.equal(typeof transcription, 'string', 'should return a string transcription');
            assert.equal(
              transcription.trim(),
              'thunderstorms could produce large hail isolated tornadoes and heavy rain'
            );
            done();
          })
        );
    });
  });

  describe('createRecognizeStream() (RC)', () => {
    it('transcribes audio over a websocket', function(done) {
      const recognizeStream = speech_to_text_rc.createRecognizeStream();
      recognizeStream.setEncoding('utf8');
      fs
        .createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(function(transcription) {
            assert.equal(typeof transcription, 'string', 'should return a string transcription');
            assert.equal(
              transcription.trim(),
              'thunderstorms could produce large hail isolated tornadoes and heavy rain'
            );
            done();
          })
        );
    });
  });

  describe('createRecognizeStream()', () => {
    it('transcribes audio over a websocket', function(done) {
      const recognizeStream = speech_to_text.createRecognizeStream();
      recognizeStream.setEncoding('utf8');
      fs
        .createReadStream(path.join(__dirname, '../resources/weather.flac'))
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(
          concat(function(transcription) {
            assert.equal(typeof transcription, 'string', 'should return a string transcription');
            assert.equal(
              transcription.trim(),
              'thunderstorms could produce large hail isolated tornadoes and heavy rain'
            );
            done();
          })
        );
    });

    it('works when stream has no words', function(done) {
      const recognizeStream = speech_to_text.createRecognizeStream({
        content_type: 'audio/l16; rate=44100',
      });
      recognizeStream.setEncoding('utf8');
      fs
        .createReadStream(path.join(__dirname, '../resources/blank.wav'))
        .pipe(recognizeStream)
        .on('error', done)
        .on('data', function(text) {
          assert(!text, 'no text expected for an audio file with no words');
        })
        .on('end', done);
    });
  });

  describe('customization', function() {
    let customization_id;

    // many API calls leave the customization in a pending state.
    // this prevents tests from starting until the API is ready again
    function waitUntilReady(test) {
      return function(done) {
        this.timeout(TWO_MINUTES);
        speech_to_text.whenCustomizationReady(
          { customization_id: customization_id, interval: 250, times: 400 },
          function(err) {
            if (err && err.code !== watson.SpeechToTextV1.ERR_NO_CORPORA) {
              return done(err);
            }
            test(done);
          }
        );
      };
    }

    before(function(done) {
      const speech_to_text = new watson.SpeechToTextV1(auth.speech_to_text);
      speech_to_text.getCustomizations({}, function(err, result) {
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
            speech_to_text.deleteCustomization(cust, function(err) {
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

    it('createCustomization()', function(done) {
      speech_to_text.createCustomization(
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
          assert(result.customization_id, 'customization_id');
          customization_id = result.customization_id;
          done();
        }
      );
    });

    it('listCustomizations()', function(done) {
      speech_to_text.getCustomizations({}, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(result);
        assert(result.customizations.length, 'there should be at least one customization');
        done();
      });
    });

    it('getCustomization()', function(done) {
      speech_to_text.getCustomization({ customization_id: customization_id }, function(
        err,
        result
      ) {
        if (err) {
          return done(err);
        }
        // console.log(result);
        assert(result);
        assert.equal(result.name, 'js-sdk-test-temporary');
        done();
      });
    });

    // note: no waitUntilReady() on the first one because it'll never be ready until after the first word or corpus is added
    it('addCorpus() - stream', function(done) {
      speech_to_text.addCorpus(
        {
          customization_id: customization_id,
          name: 'test_corpus_1',
          corpus: fs.createReadStream(
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
            name: 'test_corpus_2',
            corpus: fs.readFileSync(
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
            name: 'test_corpus_2',
            corpus: fs
              .readFileSync(path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt'))
              .toString(),
            allow_overwrite: true,
          },
          done
        );
      })
    );

    it('listCorpora()', function(done) {
      speech_to_text.getCorpora({ customization_id: customization_id }, done);
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
            word: 'tomato',
            sounds_like: ['tomatoh', 'tomayto'],
          },
          done
        );
      })
    );

    it('listWords()', function(done) {
      speech_to_text.getWords({ customization_id: customization_id, sort: '+alphabetical' }, done);
    });

    it('getWord()', function(done) {
      speech_to_text.getWord(
        {
          customization_id: customization_id,
          word: 'ieee',
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
            word: 'tomato',
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
            word: 'hhonors',
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
          { customization_id: customization_id, name: 'test_corpus_1' },
          done
        );
      })
    );

    it(
      'trainCustomization()',
      waitUntilReady(function(done) {
        speech_to_text.trainCustomization({ customization_id: customization_id }, done);
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

    it(
      'resetCustomization()',
      waitUntilReady(function(done) {
        speech_to_text.resetCustomization({ customization_id: customization_id }, done);
      })
    );

    it('deleteCustomization()', function(done) {
      // var customization_id = '7964f4c0-97ab-11e6-8ac8-6333954f158e';
      speech_to_text.deleteCustomization({ customization_id: customization_id }, done);
      customization_id = null;
    });
  });

  describe('asynchronous api', function() {
    let jobId = null;

    const deleteAfterRecognitionCompleted = (jobId, done) => {
      speech_to_text.getRecognitionJob({ id: jobId }, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res.status !== 'completed') {
          setTimeout(deleteAfterRecognitionCompleted.bind(null, jobId, done), 300);
        } else {
          speech_to_text.deleteRecognitionJob({ id: res.id }, done);
        }
      });
    };

    it('registerCallback()', function(done) {
      speech_to_text.registerCallback(
        {
          // if this fails, logs are available at https://watson-test-resources.mybluemix.net/speech-to-text-async/secure
          callback_url:
            'https://watson-test-resources.mybluemix.net/speech-to-text-async/secure/callback',
          user_secret: 'ThisIsMySecret',
        },
        done
      );
    });

    it('createRecognitionJob()', function(done) {
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
      speech_to_text.createRecognitionJob(params, function(err, res) {
        assert.ifError(err);
        jobId = res.id;
        done();
      });
    });

    it('getRecognitionJobs()', function(done) {
      speech_to_text.getRecognitionJobs(done);
    });

    it('getRecognitionJob()', function(done) {
      speech_to_text.getRecognitionJob({ id: jobId }, done);
    });

    it('deleteRecognitionJob()', function(done) {
      deleteAfterRecognitionCompleted(jobId, done);
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
        done
      );
    });
  });
});
