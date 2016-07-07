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


"use strict";
var extend       = require('extend');
var vcapServices = require('vcap_services');
var helper       = require('./helper');
var omit         = require('object.omit');
var request      = require('request');

function encodeBase64(creds) {
  return new Buffer(creds.username + ':' + creds.password).toString('base64');
}


/**
 * Base class that other services inherit from
 * @returns {Function}
 * @constructor
 */
// eslint-disable-next-line complexity
function BaseService(user_options) {
  var serviceName = this.name;

  var options = extend({}, user_options);
  var alchemy = (serviceName.indexOf('alchemy_') === 0);
  var vrv3 = (serviceName === 'visual_recognition' && user_options.version === 'v3');

  // For Alchemy we use 'v1' by default,
  // and check if `apikey` was specified.
  // We don't use VCAP_SERVICES
  if (alchemy) {
    options.alchemy = true;
    options.api_key = options.apikey || options.api_key;
  } else if (vrv3) {
    // Visual Recognition v3 similarly uses an API key instead of username + password
    options.api_key = options.apikey || options.api_key;
  } else {
    options.jar = request.jar();
  }


  // Get credentials from Bluemix
  if (options.use_vcap_services !== false) {
    var vcap_services_name = vrv3 ?  'watson_vision_combined' : serviceName;
    var credentials = vcapServices.getCredentials(vcap_services_name);
    if (credentials.username && credentials.password) {
      credentials.api_key = encodeBase64(credentials);
    }
    options = extend({}, options, credentials);
  }

  // Use api_key or username and password as Authorization
  var user = options.username,
    pass = options.password,
    api_key = options.api_key;

  if (!options.use_unauthenticated) {
    // Check if 'api_key' or 'username' and 'password' were provided
    if (typeof api_key === 'undefined') {
      if (typeof user === 'undefined' || typeof pass === 'undefined') {
        if (alchemy || vrv3)
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
}

module.exports = BaseService;
