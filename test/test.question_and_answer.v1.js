'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock   = require('nock');
var extend = require('extend');

describe('question_and_answer', function() {
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var question = 'what is watson?';

  var healthcare_path = '/v1/question/healthcare';
  var travel_path = '/v1/question/travel';

  var payload = {
    question: {
      evidenceRequest: {
        items: 5
      },
      questionText: question
    }
  };

  var service_response = {
    answers: {}
  };


  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(healthcare_path)
      .reply(200, service_response);

    nock(service.url)
      .persist()
      .post(travel_path)
      .reply(200, service_response);

  });

  after(function() {
    nock.cleanAll();
  });

  var question_and_answer = watson.question_and_answer(service);
  var noop = function() {};

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check for missing text', function() {
    var params = {
      items: 5,
      dataset: 'travel'
    };
    question_and_answer.ask(params, missingParameter);
  });

  it('should check for missing dataset', function() {
    var params = {
      items: 5
    };
    question_and_answer.ask(params, missingParameter);
  });

  it('should check no parameters provided', function() {
    question_and_answer.ask({}, missingParameter);
    question_and_answer.ask(null, missingParameter);
    question_and_answer.ask(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {

    // Different ways to call the service should produce the same result
    var service_url = service.url.replace(/\/$/, '');
    var requests = [{
      params: {
        text: question,
        dataset: 'travel'
      },
      url: service_url + travel_path
    }, {
      params: {
        text: question,
        dataset: 'healthcare'
      },
      url: service_url + healthcare_path
    }, {
      params: extend({
        dataset: 'travel'
      }, payload),
      url: service_url + travel_path
    }, {
      params: extend({
        dataset: 'healthcare'
      }, payload),
      url: service_url + healthcare_path
    }];


    for (var i = 0; i < requests.length; i++) {
      var req = question_and_answer.ask(requests[i].params, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, requests[i].url);
      assert.equal(body, JSON.stringify(payload));
      assert.equal(req.method, 'POST');
    }
  });

  it('should format the response', function(done) {
    var params = {
      text: question,
      dataset: 'travel'
    };
    question_and_answer.ask(params, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

});