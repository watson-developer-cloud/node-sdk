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
  var default_option = {
    url: 'https://gateway.watsonplatform.net/systemu/service/api'
  };

  // Replace default options with user provided
  this._options = extend(default_option, options);
}

UserModeling.prototype.profile = function(_params, callback) {
  var body = _params || {},
    profile_url = this._options.url + '/v2/profile';

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
      url: profile_url,
      body: body,
      json: true,
    },
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = UserModeling;