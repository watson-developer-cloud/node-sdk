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

var toContentItems = function(text){
  return {
        contentItems : [{
          userid : 'dummy',
          id : 'dummyUuid',
          sourceid : 'freetext',
          contenttype : 'text/plain',
          language : 'en',
          content: text
        }]
  };
};

function UserModeling(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/user-modeling-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

UserModeling.prototype.profile = function(_params, callback) {
  var body = _params || {};

  // If 'text' is specified, build the contentItems object using text
  if (body.text)
    body = toContentItems(body.text);

  if (!body.contentItems) {
    callback(new Error('Missing required parameters: text or contentItems'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v2/profile',
      body: body,
      json: true,
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = UserModeling;