import async = require('async');
import extend = require('extend');
import { Agent, OutgoingHttpHeaders } from 'http';
import { UserOptions } from 'ibm-cloud-sdk-core';
import isStream = require('isstream');
import { getSdkHeaders } from '../lib/common';
import RecognizeStream = require('../lib/recognize-stream');
import GeneratedSpeechToTextV1 = require('./v1-generated');

/**
 * Check if there is a corpus that is still being processed
 * @private
 * @param corporaList
 * @return {boolean}
 */
function isProcessing(corporaList: GeneratedSpeechToTextV1.Corpora): boolean {
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
function isAnalyzed(corporaList: GeneratedSpeechToTextV1.Corpora): boolean {
  return corporaList.corpora.some(record => record['status'] === 'analyzed');
}

class SpeechToTextV1 extends GeneratedSpeechToTextV1 {
  static ERR_NO_CORPORA = 'ERR_NO_CORPORA';
  static ERR_TIMEOUT = 'ERR_TIMEOUT';

  constructor(options: UserOptions) {
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
  whenCorporaAnalyzed(params: SpeechToTextV1.WhenCorporaAnalyzedParams, callback: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.Corpora>): void {
    const self = this;

    async.parallel(
      [
        // validate that it has at least one corpus
        (next: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.Corpora>) => {
          self.listCorpora(params, (err, res) => {
            const result = res.result;
            if (err) {
              return next(err);
            }
            if (!result.corpora.length) {
              const sttError: SpeechToTextV1.SpeechToTextError = new Error(
                'Customization has no corpa and therefore corpus cannot be analyzed'
              );
              sttError.code = SpeechToTextV1.ERR_NO_CORPORA;
              return next(sttError);
            }
            next(null);
          });
        },
        // check the customization status repeatedly until it's available
        (next: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.Corpora>) => {
          const options: SpeechToTextV1.WhenCorporaAnalyzedOptions = extend(
            {
              interval: 5000,
              times: 30
            },
            params,
            {
              errorFilter: (err: SpeechToTextV1.SpeechToTextError): boolean => {
              // if it's a timeout error, then listCorpora is called again after params.interval
              // otherwise the error is passed back to the user
              // if the params.times limit is reached, the error will be passed to the user regardless
                return err.code === SpeechToTextV1.ERR_TIMEOUT;
              }
            }
          );

          async.retry(
            options,
            (done: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.Corpora>) => {
              self.listCorpora(params, (err, res) => {
                const corpora = res.result;
                if (err) {
                  done(err);
                } else if (corpora !== undefined && isProcessing(corpora)) {
                  // if the loop times out, async returns the last error, which will be this one.
                  const sttError: SpeechToTextV1.SpeechToTextError = new Error(
                    'Corpora is still being processed, try increasing interval or times params'
                  );
                  sttError.code = SpeechToTextV1.ERR_TIMEOUT;
                  done(sttError);
                } else if (corpora !== undefined && isAnalyzed(corpora)) {
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
      (err: Error | SpeechToTextV1.SpeechToTextError | null, res?: [null, GeneratedSpeechToTextV1.Corpora]) => {
        const result = res;
        if (err) {
          return callback(err);
        }
        callback(null, result[1]); // callback with the final customization object
      }
    );
  }

  recognizeUsingWebSocket(params: SpeechToTextV1.RecognizeWebSocketParams): RecognizeStream {
    const streamParams: RecognizeStream.Options = extend(
      params,
      {},
      {
        // pass the Authenticator to the RecognizeStream object
        authenticator: this.getAuthenticator(),
        url: this.baseOptions.url,
        // if the user configured a custom https client, use it in the websocket method
        // let httpsAgent take precedence, default to null
        agent: this.baseOptions.httpsAgent || this.baseOptions.httpAgent || null,
        // allow user to disable ssl verification when using websockets
        disableSslVerification: this.baseOptions.disableSslVerification
      }
    );

    // include analytics headers
    const sdkHeaders = getSdkHeaders('speech_to_text', 'v1', 'recognizeUsingWebSocket');

    streamParams.headers = extend(
      true,
      sdkHeaders,
      streamParams.headers
    );

    return new RecognizeStream(streamParams);
  }

  recognize(params: GeneratedSpeechToTextV1.RecognizeParams, callback: GeneratedSpeechToTextV1.Callback<GeneratedSpeechToTextV1.SpeechRecognitionResults>): Promise<GeneratedSpeechToTextV1.Response<GeneratedSpeechToTextV1.SpeechRecognitionResults>> {
    if (params && params.audio && isStream(params.audio) && !params.contentType) {
      callback(new Error('If providing `audio` as a Stream, `contentType` is required.'));
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
  whenCustomizationReady(params: SpeechToTextV1.WhenCustomizationReadyParams, callback: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.LanguageModel>): void {
    const self = this;

    // check the customization status repeatedly until it's ready or available

    const options: SpeechToTextV1.WhenCustomizationReadyOptions = extend(
      {
        interval: 5000,
        times: 30
      },
      params,
      {
        errorFilter: (err: SpeechToTextV1.SpeechToTextError) => {
          // if it's a timeout error, then getLanguageModel is called again after params.interval
          // otherwise the error is passed back to the user
          // if the params.times limit is reached, the error will be passed to the user regardless
          return err.code === SpeechToTextV1.ERR_TIMEOUT;
        }
      }
    );
    async.retry(
      options,
      (next: SpeechToTextV1.Callback<GeneratedSpeechToTextV1.LanguageModel>) => {
        self.getLanguageModel(params, (err, res) => {
          const customization = err ? null : res.result;
          if (err) {
            next(err);
          } else if (
            customization.status === 'pending' ||
            customization.status === 'training'
          ) {
            // if the loop times out, async returns the last error, which will be this one.
            const sttError: SpeechToTextV1.SpeechToTextError = new Error(
              'Customization is still pending, try increasing interval or times params',
            );
            sttError.code = SpeechToTextV1.ERR_TIMEOUT;
            next(sttError);
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

namespace SpeechToTextV1 {
  export type Callback<T> = (err: Error | SpeechToTextError | null, res?: T) => void;

  export interface SpeechToTextError extends Error {
    message: string;
    code?: string;
  }

  export interface CheckParams {
    /** How long to wait in milliseconds between status checks, defaults to 5000 milliseconds */
    interval: number;
    /** maximum number of attempts to check, defaults to 30 */
    times: number;
  }

  export type WhenCorporaAnalyzedParams = GeneratedSpeechToTextV1.ListCorporaParams & CheckParams;
  export interface WhenCorporaAnalyzedOptions extends WhenCorporaAnalyzedParams {
    errorFilter: (err: SpeechToTextError) => boolean;
  }

  export type WhenCustomizationReadyParams = GeneratedSpeechToTextV1.GetLanguageModelParams & CheckParams;
  export interface WhenCustomizationReadyOptions extends WhenCorporaAnalyzedParams {
    errorFilter: (err: SpeechToTextError) => boolean;
  }

  export interface RecognizeWebSocketParams {
    headers?: OutgoingHttpHeaders;
    readableObjectMode?: boolean;
    objectMode?: boolean;
    agent?: Agent;

    /* Query Params*/
    accessToken?: string;
    watsonToken?: string;
    model?: string;
    languageCustomizationId?: string;
    acousticCustomizationId?: string;
    baseModelVersion?: string;
    xWatsonLearningOptOut?: boolean;
    xWatsonMetadata?: string;

    /* Opening Message Params */
    contentType?: string;
    customizationWeight?: number;
    inactivityTimeout?: number;
    interimResults?: boolean;
    keywords?: string[];
    keywordsThreshold?: number;
    maxAlternatives?: number;
    wordAlternativesThreshold?: number;
    wordConfidence?: boolean;
    timestamps?: boolean;
    profanityFilter?: boolean;
    smartFormatting?: boolean;
    speakerLabels?: boolean;
    grammarName?: string;
    redaction?: boolean;
    processingMetrics?: boolean;
    processingMetricsInterval?: number;
    audioMetrics?: boolean;
  }
}

export = SpeechToTextV1;
