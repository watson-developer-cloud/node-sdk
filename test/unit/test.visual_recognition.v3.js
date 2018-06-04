'use strict';

const assert = require('assert');
const watson = require('../../index');
const sinon = require('sinon');
const nock = require('nock');
const fs = require('fs');
const omit = require('object.omit');
const URL = require('url');

describe('visual_recognition', function() {
  const noop = function() {};

  // Test params
  const service = {
    api_key: 'batman',
    url: 'http://ibm.com:80/visual-recognition/api',
    version: '2016-05-20',
  };

  const api_key_qs = 'api_key=' + service.api_key;
  const version_qs = 'version=' + service.version;
  const fake_file = fs.createReadStream(__dirname + '/../resources/car.png');
  const fake_buffer = fs.readFileSync(__dirname + '/../resources/car.png');
  const service_request = {
    images_file: fake_file,
    classifier_ids: {
      classifier_ids: ['foo', 'bar'],
    },
  };

  const classify_path = '/v3/classify?' + api_key_qs + '&' + version_qs;
  const detect_faces_path = '/v3/detect_faces?' + api_key_qs + '&' + version_qs;
  const classifiers_path = '/v3/classifiers?' + api_key_qs + '&' + version_qs;
  const foo_classifiers_path = '/v3/classifiers/foo?' + api_key_qs + '&' + version_qs;
  const mock_classify = {
    images: [
      {
        image: 'test-img.jpg',
        scores: [
          {
            name: 'Foo',
            classifier_id: 'foo',
            score: 0.5,
          },
        ],
      },
    ],
  };

  const mock_new_classifier = {
    classifier_id: 'foo',
    name: 'Foo',
    owner: 'foo',
    status: 'foo',
    created: 'foo',
  };

  const mock_classifiers = {
    classifiers: [
      {
        classifier_id: 'foo',
        name: 'Foo',
      },
      {
        classifier_id: 'boo',
        name: 'Bar',
      },
    ],
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

  const visual_recognition = new watson.VisualRecognitionV3(service);

  const missingParameter = function(err) {
    assert(
      err instanceof Error && /parameter/.test(err),
      'Expected error to mention "parameter" but got "' + ((err && err.message) || err) + '"'
    );
  };

  describe('credentials', function() {
    let env;
    beforeEach(function() {
      env = process.env;
      process.env = {};
    });
    afterEach(function() {
      process.env = env;
    });

    it('should throw when no/insufficient credentials are provided', () => {
      assert.throws(() => new watson.VisualRecognitionV3(), /Insufficient credentials/);
      assert.throws(() => new watson.VisualRecognitionV3({}), /Insufficient credentials/);
      assert.throws(
        () => new watson.VisualRecognitionV3({ version: '2016-05-20' }),
        /Insufficient credentials/
      );
      assert.throws(
        () => new watson.VisualRecognitionV3({ username: 'foo' }),
        /Insufficient credentials/
      );
    });

    it('should accept an API key for regular usage', () =>
      new watson.VisualRecognitionV3({
        api_key: 'foo',
        version: '2016-05-20',
      }));

    it('should accept username/password for regular usage', () =>
      new watson.VisualRecognitionV3({
        username: 'foo',
        password: 'bar',
        version: '2016-05-20',
      }));

    it('should accept VISUAL_RECOGNITION_API_KEY env property', () => {
      process.env.VISUAL_RECOGNITION_API_KEY = 'foo';
      return new watson.VisualRecognitionV3({ version: '2016-05-20' });
    });

    it('should read VISUAL_RECOGNITION_API_KEY environment property', function() {
      process.env = {
        VISUAL_RECOGNITION_API_KEY: 'foo',
      };
      const instance = new watson.VisualRecognitionV3({
        version: '2016-05-20',
      });
      assert.equal(instance._options.api_key, 'foo');
      assert.equal(instance._options.username, undefined);
      assert.equal(instance._options.password, undefined);
    });

    it('should read VISUAL_RECOGNITION_USERNAME / PASSWORD from environment properties', function() {
      process.env.VISUAL_RECOGNITION_USERNAME = 'foo';
      process.env.VISUAL_RECOGNITION_PASSWORD = 'bar';
      const instance = new watson.VisualRecognitionV3({
        version: '2016-05-20',
      });
      assert.equal(instance._options.api_key, undefined);
      assert.equal(instance._options.username, 'foo');
      assert.equal(instance._options.password, 'bar');
    });

    it('should read api_key from cf/bluemix environment properties', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        watson_vision_combined: [
          {
            name: 'Visual Recognition-mj',
            label: 'watson_vision_combined',
            plan: 'free',
            credentials: {
              url: 'https://gateway-a.watsonplatform.net/visual-recognition/api',
              note: 'It may take up to 5 minutes for this key to become active',
              api_key: 'foo',
            },
          },
        ],
      });
      const instance = new watson.VisualRecognitionV3({
        version: '2016-05-20',
      });
      console.log(instance._options);
      assert.equal(instance._options.api_key, 'foo');
      assert.equal(instance._options.username, undefined);
      assert.equal(instance._options.password, undefined);
    });

    it('should read username / password from cf/bluemix environment properties', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        watson_vision_combined: [
          {
            name: 'Visual Recognition-mj',
            label: 'watson_vision_combined',
            plan: 'free',
            credentials: {
              url: 'https://gateway-a.watsonplatform.net/visual-recognition/api',
              note: 'It may take up to 5 minutes for this key to become active',
              username: 'foo',
              password: 'bar',
            },
          },
        ],
      });
      const instance = new watson.VisualRecognitionV3({
        version: '2016-05-20',
      });
      assert.equal(instance._options.api_key, undefined);
      assert.equal(instance._options.username, 'foo');
      assert.equal(instance._options.password, 'bar');
    });
  });

  describe('version', function() {
    it('should check no version provided', function(done) {
      try {
        new watson.VisualRecognitionV3(omit(service, ['version']));
      } catch (e) {
        return done();
      }
      done('version should be requested');
    });
  });

  describe('classify()', function() {
    // todo: fix this test to be asyc
    it('should check no parameters provided', function() {
      visual_recognition.classify({}, missingParameter);
      visual_recognition.classify(null, missingParameter);
      visual_recognition.classify(undefined, missingParameter);
      visual_recognition.classify({ images_file: '' }, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      const params = { image_file: fake_file };
      const req = visual_recognition.classify(params, noop);
      assert.equal(req.uri.href, service.url + classify_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value.path, fake_file.path);
      assert.equal(req.formData.images_file.value, params.images_file);
    });

    it('should generate a valid paylod with buffers', function() {
      const params = {
        images_file: fake_buffer,
        parameters: { owners: ['me', 'IBM'] },
      };
      const req = visual_recognition.classify(params, noop);
      assert.equal(req.uri.href, service.url + classify_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value, params.images_file);
      const parameters = req.formData;
      assert.deepEqual(parameters.owners, 'me,IBM');
      assert.equal(parameters.url, undefined);
      assert.equal(parameters.threshold, undefined);
    });

    it('should generate a valid payload with an image file', function() {
      const params = {
        images_file: fake_file,
        classifier_ids: ['foo', 'bar'],
      };

      const req = visual_recognition.classify(params, noop);
      assert.equal(req.uri.href, service.url + classify_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value.path, fake_file.path);
      assert.deepEqual(req.formData.classifier_ids, params.classifier_ids.join(','));
    });

    it('should generate a valid payload with a url', function() {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg',
        classifier_ids: ['foo', 'bar'],
      };

      const req = visual_recognition.classify(params, noop);
      assert.equal(req.method, 'POST');
      assert.equal(req.uri.pathname, URL.parse(service.url + classify_path).pathname);
      assert(req.formData);
      const parameters = req.formData;
      assert.deepEqual(parameters.classifier_ids, params.classifier_ids.join(','));
    });
  });

  describe('detectFaces()', function() {
    it('should check no parameters provided', function() {
      visual_recognition.detectFaces({}, missingParameter);
      visual_recognition.detectFaces(null, missingParameter);
      visual_recognition.detectFaces(undefined, missingParameter);
      visual_recognition.detectFaces({ images_file: '' }, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      const params = { image_file: fake_file };
      const req = visual_recognition.detectFaces(params, noop);
      assert.equal(req.uri.href, service.url + detect_faces_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value.path, fake_file.path);
      assert.equal(req.formData.images_file.value, params.images_file);
    });

    it('should generate a valid paylod with buffers', function() {
      const params = {
        images_file: fake_buffer,
        parameters: { owners: ['me', 'IBM'] },
      };
      const req = visual_recognition.detectFaces(params, noop);
      assert.equal(req.uri.href, service.url + detect_faces_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value, params.images_file);
    });

    it('should generate a valid payload with an image file', function() {
      const params = {
        images_file: fake_file,
        classifier_ids: ['foo', 'bar'],
      };

      const req = visual_recognition.detectFaces(params, noop);
      assert.equal(req.uri.href, service.url + detect_faces_path);
      assert.equal(req.method, 'POST');
      // we always convert files to request-style objects
      assert.equal(req.formData.images_file.value.path, fake_file.path);
      assert.deepEqual(req.formData.images_file.value, params.images_file);
    });

    it('should generate a valid payload with a url', function() {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg',
        classifier_ids: ['foo', 'bar'],
      };

      const req = visual_recognition.detectFaces(params, noop);
      assert.equal(req.method, 'POST');
      assert.equal(req.uri.pathname, URL.parse(service.url + detect_faces_path).pathname);
      assert(req.formData);
      const parameters = req.formData;
      assert.deepEqual(parameters.url, params.url);
    });
  });

  describe('listClassifiers()', function() {
    it('should generate a valid payload', function() {
      const req = visual_recognition.listClassifiers({}, noop);
      assert.equal(req.uri.href, service.url + classifiers_path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createClassifier()', function() {
    it('should check no/insufficient parameters provided', function() {
      visual_recognition.createClassifier({}, missingParameter);
      visual_recognition.createClassifier(null, missingParameter);
      visual_recognition.createClassifier(undefined, missingParameter);
      visual_recognition.createClassifier({ positive_examples: '', name: 'foo' }, missingParameter);
      visual_recognition.createClassifier(
        { foo_positive_examples: '', name: 'foo' },
        missingParameter
      );
      visual_recognition.createClassifier(
        { positive_examples: '', negative_examples: '', name: 'foo' },
        missingParameter
      ); // positive examples must include a tag
      visual_recognition.createClassifier(
        { foo_positive_examples: '', negative_examples: '' },
        missingParameter
      ); // missing name
    });

    it('should generate a valid payload with streams', function(done) {
      const params = {
        foo_positive_examples: fake_file,
        negative_examples: fake_file,
        name: 'test-c',
      };

      // todo: make this fully async
      const req = visual_recognition.createClassifier(params, function(err) {
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
  describe('retrainClassifier()', function() {
    it('should call updateClassifier()', function() {
      visual_recognition.retrainClassifier({}, missingParameter);
    });
  });

  describe('updateClassifier()', function() {
    it('should check no/insufficient parameters provided', function() {
      visual_recognition.updateClassifier({}, missingParameter);
      visual_recognition.updateClassifier(null, missingParameter);
      visual_recognition.updateClassifier(undefined, missingParameter);
      visual_recognition.updateClassifier({ positive_examples: '', name: 'foo' }, missingParameter);
      visual_recognition.updateClassifier(
        { foo_positive_examples: '', name: 'foo' },
        missingParameter
      );
      visual_recognition.updateClassifier(
        { positive_examples: '', negative_examples: '', name: 'foo' },
        missingParameter
      ); // positive examples must include a tag
      visual_recognition.updateClassifier(
        { foo_positive_examples: '', negative_examples: '' },
        missingParameter
      ); // missing name
    });

    it('should generate a valid payload with streams', function(done) {
      const params = {
        foo_positive_examples: fake_file,
        negative_examples: fake_file,
        classifier_id: 'foo',
      };

      // todo: make this fully async
      const req = visual_recognition.updateClassifier(params, function(err) {
        if (err) {
          done(err);
        }
      });
      assert.equal(req.uri.href, service.url + foo_classifiers_path);
      assert.equal(req.method, 'POST');
      assert.ok(req.formData.foo_positive_examples);
      assert.ok(req.formData.negative_examples);
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
      const params = { classifier_id: 'foo' };

      const req = visual_recognition.deleteClassifier(params, noop);
      assert.equal(req.uri.href, service.url + foo_classifiers_path);
      assert.equal(req.method, 'DELETE');
    });

    it('should make a DELETE request and return the result', function(done) {
      const scope = nock('http://ibm.com:80', { encodedQueryParams: true })
        .delete('/visual-recognition/api/v3/classifiers/foo_123')
        .query({ api_key: 'batman', version: '2016-05-20' })
        .reply(200, {});

      visual_recognition.deleteClassifier(
        {
          classifier_id: 'foo_123',
        },
        function(err) {
          if (err) {
            return done(err);
          }
          assert(scope.isDone());
          done();
        }
      );
    });
  });

  describe('getClassifier()', function() {
    it('should check no parameters provided', function() {
      visual_recognition.getClassifier({}, missingParameter);
      visual_recognition.getClassifier(null, missingParameter);
      visual_recognition.getClassifier(undefined, missingParameter);
    });

    it('should generate a valid payload with streams', function() {
      const params = { classifier_id: 'foo' };

      const req = visual_recognition.getClassifier(params, noop);
      assert.equal(req.uri.href, service.url + foo_classifiers_path);
      assert.equal(req.method, 'GET');
    });

    it('should make a GET request and return the result', function(done) {
      const expected = {
        classifier_id: 'fruit_679357912',
        name: 'fruit',
        owner: 'a3a48ea7-492b-448b-87d7-9dade8bde5a9',
        status: 'ready',
        created: '2016-05-23T21:50:41.680Z',
        classes: [{ class: 'banana' }, { class: 'apple' }],
      };
      const scope = nock('http://ibm.com:80', { encodedQueryParams: true })
        .get('/visual-recognition/api/v3/classifiers/fruit_679357912')
        .query({ api_key: 'batman', version: '2016-05-20' })
        .reply(200, expected);

      visual_recognition.getClassifier(
        {
          classifier_id: 'fruit_679357912',
        },
        function(err, res) {
          if (err) {
            return done(err);
          }
          assert(scope.isDone());
          assert.deepEqual(res, expected);
          done();
        }
      );
    });
  });

  describe('RC and CF urls', function() {
    let env;
    beforeEach(function() {
      env = process.env;
      process.env = {};
    });
    afterEach(function() {
      process.env = env;
    });
    it('should have the correct URL depending on rc/cf', function(done) {
      const visual_recognition_cf = new watson.VisualRecognitionV3({
        api_key: 'apikey',
        version: '2018-03-19',
      });
      const visual_recognition_rc = new watson.VisualRecognitionV3({
        iam_apikey: 'iam_apikey',
        version: '2018-03-19',
      });
      const visual_recognition_url = new watson.VisualRecognitionV3({
        api_key: 'apikey',
        url: 'hello.com',
        version: '2018-03-19',
      });

      assert.equal(
        visual_recognition_cf._options.url,
        'https://gateway-a.watsonplatform.net/visual-recognition/api'
      );
      assert.equal(
        visual_recognition_rc._options.url,
        'https://gateway.watsonplatform.net/visual-recognition/api'
      );
      assert.equal(visual_recognition_url._options.url, 'hello.com');
      done();
    });

    it('should load its credentials from bluemix (VR) with correct url', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        watson_vision_combined: [
          {
            credentials: {
              api_key: 'somekey',
            },
          },
        ],
      });
      const visual_recognition_bluemix = new watson.VisualRecognitionV3({
        version: '2018-03-19',
      });
      assert(visual_recognition_bluemix);
      assert.equal(
        visual_recognition_bluemix.getCredentials().url,
        'https://gateway-a.watsonplatform.net/visual-recognition/api'
      );
    });

    it('should load its credentials from environment (VR)', function() {
      process.env.VISUAL_RECOGNITION_API_KEY = 'key';
      const visual_recognition_env = new watson.VisualRecognitionV3({
        version: '2018-03-19',
      });
      assert(visual_recognition_env);
      assert.equal(
        visual_recognition_env.getCredentials().url,
        'https://gateway-a.watsonplatform.net/visual-recognition/api'
      );
    });

    it('should load its credentials from bluemix (VR) with correct url (RC)', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        watson_vision_combined: [
          {
            credentials: {
              iam_apikey: 'somekey',
            },
          },
        ],
      });
      const visual_recognition_bluemix = new watson.VisualRecognitionV3({
        version: '2018-03-19',
      });
      assert(visual_recognition_bluemix);
      assert.equal(
        visual_recognition_bluemix.getCredentials().url,
        'https://gateway.watsonplatform.net/visual-recognition/api'
      );
    });

    it('should load its credentials from environment (VR) (RC)', function() {
      process.env.VISUAL_RECOGNITION_IAM_APIKEY = 'key';
      const visual_recognition_env = new watson.VisualRecognitionV3({
        version: '2018-03-19',
      });
      assert(visual_recognition_env);
      assert.equal(
        visual_recognition_env.getCredentials().url,
        'https://gateway.watsonplatform.net/visual-recognition/api'
      );
    });
  });

  describe('getCoreMlModel()', function() {
    it('should check no parameters provided', function() {
      visual_recognition.getCoreMlModel({}, missingParameter);
      visual_recognition.getCoreMlModel(null, missingParameter);
      visual_recognition.getCoreMlModel(undefined, missingParameter);
    });

    it('should generate a valid payload ', function() {
      const params = { classifier_id: 'foo' };

      const req = visual_recognition.getCoreMlModel(params, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v3/classifiers/foo/core_ml_model?' + api_key_qs + '&' + version_qs
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('Print a warning for deprecated methods()', function() {
    let spy;
    beforeEach(function() {
      spy = sinon.stub(console, 'warn');
    });
    afterEach(function() {
      spy.restore();
    });
    after(function() {
      spy.restore();
    });

    const deprecatedMethods = [
      'recognizeText',
      'createCollection',
      'getCollection',
      'listCollections',
      'deleteCollection',
      'addImage',
      'listImages',
      'getImage',
      'deleteImage',
      'setImageData',
      'getImageData',
      'deleteImageData',
      'findSimilar',
    ];
    deprecatedMethods.forEach(function(method) {
      it(`${method} should print a warning message`, function() {
        visual_recognition[method]({}, noop);
        assert(spy.calledOnce);
      });
    });
  });
});
