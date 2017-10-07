'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');

describe('tradeoff_analytics', function() {
  const noop = function() {};

  const service_request = {
    subject: 'phone',
    columns: [
      {
        key: 'price',
        full_name: 'Price (Eur)',
        type: 'NUMERIC',
        is_objective: true,
        goal: 'MIN'
      },
      {
        key: 'RAM',
        full_name: 'RAM (MB)',
        type: 'NUMERIC',
        is_objective: false,
        goal: 'MAX'
      },
      {
        key: 'screen_size',
        full_name: 'Screen size (inch)',
        type: 'NUMERIC',
        is_objective: true,
        goal: 'MAX'
      },
      {
        key: 'camera',
        full_name: 'Camera (MP)',
        type: 'NUMERIC',
        is_objective: true,
        goal: 'MAX'
      },
      {
        key: 'memory_size',
        full_name: 'Memory size (GB)',
        type: 'NUMERIC',
        is_objective: false,
        goal: 'MAX'
      },
      {
        key: 'battery',
        full_name: 'Battery (mAh)',
        type: 'NUMERIC',
        is_objective: false,
        goal: 'MAX'
      },
      {
        key: 'weight',
        full_name: 'Weight (gr)',
        type: 'NUMERIC',
        is_objective: true,
        goal: 'MIN'
      }
    ],
    options: [
      {
        key: ' 1',
        name: 'Samsung Galaxy S4 White',
        values: {
          weight: 130,
          price: 239,
          RAM: 2048,
          battery: 2600,
          camera: 13,
          memory_size: 16,
          screen_size: 5
        }
      },
      {
        key: '2',
        name: 'Samsung Galaxy S4 Black',
        values: {
          weight: 130,
          price: 239,
          RAM: 2048,
          battery: 2600,
          camera: 13,
          memory_size: 16,
          screen_size: 5
        }
      },
      {
        key: '3',
        name: 'Samsung Galaxy S3 White',
        values: {
          weight: 133,
          price: 79,
          RAM: 2048,
          battery: 2100,
          camera: 8,
          memory_size: 16,
          screen_size: 4.8
        }
      }
    ]
  };

  let events_request = {
    widget_instance_uuid: 'e8d263d9-a0a7-43f4-81cf-2767ad246cb5',
    widget_show_uuid: null,
    dilemma_call_uuid: null,
    event_number: 0,
    category: 'widget',
    action: 'started',
    object: 'basic',
    value: {
      optionHighlighting: false,
      favorites: true,
      favoritesTab: false,
      optionDetails: true,
      filters: true,
      filterHistogram: false,
      objectivesOnly: true,
      optimalsList: true,
      autoExcludedList: true,
      incompleteList: true,
      tradeoffAnalyzer: true,
      undoRedo: false,
      exploreViz: 'both',
      questionEditor: 'editableNoToggle',
      bidiTextDir: 'auto',
      analytics: 'MetadataAndEvents'
    },
    timestamp: 1442414658641
  };

  events_request = {}; // todo: fix the broken tests that depend on this
  // (the content had been in a json file, but it was named .js - so it exported nothing when required by node. And the tests expect that right now :(

  const service_response = {};

  const service_path = '/v1/dilemmas';
  const service_path_no_viz = '/v1/dilemmas?generate_visualization=false';
  const events_path = '/v1/events';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, service_request)
      .reply(200, service_response);
    nock(service.url)
      .persist()
      .post(service_path_no_viz, service_request)
      .reply(200, service_response);
    nock(service.url)
      .persist()
      .post(events_path, events_request)
      .reply(200);
  });

  after(function() {
    nock.cleanAll();
  });

  const tradeoff_analytics = watson.tradeoff_analytics(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    tradeoff_analytics.dilemmas({}, missingParameter);
    tradeoff_analytics.dilemmas(null, missingParameter);
    tradeoff_analytics.dilemmas(undefined, missingParameter);

    tradeoff_analytics.events({}, missingParameter);
    tradeoff_analytics.events(null, missingParameter);
    tradeoff_analytics.events(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
    const params = extend({}, service_request);
    params.metadata_header = 'test_header_content';
    const req = tradeoff_analytics.dilemmas(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, JSON.stringify(service_request));
    assert.notEqual(body, JSON.stringify(params));
    assert.equal(req.headers['x-watson-metadata'], params.metadata_header);
    assert.equal(req.method, 'POST');
  });

  it('should append generate_visualization=false query param to url if (and only if) needed', function() {
    // check with generate_visualization = false
    let params = extend({}, service_request);
    params.generate_visualization = false;
    let req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path_no_viz);

    // check with generate_visualization = true
    params = extend({}, service_request);
    params.generate_visualization = true;
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);

    // check with generate_visualization = 'sdfsd' - should be same as 'true'
    params = extend({}, service_request);
    params.generate_visualization = 'sdfsd';
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);

    // check without generate_visualization- should be same as 'true'
    params = extend({}, service_request);
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);
  });

  it('should forward the events correctly', function() {
    const params = extend({}, events_request);
    params.metadata_header = 'test_header_content';
    const req = tradeoff_analytics.events(params, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + events_path);
    assert.equal(body, JSON.stringify(events_request));
    assert.notEqual(body, JSON.stringify(params));
    assert.equal(req.headers['x-watson-metadata'], params.metadata_header);
    assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    tradeoff_analytics.dilemmas(service_request, function(err, response) {
      if (err) {
        done(err);
      } else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

  it('should append find_preferable_options=true query param to url', function() {
    // check with find_preferable_options = true
    const service_path_pref_ops = '/v1/dilemmas?find_preferable_options=true';
    const params = extend({}, service_request);
    params.find_preferable_options = true;
    const req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path_pref_ops);
  });

  it('should not append find_preferable_options=false query param to url', function() {
    const params = extend({}, service_request);
    params.find_preferable_options = false;
    const req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);
  });
});
