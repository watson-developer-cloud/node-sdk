'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const qs = require('querystring');
const fs = require('fs');

describe('alchemy_vision', function() {
  const noop = function() {};

  // Test params
  const service = {
    apikey: 'foobar',
    url: 'http://ibm.com:80/calls',
    version: 'v1'
  };
  const apiPath = '/image/ImageGetRankedImageFaceTags';

  const payload = {
    image: fs.createReadStream(__dirname + '/../resources/car.png')
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  const alchemy = watson.alchemy_vision(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  describe('recognizeFaces()', function() {
    it('should check missing parameters', function() {
      alchemy.recognizeFaces({}, missingParameter);
      alchemy.recognizeFaces(null, missingParameter);
      alchemy.recognizeFaces(undefined, missingParameter);
      alchemy.recognizeFaces({ text: 'bar' }, missingParameter);
    });

    it('should generate a valid payload with an image file', function() {
      const req = alchemy.recognizeFaces(payload, noop);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const query = qs.stringify({
        apikey: 'foobar',
        outputMode: 'json',
        imagePostMode: 'raw'
      });
      const requestPath = service.url + apiPath + '?' + query;
      assert.equal(req.uri.href, requestPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
    });

    it('should generate a valid payload with a base64 image', function() {
      const req = alchemy.recognizeFaces({ image: 'base64img' }, noop);
      assert.equal(req.method, 'POST');
      assert(req.form);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=foobar');
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        image: 'base64img',
        outputMode: 'json',
        imagePostMode: 'not-raw'
      });
      assert.equal(body, expectedBody);
    });

    it('should generate a valid payload with a url', function() {
      const req = alchemy.recognizeFaces({ url: 'http://bat.com/foo.png' }, noop);
      const imagePath = service.url + '/url/URLGetRankedImageFaceTags?apikey=foobar';
      assert.equal(req.uri.href, imagePath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        url: 'http://bat.com/foo.png',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });
  });
});
