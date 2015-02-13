'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');
var fs = require('fs');
var extend = require('extend');

describe('speech_to_text', function() {

  var noop = function() {};

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };


  var session_id = '000',
    model_id = 'model1',
    recognize_path = '/v1/recognize',
    create_session_path = '/v1/sessions',
    delete_session_path = '/v1/sessions/' + session_id,
    get_recognize_status_path = '/v1/sessions/' +session_id+ '/recognize',
    get_model_path = '/v1/models/' + model_id,
    get_models_path = '/v1/models',
    resp_new_session = {
      session_id: session_id,
      new_session_uri: '#',
      recognize: '#',
      observe_result: '#',
    },
    resp_new_session_with_cookie = extend(resp_new_session,
      { cookie_session: '111' }),
    resp_model = {
      name:'model1', rate: 16000, sessions: 'sessions1', url: 'url1',
    },
    resp_models = {
      models:[ resp_model, resp_model]
    },
    resp_recognize_status = { status: 'OK'};

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .get(get_recognize_status_path)
      .reply(200, resp_recognize_status)
      .post(recognize_path)
      .reply(200, {})
      .get(get_models_path)
      .reply(200, resp_models)
      .get(get_model_path)
      .reply(200, resp_model)
      .post(create_session_path)
      .reply(200, resp_new_session,{
        'set-cookie': ['SESSIONID=111']
      })
      .delete(delete_session_path)
      .reply(200, {});
  });

  after(function() {
    nock.cleanAll();
  });

  var speech_to_text = watson.speech_to_text(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('deleteSession should check no parameters provided', function() {
    speech_to_text.deleteSession({}, missingParameter);
    speech_to_text.deleteSession(null, missingParameter);
  });

  it('getModel should check no parameters provided', function() {
    speech_to_text.getModel({}, missingParameter);
    speech_to_text.getModel(null, missingParameter);
  });

  it('getRecognizeStatus should check no parameters provided', function() {
    speech_to_text.getRecognizeStatus({}, missingParameter);
    speech_to_text.getRecognizeStatus(null, missingParameter);
  });

  it('observeResult should check no parameters provided', function() {
    speech_to_text.observeResult({}, missingParameter);
    speech_to_text.observeResult(null, missingParameter);
  });

  it('recognize should check no parameters provided', function() {
    speech_to_text.recognize({}, missingParameter);
    speech_to_text.recognize(null, missingParameter);

  });

  it('getModel should generate a valid response', function() {
    var checkModels = function(err, res) {
      assert.equal(JSON.stringify(res), JSON.stringify(resp_models));
    };

    speech_to_text.getModels({}, checkModels);
    speech_to_text.getModels(null, checkModels);
    speech_to_text.getModels(undefined, checkModels);
  });

  it('createSession should generate a valid response', function() {
    var checkSession = function(err, res) {
      assert.equal(JSON.stringify(res), JSON.stringify(resp_new_session_with_cookie));
    };
    speech_to_text.createSession({}, checkSession);
    speech_to_text.createSession(null, checkSession);
    speech_to_text.createSession(undefined, checkSession);
  });

  it('recognize should generate a valid payload', function() {
    var payload = {
      audio: fs.createReadStream(__dirname + '/resources/audio.wav'),
      content_type: 'audio/l16;rate=16000'
    };
    var req = speech_to_text.recognize(payload, noop);
    assert.equal(req.uri.href, service.url + recognize_path);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-type'], payload.content_type);

  });

  it('deleteSession should generate a valid payload', function() {
    var payload = {session_id: session_id };
    var req = speech_to_text.deleteSession(payload, noop);
    assert.equal(req.uri.href, service.url + delete_session_path);
    assert.equal(req.method, 'DELETE');
  });

  it('createSession should generate a valid payload', function() {
    var req = speech_to_text.createSession({}, noop);
    assert.equal(req.uri.href, service.url + create_session_path);
    assert.equal(req.method, 'POST');
  });

  it('getModel should generate a valid payload', function() {
    var req = speech_to_text.getModel({model_id: model_id}, noop);
    assert.equal(req.uri.href, service.url + get_model_path);
    assert.equal(req.method, 'GET');
  });

  it('getRecognizeStatus should generate a valid payload', function() {
    var req = speech_to_text.getRecognizeStatus({session_id: session_id}, noop);
    assert.equal(req.uri.href, service.url + get_recognize_status_path);
    assert.equal(req.method, 'GET');
  });
});