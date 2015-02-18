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

var util           = require('util');
var extend         = require('extend');
var helper         = require('../../lib/helper');
var requestFactory = require('../../lib/requestwrapper');

// Wrap the response to format the result.
var responseFormatter = function(callback) {
  return function(err, response) {
    if (err) {
      callback(err, response);
    } else {
      callback(null, { translation: response });
    }
  };
};

var createSid = function(from, to) {
  return util.format('mt-%s-%s', from, to);
};

function MachineTranslation(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/machine-translation-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

MachineTranslation.prototype.translate = function(_params, callback) {
  var params = _params || {},
    sid = params.sid,
    requiredParams = ['text'];

  if (!sid) { // If !sid check that 'from' and 'to' were specified
    sid = createSid(params.from, params.to);
    requiredParams = ['text','from','to'];
  }

  var missingParams = helper.getMissingParams(params, requiredParams);

  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/smt/0',
      form : {
        sid: sid,
        rt:'text',
        txt: params.text // Change 'text' to 'txt'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, responseFormatter(callback));
};

module.exports = MachineTranslation;