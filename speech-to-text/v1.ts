import async = require('async');
import extend = require('extend');
import isStream = require('isstream');
import pick = require('object.pick');
import { parse } from 'url';
import { getMissingParams } from '../lib/helper';
import RecognizeStream = require('../lib/recognize-stream');
import GeneratedSpeechToTextV1 = require('./v1-generated');

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

const protocols = {
  https: require('https'),
  http: require('http')
};

const PARAMS_ALLOWED = [
  'max_alternatives',
  'timestamps',
  'word_confidence',
  'inactivity_timeout',
  'model',
  'content-type', // this is accepted in querystring by the service, but methods here all accept content_type and then set a header
  'interim_results',
  'keywords',
  'keywords_threshold',
  'word_alternatives_threshold',
  'profanity_filter',
  'smart_formatting',
  'customization_id',
  'speaker_labels',
  'customization_weight',
  'acoustic_customization_id',
  'base_model_version'
];

/**
 * Check if there is a corpus that is still being processed
 * @private
 * @param corporaList
 * @return {boolean}
 */
function isProcessing(corporaList): boolean {
  return corporaList.corpora.some(
    record => record['status'] === 'being_processed'
  );
}

/**
 * Check if corpora has been analyzed
 * @private
 * @param corporaList
 * @return {boolean}
 */
function isAnalyzed(corporaList): boolean {
  return corporaList.corpora.some(record => record['status'] === 'analyzed');
}

/**
 * @private
 * @param chunk
 * @return {any}
 */
function formatChunk(chunk: string) {
  // Convert the string into an array
  let result = chunk;

  // Check if in the stream doesn't have
  // two results together and parse them
  if (!result || result.indexOf('}{') === -1) {
    return JSON.parse(result);
  }

  // Check if we can parse the response
  try {
    result = '[' + result.replace(/}{/g, '},{') + ']';
    result = JSON.parse(result);
    return result[result.length - 1];
  } catch (e) {
    // if it fails, then this isn't valid json (or a concatenated list of valid json) - just return the original string
  }

  return result;
}

class SpeechToTextV1 extends GeneratedSpeechToTextV1 {
  static ERR_NO_CORPORA = 'ERR_NO_CORPORA';
  static ERR_TIMEOUT = 'ERR_TIMEOUT';

  constructor(options) {
    super(options);
  }



  getModels(params, callback) {
    console.warn("WARNING: getModels() was renamed to listModels(). Support for getModels() will be removed in the next major release");
    return super.listModels(params, callback);
  }

  getCustomization(params, callback) {
    console.warn("WARNING: getCustomization() was renamed to getLanguageModel(). Support for getCustomization() will be removed in the next major release");
    return super.getLanguageModel(params, callback);
  }

  getRecognitionJob(params, callback) {
    console.warn("WARNING: getRecognitionJob() was renamed to checkJob(). Support for getRecognitionJob() will be removed in the next major release");
    return super.checkJob(params, callback);
  }

  createCustomization(params, callback) {
    console.warn("WARNING: createCustomization() was renamed to createLanguageModel(). Support for createCustomization() will be removed in the next major release");
    if (params && !params.content_type) {
      params.content_type = 'application/json';
    }
    return super.createLanguageModel(params, callback);
  }

  getRecognitionJobs(params, callback) {
    console.warn("WARNING: getRecognitionJobs() was renamed to checkJobs(). Support for getRecognitionJobs() will be removed in the next major release");
    return super.checkJobs(params, callback);
  }

  deleteRecognitionJob(params, callback) {
    console.warn("WARNING: deleteRecognitionJob() was renamed to deleteJob(). Support for deleteRecognitionJob() will be removed in the next major release");
    return super.deleteJob(params, callback);
  }

  getCustomizations(params, callback) {
    console.warn("WARNING: getCustomizations() was renamed to listLanguageModels(). Support for getCustomizations() will be removed in the next major release");
    return super.listLanguageModels(params, callback);
  }

  createRecognitionJob(params, callback) {
    console.warn("WARNING: createRecognitionJob() was renamed to createJob(). Support for createRecognitionJob() will be removed in the next major release");
    if (params && Array.isArray(params.events)) {
      params.events = params.events.join(',');
    }
    return super.createJob(params, callback);
  }

