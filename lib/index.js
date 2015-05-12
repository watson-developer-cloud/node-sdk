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

var path = require('path');
var util = require('util');
var extend = require('extend');
var bluemix = require('./bluemix');
var helper = require('./helper');


function createServiceAPI(serviceName) {
  return function(user_options) {
    user_options = user_options || {};

    // Check if 'version' was provided
    var version = user_options.version;
    delete user_options.version;
    if (typeof version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }

    // Get credentials from Bluemix
    var service = {};

    var use_vcap_services = user_options.use_vcap_services != false;
    delete user_options.use_vcap_services;
    if (use_vcap_services) {
      service = bluemix.serviceStartsWith(serviceName);
    }

    var options = extend({}, user_options, service.credentials);

    var user = options.username,
      pass = options.password,
      api_key = options.api_key;

    // Check if 'api_key' or 'username' and 'password' were provided
    if (typeof api_key === 'undefined') {
      if (typeof user === 'undefined' || typeof pass === 'undefined') {
        throw new Error('Argument error: api_key or username and password were not specified');
      }

      // Calculate and add api_key
      options.api_key = new Buffer(user + ':' + pass).toString('base64');
    }
    delete options.username;
    delete options.password;

    if (options.url)
      options.url = helper.stripTrailingSlash(options.url);

    try {
      // Build the path to the service file based on the service name and api version
      var servicePath = path.join(__dirname, '..', 'services', serviceName, path.basename(version));
      var Service = require(servicePath);
      var s = new Service(options);
      return Object.freeze(s);
    } catch (e) {
      throw new Error(util.format('Argument error: %s not found for: %s', version, serviceName));
    }
  };
}

var watson = {};

[
  'message_resonance',
  'user_modeling',
  'machine_translation',
  'concept_expansion',
  'question_and_answer',
  'relationship_extraction',
  'language_identification',
  // wave 2 services
  'visual_recognition',
  'speech_to_text',
  'text_to_speech',
  'concept_insights',
  'tradeoff_analytics',
  'personality_insights',
  // wave 3
  'natural_language_classifier'
].forEach(function(api) {
  watson[api] = createServiceAPI(api);
});

module.exports = watson;