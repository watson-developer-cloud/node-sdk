'use strict';

var assert    = require('assert');
var watson    = require('../');
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
  var apiPath = '/data/GetNews';

  var payload = {
    start: 'bar',
    end: 'foo',
    q: 'q1.q2'
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var alchemy = watson.alchemy_data_news(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('getNews()', function() {

    it('should check missing parameters', function() {
      alchemy.getNews({}, missingParameter);
      alchemy.getNews(null, missingParameter);
      alchemy.getNews(undefined, missingParameter);
      alchemy.getNews({end: 'bar'}, missingParameter);
      alchemy.getNews({start: 'bar'}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = alchemy.getNews(payload, noop);
      assert.equal(req.method, 'GET');
      var query = qs.stringify({
        apikey: 'foobar',
        start: 'bar',
        end: 'foo',
        q: 'q1.q2',
        outputMode: 'json'
      });
      var requestPath = service.url + apiPath + '?' + query;
      assert.equal(req.uri.href, requestPath);
    });
  });
});
