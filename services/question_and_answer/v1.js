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

'use strict';

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');

var toQuestion = function(params){
  return {
      question: {
        evidenceRequest: {
          items: params.items || 5 // the number of anwers, 5 by default
        },
        questionText: params.text
      }
    };
};


function QuestionAndAnswer(options) {
  var default_option = {
    url: 'https://gateway.watsonplatform.net/qagw/service'
  };
  this.dataset = options.dataset;

  // Extend default options with user provided options
  this._options = extend(default_option, options);
}

QuestionAndAnswer.prototype.ask = function(_params, callback) {
  var body = _params || {},
    // User dataset or default
    dataset = body.dataset || this.dataset,
    path = dataset ? { dataset: dataset} : null;

  // If 'text' is specified, build POST body question using text
  if (body.text) {
    body = toQuestion(body);
  }

  delete body.dataset;

  var parameters = {
    options: {
      url: this._options.url + '/v1/question/{dataset}',
      headers: { 'X-synctimeout' : 30 },
      method: 'POST',
      body: body,
      json: true,
      path: path
    },
    requiredParams: ['question','dataset'],
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

QuestionAndAnswer.prototype.datasets = function(_params, callback) {
  var parameters = {
    options: {
      url: this._options.url + '/v1/services',
      method: 'GET',
      json: true
    },
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = QuestionAndAnswer;
