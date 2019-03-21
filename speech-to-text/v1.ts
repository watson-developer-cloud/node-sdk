import async = require('async');
import extend = require('extend');
import { getMissingParams } from 'ibm-cloud-sdk-core';
import isStream = require('isstream');
import pick = require('object.pick');
import { parse } from 'url';
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
  'acoustic_customization_id',
  'speaker_labels',
  'customization_weight',
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
          self.listCorpora(params, (err, res) => {
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
            // if it's a timeout error, then listCorpora is called again after params.interval
            // otherwise the error is passed back to the user
            // if the params.times limit is reached, the error will be passed to the user regardless
            return err.code === SpeechToTextV1.ERR_TIMEOUT;
          };
          async.retry(
            options,
            (done) => {
              self.listCorpora(params, (err, corpora) => {
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
   * Use the recognize function with a single 2-way stream over websockets
   *
   * @param {Object} params The parameters
   * @return {RecognizeStream}
   */
  recognizeUsingWebSocket(params) {
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

    // allow user to disable ssl verification when using websockets
    params.rejectUnauthorized = this._options.rejectUnauthorized;

    return new RecognizeStream(params);
  }

  recognize(params, callback) {
    if (params && params.audio && isStream(params.audio) && !params.content_type) {
      callback(new Error('If providing `audio` as a Stream, `content_type` is required.'));
      return;
    }

    return super.recognize(params, callback);
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
      // if it's a timeout error, then getLanguageModel is called again after params.interval
      // otherwise the error is passed back to the user
      // if the params.times limit is reached, the error will be passed to the user regardless
      return err.code === SpeechToTextV1.ERR_TIMEOUT;
    };
    async.retry(
      options,
      (next) => {
        self.getLanguageModel(params, (err, customization) => {
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