  addCorpus(params, callback) {
    if (params && params.name) {
      params.corpus_name = params.name;
    }
    if (params && params.corpus) {
      params.corpus_file = params.corpus;
    }
    return super.addCorpus(params, callback);
  }

  getCorpus(params, callback) {
    if (params && params.name) {
      params.corpus_name = params.name;
    }
    return super.getCorpus(params, callback);
  }

  deleteCorpus(params, callback) {
    if (params && params.name) {
      params.corpus_name = params.name;
    }
    return super.deleteCorpus(params, callback);
  }

  getCorpora(params, callback) {
    console.warn("WARNING: getCorpora() was renamed to listCorpora(). Support for getCorpora() will be removed in the next major release");
    return super.listCorpora(params, callback);
  }

  addWords(params, callback) {
    if (params && !params.content_type) {
      params.content_type = 'application/json';
    }
    return super.addWords(params, callback);
  }

  addWord(params, callback) {
    if (params && params.word) {
      params.word_name = params.word;
    }
    if (params && !params.content_type) {
      params.content_type = 'application/json';
    }
    return super.addWord(params, callback);
  }

  getWords(params, callback) {
    console.warn("WARNING: getWords() was renamed to listWords(). Support for getWords() will be removed in the next major release");
    return super.listWords(params, callback);
  }

  getWord(params, callback) {
    if (params && params.word) {
      params.word_name = params.word;
    }
    return super.getWord(params, callback);
  }

  deleteWord(params, callback) {
    if (params && params.word) {
      params.word_name = params.word;
    }
    return super.deleteWord(params, callback);
  }

  trainCustomization(params, callback) {
    console.warn("WARNING: trainCustomization() was renamed to trainLanguageModel(). Support for trainCustomization() will be removed in the next major release");
    return super.trainLanguageModel(params, callback);
  }

  resetCustomization(params, callback) {
    console.warn("WARNING: resetCustomization() was renamed to resetLanguageModel(). Support for resetCustomization() will be removed in the next major release");
    return super.resetLanguageModel(params, callback);
  }

  /**
   * Waits while corpora analysis status is 'being_processes', fires callback once the status is 'analyzed'
   *
   * Note: the code will throw an error in case there in no corpus in the customization
   *
   *
   * @param {Object} params The parameters
   * @param {String} params.customization_id - The GUID of the custom language model
   * @param {Number} [params.interval=5000] - (milliseconds) - how long to wait between status checks
   * @param {Number} [params.times=30] - maximum number of attempts
   * @param {Function} callback
   */
  whenCorporaAnalyzed(params, callback) {
    const self = this;

    async.parallel(
      [
        // validate that it has at least one corpus
        (next) => {
          self.getCorpora(params, (err, res) => {
            if (err) {
              return next(err);
            }
            if (!res.corpora.length) {
              err = new Error(
                'Customization has no corpa and therefore corpus cannot be analyzed'
              );
              err.code = SpeechToTextV1.ERR_NO_CORPORA;
              return next(err);
            }
            next();
          });
        },
        // check the customization status repeatedly until it's available
        (next) => {
          const options = extend(
            {
              interval: 5000,
              times: 30
            },
            params
          );
          options.errorFilter = (err) => {
            // if it's a timeout error, then getCorpora is called again after params.interval
            // otherwise the error is passed back to the user
            // if the params.times limit is reached, the error will be passed to the user regardless
            return err.code === SpeechToTextV1.ERR_TIMEOUT;
          };
          async.retry(
            options,
            (done) => {
              self.getCorpora(params, (err, corpora) => {
                if (err) {
                  done(err);
                } else if (isProcessing(corpora)) {
                  // if the loop times out, async returns the last error, which will be this one.
                  err = new Error(
                    'Corpora is still being processed, try increasing interval or times params'
                  );
                  err.code = SpeechToTextV1.ERR_TIMEOUT;
                  done(err);
                } else if (isAnalyzed(corpora)) {
                  done(null, corpora);
                } else {
                  done(new Error('Unexpected corpus analysis status'));
                }
              });
            },
            next
          );
        }
      ],
      (err, res) => {
        if (err) {
          return callback(err);
        }
        callback(null, res[1]); // callback with the final customization object
      }
    );
  }

