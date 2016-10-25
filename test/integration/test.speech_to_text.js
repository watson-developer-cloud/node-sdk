var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
var watson = require('../../index');
var fs = require('fs');
var concat = require('concat-stream');
var assert = require('assert');
var path = require('path');
var nock = require('nock');
var async = require('async');

var TWENTY_SECONDS = 20000;
var FIVE_SECONDS = 5000;
var TWO_MINUTES = 2 * 60 * 1000;

describe('speech_to_text_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(FIVE_SECONDS);

  before(function() {
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  var speech_to_text;
  beforeEach(function() {
    speech_to_text = new watson.SpeechToTextV1(auth.speech_to_text);
  });

  it('recognize()', function(done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var params = {
      audio: fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')),
      content_type: 'audio/ogg; codec=opus'
    };
    speech_to_text.recognize(params, done);
  });

  it('getModels()', function(done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    speech_to_text.getModels({}, done);
  });

  it('createRecognizeStream()',  function (done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
    recognizeStream.setEncoding('utf8');
    fs.createReadStream(path.join(__dirname, '../resources/weather.flac'))
      .pipe(recognizeStream)
      .on('error', done)
      .pipe(concat(function (transcription) {
        assert.equal(transcription.trim(), 'thunderstorms could produce large hail isolated tornadoes and heavy rain');
        done();
      }));
  });

  it('createRecognizeStream() - no words',  function (done) {
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);
    var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
    recognizeStream.setEncoding('utf8');
    fs.createReadStream(path.join(__dirname, '../resources/blank.wav'))
      .pipe(recognizeStream)
      .on('error', done)
      .on('data', function(text) {
        assert(!text, 'no text expected for an audio file with no words');
      })
      .on('end', done);
  });

  describe('customization', function() {
    var customization_id;

    // many API calls leave the customization in a pending state.
    // this prevents tests from starting until the API is ready again
    function waitUntilReady(test) {
      return function(done) {
        this.timeout(TWO_MINUTES);
        speech_to_text.whenCustomizationReady({customization_id: customization_id, interval: 250}, function(err) {
          if (err && err.code !== watson.SpeechToTextV1.ERR_NO_CORPORA) {
            return done(err);
          }
          test(done);
        });
      }
    }

    before(function(done) {
      var speech_to_text = new watson.SpeechToTextV1(auth.speech_to_text);
      speech_to_text.getCustomizations({}, function(err, result) {
        if (err) {
          // eslint-disable-next-line no-console
          console.warn('Error retrieving old customization models for cleanup', err);
          return done();
        }
        var cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 1);
        var toDelete = result.customizations.filter(function(cust) {
          var old = new Date(cust.created) < cutoffDate;
          var permanent = cust.name.indexOf('permanent') !== -1;
          return old && !permanent;
        });
        async.forEach(toDelete, function(cust, next) {
          speech_to_text.deleteCustomization(cust, function(err) {
            if (err) {
              // eslint-disable-next-line no-console
              console.warn('error deleting old customization model', cust, err)
            }
            next();
          });
        }, done);
      });
    });

    it('createCustomization()', function(done) {
      speech_to_text.createCustomization({
        name: "js-sdk-test-temporary",
        "base_model_name": "en-US_BroadbandModel",
        "description": "Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes."
      }, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result.customization_id, 'customization_id');
        customization_id = result.customization_id;
        done();
      });
    });

    it('listCustomizations()', function(done) {
      speech_to_text.getCustomizations({}, function(err, result) {
        if (err) {
          return done(err);
        }
        //console.log(result);
        assert(result.customizations.length, 'there should be at least one customization');
        done();
      });
    });

    it('getCustomization()', function(done) {
      speech_to_text.getCustomization({customization_id: customization_id}, function(err, result) {
        if (err) {
          return done(err);
        }
        //console.log(result);
        assert(result);
        assert.equal(result.name, 'js-sdk-test-temporary');
        done();
      });
    });

    //todo: see about moving two of these to unit tests in order to speed things up - train and then delete avoids the need for two
    it('addCorpus() - stream', waitUntilReady(function(done) {
      speech_to_text.addCorpus({
        customization_id: customization_id,
        name: 'test_corpus_1',
        corpus: fs.createReadStream(path.join(__dirname, '../resources/speech_to_text/corpus-short-1.txt'))
      }, done);
    }));

    it('addCorpus() - buffer', waitUntilReady(function(done) {
      //var customization_id='adfab4c0-9708-11e6-be92-bb627d4684b9';
      speech_to_text.addCorpus({
        customization_id: customization_id,
        name: 'test_corpus_2',
        corpus: fs.readFileSync(path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt'))
      }, done);
    }));

    it('addCorpus() - string, overwrite', waitUntilReady(function(done) {
      speech_to_text.addCorpus({
        customization_id: customization_id,
        name: 'test_corpus_2',
        corpus: fs.readFileSync(path.join(__dirname, '../resources/speech_to_text/corpus-short-2.txt')).toString(),
        allow_overwrite: true
      }, done);
    }));

    it('listCorpora()', function(done) {
      speech_to_text.getCorpora({customization_id: customization_id}, done);
    });

    it('addWords()', waitUntilReady(function(done) {
      speech_to_text.addWords({
        customization_id: customization_id,
        words: [
          {
            "word": "hhonors",
            "sounds_like": ["hilton honors","h honors"],
            "display_as": "HHonors"
          },
          {
            "word": "ieee",
            "sounds_like": ["i triple e"],
            "display_as": "IEEE"
          },
        ]
      }, done);
    }));

    it('addWord()', waitUntilReady(function(done) {
      speech_to_text.addWord({
        customization_id: customization_id,
        "word": "tomato",
        "sounds_like": ["tomatoh","tomayto"],
      }, done);
    }));

    it('listWords()', function(done) {
      speech_to_text.getWords({customization_id: customization_id}, done);
    });

    it('getWord()', function(done) {
      speech_to_text.getWord({
        customization_id: customization_id,
        word: 'ieee'
      }, done);
    });

    it('deleteWord()', waitUntilReady(function(done) {
      speech_to_text.deleteWord({
        customization_id: customization_id,
        word: "tomato",
      }, done);
    }));

    it('deleteCorpus()', waitUntilReady(function(done) {
      speech_to_text.deleteCorpus({customization_id: customization_id, name: 'test_corpus_1'}, done);
    }));

    it('trainCustomization()', waitUntilReady(function(done) {
      speech_to_text.trainCustomization({customization_id: customization_id}, done);
    }));

    it('resetCustomization()', waitUntilReady(function(done) {
      speech_to_text.resetCustomization({customization_id: customization_id}, done);
    }));

    // the service hasn't yet implemented this api
    it.skip('upgradeCustomization()', waitUntilReady(function(done) {
      speech_to_text.upgradeCustomization({customization_id: customization_id}, done);
    }));

    it('deleteCustomization()', waitUntilReady(function(done) {
      //var customization_id = '7964f4c0-97ab-11e6-8ac8-6333954f158e';
      speech_to_text.deleteCustomization({customization_id: customization_id}, done);
      customization_id = null;
    }));
  });

});
