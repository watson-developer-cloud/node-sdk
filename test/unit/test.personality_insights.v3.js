'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');

describe('personality_insights_v3', function() {
  const noop = function() {};

  const text = 'IBM Watson Developer Cloud';
  const content_items = [
    {
      userid: 'dummy',
      id: 'dummyUuid',
      sourceid: 'freetext',
      contenttype: 'text/plain',
      language: 'en',
      content: text,
    },
  ];

  const service_response = {
    tree: {},
  };

  const service_path = '/v3/profile';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: '2016-10-19',
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, content_items)
      .reply(200, service_response)
      .post(service_path + '?raw_scores=true', content_items)
      .reply(200, service_response)
      .post(service_path + '?version=2016-10-19', text)
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  const personality_insights = new watson.PersonalityInsightsV3(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    personality_insights.profile({}, missingParameter);
    personality_insights.profile(null, missingParameter);
    personality_insights.profile(undefined, missingParameter);
  });

  it('should generate a valid payload with text', function() {
    const params = { content: text, content_type: 'text/plain' };
    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?version=2016-10-19');
    assert.equal(body, params.content);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/plain');
  });

  it('should generate a valid payload with json', function() {
    const params = { content: content_items, content_type: 'application/json' };
    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?version=2016-10-19');
    assert.equal(body, JSON.stringify(params.content));
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Language'], undefined); // service bug: content-language header overrides the language specified in JSON for each content item, so it must not be set
    assert.equal(req.headers['Content-Type'], 'application/json');
  });

  it('should generate a valid payload with html', function() {
    const params = {
      content: '<div>' + text + '</div>',
      content_type: 'text/html',
    };
    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?version=2016-10-19');
    assert.equal(body, params.content);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/html');
  });

  it('should generate a valid payload with all params', function() {
    const params = {
      content: content_items,
      content_type: 'application/json',
      content_language: 'es',
      accept_language: 'es',
      raw_scores: true,
      csv_headers: false,
      consumption_preferences: true,
    };

    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    const query_string =
      '?version=2016-10-19&raw_scores=true&csv_headers=false&consumption_preferences=true';
    assert.equal(req.uri.href, service.url + service_path + query_string);
    assert.equal(body, JSON.stringify(params.content));
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'application/json');
    assert.equal(req.headers['Content-Language'], 'es');
    assert.equal(req.headers['Accept-Language'], 'es');
  });

  it('should generate a valid csv request', function() {
    const params = { content: content_items, content_type: 'application/json' };
    const req = personality_insights.profile_csv(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?version=2016-10-19');
    assert.equal(body, JSON.stringify(params.content));
    assert.equal(req.headers['Accept'], 'text/csv');
  });

  it('should generate a valid csv request with csv headers', function() {
    const params = {
      content: content_items,
      content_type: 'application/json',
      csv_headers: true,
    };
    const req = personality_insights.profile_csv(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?version=2016-10-19&csv_headers=true');
    assert.equal(body, JSON.stringify(params.content));
    assert.equal(req.headers['Accept'], 'text/csv');
  });

  it('should format the response', function(done) {
    const params = { content: text, content_type: 'plain/text' };
    personality_insights.profile(params, function(err, response) {
      if (err) {
        done(err);
      } else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });
});
