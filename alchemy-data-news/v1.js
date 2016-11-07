/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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

'use strict';

var extend         = require('extend');
var requestFactory = require('../lib/requestwrapper');
var util = require('util');
var BaseServiceAlchemy = require('../lib/base_service_alchemy');
var errorFormatter = require('../lib/alchemy_error_formatter');

/**
 * @param options
 * @constructor
 */
function AlchemyDataNewsV1(options) {
  BaseServiceAlchemy.call(this, options);
}
util.inherits(AlchemyDataNewsV1, BaseServiceAlchemy);

AlchemyDataNewsV1.prototype.name = 'alchemy_data_news';
AlchemyDataNewsV1.prototype.version = 'v1';
AlchemyDataNewsV1.URL = 'https://gateway-a.watsonplatform.net/calls';

/**
 * Extracts a grouped, ranked list of named entities (people, companies,
 * organizations, etc.) from text, a URL or HTML.
 * @param {Object} params
 * @param params.end
 * @param params.start
 * @param {Function} callback
 */
AlchemyDataNewsV1.prototype.getNews = function (params, callback ) {
    params = params || {};

    var parameters = {
      options: {
        url: '/data/GetNews',
        method: 'GET',
        json: true,
        qs: extend({}, params, {outputMode: 'json'}) // change default output to json
      },
      requiredParams: ['end','start'],
      defaultOptions: this._options
    };
    return requestFactory(parameters, errorFormatter(callback));
  };

module.exports = AlchemyDataNewsV1;
