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
var requestFactory = require('../../lib/requestwrapper');
var pick           = require('object.pick');
var omit           = require('object.omit');
var isStream       = require('isstream');

function AlchemyLanguage(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://access.alchemyapi.com/calls',
    alchmemy: true
  };

  this.paths = {
    text: 'text/TextGetRankedNamedEntities',
    url: 'url/URLGetRankedNamedEntities',
    html: 'html/HTMLGetRankedNamedEntities'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Extracts a grouped, ranked list of named entities (people, companies,
 * organizations, etc.) from within a text, url or html.
 */
AlchemyLanguage.prototype.entities = function(_params, callback) {
  var params = _params || {};
  var path = null;

  if (typeof(params.text) === 'undefined' &&
      typeof(params.url)  === 'undefined' &&
      typeof(params.html) === 'undefined') {
    callback(new Error('Missing required parameters: either text, ' +
      'url or html needs to be specified'));
    return;
  }

  if (typeof(params.text) !== 'undefined')
    path = '/text/TextGetRankedNamedEntities';
  else if (typeof(params.url) !== 'undefined')
    path = '/url/URLGetRankedNamedEntities';
  else
    path = '/url/HTMLGetRankedNamedEntities';

  var parameters = {
    options: {
      url: path,
      method: 'GET',
      json: true,
      path: params,
      qs: extend({outputMode: 'json'}, params) // change default output to json
    },
    requiredParams: ['text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = AlchemyLanguage;