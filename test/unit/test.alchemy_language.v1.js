'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const qs = require('querystring');

describe('alchemy_language', function() {
  const noop = function() {};

  // Test params
  const service = {
    apikey: 'foobar',
    url: 'http://ibm.com:80/calls',
    version: 'v1'
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  const alchemy = watson.alchemy_language(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  describe('entities()', function() {
    const apiPath = '/text/TextGetRankedNamedEntities';

    const payload = {
      text: 'sample text'
    };

    it('should check missing parameters', function() {
      alchemy.entities({}, missingParameter);
      alchemy.entities(null, missingParameter);
      alchemy.entities(undefined, missingParameter);
      alchemy.entities({ foo: 'bar' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = alchemy.entities(payload, noop);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.apikey);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(body, qs.stringify({ text: payload.text, outputMode: 'json' }));
    });

    it('should use sentiment_target if target is specified', function() {
      const req = alchemy.sentiment({ text: payload.text, target: 'bat' }, noop);
      const sentimenTargetPath = service.url + '/text/TextGetTargetedSentiment?apikey=' + service.apikey;
      assert.equal(req.uri.href, sentimenTargetPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        text: payload.text,
        target: 'bat',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });

    it('should use sentiment if target is not specified', function() {
      const req = alchemy.sentiment(payload, noop);
      const sentimenPath = service.url + '/text/TextGetTextSentiment?apikey=' + service.apikey;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        text: payload.text,
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });

    it('should use /text/ endpoint if the text parameter is passed', function() {
      const req = alchemy.sentiment({ text: payload.text, url: 'www.ibm.com' }, noop);
      const sentimenPath = service.url + '/text/TextGetTextSentiment?apikey=' + service.apikey;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        text: payload.text,
        url: 'www.ibm.com',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });

    it('should use /html/ endpoint if the html parameter is passed', function() {
      const req = alchemy.sentiment({ html: '<html><body>test</body></html>', url: 'www.ibm.com' }, noop);
      const sentimenPath = service.url + '/html/HTMLGetTextSentiment?apikey=' + service.apikey;
      assert.equal(req.uri.href, sentimenPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        html: '<html><body>test</body></html>',
        url: 'www.ibm.com',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });
  });

  describe('title()', function() {
    it('should check missing parameters', function() {
      alchemy.entities({}, missingParameter);
      alchemy.entities(null, missingParameter);
      alchemy.entities(undefined, missingParameter);
      alchemy.entities({ foo: 'bar' }, missingParameter);
    });

    describe('url', function() {
      const apiPath = '/url/URLGetTitle';

      const payload = {
        url: 'http://example.com/'
      };

      it('should generate a valid payload', function() {
        const req = alchemy.title(payload, noop);
        assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.apikey);
        assert.equal(req.method, 'POST');
        assert(req.form);
        const body = Buffer.from(req.body).toString('ascii');
        assert.equal(body, qs.stringify({ url: 'http://example.com/', outputMode: 'json' }));
      });
    });

    describe('html', function() {
      const apiPath = '/html/HTMLGetTitle';

      const payload = {
        html: 'sample text'
      };

      it('should generate a valid payload', function() {
        const req = alchemy.title(payload, noop);
        assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.apikey);
        assert.equal(req.method, 'POST');
        assert(req.form);
        const body = Buffer.from(req.body).toString('ascii');
        assert.equal(body, qs.stringify({ html: 'sample text', outputMode: 'json' }));
      });
    });
  });

  describe('dates()', function() {
    const apiPath = '/text/TextExtractDates';

    const payload = {
      text: 'Set a reminder for my appointment next Tuesday',
      anchorDate: '2016-03-22 00:00:00'
    };

    it('should generate a valid payload', function() {
      const req = alchemy.dates(payload, noop);
      assert.equal(req.uri.href, service.url + apiPath + '?apikey=' + service.apikey);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(
        body,
        qs.stringify({
          text: 'Set a reminder for my appointment next Tuesday',
          anchorDate: '2016-03-22 00:00:00',
          outputMode: 'json'
        })
      );
    });
  });

  describe('emotion()', function() {
    const payload = {
      text: 'I love coding. I hate busywork.'
    };

    const target_payload = {
      text: 'I love coding. I hate busywork.',
      targets: ['coding', 'busywork']
    };

    it('should get document-level emotion if no target is passed', function() {
      const req = alchemy.emotion(payload, noop);
      const emotionPath = service.url + '/text/TextGetEmotion?apikey=' + service.apikey;
      assert.equal(req.uri.href, emotionPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        text: payload.text,
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });

    it('should get targeted emotion if targets are passed', function() {
      const req = alchemy.emotion(target_payload, noop);
      const targetedEmotionPath = service.url + '/text/TextGetTargetedEmotion?apikey=' + service.apikey;
      assert.equal(req.uri.href, targetedEmotionPath);
      assert.equal(req.method, 'POST');
      assert(req.form);
      const body = Buffer.from(req.body).toString('ascii');
      const expectedBody = qs.stringify({
        text: payload.text,
        targets: 'coding|busywork',
        outputMode: 'json'
      });
      assert.equal(body, expectedBody);
    });
  });

  // https://github.com/watson-developer-cloud/node-sdk/issues/478
  describe('deserialization', function() {
    it("shouldn't treat invalid JSON strings as objects when building the error object", function(done) {
      const expectation = nock('http://ibm.com:80', { encodedQueryParams: true })
        .post(
          '/calls/text/TextGetCombinedData',
          'extract=entity&text=Bear%20River%20Massacre%20ceremony%20marks%20sesquicentennial%20anniversary%20of%20event%20Farid%20Rushdi%07%20for%20the%20Journal&outputMode=json'
        )
        .query({ apikey: 'foobar' })
        // this is the exact response from the server - gzipped and all. It's base-64 encoded here, nock decodes that to binary and then responds with that.
        // this decodes to not-quite-valid JSON - it has a \a instead of a \u0007 (both represent the bell character, but only the latter is valid JSON)
        .reply(
          200,
          [
            '1f8b0800000000000003b553db6adc30107d0fe41f063fb590da294b4bd9b7ec434a6f2484843cb4218ca5b12c6a4b46976c4cc8bf57922fbb8dd396422b30c83347a333e78c1e0e0f20accc3a74de666bc8ce3e654763d05b1414639b1e9031b2562a01270daba9ed4fce3f8036e0534caa4a9b169dd40a042932e88843d9ef818fa0d71ed010a03044b192d3501294daab847535ede1e1924c6b41577065690db573ddba28b6db6d8e0301ec64ce745b84af43d5172ee2f3dab5cddc40834af8b10752a291b69e73a49c749262cf5f877ea3100fbb6dd2c5f55d52e09c8cd56a3a1c537165861aba43c512e6385fad160816ba7351c3d78b94a3fb94394523395c785b73f90db31d83c7d18878d52f8919a9dc17e21217f5ff09b98fda1b85cd5fb27a4f5a18ec6ac94e290c96a1ff436e4368e042de9159d4e7d2625bca607f98c4a0ff13fd927bd6979783bf7b131033d3ca3e6b9686fa69f919b0d1bc3fabaec3250b0a336620b8b3754adcecd93bc53285edf0e4e6d6e0c595c3fae57314325e76c9fa305fe3031923b936a23064837b8c8aa8d36da271fb9b6255789625da74fd58cdf02a9fc2e9b1295bb4f9f1eaed9b77f7cf12ea51e838ede3f9f8fbeabbd2db86b8a03f91fa59a2c7ddefb8bd393c08bb1fa9006fd6b3040000'
          ],
          ['Content-Type', 'application/json', 'Content-Encoding', 'gzip']
        );

      alchemy.combined(
        {
          extract: 'entity',
          text: 'Bear River Massacre ceremony marks sesquicentennial anniversary of event Farid Rushdi\u0007 for the Journal'
        },
        err => {
          assert(expectation.isDone());
          assert(err); // we're expecting an error!
          assert.equal(err[1], undefined, "String errors should not be extend()'d onto the Error instance");
          done();
        }
      );
    });
  });
});
