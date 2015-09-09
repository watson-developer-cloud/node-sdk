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

var path    = require('path');
var util    = require('util');
var extend  = require('extend');
var bluemix = require('./bluemix');
var helper  = require('./helper');
var omit    = require('object.omit');


function createServiceAPI(serviceName) {
  return function(user_options) {
    var options = extend({}, user_options);
    var alchemy = (serviceName.indexOf('alchemy_') === 0);

    // For Alchemy we use 'v1' by default,
    // and check if `apikey` was specified.
    // We don't use VCAP_SERVICES
    if (alchemy) {
      options.alchemy = true;
      options.version = 'v1';
      options.api_key = options.apikey || options.api_key;
    }

    // Check if 'version' was provided
    var version = options.version;
    if (typeof version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }

    // Get credentials from Bluemix
    if (options.use_vcap_services !== false) {
      var service = bluemix.serviceStartsWith(serviceName);
      options = extend({}, options, service.credentials);
    }

    // Use api_key or username and password as Authorization
    var user = options.username,
      pass = options.password,
      api_key = options.api_key;

    if (!options.use_unauthenticated) {
      // Check if 'api_key' or 'username' and 'password' were provided
      if (typeof api_key === 'undefined') {
        if (typeof user === 'undefined' || typeof pass === 'undefined') {
          if (alchemy)
            throw new Error('Argument error: api_key was not specified');
          else
            throw new Error('Argument error: api_key or username and password were not specified');
        }

        // Calculate and add api_key
        options.api_key = new Buffer(user + ':' + pass).toString('base64');
      }
    }

    options = omit(options, ['version', 'username', 'password',
      'use_vcap_services', 'use_unauthenticated', 'apikey']);

    if (options.url)
      options.url = helper.stripTrailingSlash(options.url);

    try {
      // Build the path to the service file based on the service name and api version
      var servicePath = path.join(__dirname, '..', 'services', serviceName, path.basename(version));
      var Service = require(servicePath);
      var s = new Service(options);
      return Object.freeze(s);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(util.format('Service %s %s not found', serviceName, version));
      } else {
        throw e;
      }
    }
  };
}

var watson = {};

[
  'message_resonance',
  'concept_expansion',
  'question_and_answer',
  'relationship_extraction',
  'visual_recognition',
  'speech_to_text',
  'text_to_speech',
  'concept_insights',
  'tradeoff_analytics',
  'personality_insights',
  'natural_language_classifier',
  'authorization',
  'language_translation',
  'tone_analyzer',
  'dialog',
  'retrieve_and_rank',
  // deprecated
  'search',
  'language_identification',
  'machine_translation',
  'user_modeling',

  // alchemy
  'alchemy_language'
  //'alchemy_vision'

].forEach(function(api) {
  watson[api] = createServiceAPI(api);
});

module.exports = watson;
