'use strict';

var nock = require('nock');
var watson = require('../lib/index');
var auth = require('./resources/auth');
var fs = require('fs');
var assert = require('assert');

var mobydick = fs.readFileSync(__dirname + '/resources/mobydick.txt', 'utf8');
var concat = require('concat-stream');
var TWENTY_SECONDS = 20000;
var TEN_SECONDS = 10000;
var FIVE_SECONDS = 5000;
var TWO_SECONDS = 2000;

if (fs.existsSync(__dirname + '/resources/auth.js')) {

describe('integration-all-services', function() {

  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  var failIfError = function(done, err) {
    if (err)
      return done(err);
    else
      return done();
  };

  before(function() {
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('functional_relationship_extraction', function() {
    this.timeout(FIVE_SECONDS);
    var relationship_extraction = watson.relationship_extraction(auth.relationship_extraction);

    it('extract()', function(done) {
      var params = {
        text: 'IBM Watson developer cloud',
        dataset: 'ie-en-news'
      };
      relationship_extraction.extract(params, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_question_and_answer', function() {
    this.timeout(FIVE_SECONDS);
    var question_and_answer = watson.question_and_answer(auth.question_and_answer);

    it('ask()', function(done) {
      var params = {
        dataset: 'healthcare',
        question: {
          questionText: 'Why should I take aspirin?',
          items: 2, // number of answers
          evidenceRequest: {
            items: 5 // number of evidences
          }
        }
      };
      question_and_answer.ask(params, failIfError.bind(failIfError, done));
    });

    it('datasets()', function(done) {
      question_and_answer.datasets(null, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_tone_analyzer', function() {
    this.timeout(TEN_SECONDS);
    var tone_analyzer = watson.tone_analyzer(auth.tone_analyzer);

    it('scorecards()', function(done) {
      tone_analyzer.scorecards(null, failIfError.bind(failIfError, done));
    });

    it('tone()', function(done) {
      tone_analyzer.tone({text: mobydick}, failIfError.bind(failIfError, done));
    });

  });

  describe('functional_personality_insights', function() {
    this.timeout(FIVE_SECONDS);
    var personality_insights = watson.personality_insights(auth.personality_insights);

    it('profile()', function(done) {
      var params = {
        text: mobydick
      };
      personality_insights.profile(params, failIfError.bind(failIfError, done));
    });

    it('profile_html()', function(done) {
      var params = {
        text: '<div>' + mobydick + '</div>'
      };
      personality_insights.profile(params, failIfError.bind(failIfError, done));
    });
});

  describe('functional_visual_recognition', function() {
    this.timeout(TWENTY_SECONDS);
    var visual_recognition = watson.visual_recognition(auth.visual_recognition);

    it('recognize()', function(done) {
      var params = {
        image_file: fs.createReadStream(__dirname + '/resources/car.png'),
        labels_to_check: JSON.stringify({
          label_groups: ['Vehicle']
        })
      };
      visual_recognition.recognize(params, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_tradeoff_analytics', function() {
    this.timeout(TEN_SECONDS);
    var tradeoff_analytics = watson.tradeoff_analytics(auth.tradeoff_analytics);

    it('dilemmas()', function(done) {
      var params = require('./resources/dilemma_problem');
      tradeoff_analytics.dilemmas(params, failIfError.bind(failIfError, done));
    });

    it('events()', function(done) {
      var params = require('./resources/ta_events');
      tradeoff_analytics.events(params, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_concept_insights', function() {
    this.timeout(TEN_SECONDS);
    var concept_insights = watson.concept_insights(auth.concept_insights);

    it('listCorpora()', function(done) {
      concept_insights.corpora.listCorpora({}, failIfError.bind(failIfError, done));
    });

    it('getAccountsInfo()', function(done) {
      concept_insights.accounts.getAccountsInfo({}, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_text_to_speech', function() {
    this.timeout(TWENTY_SECONDS);
    var text_to_speech = watson.text_to_speech(auth.text_to_speech);

    it('voices()', function(done) {
      text_to_speech.voices(null, failIfError.bind(failIfError, done));
    });

    it('synthesize()', function(done) {
      var params = {
        text: 'Hi this is Watson',
      };
      text_to_speech.synthesize(params)
        .on('response', done.bind(null,null))
        .pipe(fs.createWriteStream(__dirname + '/resources/tts-output.ogg'));
    });
  });

  describe('functional_speech_to_text', function() {
    this.timeout(TWENTY_SECONDS);
    var speech_to_text = watson.speech_to_text(auth.speech_to_text);

    it('recognize()', function(done) {
      var params = {
        audio: fs.createReadStream(__dirname + '/resources/audio.wav'),
        content_type: 'audio/wav'
      };
      speech_to_text.recognize(params, failIfError.bind(failIfError, done));
    });

    it('getModels()', function(done) {
      speech_to_text.getModels({}, failIfError.bind(failIfError, done));
    });

    it('createRecognizeStream()',  function (done) {
      var recognizeStream = speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'});
      recognizeStream.setEncoding('utf8');
      fs.createReadStream(__dirname + '/resources/audio.wav')
        .pipe(recognizeStream)
        .on('error', done)
        .pipe(concat(function (transcription) {
          assert.equal(transcription.trim(), 'thunderstorms could produce large hail isolated tornadoes and heavy rain');
          done();
        }));
      });
    });

  describe('functional_dialog', function() {
    this.timeout(TWENTY_SECONDS);
    var dialog = watson.dialog(auth.dialog);
    var dialog_id = auth.dialog.dialog_id;
    var client_id = 31;

    it('getProfile()', function(done) {
      var params = {
        dialog_id: dialog_id,
        client_id: client_id
      };
      dialog.getProfile(params, failIfError.bind(failIfError, done));
    });

    it('updateProfile()', function(done) {
      var params = {
        dialog_id: dialog_id,
        client_id: client_id,
        name_values: [{
          name: 'size',
          value: 'large'
        }, {
          name: 'topping1',
          value: 'cheese'
        }]
      };
      dialog.updateProfile(params, failIfError.bind(failIfError, done));
    });

    it('getConversation()', function(done) {
      this.timeout(TWENTY_SECONDS * 2);
      var params = {
        dialog_id: dialog_id,
        client_id: client_id,
        date_from: '2015-07-20 00:00:00',
        date_to: '2015-07-30 00:00:00'
      };
      dialog.getConversation(params, failIfError.bind(failIfError, done));
    });

    it('conversation()', function(done) {
      var params = {
        dialog_id: dialog_id,
        client_id: client_id,
        input: 'Hello'
      };
      dialog.conversation(params, failIfError.bind(failIfError, done));
    });

    // it('updateContent()', function(done) {
    //   this.timeout(10000);
    //   var params = {
    //     dialog_id: dialog_id,
    //     client_id: client_id
    //   };
    //   dialog.updateContent(params, failIfError.bind(failIfError, done));
    // });

    it('getContent()', function(done) {
      var params = {
        dialog_id: dialog_id
      };
      dialog.getContent(params, failIfError.bind(failIfError, done));
    });

    it('getDialogs()', function(done) {
      var params = {};
      dialog.getDialogs(params, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_language_translation', function() {
    this.timeout(TWENTY_SECONDS * 2);
    var language_translation = watson.language_translation(auth.language_translation);

    it('getModels()', function(done) {
      language_translation.getModels(null, failIfError.bind(failIfError, done));
    });

    it('translate()', function(done) {
      var params = {
        text: 'this is a test',
        source: 'en',
        target: 'es'
      };
      language_translation.translate(params, failIfError.bind(failIfError, done));
    });

    it('getIdentifiableLanguages()', function(done) {
      language_translation.getIdentifiableLanguages(null, failIfError.bind(failIfError, done));
    });

    it('identify()', function(done) {
      var params = {
        text: 'this is an important test that needs to work'
      };
      language_translation.identify(params, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_alchemy_language', function() {
    var alchemy_language = watson.alchemy_language(auth.alchemy);
    var text = mobydick.split(' ').slice(0, 100).join(' ');

    it('entities()', function(done) {
      alchemy_language.entities({
        text: text
      }, failIfError.bind(failIfError, done));
    });

    it('keywords()', function(done) {
      alchemy_language.keywords({
        text: text
      }, failIfError.bind(failIfError, done));
    });


    it('concepts()', function(done) {
      alchemy_language.concepts({
        text: text
      }, failIfError.bind(failIfError, done));
    });


    it('sentiment()', function(done) {
      alchemy_language.sentiment({
        text: text
      }, failIfError.bind(failIfError, done));
    });

    it('sentiment_targeted()', function(done) {
      alchemy_language.sentiment({
        text: text,
        target: 'Ishmael'
      }, failIfError.bind(failIfError, done));
    });

    it('category()', function(done) {
      alchemy_language.category({
        text: text
      }, failIfError.bind(failIfError, done));
    });

    it('publicationDate()', function(done) {
      alchemy_language.publicationDate({
        html: text
      }, failIfError.bind(failIfError, done));
    });

    it('relations()', function(done) {
      alchemy_language.relations({
        text: text
      }, failIfError.bind(failIfError, done));
    });

    it('language()', function(done) {
      alchemy_language.language({
        text: text
      }, failIfError.bind(failIfError, done));
    });

    it('text()', function(done) {
      alchemy_language.text({
        html: text
      }, failIfError.bind(failIfError, done));
    });

    it('text_raw()', function(done) {
      alchemy_language.text({
        html: text,
        raw: true
      }, failIfError.bind(failIfError, done));
    });

    it('authors()', function(done) {
      alchemy_language.authors({
        html: text
      }, failIfError.bind(failIfError, done));
    });

    it('feeds()', function(done) {
      alchemy_language.feeds({
        url: 'http://www.techcrunch.com/'
      }, failIfError.bind(failIfError, done));
    });

    it('microformats()', function(done) {
      alchemy_language.microformats({
        url: 'http://www.alchemyapi.com/products/alchemylanguage/microformats-parsing'
      }, failIfError.bind(failIfError, done));
    });

    it('taxonomy()', function(done) {
      alchemy_language.taxonomy({
        html: text
      }, failIfError.bind(failIfError, done));
    });

    it('combined()', function(done) {
      alchemy_language.combined({
        text: text
      }, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_alchemy_data_news', function() {
    var alchemy_data_news = watson.alchemy_data_news(auth.alchemy);

    it('getNews()', function(done) {
      alchemy_data_news.getNews({
        start: 'now-1d',
        end: 'now'
      }, failIfError.bind(failIfError, done));
    });
  });

  describe('functional_alchemy_vision', function() {
    this.timeout(TWENTY_SECONDS);
    var alchemy_vision = watson.alchemy_vision(auth.alchemy);
    var imageFile = fs.createReadStream(__dirname + '/resources/obama.jpg');

    it('getImageLinks() with url', function(done) {
      alchemy_vision.getImageLinks({
        url: 'http://www.alchemyapi.com/products/alchemylanguage/microformats-parsing'
      }, failIfError.bind(failIfError, done));
    });

    it('getImageLinks() with html', function(done) {
      alchemy_vision.getImageLinks({
        html: '<div><img src="http://visual-recognition-demo.mybluemix.net/images/horses.jpg" /></div>'
      }, failIfError.bind(failIfError, done));
    });

    it('getImageKeywordsWithFile()', function(done) {
      alchemy_vision.getImageKeywords({image: imageFile}, failIfError.bind(failIfError, done));
    });

    it('getImageKeywordsWithUrl()', function(done) {
      alchemy_vision.getImageKeywords({
        url: 'http://www.washingtonpost.com/wp-srv/special/lifestyle/the-age-of-obama/img/obama-v2/obama09.jpg'
      }, failIfError.bind(failIfError, done));
    });

    // it('recognizeFacesWithFile()', function(done) {
    //   alchemy_vision.recognizeFaces({image: imageFile}, failIfError.bind(failIfError, done));
    // });

    it('recognizeFacesWithUrl()', function(done) {
      alchemy_vision.recognizeFaces({
        url: 'http://www.washingtonpost.com/wp-srv/special/lifestyle/the-age-of-obama/img/obama-v2/obama09.jpg'
      }, failIfError.bind(failIfError, done));
    });

  });

  describe('functional_document_conversion', function() {
    this.timeout(TWENTY_SECONDS);
    var document_conversion = watson.document_conversion(auth.document_conversion);
    it('convertFile()', function(done) {
      document_conversion.convert({
        file: fs.createReadStream(__dirname + '/resources/sampleWORD.docx'),
        conversion_target: 'ANSWER_UNITS'
      }, failIfError.bind(failIfError, done));
    });
  });
});

} else {
  console.warn('no test/reosources/auth.js, skipping integration tests');
}
