'use strict';

var assert  = require('assert');
var request = require('request');
var watson  = require('../lib/index');
var nock    = require('nock');
var fs      = require('fs');

describe('visual_recognition', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };
  var service_request = {
    image_file: fs.createReadStream(__dirname + '/resources/car.png'),
    labels_to_check: JSON.stringify({
      label_groups: ['Vehicle']
    })
  };

  var recognize_path = '/v1/tag/recognize';
  var labels_path = '/v1/tag/labels';
  var aux_path = '/test';
  var mock_recognize = {
    images: [{
      image_id: '0',
      image_name: 'horses.jpg',
      labels: [{
        label_name: 'Photo',
        label_score: '0.73438'
      }]
    }]
  };
  var mock_labels = {
    label_groups: ['Activity Facility', 'Adult', 'Adventure Sport']
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(recognize_path, service_request)
      .reply(200, mock_recognize)
      .get(labels_path)
      .reply(200, mock_labels)
      .get(aux_path)
      .reply(200);
  });

  after(function() {
    nock.cleanAll();
  });

  var visual_recognition = watson.visual_recognition(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('recognize()', function() {

    it('should check no parameters provided', function() {
      visual_recognition.recognize({}, missingParameter);
      visual_recognition.recognize(null, missingParameter);
      visual_recognition.recognize(undefined, missingParameter);
      visual_recognition.recognize({image_file: ''}, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      var params = {image_file: request(service.url + aux_path)};
      var req = visual_recognition.recognize(params, noop);
      assert.equal(req.uri.href, service.url + recognize_path);
      assert.equal(req.method, 'POST');
      assert.equal(req.formData.image_file.path, aux_path);
      assert.equal(req.formData.labels_to_check, undefined);
    });

    it('should generate a valid payload', function() {
      var req = visual_recognition.recognize(service_request, noop);
      assert.equal(req.uri.href, service.url + recognize_path);
      assert.equal(req.method, 'POST');
      assert.equal(req.formData.image_file.path, __dirname + '/resources/car.png');
      assert.equal(req.formData.labels_to_check, JSON.stringify({
        label_groups: ['Vehicle']
      }));
    });
  });

  describe('labels()', function() {

    it('should generate a valid payload', function() {
      var req = visual_recognition.labels({}, noop);
      assert.equal(req.uri.href, service.url + labels_path);
      assert.equal(req.method, 'GET');
    });
  });

});