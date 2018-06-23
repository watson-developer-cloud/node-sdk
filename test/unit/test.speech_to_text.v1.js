'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const fs = require('fs');
const isStream = require('isstream');

describe('speech_to_text', function() {
  const noop = function() {};

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
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

  const speech_to_text = watson.speech_to_text(service);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error);
    assert.ok(/required parameters/.test(err));
  };

  describe('getModels()', function() {
    const path = '/v1/models';
    const models = { models: [{ foo: 'foo' }, { bar: 'bar' }] };

    it('should generate a valid payload', function() {
      const req = speech_to_text.getModels({}, noop);
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
      speech_to_text.getModels({}, checkModels);
      speech_to_text.getModels(null, checkModels);
      speech_to_text.getModels(undefined, checkModels);
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

  describe('observeResult()', function() {
    it('should check no parameters provided', function() {
      speech_to_text.observeResult({}, missingParameter);
      speech_to_text.observeResult(null, missingParameter);
    });

    it('should generate a valid payload', function(done) {
      const expectation = nock('http://ibm.com:80', {
        encodedQueryParams: true,
      })
        .matchHeader('Cookie', /SESSIONID=bar/)
        .get('/v1/sessions/foo/observe_result')
        .reply(200, {});

      speech_to_text.observeResult(
        {
          session_id: 'foo',
          cookie_session: 'bar',
        },
        err => {
          assert.ifError(err);
          assert(expectation.isDone());
          done();
        }
      );
    });

    it('should generate a valid payload with interim_results enabled', function(done) {
      const expectation = nock('http://ibm.com:80', {
        encodedQueryParams: true,
      })
        .matchHeader('Cookie', /SESSIONID=bar/)
        .get('/v1/sessions/foo/observe_result?interim_results=true')
        .reply(200, {});

      speech_to_text.observeResult(
        {
          session_id: 'foo',
          cookie_session: 'bar',
          interim_results: true,
        },
        err => {
          assert.ifError(err);
          assert(expectation.isDone());
          done();
        }
      );
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
  });

  describe('recognizeWebM()', function() {
    it('Sample webm should have expected header', function() {
      const RecognizeStream = require('../../lib/recognize-stream');
      const buffer = fs.readFileSync(__dirname + '/../resources/sample1.webm');
      assert.equal(RecognizeStream.getContentType(buffer), 'audio/webm');
    });
  });

  // this test is severely broken
  describe('recognizeStream()', function() {
    const service_response = {
      result: [
        {
          alternative: [
            {
              transcript: 'one two three',
            },
          ],
          final: true,
        },
      ],
      result_index: 0,
    };

    const options = {
      content_type: 'audio/l16;rate=41100',
      continuous: true,
      timestamps: true,
      inactivity_timeout: -1,
      max_alternatives: 1,
      interim_results: false,
      keywords: ['one', 'Three'],
      keywords_threshold: 0.9,
      word_alternatives_threshold: 0.25,
    };
    const recognizeStream = speech_to_text.createRecognizeStream(options);
    fs.createReadStream(__dirname + '/../resources/weather.wav').pipe(recognizeStream);
    recognizeStream.setEncoding('utf8');

    // note: none of these tests actually run(or even register with mocha), but the callbacks let the previous test pass :(
    recognizeStream.on('open', function(socket) {
      it('should have a socket connection with a correct config', function(done) {
        assert.notStrictEqual(socket, socket.config, socket.config.fragmentOutgoingMessages);
        assert.notStrictEqual(socket, socket.config, socket.config.fragmentOutgoingMessages);
        done();
      });
    });

    recognizeStream.on('error', function(err) {
      it('should throw ECONNRESET with bad credentials', function(done) {
        assert.equal(err.code, 'ECONNRESET');
        assert.equal(err.errno, 'ECONNRESET');
        done();
      });
    });

    recognizeStream.on('data', function(obj) {
      console.log(JSON.stringify(obj)); // eslint-disable-line no-console
      it('should generate a valid response', function(done) {
        assert.equal(obj, service_response);
        done();
      });
    });
  });

  describe('recognizeLive()', function() {
    const path = '/v1/sessions/foo/recognize';
    const payload = {
      session_id: 'foo',
      cookie_session: 'foobar',
      content_type: 'audio/l16; rate=41100',
    };
    const service_response = {
      result: [
        {
          alternative: [
            {
              transcript: 'one two three',
            },
          ],
          final: true,
        },
      ],
      result_index: 0,
    };

    it('should check no parameters provided', function() {
      speech_to_text.recognizeLive({}, missingParameter);
      speech_to_text.recognizeLive(null, missingParameter);
      speech_to_text.recognizeLive({ cookie_session: 'foo' }, missingParameter);
      speech_to_text.recognizeLive({ content_type: 'bar' }, missingParameter);
      speech_to_text.recognizeLive({ continuous: 'false' }, missingParameter);
    });

    it('should generate a valid payload', function(done) {
      nock(service.url)
        .post(path)
        .delay(300)
        .reply(200, service_response);

      const req = speech_to_text.recognizeLive(payload, function(err, res) {
        assert.equal(JSON.stringify(service_response), JSON.stringify(res));
        done();
      });
      assert.equal(req.path, path);
      assert.equal(req._headers['content-type'], payload.content_type);
      assert.equal(req._headers['transfer-encoding'], 'chunked');
      assert.ok(req._headers['cookie'].indexOf('SESSIONID=' + payload.cookie_session) !== -1);

      req.end();
    });

    it('should generate a valid response', function(done) {
      nock(service.url)
        .post(path)
        .delay(300)
        .reply(200, service_response);

      const req = speech_to_text.recognizeLive(payload, function(err, res) {
        assert.equal(JSON.stringify(service_response), JSON.stringify(res));
        done();
      });
      req.write(Buffer.from('one', 'utf-8'));
      req.write(Buffer.from('two', 'utf-8'));
      req.write(Buffer.from('three', 'utf-8'));
      assert.equal(req.path, path);
      req.end();
    });
  });

  describe('createRecognizeStream()', function() {
    it('should return a stream', function() {
      assert(isStream(speech_to_text.createRecognizeStream()));
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
      const req = speech_to_text.createRecognitionJob(params, checkRes);

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
      const req = speech_to_text.createRecognitionJob(params, checkRes);

      assert.equal(req.path, path);
      assert.equal(req.method, 'POST');
    });

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
      const req = speech_to_text.getRecognitionJobs(checkRes);

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
      const req = speech_to_text.getRecognitionJob(
        { id: '4bd734c0-e575-21f3-de03-f932aa0468a0' },
        checkRes
      );

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
      const req = speech_to_text.deleteRecognitionJob(
        { id: '4bd734c0-e575-21f3-de03-f932aa0468a0' },
        checkRes
      );

      assert.equal(req.path, path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getCustomizations()', function() {
    const path = '/v1/customizations';

    it('should generate a valid payload', function() {
      const req = speech_to_text.getCustomizations({}, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getCustomization()', function() {
    const path = '/v1/customizations/foo';

    it('should check no parameters provided', function() {
      speech_to_text.getCustomization({}, missingParameter);
      speech_to_text.getCustomization(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getCustomization({ customization_id: 'foo' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createCustomization()', function() {
    const path = '/v1/customizations';

    it('should check no parameters provided', function() {
      speech_to_text.createCustomization({}, missingParameter);
      speech_to_text.createCustomization(null, missingParameter);
      speech_to_text.createLanguageModel(
        { name: 'name', base_model_name: 'base_name' },
        missingParameter
      );
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.createCustomization(
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

      const req2 = speech_to_text.addCorpus(
        {
          customization_id: 'customer_id_1',
          name: 'corpus_name_1',
          corpus: 'file_1',
        },
        noop
      );
      assert.equal(req2.uri.href, service.url + path);
      assert.equal(req2.method, 'POST');
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

      const req2 = speech_to_text.getCorpus(
        { customization_id: 'customer_id_1', name: 'corpus_name_1' },
        noop
      );
      assert.equal(req2.uri.href, service.url + path);
      assert.equal(req2.method, 'GET');
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

      const req2 = speech_to_text.deleteCorpus(
        { customization_id: 'customer_id_1', name: 'corpus_name_1' },
        noop
      );
      assert.equal(req2.uri.href, service.url + path);
      assert.equal(req2.method, 'DELETE');
    });
  });

  describe('getCorpora()', function() {
    const path = '/v1/customizations/customer_id_1/corpora';

    it('should check no parameters provided', function() {
      speech_to_text.getCorpora({}, missingParameter);
      speech_to_text.getCorpora(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getCorpora({ customization_id: 'customer_id_1' }, noop);
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
        { customization_id: 'customer_id_1', word: 'word1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'PUT');
    });
  });

  describe('getWords()', function() {
    const path = '/v1/customizations/customer_id_1/words';

    it('should check no parameters provided', function() {
      speech_to_text.getWords({}, missingParameter);
      speech_to_text.getWords(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.getWords({ customization_id: 'customer_id_1' }, noop);
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
        { customization_id: 'customer_id_1', word: 'word1' },
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
        { customization_id: 'customer_id_1', word: 'word1' },
        noop
      );
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('trainCustomization()', function() {
    const path = '/v1/customizations/customer_id_1/train';

    it('should check no parameters provided', function() {
      speech_to_text.trainCustomization({}, missingParameter);
      speech_to_text.trainCustomization(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.trainCustomization({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('resetCustomization()', function() {
    const path = '/v1/customizations/customer_id_1/reset';

    it('should check no parameters provided', function() {
      speech_to_text.resetCustomization({}, missingParameter);
      speech_to_text.resetCustomization(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.resetCustomization({ customization_id: 'customer_id_1' }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteCustomization()', function() {
    const path = '/v1/customizations/customer_id_1';

    it('should check no parameters provided', function() {
      speech_to_text.deleteCustomization({}, missingParameter);
      speech_to_text.deleteCustomization(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = speech_to_text.deleteCustomization({ customization_id: 'customer_id_1' }, noop);
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
