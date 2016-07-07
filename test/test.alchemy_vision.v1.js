'use strict';

var assert    = require('assert');
var watson    = require('../index');
var nock      = require('nock');
var qs        = require('querystring');
var fs        = require('fs');

describe('alchemy_vision', function() {

  var noop = function() {};

  // Test params
  var service = {
    api_key: 'foobar',
    url: 'http://ibm.com:80/calls',
    version: 'v1'
  };
  var apiPath = '/image/ImageGetRankedImageFaceTags';

  var payload = {
    image: fs.createReadStream(__dirname + '/resources/car.png')
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var alchemy = watson.alchemy_vision(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('recognizeFaces()', function() {

    it('should check missing parameters', function() {
      alchemy.recognizeFaces({}, missingParameter);
      alchemy.recognizeFaces(null, missingParameter);
      alchemy.recognizeFaces(undefined, missingParameter);
      alchemy.recognizeFaces({text: 'bar'}, missingParameter);
    });

    it('should generate a valid payload with an image file', function() {
      var req = alchemy.recognizeFaces(payload, noop);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var query = qs.stringify({
        apikey: 'foobar',
        outputMode: 'json',
        imagePostMode: 'raw'
      });
      var requestPath = service.url + apiPath + '?' + query;
      assert.equal(req.uri.href, requestPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
    });

    it('should generate a valid payload with a base64 image', function() {
      var req = alchemy.recognizeFaces({image: 'base64img'}, noop);
      assert.equal(req.method, 'POST');
      assert(req.form);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=foobar');
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({
        image: 'base64img',
        outputMode: 'json',
        imagePostMode: 'not-raw'
      });
      assert.equal(body, expectedBody);
    });

    it('should generate a valid payload with a url', function() {
      var req = alchemy.recognizeFaces({url : 'http://bat.com/foo.png'}, noop);
      var imagePath = service.url + '/url/URLGetRankedImageFaceTags?apikey=foobar';
      assert.equal(req.uri.href, imagePath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      var body = new Buffer(req.body).toString('ascii');
      var expectedBody = qs.stringify({
        url : 'http://bat.com/foo.png',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });

  });
});
