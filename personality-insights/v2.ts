/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
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

import pick = require('object.pick');
import { isHTML } from '../lib/helper';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { BaseService } from '../lib/base_service';

class PersonalityInsightsV2 extends BaseService {
  static URL: string = 'https://gateway.watsonplatform.net/personality-insights/api';
  constructor(options: PersonalityInsightsV2.Options) {
    super(options);
  }
  /**
   * @param params {Object} The parameters to call the service
   *   The accepted parameters are:
   *     - text: The text to analyze.
   *     - contentItems: A JSON input (if 'text' not provided).
   *     - include_raw: include raw results
   *     - accept_language : The language expected for the output.
   *     - language: The language of the input.
   *
   * @param callback The callback.
   */
  profile(
    params: PersonalityInsightsV2.ProfileParams,
    callback: PersonalityInsightsV2.Callback
  ) {
    const _params = params || {};
    // support for the new snake_case
    if (_params['content_items']) {
      _params['contentItems'] = _params['content_items'];
    }
    if (!_params.text && !_params.contentItems) {
      callback(new Error('Missing required parameters: text or content_items'));
      return;
    }
    // Content-Type
    let content_type = null;
    if (params.text) {
      content_type = isHTML(params.text) ? 'text/html' : 'text/plain';
    } else {
      content_type = 'application/json';
    }
    const headers = {
      'Content-type': content_type,
      'Accept-language':
        params.accept_language || params.acceptLanguage || 'en',
      Accept: undefined
    };
    // service bug: language in header overrides language in each JSON content item, so we can't set it on those requests
    // (also, content-language doesn't really make sense on JSON)
    if (params.language || params.text) {
      headers['Content-language'] = params.language || 'en';
    }
    const parameters = {
      options: {
        method: 'POST',
        url: '/v2/profile',
        body: params.text || pick(params, ['contentItems']),
        json: true,
        qs: pick(params, ['include_raw']),
        headers: headers
      },
      defaultOptions: this._options
    };
    if (params.csv) {
      parameters.options.headers.Accept = 'text/csv';
      if (params.csv_headers) {
        parameters.options.qs.headers = 'true';
      }
    }
    return createRequest(parameters, callback);
  }
}

PersonalityInsightsV2.prototype.name = 'personality_insights';
PersonalityInsightsV2.prototype.version = 'v2';

namespace PersonalityInsightsV2 {
  export type Callback = (
    error: any,
    body?: any,
    response?: RequestResponse
  ) => void;

  export type Options = {
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  export interface ProfileParams {
    text?: string;
    contentItems?: any;
    content_items?: any;
    include_raw?: boolean;
    csv?: boolean;
    csv_headers?: boolean;
    language?: string;
    accept_language?: string;
    acceptLanguage?: string;
  }
}

export = PersonalityInsightsV2;
