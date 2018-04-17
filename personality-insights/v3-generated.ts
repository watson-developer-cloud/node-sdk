/**
 * Copyright 2018 IBM All Rights Reserved.
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
import { RequestResponse } from 'request';
import { BaseService } from '../lib/base_service';
import { getMissingParams } from '../lib/helper';
import { createRequest } from '../lib/requestwrapper';

/**
 * The IBM Watson Personality Insights service enables applications to derive insights from social media, enterprise data, or other digital communications. The service uses linguistic analytics to infer individuals' intrinsic personality characteristics, including Big Five, Needs, and Values, from digital communications such as email, text messages, tweets, and forum posts.  The service can automatically infer, from potentially noisy social media, portraits of individuals that reflect their personality characteristics. The service can infer consumption preferences based on the results of its analysis and, for JSON content that is timestamped, can report temporal behavior.  For information about the meaning of the models that the service uses to describe personality characteristics, see [Personality models](https://console.bluemix.net/docs/services/personality-insights/models.html). For information about the meaning of the consumption preferences, see [Consumption preferences](https://console.bluemix.net/docs/services/personality-insights/preferences.html).
 */

class PersonalityInsightsV3 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/personality-insights/api';
  name: string; // set by prototype to 'personality_insights'
  serviceVersion: string; // set by prototype to 'v3'

  /**
   * Construct a PersonalityInsightsV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/personality-insights/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {PersonalityInsightsV3}
   * @throws {Error}
   */
  constructor(options: PersonalityInsightsV3.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * methods
   ************************/

  /**
   * Get profile.
   *
   * Generates a personality profile for the author of the input text. The service accepts a maximum of 20 MB of input content, but it requires much less text to produce an accurate profile; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). The service analyzes text in Arabic, English, Japanese, Korean, or Spanish and returns its results in a variety of languages. You can provide plain text, HTML, or JSON input. The service returns output in JSON format by default, but you can request the output in CSV format.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Content|string} params.content - A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the **Content** model.
   * @param {string} params.content_type - The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'.
   * @param {string} [params.content_language] - The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**.
   * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content.
   * @param {boolean} [params.raw_scores] - Whether a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population.
   * @param {boolean} [params.csv_headers] - Whether column labels are returned with a CSV response. Applies only when the **Accept** parameter is set to `text/csv`.
   * @param {boolean} [params.consumption_preferences] - Whether consumption preferences are returned with the results.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public profile(params: PersonalityInsightsV3.ProfileParams, callback?: PersonalityInsightsV3.Callback<PersonalityInsightsV3.Profile>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['content', 'content_type'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.content;
    const query = {
      'raw_scores': _params.raw_scores,
      'csv_headers': _params.csv_headers,
      'consumption_preferences': _params.consumption_preferences
    };
    const parameters = {
      options: {
        url: '/v3/profile',
        method: 'POST',
        json: (_params.content_type === 'application/json'),
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': _params.content_type,
          'Content-Language': _params.content_language,
          'Accept-Language': _params.accept_language
        }, _params.headers),
      }),
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get profile. as csv
   *
   * Generates a personality profile for the author of the input text. The service accepts a maximum of 20 MB of input content, but it requires much less text to produce an accurate profile; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). The service analyzes text in Arabic, English, Japanese, Korean, or Spanish and returns its results in a variety of languages. You can provide plain text, HTML, or JSON input. The service returns output in JSON format by default, but you can request the output in CSV format.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Content|string} params.content - A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the **Content** model.
   * @param {string} params.content_type - The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'.
   * @param {string} [params.content_language] - The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**.
   * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content.
   * @param {boolean} [params.raw_scores] - Whether a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population.
   * @param {boolean} [params.csv_headers] - Whether column labels are returned with a CSV response. Applies only when the **Accept** parameter is set to `text/csv`.
   * @param {boolean} [params.consumption_preferences] - Whether consumption preferences are returned with the results.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public profileAsCsv(params: PersonalityInsightsV3.ProfileAsCsvParams, callback?: PersonalityInsightsV3.Callback<PersonalityInsightsV3.Profile>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['content', 'content_type'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.content;
    const query = {
      'raw_scores': _params.raw_scores,
      'csv_headers': _params.csv_headers,
      'consumption_preferences': _params.consumption_preferences
    };
    const parameters = {
      options: {
        url: '/v3/profile',
        method: 'POST',
        json: (_params.content_type === 'application/json'),
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'text/csv',
          'Content-Type': _params.content_type,
          'Content-Language': _params.content_language,
          'Accept-Language': _params.accept_language
        }, _params.headers),
      }),
    };
    return createRequest(parameters, _callback);
  };

}

PersonalityInsightsV3.prototype.name = 'personality_insights';
PersonalityInsightsV3.prototype.serviceVersion = 'v3';

/*************************
 * interfaces
 ************************/

namespace PersonalityInsightsV3 {

  /** Options for the `PersonalityInsightsV3` constructor. */
  export type Options = {
    version: string;
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `profile` operation. */
  export interface ProfileParams {
    /** A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the **Content** model. */
    content: Content|string;
    /** The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    content_type: ProfileConstants.ContentType | string;
    /** The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**. */
    content_language?: ProfileConstants.ContentLanguage | string;
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content. */
    accept_language?: ProfileConstants.AcceptLanguage | string;
    /** Whether a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population. */
    raw_scores?: boolean;
    /** Whether column labels are returned with a CSV response. Applies only when the **Accept** parameter is set to `text/csv`. */
    csv_headers?: boolean;
    /** Whether consumption preferences are returned with the results. */
    consumption_preferences?: boolean;
    headers?: Object;
  }

  /** Constants for the `profile` operation. */
  export namespace ProfileConstants {
    /** The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_HTML = 'text/html',
      TEXT_PLAIN = 'text/plain',
    }
    /** The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**. */
    export enum ContentLanguage {
      AR = 'ar',
      EN = 'en',
      ES = 'es',
      JA = 'ja',
      KO = 'ko',
    }
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content. */
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

  /** Parameters for the `profileAsCsv` operation. */
  export interface ProfileAsCsvParams {
    /** A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the **Content** model. */
    content: Content|string;
    /** The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    content_type: ProfileAsCsvConstants.ContentType | string;
    /** The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**. */
    content_language?: ProfileAsCsvConstants.ContentLanguage | string;
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content. */
    accept_language?: ProfileAsCsvConstants.AcceptLanguage | string;
    /** Whether a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population. */
    raw_scores?: boolean;
    /** Whether column labels are returned with a CSV response. Applies only when the **Accept** parameter is set to `text/csv`. */
    csv_headers?: boolean;
    /** Whether consumption preferences are returned with the results. */
    consumption_preferences?: boolean;
    headers?: Object;
  }

  /** Constants for the `profileAsCsv` operation. */
  export namespace ProfileAsCsvConstants {
    /** The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_HTML = 'text/html',
      TEXT_PLAIN = 'text/plain',
    }
    /** The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.   The effect of the **Content-Language** parameter depends on the **Content-Type** parameter. When **Content-Type** is `text/plain` or `text/html`, **Content-Language** is the only way to specify the language. When **Content-Type** is `application/json`, **Content-Language** overrides a language specified with the **language** parameter of a **ContentItem** object, and content items that specify a different language are ignored; omit this parameter to base the language on the specification of the content items. You can specify any combination of languages for **Content-Language** and **Accept-Language**. */
    export enum ContentLanguage {
      AR = 'ar',
      EN = 'en',
      ES = 'es',
      JA = 'ja',
      KO = 'ko',
    }
    /** The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content. */
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

  /** Behavior. */
  export interface Behavior {
    /** The unique identifier of the characteristic to which the results pertain. IDs have the form `behavior_{value}`. */
    trait_id: string;
    /** The user-visible name of the characteristic. */
    name: string;
    /** The category of the characteristic: `behavior` for temporal data. */
    category: string;
    /** For JSON content that is timestamped, the percentage of timestamped input data that occurred during that day of the week or hour of the day. The range is 0 to 1. */
    percentage: number;
  }

  /** ConsumptionPreferences. */
  export interface ConsumptionPreferences {
    /** The unique identifier of the consumption preference to which the results pertain. IDs have the form `consumption_preferences_{preference}`. */
    consumption_preference_id: string;
    /** The user-visible name of the consumption preference. */
    name: string;
    /** The score for the consumption preference: * `0.0`: Unlikely * `0.5`: Neutral * `1.0`: Likely   The scores for some preferences are binary and do not allow a neutral value. The score is an indication of preference based on the results inferred from the input text, not a normalized percentile. */
    score: number;
  }

  /** ConsumptionPreferencesCategory. */
  export interface ConsumptionPreferencesCategory {
    /** The unique identifier of the consumption preferences category to which the results pertain. IDs have the form `consumption_preferences_{category}`. */
    consumption_preference_category_id: string;
    /** The user-visible name of the consumption preferences category. */
    name: string;
    /** Detailed results inferred from the input text for the individual preferences of the category. */
    consumption_preferences: ConsumptionPreferences[];
  }

  /** Content. */
  export interface Content {
    /** An array of **ContentItem** objects that provides the text that is to be analyzed. */
    content_items: ContentItem[];
  }

  /** ContentItem. */
  export interface ContentItem {
    /** Content that is to be analyzed. The service supports up to 20 MB of content for all items combined. */
    content: string;
    /** Unique identifier for this content item. */
    id?: string;
    /** Timestamp that identifies when this content was created. Specify a value in milliseconds since the UNIX Epoch (January 1, 1970, at 0:00 UTC). Required only for results that include temporal behavior data. */
    created?: number;
    /** Timestamp that identifies when this content was last updated. Specify a value in milliseconds since the UNIX Epoch (January 1, 1970, at 0:00 UTC). Required only for results that include temporal behavior data. */
    updated?: number;
    /** MIME type of the content. The default is plain text. The tags are stripped from HTML content before it is analyzed; plain text is processed as submitted. */
    contenttype?: string;
    /** Language identifier (two-letter ISO 639-1 identifier) for the language of the content item. The default is `en` (English). Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. A language specified with the **Content-Type** parameter overrides the value of this parameter; any content items that specify a different language are ignored. Omit the **Content-Type** parameter to base the language on the most prevalent specification among the content items; again, content items that specify a different language are ignored. You can specify any combination of languages for the input and response content. */
    language?: string;
    /** Unique ID of the parent content item for this item. Used to identify hierarchical relationships between posts/replies, messages/replies, and so on. */
    parentid?: string;
    /** Indicates whether this content item is a reply to another content item. */
    reply?: boolean;
    /** Indicates whether this content item is a forwarded/copied version of another content item. */
    forward?: boolean;
  }

  /** Profile. */
  export interface Profile {
    /** The language model that was used to process the input. */
    processed_language: string;
    /** The number of words that were found in the input. */
    word_count: number;
    /** When guidance is appropriate, a string that provides a message that indicates the number of words found and where that value falls in the range of required or suggested number of words. */
    word_count_message?: string;
    /** Detailed results for the Big Five personality characteristics (dimensions and facets) inferred from the input text. */
    personality: Trait[];
    /** Detailed results for the Needs characteristics inferred from the input text. */
    values: Trait[];
    /** Detailed results for the Values characteristics inferred from the input text. */
    needs: Trait[];
    /** For JSON content that is timestamped, detailed results about the social behavior disclosed by the input in terms of temporal characteristics. The results include information about the distribution of the content over the days of the week and the hours of the day. */
    behavior?: Behavior[];
    /** If the **consumption_preferences** parameter is `true`, detailed results for each category of consumption preferences. Each element of the array provides information inferred from the input text for the individual preferences of that category. */
    consumption_preferences?: ConsumptionPreferencesCategory[];
    /** Warning messages associated with the input text submitted with the request. The array is empty if the input generated no warnings. */
    warnings: Warning[];
  }

  /** Trait. */
  export interface Trait {
    /** The unique identifier of the characteristic to which the results pertain. IDs have the form `big5_{characteristic}` for Big Five personality characteristics, `need_{characteristic}` for Needs, or `value_{characteristic}` for Values. */
    trait_id: string;
    /** The user-visible name of the characteristic. */
    name: string;
    /** The category of the characteristic: * `personality` for Big Five personality characteristics * `needs` for Needs * `values` for Values. */
    category: string;
    /** The normalized percentile score for the characteristic. The range is 0 to 1. For example, if the percentage for Openness is 0.60, the author scored in the 60th percentile; the author is more open than 59 percent of the population and less open than 39 percent of the population. */
    percentile: number;
    /** The raw score for the characteristic. The range is 0 to 1. A higher score generally indicates a greater likelihood that the author has that characteristic, but raw scores must be considered in aggregate: The range of values in practice might be much smaller than 0 to 1, so an individual score must be considered in the context of the overall scores and their range. The raw score is computed based on the input and the service model; it is not normalized or compared with a sample population. The raw score enables comparison of the results against a different sampling population and with a custom normalization approach. */
    raw_score?: number;
    /** **`2017-10-13`**: Indicates whether the characteristic is meaningful for the input language. The field is always `true` for all characteristics of English, Spanish, and Japanese input. The field is `false` for the subset of characteristics of Arabic and Korean input for which the service's models are unable to generate meaningful results. **`2016-10-19`**: Not returned. */
    significant?: boolean;
    /** For `personality` (Big Five) dimensions, more detailed results for the facets of each dimension as inferred from the input text. */
    children?: Trait[];
  }

  /** Warning. */
  export interface Warning {
    /** The identifier of the warning message. */
    warning_id: string;
    /** The message associated with the `warning_id`: * `WORD_COUNT_MESSAGE`: "There were {number} words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates." * `JSON_AS_TEXT`: "Request input was processed as text/plain as indicated, however detected a JSON input. Did you mean application/json?" * `CONTENT_TRUNCATED`: "For maximum accuracy while also optimizing processing time, only the first 250KB of input text (excluding markup) was analyzed. Accuracy levels off at approximately 3,000 words so this did not affect the accuracy of the profile." * `PARTIAL_TEXT_USED`, "The text provided to compute the profile was trimmed for performance reasons. This action does not affect the accuracy of the output, as not all of the input text was required." Applies only when Arabic input text exceeds a threshold at which additional words do not contribute to the accuracy of the profile. */
    message: string;
  }

}

export = PersonalityInsightsV3;