'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const qs = require('querystring');

describe('alchemy_data_news', function() {
  const noop = function() {};

  // Test params
  const service = {
    api_key: 'foobar',
    url: 'http://ibm.com:80/calls',
    version: 'v1'
  };
  const apiPath = '/data/GetNews';

  const payload = {
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

  const alchemy = watson.alchemy_data_news(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  describe('getNews()', function() {
    it('should check missing parameters', function() {
      alchemy.getNews({}, missingParameter);
      alchemy.getNews(null, missingParameter);
      alchemy.getNews(undefined, missingParameter);
      alchemy.getNews({ end: 'bar' }, missingParameter);
      alchemy.getNews({ start: 'bar' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = alchemy.getNews(payload, noop);
      assert.equal(req.method, 'GET');
      const query = qs.stringify({
        apikey: 'foobar',
        start: 'bar',
        end: 'foo',
        q: 'q1.q2',
        outputMode: 'json'
      });
      const requestPath = service.url + apiPath + '?' + query;
      assert.equal(req.uri.href, requestPath);
    });
  });
});
