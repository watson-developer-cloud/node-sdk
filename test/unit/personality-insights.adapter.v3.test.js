'use strict';

const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');

describe('personality_insights_v3', function() {
  const noop = function() {};

  const service_request = {
    text: 'IBM Watson Developer Cloud',
  };

  const payload = {
    contentItems: [
      {
        userid: 'dummy',
        id: 'dummyUuid',
        sourceid: 'freetext',
        contenttype: 'text/plain',
        language: 'en',
        content: service_request.text,
      },
    ],
  };
  const service_response = {
    tree: {},
  };

  const service_path = '/v3/profile';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v3',
    version_date: '2016-10-19',
  };

  beforeAll(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, payload)
      .reply(200, service_response)
      .post(service_path + '?raw_scores=true', payload)
      .reply(200, service_response)
      .post(service_path + '?version=2016-10-19', service_request.text)
      .reply(200, service_response);
  });

  afterAll(function() {
    nock.cleanAll();
  });

  const personality_insights = watson.personality_insights(service);

  const missingParameter = function(err) {
    expect(err).toBeInstanceOf(Error);
    expect(/required parameters/.test(err)).toBe(true);
  };

  it('should check no parameters provided', function() {
    personality_insights.profile({}, missingParameter);
    personality_insights.profile(null, missingParameter);
    personality_insights.profile(undefined, missingParameter);
  });

  it('should generate a valid payload with text', function() {
    const req = personality_insights.profile(service_request, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19');
    expect(body).toBe(service_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/plain');
  });

  it('should generate a valid payload with contentItems', function() {
    const req = personality_insights.profile(payload, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19');
    expect(body).toBe(JSON.stringify(payload));
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Language']).toBe(undefined); // service bug: content-language header overrides the language specified in JSON for each content item, so it must not be set
    expect(req.headers['Content-Type']).toBe('application/json');
  });

  it('should generate a valid payload with content_items', function() {
    const payload_with_content_items = { content_items: payload.contentItems };
    const req = personality_insights.profile(payload_with_content_items, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19');
    expect(body).toBe(JSON.stringify(payload));
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Language']).toBe(undefined); // service bug: content-language header overrides the language specified in JSON for each content item, so it must not be set
    expect(req.headers['Content-Type']).toBe('application/json');
  });

  it('should generate a valid payload with html', function() {
    const html_req = { text: '<div>test</div>' };
    const req = personality_insights.profile(html_req, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19');
    expect(body).toBe(html_req.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/html');
  });

  it('should generate a valid payload with raw_scores, accept-Language and content-language', function() {
    const params = extend(
      {
        raw_scores: true,
        headers: {
          'content-language': 'es',
          'accept-language': 'es',
        },
      },
      payload
    );

    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19&raw_scores=true');
    expect(body).toBe(JSON.stringify(payload));
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('application/json');
    expect(req.headers['Content-Language']).toBe('es');
    expect(req.headers['Accept-Language']).toBe('es');
  });

  it('should generate a valid request with { headers: {Accept: "text/csv"}}', function() {
    const params = extend({ headers: { accept: 'text/csv' } }, payload);
    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19');
    expect(body).toBe(JSON.stringify(payload));
    expect(req.headers['Accept']).toBe('text/csv');
  });

  it('should generate a valid request with {headers: {accept: "text/csv"}, csv_headers: true}', function() {
    const params = extend({ headers: { accept: 'text/csv' }, csv_headers: true }, payload);
    const req = personality_insights.profile(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + service_path + '?version=2016-10-19&csv_headers=true');
    expect(body).toBe(JSON.stringify(payload));
    expect(req.headers['Accept']).toBe('text/csv');
  });

  it('should format the response', function(done) {
    personality_insights.profile(service_request, function(err, response) {
      if (err) {
        done(err);
      } else {
        expect(JSON.stringify(response)).toBe(JSON.stringify(service_response));
        done();
      }
    });
  });
});
