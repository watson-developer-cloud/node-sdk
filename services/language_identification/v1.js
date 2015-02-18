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
var requestFactory = require('../../lib/requestwrapper');

// Wrap the response to format the result.
// The service will respond: {"sts":"OK","lang":"en-US"}
// We want to respond: {"language":"en-US"}
var responseFormatter = function(callback) {
  return function(err, response) {
    if (err) {
      return callback && callback(err, response);
    }

    if (response && response.sts === 'OK')
      callback(null, {language: response.lang });
    else
      callback(new Error('Malformed results'));
  };
};

function LanguageIdentification(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/language-identification-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

LanguageIdentification.prototype.identify = function(params, callback) {
  if (!params || !params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/txtlid/0',
      form : {
        sid: 'lid-generic',
        rt:'json',
        txt: params.text // Change 'text' to 'txt'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, responseFormatter(callback));
};


module.exports = LanguageIdentification;