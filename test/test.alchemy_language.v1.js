'use strict';

var assert    = require('assert');
var watson    = require('../index');
var nock      = require('nock');
var qs        = require('querystring');

describe('alchemy_language', function() {

  var noop = function() {};

  // Test params
  var service = {
    api_key: 'foobar',
    url: 'http://ibm.com:80/calls',
    version: 'v1'
  };


  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var alchemy = watson.alchemy_language(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('entities()', function() {

    var apiPath = '/text/TextGetRankedNamedEntities';

    var payload = {
      text: 'sample text'
    };

    it('should check missing parameters', function() {
      alchemy.entities({}, missingParameter);
      alchemy.entities(null, missingParameter);
      alchemy.entities(undefined, missingParameter);
      alchemy.entities({foo: 'bar'}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = alchemy.entities(payload, noop);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.api_key);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(body, qs.stringify({ text: payload.text, outputMode: 'json'}));
    });

    it('should use sentiment_target if target is specified', function() {
      var req = alchemy.sentiment({text: payload.text, target:'bat'}, noop);
      var sentimenTargetPath = service.url + '/text/TextGetTargetedSentiment?apikey=' + service.api_key;
      assert.equal(req.uri.href, sentimenTargetPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({ text: payload.text,target: 'bat', outputMode: 'json'});
      assert.equal(body, expectedBody);
    });

    it('should use sentiment if target is not specified', function() {
      var req = alchemy.sentiment(payload, noop);
      var sentimenPath = service.url + '/text/TextGetTextSentiment?apikey=' + service.api_key;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({ text: payload.text, outputMode: 'json'});
      assert.equal(body, expectedBody);
    });

    it('should use /text/ endpoint if the text parameter is passed', function() {
      var req = alchemy.sentiment({text: payload.text, url:'www.ibm.com'}, noop);
      var sentimenPath = service.url + '/text/TextGetTextSentiment?apikey=' + service.api_key;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({ text: payload.text, url:'www.ibm.com', outputMode: 'json'});
      assert.equal(body, expectedBody);
    });

    it('should use /html/ endpoint if the html parameter is passed', function() {
      var req = alchemy.sentiment({html: '<html><body>test</body></html>', url:'www.ibm.com'}, noop);
      var sentimenPath = service.url + '/html/HTMLGetTextSentiment?apikey=' + service.api_key;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({html: '<html><body>test</body></html>', url:'www.ibm.com', outputMode: 'json'});
      assert.equal(body, expectedBody);
    });

  });

  describe('title()', function() {

    it('should check missing parameters', function() {
      alchemy.entities({}, missingParameter);
      alchemy.entities(null, missingParameter);
      alchemy.entities(undefined, missingParameter);
      alchemy.entities({foo: 'bar'}, missingParameter);
    });

    describe('url', function() {
      var apiPath = '/url/URLGetTitle';

      var payload = {
        url: 'http://example.com/'
      };

      it('should generate a valid payload', function() {
        var req = alchemy.title(payload, noop);
        assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.api_key);
        assert.equal(req.method, 'POST');
        assert(req.form);
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, qs.stringify({ url: 'http://example.com/', outputMode: 'json'}));
      });
    });

    describe('html', function() {
      var apiPath = '/html/HTMLGetTitle';

      var payload = {
        html: 'sample text'
      };

      it('should generate a valid payload', function() {
        var req = alchemy.title(payload, noop);
        assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.api_key);
        assert.equal(req.method, 'POST');
        assert(req.form);
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, qs.stringify({ html: 'sample text', outputMode: 'json'}));
      });
    });
  })

  describe('dates()', function() {
    var apiPath = '/text/TextExtractDates';

    var payload = {
      text: 'Set a reminder for my appointment next Tuesday',
      anchorDate: '2016-03-22 00:00:00'
    };

    it('should generate a valid payload', function() {
      var req = alchemy.dates(payload, noop);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.api_key);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(body, qs.stringify({ text: 'Set a reminder for my appointment next Tuesday', anchorDate: '2016-03-22 00:00:00', outputMode: 'json'}));
    });
  });

  describe('emotion()', function() {
    var payload = {
      text: 'I love coding. I hate busywork.'
    };

    var target_payload = {
      text: 'I love coding. I hate busywork.',
      targets: [
        'coding',
        'busywork'
      ]
    };

    it('should get document-level emotion if no target is passed', function() {
      var req = alchemy.emotion(payload, noop);
      var emotionPath = service.url + '/text/TextGetEmotion?apikey=' + service.api_key;
      assert.equal(req.uri.href, emotionPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({ text: payload.text, outputMode: 'json'});
      assert.equal(body, expectedBody);
    });


    it('should get targeted emotion if targets are passed', function() {
      var req = alchemy.emotion(target_payload, noop);
      var targetedEmotionPath = service.url + '/text/TextGetTargetedEmotion?apikey=' + service.api_key;
      assert.equal(req.uri.href, targetedEmotionPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({ text: payload.text, targets: 'coding|busywork', outputMode: 'json'});
      assert.equal(body, expectedBody);
    });
  });
});
