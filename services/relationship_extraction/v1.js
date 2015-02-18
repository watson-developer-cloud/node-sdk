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
var helper         = require('../../lib/helper');
var requestFactory = require('../../lib/requestwrapper');

function RelationshipExtraction(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/relationship-extraction-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

// Wrap the response to format the result.
function responseFormatter(callback) {
  return function(err, response) {
    if (err) {
      return callback && callback(err, response);
    }

    if (response && response.sts === 'OK')
      callback(null, response.xml);
    else
      callback(new Error('Malformed results'));

  };
}

RelationshipExtraction.prototype.extract = function(_params, callback) {
  var params = extend(this._options, _params);

  var missingParams = helper.getMissingParams(params, ['dataset','text']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/sire/0',
      form : {
        rt: 'json',
        sid: params.dataset,
        txt: params.text // Change 'text' to 'txt'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, responseFormatter(callback));
};

module.exports = RelationshipExtraction;