  /**
   * Creates a HTTP/HTTPS request to /recognize and keep the connection open.
   * Sets 'Transfer-Encoding': 'chunked' and prepare the connection to send
   * chunk data.
   *
   * @deprecated use createRecognizeStream instead
   *
   * @param {Object} params The parameters
   * @param {String} [params.content_type] - The Content-type e.g. audio/l16; rate=48000
   * @param {String} [params.session_id] - The session id
   * @param {function} callback
   */
  recognizeLive(params, callback) {
    const missingParams = getMissingParams(params, [
      'session_id',
      'content_type',
      'cookie_session'
    ]);

    if (missingParams) {
      callback(missingParams);
      return;
    }

    const serviceUrl = [
      this._options.url,
      '/v1/sessions/',
      params.session_id,
      '/recognize'
    ].join('');
    const parts = parse(serviceUrl);
    const options = {
      agent: false,
      host: parts.hostname,
      port: parts.port,
      path: parts.pathname + (params.continuous ? '?continuous=true' : ''),
      method: 'POST',
      headers: extend(
        {
          'Transfer-Encoding': 'chunked',
          cookie: 'SESSIONID=' + params.cookie_session,
          'Content-type': params.content_type
        },
        this._options.headers
      )
    };
    const protocol = protocols[parts.protocol.match(/https?/)[0]];
    const recognizeReq = protocol.request(options, (result) => {
      result.setEncoding('utf-8');
      let transcript = '';

      result.on('data', (chunk) => {
        transcript += chunk;
      });

      result.on('end', () => {
        try {
          transcript = formatChunk(transcript);
        } catch (e) {
          callback(transcript);
          return;
        }
        callback(null, transcript);
      });
    });

    recognizeReq.on('error', (error) => {
      callback(error);
    });
    return recognizeReq;
  }

  /**
   * Result observer for upcoming or ongoing recognition task in the session.
   * This request has to be started before POST on recognize finishes,
   * otherwise it waits for the next recognition.
   *
   * @deprecated use createRecognizeStream instead
   *
   * @param {Object} params The parameters
   * @param {String} [params.session_id] - Session used in the recognition
   * @param {boolean} [params.interim_results] - If true, interim results will be returned. Default: false
   * @param {Function} callback
   */
  observeResult(params, callback) {
    const missingParams = getMissingParams(params, [
      'session_id',
      'cookie_session'
    ]);
    if (missingParams) {
      callback(missingParams);
      return;
    }
    const serviceUrl = [
      this._options.url,
      '/v1/sessions/',
      params.session_id,
      '/observe_result'
    ].join('');
    const parts = parse(serviceUrl);
    const options = {
      agent: false,
      host: parts.hostname,
      port: parts.port,
      path:
        parts.pathname +
        (params.interim_results ? '?interim_results=true' : ''),
      method: 'GET',
      headers: extend(
        {
          cookie: 'SESSIONID=' + params.cookie_session,
          Accept: 'application/json'
        },
        this._options.headers
      )
    };
    const protocol = protocols[parts.protocol.match(/https?/)[0]];
    const req = protocol.request(options, (result) => {
      result.setEncoding('utf-8');
      result.on('data', (chunk) => {
        try {
          chunk = formatChunk(chunk);
        } catch (e) {
          callback(chunk);
          return;
        }
        callback(null, chunk);
      });
    });

    req.on('error', (error) => {
      callback(error);
    });

    req.end();

    return req;
  }

  /**
   * Replaces recognizeLive & friends with a single 2-way stream over websockets
   *
   * @param {Object} params The parameters
   * @return {RecognizeStream}
   */
  createRecognizeStream(params) {
    params = params || {};
    params.url = this._options.url;

    // if using iam, headers will not be a property on _options
    // and the line `authorization: this._options.headers.Authorization`
    // will crash the code
    if (!this._options.headers) {
      this._options.headers = {};
    }

    // if using iam, pass the token manager to the RecognizeStream object
    if (this.tokenManager) {
      params.token_manager = this.tokenManager;
    }

    params.headers = extend(
      {
        'user-agent': pkg.name + '-nodejs-' + pkg.version,
        authorization: this._options.headers.Authorization
      },
      params.headers
    );

    return new RecognizeStream(params);
  }

