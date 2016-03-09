'use strict';

var assert  = require('assert');
var watson  = require('../lib/index');
var nock    = require('nock');
var fs      = require('fs');
var omit    = require('object.omit');

describe('visual_recognition', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v2-beta',
    version_date: '2015-12-02'
  };

  var version_qs = 'version=' + service.version_date;
  var fake_file = fs.createReadStream(__dirname + '/resources/car.png');
  var service_request = {
    images_file: fake_file,
    classifier_ids: {
      classifier_ids: ['foo', 'bar']
    }
  };

  var classify_path = '/v2/classify?' + version_qs;
  var classifiers_path = '/v2/classifiers?' + version_qs;
  var foo_classifiers_path = '/v2/classifiers/foo?' + version_qs;
  var mock_classify = {
    images: [
    {
      image: 'test-img.jpg',
      scores: [
        {
          name: 'Foo',
          classifier_id: 'foo',
          score: 0.5
        }
      ]
    }
  ]
  };

  var mock_new_classifier = {
    classifier_id: 'foo',
    name: 'Foo',
    owner: 'foo',
    status: 'foo',
    created: 'foo'
  };

  var mock_classifiers = {
    classifiers: [{
      classifier_id: 'foo',
      name: 'Foo'
    },{
      classifier_id: 'boo',
      name: 'Bar'
    }]
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(classify_path, service_request)
      .reply(200, mock_classify)
      .get(classifiers_path)
      .reply(200, mock_classifiers)
      .post(classifiers_path)
      .reply(200, mock_new_classifier);
  });

  after(function() {
    nock.cleanAll();
  });

  var visual_recognition = watson.visual_recognition(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('version_date', function() {
    it('should check no version_date provided', function(done) {
      try {
        watson.visual_recognition(omit(service,['version_date']));
      } catch(e) {
        return done();

      }
      done('version_date should be requested');
    });
  });

  describe('classify()', function() {

    it('should check no parameters provided', function() {
      visual_recognition.classify({}, missingParameter);
      visual_recognition.classify(null, missingParameter);
      visual_recognition.classify(undefined, missingParameter);
      visual_recognition.classify({images_file: ''}, missingParameter);
    });

    it('should generate a valid payload with streams', function() {

      var params = { images_file: fake_file };
      var req = visual_recognition.classify(params, noop);
      assert.equal(req.uri.href, service.url + classify_path);
      assert.equal(req.method, 'POST');
      assert.equal(req.formData.images_file.path, fake_file.path);
      assert.equal(req.formData.classifier_ids, undefined);
    });

    it('should generate a valid payload', function() {
      var params = {
        images_file: fake_file,
        classifier_ids: ['foo','bar']
      };

      var req = visual_recognition.classify(params, noop);
      assert.equal(req.uri.href, service.url + classify_path);
      assert.equal(req.method, 'POST');
      assert.equal(req.formData.images_file.path, fake_file.path);
      assert.equal(req.formData.classifier_ids, JSON.stringify(service_request.classifier_ids));
    });
  });

  describe('listClassifiers()', function() {
    it('should generate a valid payload', function() {
      var req = visual_recognition.listClassifiers({}, noop);
      assert.equal(req.uri.href, service.url + classifiers_path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createClassifier()', function() {

    it('should check no parameters provided', function() {
      visual_recognition.createClassifier({}, missingParameter);
      visual_recognition.createClassifier(null, missingParameter);
      visual_recognition.createClassifier(undefined, missingParameter);
      visual_recognition.createClassifier({positive_examples: ''}, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      var params = {
        positive_examples: fake_file,
        negative_examples: fake_file,
        name: 'test-c'
      };

      var req = visual_recognition.createClassifier(params, noop);
      assert.equal(req.uri.href, service.url + classifiers_path);
      assert.equal(req.method, 'POST');
      assert.ok(req.formData.positive_examples);
      assert.ok(req.formData.negative_examples);
      assert.equal(req.formData.name, params.name);
    });
  });

  describe('deleteClassifier()', function() {

    it('should check no parameters provided', function() {
      visual_recognition.deleteClassifier({}, missingParameter);
      visual_recognition.deleteClassifier(null, missingParameter);
      visual_recognition.deleteClassifier(undefined, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      var params = { classifier_id: 'foo' };

      var req = visual_recognition.deleteClassifier(params, noop);
      assert.equal(req.uri.href, service.url + foo_classifiers_path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getClassifier()', function() {

    it('should check no parameters provided', function() {
      visual_recognition.getClassifier({}, missingParameter);
      visual_recognition.getClassifier(null, missingParameter);
      visual_recognition.getClassifier(undefined, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      var params = { classifier_id: 'foo' };

      var req = visual_recognition.getClassifier(params, noop);
      assert.equal(req.uri.href, service.url + foo_classifiers_path);
      assert.equal(req.method, 'GET');
    });
  });


});
