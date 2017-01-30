/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

var requestFactory = require('../lib/requestwrapper');
var pick = require('object.pick');
// var omit = require('object.omit');
// var isStream = require('isstream');
// var toCSV = require('./json-training-to-csv');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway-s.watsonplatform.net/natural-language-understanding/api/';
NaturalLanguageUnderstandingV1.VERSION_DATE = '2016-01-23';

NaturalLanguageUnderstandingV1.prototype.analyze = function(params, callback) {
  params = params || {};
  params.version = params.version || NaturalLanguageUnderstandingV1.VERSION_DATE;

  var parameters = {
    options: {
      url: '/v1/analyze',
      method: 'POST',
      json: true,
      qs: pick(params, ['version']),
      body: pick(params, ['text', 'html', 'features'])
    },
    requiredParams: ['features'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
}

module.exports = NaturalLanguageUnderstandingV1;