  /**
   * Speech recognition for given audio using default model.
   *
   * @param {Object} params The parameters
   * @param {Stream} params.audio - Audio to be recognized
   * @param {String} params.content_type - Content-type
   * @param {String} [params.base_model_version]
   * @param {Number} [params.max_alternatives]
   * @param {Boolean} [params.timestamps]
   * @param {Boolean} [params.word_confidence]
   * @param {Number} [params.inactivity_timeout]
   * @param {String} [params.model]
   * @param {Boolean} [params.interim_results]
   * @param {Boolean} [params.keywords]
   * @param {Number} [params.keywords_threshold]
   * @param {Number} [params.word_alternatives_threshold]
   * @param {Boolean} [params.profanity_filter]
   * @param {Boolean} [params.smart_formatting]
   * @param {String} [params.customization_id]
   * @param {Boolean} [params.speaker_labels]
   * @param {function} callback
   */
  recognize(params, callback) {
    const missingParams = getMissingParams(params, ['audio', 'content_type']);
    if (missingParams) {
      callback(missingParams);
      return;
    }
    if (!isStream(params.audio)) {
      callback(new Error('audio is not a standard Node.js Stream'));
      return;
    }

    const queryParams = pick(params, PARAMS_ALLOWED);
    if (Array.isArray(queryParams.keywords)) {
      queryParams.keywords = queryParams.keywords.join(',');
    }

    let _url = '/v1';
    _url += params.session_id ? '/sessions/' + params.session_id : '';
    _url += '/recognize';

    const parameters = {
      options: {
        method: 'POST',
        url: _url,
        json: true,
        qs: queryParams
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          'Content-Type': params.content_type
        }
      })
    };

    this.preAuthenticate((err) => {
      if (err) {
        return err;
      }
      return params.audio
        .on('response', (response) => {
          // Replace content-type
          response.headers['content-type'] = params.content_type;
        })
        .pipe(this.createRequest(parameters, callback));
    });
  }

  deleteCustomization(params, callback) {
    console.warn("WARNING: deleteCustomization() was renamed to deleteLanguageModel(). Support for deleteCustomization() will be removed in the next major release");
    return super.deleteLanguageModel(params, callback);
  }

  /**
   * Waits while a customization status is 'pending' or 'training', fires callback once the status is 'ready' or 'available'.
   *
   * Note: the customization will remain in 'pending' status until at least one word corpus is added.
   *
   * See http://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#list_models for status details.
   *
   * @param {Object} params The parameters
   * @param {String} params.customization_id - The GUID of the custom language model
   * @param {Number} [params.interval=5000] - (milliseconds) - how log to wait between status checks
   * @param {Number} [params.times=30] - maximum number of attempts
   * @param {Function} callback
   */
  whenCustomizationReady(params, callback) {
    const self = this;

    // check the customization status repeatedly until it's ready or available

    const options = extend(
      {
        interval: 5000,
        times: 30
      },
      params
    );
    options.errorFilter = (err) => {
      // if it's a timeout error, then getCustomization is called again after params.interval
      // otherwise the error is passed back to the user
      // if the params.times limit is reached, the error will be passed to the user regardless
      return err.code === SpeechToTextV1.ERR_TIMEOUT;
    };
    async.retry(
      options,
      (next) => {
        self.getCustomization(params, (err, customization) => {
          if (err) {
            next(err);
          } else if (
            customization.status === 'pending' ||
            customization.status === 'training'
          ) {
            // if the loop times out, async returns the last error, which will be this one.
            err = new Error(
              'Customization is still pending, try increasing interval or times params'
            );
            err.code = SpeechToTextV1.ERR_TIMEOUT;
            next(err);
          } else if (
            customization.status === 'ready' ||
            customization.status === 'available'
          ) {
            next(null, customization);
          } else if (customization.status === 'failed') {
            next(new Error('Customization training failed'));
          } else {
            next(
              new Error(
                'Unexpected customization status: ' + customization.status
              )
            );
          }
        });
      },
      callback
    );
  }
}

export = SpeechToTextV1;
