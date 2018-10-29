'use strict';

const assert = require('assert');
const SpeechToTextV1 = require('../../speech-to-text/v1');
const nock = require('nock');
const fs = require('fs');
const isStream = require('isstream');
const sinon = require('sinon');
const requestWrapper = require('../../lib/requestwrapper');

describe('speech_to_text', function() {
  const noop = function() {};

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    silent: true, // hide deprecation warnings for recognizeLive and friends
  };

  const rc_service = {
    iam_apikey: 'abc123',
    url: 'http://ibm.com:80',
    version: 'v1',
    silent: true, // hide deprecation warnings for recognizeLive and friends
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  const speech_to_text = new SpeechToTextV1(service);
  const rc_speech_to_text = new SpeechToTextV1(rc_service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error);
    assert.ok(/required parameters/.test(err));
  };

  // tests `listModels` in the generated code
  describe('listModels()', function() {
    const path = '/v1/models';
    const models = { models: [{ foo: 'foo' }, { bar: 'bar' }] };

    it('should generate a valid payload', function() {
      const req = speech_to_text.listModels({}, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });

    it('should generate a valid response', function() {
      nock(service.url)
        .persist()
        .get(path)
        .reply(200, models);

      const checkModels = function(err, res) {
        assert.equal(JSON.stringify(res), JSON.stringify(models));
      };
      speech_to_text.listModels({}, checkModels);
      speech_to_text.listModels(null, checkModels);
      speech_to_text.listModels(undefined, checkModels);
    });
  });

  describe('getModel()', function() {
    const path = '/v1/models/foo';
    const model = { foo: 'foo', bar: 'bar' };

    it('should check no parameters provided', function() {
      speech_to_text.getModel({}, missingParameter);
      speech_to_text.getModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getModel({ model_id: 'foo' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });

    it('should generate a valid response', function() {
      nock(service.url)
        .get(path)
        .reply(200, model);

      const checkModel = function(err, res) {
        assert.equal(JSON.stringify(res), JSON.stringify(model));
      };
      speech_to_text.getModel({ model_id: 'foo' }, checkModel);
    });
  });

  describe('recognize()', function() {
    it('should check no parameters provided', function() {
      speech_to_text.recognize({}, missingParameter);
      speech_to_text.recognize(null, missingParameter);
      speech_to_text.recognize({ audio: 'foo' }, missingParameter);
      speech_to_text.recognize({ content_type: 'bar' }, missingParameter);
      speech_to_text.recognize({ continuous: 'false' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const path = '/v1/recognize';
      const requestSpy = sinon.spy(requestWrapper, 'sendRequest');
      speech_to_text.recognize(
        {
          audio: fs.createReadStream(__dirname + '/../resources/weather.wav'),
          content_type: 'audio',
        },
        noop
      );
      assert.equal(requestSpy.called, true);
      const req = requestSpy.returnValues[0];

      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('recognizeWebM()', function() {
    it('Sample webm should have expected header', function() {
      const RecognizeStream = require('../../lib/recognize-stream');
      const buffer = fs.readFileSync(__dirname + '/../resources/sample1.webm');
      assert.equal(RecognizeStream.getContentType(buffer), 'audio/webm');
    });
  });

  describe('recognizeUsingWebSocket()', function() {
    it('should return a stream', function() {
      assert(isStream(speech_to_text.recognizeUsingWebSocket()));
    });

    it('should pass the correct parameters into RecognizeStream', function() {
      const stream = speech_to_text.recognizeUsingWebSocket();
      assert.equal(stream.options.url, service.url);
      assert(stream.options.headers.authorization);
      assert(stream.authenticated);
      assert.equal(stream.options.token_manager, undefined);
    });

    it('should create a token manager in RecognizeStream if using IAM', function() {
      const stream = rc_speech_to_text.recognizeUsingWebSocket();
      assert.equal(stream.options.url, service.url);
      assert.equal(stream.options.headers.authorization, undefined);
      assert.equal(stream.authenticated, false);
      assert(stream.options.token_manager);
    });
  });

  describe('asynchronous callback api', function() {
    it('should register new callback url', function() {
      const path =
        '/v1/register_callback?callback_url=http%3A%2F%2Fwatson-test-resources.mybluemix.net%2Fresults&user_secret=ThisIsMySecret';
      const response = {
        status: 200,
        url: 'http://watson-test-resources.mybluemix.net/results',
      };

      nock(service.url)
        .post(path)
        .delay(100)
        .reply(200, response);

      const checkRes = function(err, res) {
        assert.equal(JSON.stringify(err), JSON.stringify(null));
        assert.equal(JSON.stringify(res), JSON.stringify(response));
      };

      const params = {
        callback_url: 'http://watson-test-resources.mybluemix.net/results',
        user_secret: 'ThisIsMySecret',
      };
      const req = speech_to_text.registerCallback(params, checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'POST');
    });

    it('should create new recognitions job', function() {
      const path =
        '/v1/recognitions?callback_url=http%3A%2F%2Fwatson-test-resources.mybluemix.net%2Fresults&events=recognitions.completed&user_token=myArbitraryIdentifier1&results_ttl=60';
      const response = {
        id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
        status: 'waiting',
        created: '2017-02-17T19:15:17.926Z',
        url:
          'https://stream.watsonplatform.net/speech-to-text/api/v1/recognitions/4bd734c0-e575-21f3-de03-f932aa0468a0',
      };

      nock(service.url)
        .post(path)
        .delay(100)
        .reply(200, response);

      const checkRes = function(err, res) {
        assert.equal(JSON.stringify(err), JSON.stringify(null));
        assert.equal(JSON.stringify(res), JSON.stringify(response));
      };

      const params = {
        audio: fs.createReadStream(__dirname + '/../resources/weather.wav'),
        content_type: 'audio/l16;rate=41100',
        callback_url: 'http://watson-test-resources.mybluemix.net/results',
        user_token: 'myArbitraryIdentifier1',
        events: 'recognitions.completed',
        results_ttl: 60,
      };
      const req = speech_to_text.createJob(params, checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'POST');
    });

    it('should create new recognitions job w/ multiple events', function() {
      const path =
        '/v1/recognitions?callback_url=http%3A%2F%2Fwatson-test-resources.mybluemix.net%2Fresults&events=recognitions.started%2Crecognitions.failed%2Crecognitions.completed_with_results&user_token=myArbitraryIdentifier1&results_ttl=60';
      const response = {
        id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
        status: 'waiting',
        created: '2017-02-17T19:15:17.926Z',
        url:
          'https://stream.watsonplatform.net/speech-to-text/api/v1/recognitions/4bd734c0-e575-21f3-de03-f932aa0468a0',
      };

      nock(service.url)
        .post(path)
        .delay(100)
        .reply(200, response);

      const checkRes = function(err, res) {
        assert.equal(JSON.stringify(err), JSON.stringify(null));
        assert.equal(JSON.stringify(res), JSON.stringify(response));
      };

      const params = {
        audio: fs.createReadStream(__dirname + '/../resources/weather.wav'),
        content_type: 'audio/l16;rate=41100',
        callback_url: 'http://watson-test-resources.mybluemix.net/results',
        user_token: 'myArbitraryIdentifier1',
        events: [
          'recognitions.started',
          'recognitions.failed',
          'recognitions.completed_with_results',
        ],
        results_ttl: 60,
      };
      const req = speech_to_text.createJob(params, checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'POST');
    });

    // tests `checkJobs` in the generated code
    it('should get list of jobs', function(done) {
      const path = '/v1/recognitions';
      const response = {
        recognitions: [
          {
            id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
            created: '2017-02-17T19:15:17.926Z',
            updated: '2017-02-17T19:15:17.926Z',
            status: 'waiting',
            user_token: 'myArbitraryIdentifier1',
          },
          {
            id: '4bb1dca0-f6b1-11e5-80bc-71fb7b058b20',
            created: '2017-02-17T19:13:23.622Z',
            updated: '2017-02-17T19:13:24.434Z',
            status: 'processing',
          },
          {
            id: '398fcd80-330a-22ba-93ce-1a73f454dd98',
            created: '2017-02-17T19:11:04.298Z',
            updated: '2017-02-17T19:11:16.003Z',
            status: 'completed',
          },
        ],
      };

      nock(service.url)
        .get(path)
        .delay(200)
        .reply(200, response);

      const checkRes = function(err, res) {
        assert.equal(JSON.stringify(err), JSON.stringify(null));
        assert.equal(JSON.stringify(res), JSON.stringify(response));
        done();
      };
      const req = speech_to_text.checkJobs(checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'GET');
    });

    it('should get status of job', function() {
      const path = '/v1/recognitions/4bd734c0-e575-21f3-de03-f932aa0468a0';
      const response = {
        id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
        results: [
          {
            result_index: 0,
            results: [
              {
                final: true,
                alternatives: [
                  {
                    transcript:
                      'several tornadoes touch down as a line of severe thunderstorms swept through Colorado on Sunday ',
                    timestamps: [['several', 1, 1.52]],
                    confidence: 0.885,
                  },
                ],
              },
            ],
          },
        ],
        created: '2016-08-17T19:11:04.298Z',
        updated: '2016-08-17T19:11:16.003Z',
        status: 'completed',
      };

      nock(service.url)
        .get(path)
        .delay(200)
        .reply(200, response);

      const checkRes = function(err, res) {
        assert.equal(JSON.stringify(err), JSON.stringify(null));
        assert.deepEqual(res, response);
      };
      const req = speech_to_text.checkJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }, checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'GET');
    });

    it('should delete a recognition job', function() {
      const path = '/v1/recognitions/4bd734c0-e575-21f3-de03-f932aa0468a0';

      nock(service.url)
        .delete(path)
        .delay(200)
        .reply(200);

      const checkRes = function(err, res) {
        assert.ifError(err);
      };
      const req = speech_to_text.deleteJob(
        { id: '4bd734c0-e575-21f3-de03-f932aa0468a0' },
        checkRes
      );

      assert.equal(req.path, path);
      assert.equal(req.method, 'DELETE');
    });
  });

  // tests `listCustomizations` in the generated code
  describe('listLanguageModels()', function() {
    const path = '/v1/customizations';

    it('should generate a valid payload', function() {
      const req = speech_to_text.listLanguageModels({}, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getLanguageModel()', function() {
    const path = '/v1/customizations/foo';

    it('should check no parameters provided', function() {
      speech_to_text.getLanguageModel({}, missingParameter);
      speech_to_text.getLanguageModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getLanguageModel({ customization_id: 'foo' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createLanguageModel()', function() {
    const path = '/v1/customizations';

    it('should check no parameters provided', function() {
      speech_to_text.createLanguageModel({}, missingParameter);
      speech_to_text.createLanguageModel(null, missingParameter);
      speech_to_text.createLanguageModel({ name: 'name' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.createLanguageModel(
        { name: 'name', base_model_name: 'base_name' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('addCorpus()', function() {
    const path = '/v1/customizations/customer_id_1/corpora/corpus_name_1';

    it('should check no parameters provided', function() {
      speech_to_text.addCorpus({}, missingParameter);
      speech_to_text.addCorpus(null, missingParameter);
      speech_to_text.addCorpus(
        { customization_id: 'customer_id_1', corpus_name: 'corpus_name_1' },
        missingParameter
      );
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.addCorpus(
        {
          customization_id: 'customer_id_1',
          corpus_name: 'corpus_name_1',
          corpus_file: 'file_1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('getCorpus()', function() {
    const path = '/v1/customizations/customer_id_1/corpora/corpus_name_1';

    it('should check no parameters provided', function() {
      speech_to_text.getCorpus({}, missingParameter);
      speech_to_text.getCorpus(null, missingParameter);
      speech_to_text.getCorpus({ customization_id: 'customer_id_1' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getCorpus(
        { customization_id: 'customer_id_1', corpus_name: 'corpus_name_1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('deleteCorpus()', function() {
    const path = '/v1/customizations/customer_id_1/corpora/corpus_name_1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteCorpus({}, missingParameter);
      speech_to_text.deleteCorpus(null, missingParameter);
      speech_to_text.deleteCorpus({ customization_id: 'customer_id_1' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteCorpus(
        { customization_id: 'customer_id_1', corpus_name: 'corpus_name_1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  // tests `listCorpora` in generated code
  describe('listCorpora()', function() {
    const path = '/v1/customizations/customer_id_1/corpora';

    it('should check no parameters provided', function() {
      speech_to_text.listCorpora({}, missingParameter);
      speech_to_text.listCorpora(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.listCorpora({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('addWords()', function() {
    const path = '/v1/customizations/customer_id_1/words';

    it('should check no parameters provided', function() {
      speech_to_text.addWords({}, missingParameter);
      speech_to_text.addWords(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.addWords(
        { customization_id: 'customer_id_1', words: 'words' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('addWord()', function() {
    const path = '/v1/customizations/customer_id_1/words/word1';

    it('should check no parameters provided', function() {
      speech_to_text.addWord({}, missingParameter);
      speech_to_text.addWord(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.addWord(
        { customization_id: 'customer_id_1', word_name: 'word1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'PUT');
    });
  });

  // tests `listWords` in the generated code
  describe('listWords()', function() {
    const path = '/v1/customizations/customer_id_1/words';

    it('should check no parameters provided', function() {
      speech_to_text.listWords({}, missingParameter);
      speech_to_text.listWords(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.listWords({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getWord()', function() {
    const path = '/v1/customizations/customer_id_1/words/word1';

    it('should check no parameters provided', function() {
      speech_to_text.getWord({}, missingParameter);
      speech_to_text.getWord(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getWord(
        { customization_id: 'customer_id_1', word_name: 'word1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('deleteWord()', function() {
    const path = '/v1/customizations/customer_id_1/words/word1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteWord({}, missingParameter);
      speech_to_text.deleteWord(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteWord(
        { customization_id: 'customer_id_1', word_name: 'word1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('trainLanguageModel()', function() {
    const path = '/v1/customizations/customer_id_1/train';

    it('should check no parameters provided', function() {
      speech_to_text.trainLanguageModel({}, missingParameter);
      speech_to_text.trainLanguageModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.trainLanguageModel({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('resetLanguageModel()', function() {
    const path = '/v1/customizations/customer_id_1/reset';

    it('should check no parameters provided', function() {
      speech_to_text.resetLanguageModel({}, missingParameter);
      speech_to_text.resetLanguageModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.resetLanguageModel({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteLanguageModel()', function() {
    const path = '/v1/customizations/customer_id_1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteLanguageModel({}, missingParameter);
      speech_to_text.deleteLanguageModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteLanguageModel({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('addAudio()', function() {
    const path = '/v1/acoustic_customizations/id_1/audio/audio1';

    it('should check no parameters provided', function() {
      speech_to_text.addAudio({}, missingParameter);
      speech_to_text.addAudio(null, missingParameter);
      speech_to_text.addAudio({ customization_id: 'id_1', audio_name: 'audio' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.addAudio(
        {
          customization_id: 'id_1',
          audio_name: 'audio1',
          audio_resource: 'sample1',
          content_type: 'audio/basic',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteAudio()', function() {
    const path = '/v1/acoustic_customizations/id_1/audio/audio1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteAudio({}, missingParameter);
      speech_to_text.deleteAudio(null, missingParameter);
      speech_to_text.deleteAudio({ customization_id: 'id_1' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteAudio(
        {
          customization_id: 'id_1',
          audio_name: 'audio1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getAudio()', function() {
    const path = '/v1/acoustic_customizations/id_1/audio/audio1';

    it('should check no parameters provided', function() {
      speech_to_text.getAudio({}, missingParameter);
      speech_to_text.getAudio(null, missingParameter);
      speech_to_text.getAudio({ customization_id: 'id_1' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getAudio(
        {
          customization_id: 'id_1',
          audio_name: 'audio1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('listAudio()', function() {
    const path = '/v1/acoustic_customizations/id_1/audio';

    it('should check no parameters provided', function() {
      speech_to_text.listAudio({}, missingParameter);
      speech_to_text.listAudio(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.listAudio(
        {
          customization_id: 'id_1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createAcousticModel()', function() {
    const path = '/v1/acoustic_customizations';

    it('should check no parameters provided', function() {
      speech_to_text.createAcousticModel({}, missingParameter);
      speech_to_text.createAcousticModel(null, missingParameter);
      speech_to_text.createAcousticModel({ name: 'name1' }, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.createAcousticModel(
        {
          name: 'name1',
          base_model_name: 'base1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteAcousticModel()', function() {
    const path = '/v1/acoustic_customizations/id1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteAcousticModel({}, missingParameter);
      speech_to_text.deleteAcousticModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteAcousticModel(
        {
          customization_id: 'id1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getAcousticModel()', function() {
    const path = '/v1/acoustic_customizations/id1';

    it('should check no parameters provided', function() {
      speech_to_text.getAcousticModel({}, missingParameter);
      speech_to_text.getAcousticModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getAcousticModel(
        {
          customization_id: 'id1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('listAcousticModels()', function() {
    const path = '/v1/acoustic_customizations';

    it('should generate a valid payload', function() {
      const req = speech_to_text.listAcousticModels({}, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('resetAcousticModel()', function() {
    const path = '/v1/acoustic_customizations/id1/reset';

    it('should check no parameters provided', function() {
      speech_to_text.resetAcousticModel({}, missingParameter);
      speech_to_text.resetAcousticModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.resetAcousticModel(
        {
          customization_id: 'id1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('trainAcousticModel()', function() {
    const path = '/v1/acoustic_customizations/id1/train';

    it('should check no parameters provided', function() {
      speech_to_text.trainAcousticModel({}, missingParameter);
      speech_to_text.trainAcousticModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.trainAcousticModel(
        {
          customization_id: 'id1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('upgradeAcousticModel()', function() {
    const path = '/v1/acoustic_customizations/id1/upgrade_model';

    it('should check no parameters provided', function() {
      speech_to_text.upgradeAcousticModel({}, missingParameter);
      speech_to_text.upgradeAcousticModel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.upgradeAcousticModel(
        {
          customization_id: 'id1',
        },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });
});
