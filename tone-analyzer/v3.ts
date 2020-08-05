/**
 * (C) Copyright IBM Corp. 2017, 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Tone Analyzer service uses linguistic analysis to detect emotional and language tones in
 * written text. The service can analyze tone at both the document and sentence levels. You can use the service to
 * understand how your written communications are perceived and then to improve the tone of your communications.
 * Businesses can use the service to learn the tone of their customers' communications and to respond to each customer
 * appropriately, or to understand and improve their customer conversations.
 *
 * **Note:** Request logging is disabled for the Tone Analyzer service. Regardless of whether you set the
 * `X-Watson-Learning-Opt-Out` request header, the service does not log or retain data from requests and responses.
 */

class ToneAnalyzerV3 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'tone_analyzer';

  /**
   * Construct a ToneAnalyzerV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {ToneAnalyzerV3}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    if (!options.serviceName) {
      options.serviceName = ToneAnalyzerV3.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
  }

  /*************************
   * methods
   ************************/

  /**
   * Analyze general tone.
   *
   * Use the general-purpose endpoint to analyze the tone of your input content. The service analyzes the content for
   * emotional and language tones. The method always analyzes the tone of the full document; by default, it also
   * analyzes the tone of each individual sentence of the content.
   *
   * You can submit no more than 128 KB of total input content and no more than 1000 individual sentences in JSON, plain
   * text, or HTML format. The service analyzes the first 1000 sentences for document-level analysis and only the first
   * 100 sentences for sentence-level analysis.
   *
   * Per the JSON specification, the default character encoding for JSON content is effectively always UTF-8; per the
   * HTTP specification, the default encoding for plain text and HTML is ISO-8859-1 (effectively, the ASCII character
   * set). When specifying a content type of plain text or HTML, include the `charset` parameter to indicate the
   * character encoding of the input text; for example: `Content-Type: text/plain;charset=utf-8`. For `text/html`, the
   * service removes HTML tags and analyzes only the textual content.
   *
   * **See also:** [Using the general-purpose
   * endpoint](https://cloud.ibm.com/docs/tone-analyzer?topic=tone-analyzer-utgpe#utgpe).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ToneInput|string} params.toneInput - JSON, plain text, or HTML input that contains the content to be
   * analyzed. For JSON input, provide an object of type `ToneInput`.
   * @param {string} [params.contentType] - The type of the input. A character encoding can be specified by including a
   * `charset` parameter. For example, 'text/plain;charset=utf-8'.
   * @param {boolean} [params.sentences] - Indicates whether the service is to return an analysis of each individual
   * sentence in addition to its analysis of the full document. If `true` (the default), the service returns results for
   * each sentence.
   * @param {string[]} [params.tones] - **`2017-09-21`:** Deprecated. The service continues to accept the parameter for
   * backward-compatibility, but the parameter no longer affects the response.
   *
   * **`2016-05-19`:** A comma-separated list of tones for which the service is to return its analysis of the input; the
   * indicated tones apply both to the full document and to individual sentences of the document. You can specify one or
   * more of the valid values. Omit the parameter to request results for all three tones.
   * @param {string} [params.contentLanguage] - The language of the input text for the request: English or French.
   * Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input
   * content must match the specified language. Do not submit content that contains both languages. You can use
   * different languages for **Content-Language** and **Accept-Language**.
   * * **`2017-09-21`:** Accepts `en` or `fr`.
   * * **`2016-05-19`:** Accepts only `en`.
   * @param {string} [params.acceptLanguage] - The desired language of the response. For two-character arguments,
   * regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can use
   * different languages for **Content-Language** and **Accept-Language**.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<ToneAnalyzerV3.Response<ToneAnalyzerV3.ToneAnalysis>>}
   */
  public tone(params: ToneAnalyzerV3.ToneParams, callback?: ToneAnalyzerV3.Callback<ToneAnalyzerV3.ToneAnalysis>): Promise<ToneAnalyzerV3.Response<ToneAnalyzerV3.ToneAnalysis>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['toneInput'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = _params.toneInput;
      const query = {
        'sentences': _params.sentences,
        'tones': _params.tones
      };

      const sdkHeaders = getSdkHeaders(ToneAnalyzerV3.DEFAULT_SERVICE_NAME, 'v3', 'tone');

      const parameters = {
        options: {
          url: '/v3/tone',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'Content-Language': _params.contentLanguage,
            'Accept-Language': _params.acceptLanguage
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Analyze customer-engagement tone.
   *
   * Use the customer-engagement endpoint to analyze the tone of customer service and customer support conversations.
   * For each utterance of a conversation, the method reports the most prevalent subset of the following seven tones:
   * sad, frustrated, satisfied, excited, polite, impolite, and sympathetic.
   *
   * If you submit more than 50 utterances, the service returns a warning for the overall content and analyzes only the
   * first 50 utterances. If you submit a single utterance that contains more than 500 characters, the service returns
   * an error for that utterance and does not analyze the utterance. The request fails if all utterances have more than
   * 500 characters. Per the JSON specification, the default character encoding for JSON content is effectively always
   * UTF-8.
   *
   * **See also:** [Using the customer-engagement
   * endpoint](https://cloud.ibm.com/docs/tone-analyzer?topic=tone-analyzer-utco#utco).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Utterance[]} params.utterances - An array of `Utterance` objects that provides the input content that the
   * service is to analyze.
   * @param {string} [params.contentLanguage] - The language of the input text for the request: English or French.
   * Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input
   * content must match the specified language. Do not submit content that contains both languages. You can use
   * different languages for **Content-Language** and **Accept-Language**.
   * * **`2017-09-21`:** Accepts `en` or `fr`.
   * * **`2016-05-19`:** Accepts only `en`.
   * @param {string} [params.acceptLanguage] - The desired language of the response. For two-character arguments,
   * regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can use
   * different languages for **Content-Language** and **Accept-Language**.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<ToneAnalyzerV3.Response<ToneAnalyzerV3.UtteranceAnalyses>>}
   */
  public toneChat(params: ToneAnalyzerV3.ToneChatParams, callback?: ToneAnalyzerV3.Callback<ToneAnalyzerV3.UtteranceAnalyses>): Promise<ToneAnalyzerV3.Response<ToneAnalyzerV3.UtteranceAnalyses>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['utterances'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'utterances': _params.utterances
      };

      const sdkHeaders = getSdkHeaders(ToneAnalyzerV3.DEFAULT_SERVICE_NAME, 'v3', 'toneChat');

      const parameters = {
        options: {
          url: '/v3/tone_chat',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Language': _params.contentLanguage,
            'Accept-Language': _params.acceptLanguage
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace ToneAnalyzerV3 {

  /** An operation response. **/
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `tone` operation. */
  export interface ToneParams {
    /** JSON, plain text, or HTML input that contains the content to be analyzed. For JSON input, provide an object
     *  of type `ToneInput`.
     */
    toneInput: ToneInput|string;
    /** The type of the input. A character encoding can be specified by including a `charset` parameter. For
     *  example, 'text/plain;charset=utf-8'.
     */
    contentType?: ToneConstants.ContentType | string;
    /** Indicates whether the service is to return an analysis of each individual sentence in addition to its
     *  analysis of the full document. If `true` (the default), the service returns results for each sentence.
     */
    sentences?: boolean;
    /** **`2017-09-21`:** Deprecated. The service continues to accept the parameter for backward-compatibility, but
     *  the parameter no longer affects the response.
     *
     *  **`2016-05-19`:** A comma-separated list of tones for which the service is to return its analysis of the input;
     *  the indicated tones apply both to the full document and to individual sentences of the document. You can specify
     *  one or more of the valid values. Omit the parameter to request results for all three tones.
     */
    tones?: ToneConstants.Tones[] | string[];
    /** The language of the input text for the request: English or French. Regional variants are treated as their
     *  parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified
     *  language. Do not submit content that contains both languages. You can use different languages for
     *  **Content-Language** and **Accept-Language**.
     *  * **`2017-09-21`:** Accepts `en` or `fr`.
     *  * **`2016-05-19`:** Accepts only `en`.
     */
    contentLanguage?: ToneConstants.ContentLanguage | string;
    /** The desired language of the response. For two-character arguments, regional variants are treated as their
     *  parent language; for example, `en-US` is interpreted as `en`. You can use different languages for
     *  **Content-Language** and **Accept-Language**.
     */
    acceptLanguage?: ToneConstants.AcceptLanguage | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `tone` operation. */
  export namespace ToneConstants {
    /** The type of the input. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_PLAIN = 'text/plain',
      TEXT_HTML = 'text/html',
    }
    /** **`2017-09-21`:** Deprecated. The service continues to accept the parameter for backward-compatibility, but the parameter no longer affects the response. **`2016-05-19`:** A comma-separated list of tones for which the service is to return its analysis of the input; the indicated tones apply both to the full document and to individual sentences of the document. You can specify one or more of the valid values. Omit the parameter to request results for all three tones. */
    export enum Tones {
      EMOTION = 'emotion',
      LANGUAGE = 'language',
      SOCIAL = 'social',
    }
    /** The language of the input text for the request: English or French. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified language. Do not submit content that contains both languages. You can use different languages for **Content-Language** and **Accept-Language**. * **`2017-09-21`:** Accepts `en` or `fr`. * **`2016-05-19`:** Accepts only `en`. */
    export enum ContentLanguage {
      EN = 'en',
      FR = 'fr',
    }
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can use different languages for **Content-Language** and **Accept-Language**. */
    export enum AcceptLanguage {
      AR = 'ar',
      DE = 'de',
      EN = 'en',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw',
    }
  }

  /** Parameters for the `toneChat` operation. */
  export interface ToneChatParams {
    /** An array of `Utterance` objects that provides the input content that the service is to analyze. */
    utterances: Utterance[];
    /** The language of the input text for the request: English or French. Regional variants are treated as their
     *  parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified
     *  language. Do not submit content that contains both languages. You can use different languages for
     *  **Content-Language** and **Accept-Language**.
     *  * **`2017-09-21`:** Accepts `en` or `fr`.
     *  * **`2016-05-19`:** Accepts only `en`.
     */
    contentLanguage?: ToneChatConstants.ContentLanguage | string;
    /** The desired language of the response. For two-character arguments, regional variants are treated as their
     *  parent language; for example, `en-US` is interpreted as `en`. You can use different languages for
     *  **Content-Language** and **Accept-Language**.
     */
    acceptLanguage?: ToneChatConstants.AcceptLanguage | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `toneChat` operation. */
  export namespace ToneChatConstants {
    /** The language of the input text for the request: English or French. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified language. Do not submit content that contains both languages. You can use different languages for **Content-Language** and **Accept-Language**. * **`2017-09-21`:** Accepts `en` or `fr`. * **`2016-05-19`:** Accepts only `en`. */
    export enum ContentLanguage {
      EN = 'en',
      FR = 'fr',
    }
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can use different languages for **Content-Language** and **Accept-Language**. */
    export enum AcceptLanguage {
      AR = 'ar',
      DE = 'de',
      EN = 'en',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** The results of the analysis for the full input content. */
  export interface DocumentAnalysis {
    /** **`2017-09-21`:** An array of `ToneScore` objects that provides the results of the analysis for each
     *  qualifying tone of the document. The array includes results for any tone whose score is at least 0.5. The array
     *  is empty if no tone has a score that meets this threshold. **`2016-05-19`:** Not returned.
     */
    tones?: ToneScore[];
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** An array of `ToneCategory` objects that provides the
     *  results of the tone analysis for the full document of the input content. The service returns results only for
     *  the tones specified with the `tones` parameter of the request.
     */
    tone_categories?: ToneCategory[];
    /** **`2017-09-21`:** A warning message if the overall content exceeds 128 KB or contains more than 1000
     *  sentences. The service analyzes only the first 1000 sentences for document-level analysis and the first 100
     *  sentences for sentence-level analysis. **`2016-05-19`:** Not returned.
     */
    warning?: string;
  }

  /** The results of the analysis for the individual sentences of the input content. */
  export interface SentenceAnalysis {
    /** The unique identifier of a sentence of the input content. The first sentence has ID 0, and the ID of each
     *  subsequent sentence is incremented by one.
     */
    sentence_id: number;
    /** The text of the input sentence. */
    text: string;
    /** **`2017-09-21`:** An array of `ToneScore` objects that provides the results of the analysis for each
     *  qualifying tone of the sentence. The array includes results for any tone whose score is at least 0.5. The array
     *  is empty if no tone has a score that meets this threshold. **`2016-05-19`:** Not returned.
     */
    tones?: ToneScore[];
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** An array of `ToneCategory` objects that provides the
     *  results of the tone analysis for the sentence. The service returns results only for the tones specified with the
     *  `tones` parameter of the request.
     */
    tone_categories?: ToneCategory[];
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** The offset of the first character of the sentence in the
     *  overall input content.
     */
    input_from?: number;
    /** **`2017-09-21`:** Not returned. **`2016-05-19`:** The offset of the last character of the sentence in the
     *  overall input content.
     */
    input_to?: number;
  }

  /** The tone analysis results for the input from the general-purpose endpoint. */
  export interface ToneAnalysis {
    /** The results of the analysis for the full input content. */
    document_tone: DocumentAnalysis;
    /** An array of `SentenceAnalysis` objects that provides the results of the analysis for the individual
     *  sentences of the input content. The service returns results only for the first 100 sentences of the input. The
     *  field is omitted if the `sentences` parameter of the request is set to `false`.
     */
    sentences_tone?: SentenceAnalysis[];
  }

  /** The category for a tone from the input content. */
  export interface ToneCategory {
    /** An array of `ToneScore` objects that provides the results for the tones of the category. */
    tones: ToneScore[];
    /** The unique, non-localized identifier of the category for the results. The service can return results for the
     *  following category IDs: `emotion_tone`, `language_tone`, and `social_tone`.
     */
    category_id: string;
    /** The user-visible, localized name of the category. */
    category_name: string;
  }

  /** The score for an utterance from the input content. */
  export interface ToneChatScore {
    /** The score for the tone in the range of 0.5 to 1. A score greater than 0.75 indicates a high likelihood that
     *  the tone is perceived in the utterance.
     */
    score: number;
    /** The unique, non-localized identifier of the tone for the results. The service returns results only for tones
     *  whose scores meet a minimum threshold of 0.5.
     */
    tone_id: string;
    /** The user-visible, localized name of the tone. */
    tone_name: string;
  }

  /** Input for the general-purpose endpoint. */
  export interface ToneInput {
    /** The input content that the service is to analyze. */
    text: string;
  }

  /** The score for a tone from the input content. */
  export interface ToneScore {
    /** The score for the tone.
     *  * **`2017-09-21`:** The score that is returned lies in the range of 0.5 to 1. A score greater than 0.75
     *  indicates a high likelihood that the tone is perceived in the content.
     *  * **`2016-05-19`:** The score that is returned lies in the range of 0 to 1. A score less than 0.5 indicates that
     *  the tone is unlikely to be perceived in the content; a score greater than 0.75 indicates a high likelihood that
     *  the tone is perceived.
     */
    score: number;
    /** The unique, non-localized identifier of the tone.
     *  * **`2017-09-21`:** The service can return results for the following tone IDs: `anger`, `fear`, `joy`, and
     *  `sadness` (emotional tones); `analytical`, `confident`, and `tentative` (language tones). The service returns
     *  results only for tones whose scores meet a minimum threshold of 0.5.
     *  * **`2016-05-19`:** The service can return results for the following tone IDs of the different categories: for
     *  the `emotion` category: `anger`, `disgust`, `fear`, `joy`, and `sadness`; for the `language` category:
     *  `analytical`, `confident`, and `tentative`; for the `social` category: `openness_big5`,
     *  `conscientiousness_big5`, `extraversion_big5`, `agreeableness_big5`, and `emotional_range_big5`. The service
     *  returns scores for all tones of a category, regardless of their values.
     */
    tone_id: string;
    /** The user-visible, localized name of the tone. */
    tone_name: string;
  }

  /** An utterance for the input of the general-purpose endpoint. */
  export interface Utterance {
    /** An utterance contributed by a user in the conversation that is to be analyzed. The utterance can contain
     *  multiple sentences.
     */
    text: string;
    /** A string that identifies the user who contributed the utterance specified by the `text` parameter. */
    user?: string;
  }

  /** The results of the analysis for the utterances of the input content. */
  export interface UtteranceAnalyses {
    /** An array of `UtteranceAnalysis` objects that provides the results for each utterance of the input. */
    utterances_tone: UtteranceAnalysis[];
    /** **`2017-09-21`:** A warning message if the content contains more than 50 utterances. The service analyzes
     *  only the first 50 utterances. **`2016-05-19`:** Not returned.
     */
    warning?: string;
  }

  /** The results of the analysis for an utterance of the input content. */
  export interface UtteranceAnalysis {
    /** The unique identifier of the utterance. The first utterance has ID 0, and the ID of each subsequent
     *  utterance is incremented by one.
     */
    utterance_id: number;
    /** The text of the utterance. */
    utterance_text: string;
    /** An array of `ToneChatScore` objects that provides results for the most prevalent tones of the utterance. The
     *  array includes results for any tone whose score is at least 0.5. The array is empty if no tone has a score that
     *  meets this threshold.
     */
    tones: ToneChatScore[];
    /** **`2017-09-21`:** An error message if the utterance contains more than 500 characters. The service does not
     *  analyze the utterance. **`2016-05-19`:** Not returned.
     */
    error?: string;
  }

}

export = ToneAnalyzerV3;
