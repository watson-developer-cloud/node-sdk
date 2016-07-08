'use strict';

var assert  = require('assert');
var watson  = require('../index');
var nock    = require('nock');
var fs      = require('fs');
var omit    = require('object.omit');

describe('visual_recognition', function() {

  var noop = function() {};

  // Test params
  var service = {
    api_key: 'batman',
    url: 'http://ibm.com:80/visual-recognition/api',
    version: 'v3',
    version_date: '2016-05-20'
  };

  var api_key_qs = 'apikey=' + service.api_key;
  var version_qs = 'version=' + service.version_date;
  var fake_file = fs.createReadStream(__dirname + '/resources/car.png');
  var service_request = {
    images_file: fake_file,
    classifier_ids: {
      classifier_ids: ['foo', 'bar']
    }
  };

  var classify_path = '/v3/classify?' + api_key_qs + '&' +  version_qs;
  var classifiers_path = '/v3/classifiers?' + api_key_qs + '&' + version_qs;
  var foo_classifiers_path = '/v3/classifiers/foo?' + api_key_qs + '&' + version_qs;
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
    assert((err instanceof Error) && /parameter/.test(err), 'Expected error to mention "parameter" but got "' + (err && err.message || err) + '"');
  };

  describe('credentials', function() {
    var env;
    before(function() {
      env = process.env;
      process.env = {
        VCAP_SERVICES: JSON.stringify({
          "watson_vision_combined": [
            {
              "name": "Visual Recognition-mj",
              "label": "watson_vision_combined",
              "plan": "free",
              "credentials": {
                "url": "https://gateway-a.watsonplatform.net/visual-recognition/api",
                "note": "It may take up to 5 minutes for this key to become active",
                "api_key": "foo"
              }
            }
          ]
        })
      };
    });
    after(function() {
      process.env = env;
    });

    it('should read credentials from cf/bluemix environment properties', function() {
      var instance = watson.visual_recognition({
        version: 'v3',
        version_date: '2016-05-20'
      });
      assert(instance._options.api_key, 'foo');
    });
  });


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

    //todo: fix this test to be asyc
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
      var uploadedParameters = JSON.parse(req.formData.parameters.value);
      assert.deepEqual(uploadedParameters.classifier_ids, params.classifier_ids);
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

    it('should check no/insufficient parameters provided', function() {
      visual_recognition.createClassifier({}, missingParameter);
      visual_recognition.createClassifier(null, missingParameter);
      visual_recognition.createClassifier(undefined, missingParameter);
      visual_recognition.createClassifier({positive_examples: '', name: 'foo'}, missingParameter);
      visual_recognition.createClassifier({foo_positive_examples: '', name: 'foo'}, missingParameter);
      visual_recognition.createClassifier({positive_examples: '', negative_examples: '', name: 'foo'}, missingParameter); // positive examples must include a tag
      visual_recognition.createClassifier({foo_positive_examples: '', negative_examples: ''}, missingParameter); // missing name
    });

    it('should generate a valid payload with streams', function(done) {
      var params = {
        foo_positive_examples: fake_file,
        negative_examples: fake_file,
        name: 'test-c'
      };

      // todo: make this fully async
      var req = visual_recognition.createClassifier(params, function(err) {
        if (err) {
          done(err);
        }
      });
      assert.equal(req.uri.href, service.url + classifiers_path);
      assert.equal(req.method, 'POST');
      assert.ok(req.formData.foo_positive_examples);
      assert.ok(req.formData.negative_examples);
      assert.equal(req.formData.name, params.name);
      done();
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

    it('should make a DELETE request and return the result', function(done) {
      var scope = nock('http://ibm.com:80', {"encodedQueryParams":true})
        .delete('/visual-recognition/api/v3/classifiers/foo_123')
        .query({"apikey":"batman","version":"2016-05-20"})
        .reply(200, {});

      visual_recognition.deleteClassifier({
        classifier_id: 'foo_123'
      }, function(err) {
        if (err) {
          return done(err);
        }
        assert(scope.isDone());
        done();
      });
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

    it('should make a GET request and return the result', function(done) {
      var expected = {
        "classifier_id":"fruit_679357912",
        "name":"fruit",
        "owner":"a3a48ea7-492b-448b-87d7-9dade8bde5a9",
        "status":"ready",
        "created":"2016-05-23T21:50:41.680Z",
        "classes":[{"class":"banana"},{"class":"apple"}]
      };
      var scope = nock('http://ibm.com:80', {"encodedQueryParams":true})
        .get('/visual-recognition/api/v3/classifiers/fruit_679357912')
        .query({"apikey":"batman","version":"2016-05-20"})
        .reply(200, expected);

      visual_recognition.getClassifier({
        classifier_id: 'fruit_679357912'
      }, function(err, res) {
        if (err) {
          return done(err);
        }
        assert(scope.isDone());
        assert.deepEqual(res, expected);
        done();
      });
    });
  });
});
