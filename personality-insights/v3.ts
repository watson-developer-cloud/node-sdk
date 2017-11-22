/**
 * Copyright 2017 IBM All Rights Reserved.
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

import GeneratedPersonalityInsightsV3 = require('./v3-generated');
import extend = require('extend');
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams, isHTML } from '../lib/helper';
import { BaseService } from '../lib/base_service';

class PersonalityInsightsV3 extends GeneratedPersonalityInsightsV3 {
  constructor(options) {
    super(options);
  }

  profile(params, callback) {
    const _params = extend({}, params);
    const _headers = extend({}, _params.headers);

    let _content;
    if (_params.contentItems || _params.content_items) {
      _content = {
        contentItems: _params.contentItems || _params.content_items
      };
    }
    _params.content = _params.content || _content || _params.text;

    let _content_type;
    if (typeof _params.content === 'string') {
      _content_type = isHTML(_params.content) ? 'text/html' : 'text/plain';
    } else {
      _content_type = 'application/json';
    }
    _params.content_type =
      _params.content_type ||
      _headers['content-type'] ||
      _headers['Content-Type'] ||
      _content_type;

    _params.accept_language =
      _params.accept_language ||
      _headers['accept-language'] ||
      _headers['Accept-Language'];

    _params.content_language =
      _params.content_language ||
      _headers['content-language'] ||
      _headers['Content-Language'];

    const _accept = _headers['accept'] || _headers['Accept'];

    return _accept === 'text/csv'
      ? this.profile_csv(_params, callback)
      : super.profile(_params, callback);
  }

  /**
   * Generates a personality profile based on input text.
   *
   * Derives personality insights for up to 20 MB of input content written by an author, though the service requires much less text to produce an accurate profile; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). Accepts input in Arabic, English, Japanese, Korean, or Spanish and produces output in one of eleven languages. Provide plain text, HTML, or JSON content, and receive results in JSON or CSV format.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Content|string} params.content - A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the `Content` model.
   * @param {string} params.content_type - The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'.
   * @param {string} [params.content_language] - The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The effect of the `content_language` header depends on the `Content-Type` header. When `Content-Type` is `text/plain` or `text/html`, `content_language` is the only way to specify the language. When `Content-Type` is `application/json`, `content_language` overrides a language specified with the `language` parameter of a `ContentItem` object, and content items that specify a different language are ignored; omit this header to base the language on the specification of the content items. You can specify any combination of languages for `content_language` and `Accept-Language`.
   * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content.
   * @param {boolean} [params.raw_scores] - If `true`, a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population. If `false` (the default), only normalized percentiles are returned.
   * @param {boolean} [params.csv_headers] - If `true`, column labels are returned with a CSV response; if `false` (the default), they are not. Applies only when the `Accept` header is set to `text/csv`.
   * @param {boolean} [params.consumption_preferences] - If `true`, information about consumption preferences is returned with the results; if `false` (the default), the response does not include the information.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  profile_csv(
    params: GeneratedPersonalityInsightsV3.ProfileParams,
    callback?: GeneratedPersonalityInsightsV3.Callback<
      GeneratedPersonalityInsightsV3.Profile
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['content', 'content_type'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.content;
    const query = {
      raw_scores: _params.raw_scores,
      csv_headers: _params.csv_headers,
      consumption_preferences: _params.consumption_preferences
    };
    const parameters = {
      options: {
        url: '/v3/profile',
        method: 'POST',
        json: _params.content_type === 'application/json',
        body: body,
        qs: query
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'text/csv',
          'content-type': _params.content_type,
          'content-language': _params.content_language,
          'accept-language': _params.accept_language
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

export = PersonalityInsightsV3;
