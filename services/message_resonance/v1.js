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


var async          = require('async');
var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var helper         = require('../../lib/helper');

function MessageResonance(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/message-resonance-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

MessageResonance.prototype.getResonanceForWord = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/ringscore',
      json: true,
      qs: params
    },
    requiredParams: ['dataset','text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Format the result to be the same as in the future version of the service
 */
var formatResonances = function(params, resonances) {
  var text = params.text,
    index = 0;

  resonances = resonances.map(function(res) {
    // res = [body, request]
    res = res[0]; // use body
    delete res.dataset;
    res.word_offset = text.indexOf(res.word, index);
    index += res.word.length;
    return res;
  });

  return {
    text: params.text,
    dataset: params.dataset,
    resonances: resonances
  };
};

MessageResonance.prototype.resonance = function(_params, callback) {
  var params = extend({}, this._options, _params);
  var self = this;

  var missingParams = helper.getMissingParams(params, ['dataset','text']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  // separate the text in individual words and map each with the get_resonance function
  var getWordResonanceFn = params.text.match(/[^ ]+/g).map(function(word) {
    return function (cb) {
      return self.getResonanceForWord({ text:word, dataset: params.dataset}, cb);
    };
  });

  // Execute all async tasks with a limit of 20 request in parallel
  async.parallelLimit(getWordResonanceFn, 20, function(err, result) {
    if (err)
      callback(err);
    else
      callback(null, formatResonances(params,result));
  });

};

MessageResonance.prototype.datasets = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/datasets',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = MessageResonance;