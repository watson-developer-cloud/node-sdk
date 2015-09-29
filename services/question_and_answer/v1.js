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

var extend         = require('extend');
var pick           = require('object.pick');
var requestFactory = require('../../lib/requestwrapper');

function toQuestion(params) {
  var question = {
    evidenceRequest: {
      items: params.items || 5 // the number of answers, 5 by default
    },
    questionText: params.text,
  };
  if (params.formattedAnswer)
    question.formattedAnswer = true;

  return question;
};


function QuestionAndAnswer(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/question-and-answer-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

QuestionAndAnswer.prototype.ask = function(_params, callback) {
  // If 'text' is specified, build POST body question using text
  if (_params && _params.text) {
    _params.question = toQuestion(_params);
    delete _params.text;
  }

  var params = extend(this._options, _params);

  if (!params.question) {
    callback(new Error('Missing required parameters: text or question'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/question/{dataset}',
      headers: {
        'X-synctimeout': 30
      },
      method: 'POST',
      body: pick(params, ['question']),
      json: true,
      path: params
    },
    requiredParams: ['question', 'dataset'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

QuestionAndAnswer.prototype.datasets = function(_params, callback) {
  var parameters = {
    options: {
      url: '/v1/services',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = QuestionAndAnswer;
