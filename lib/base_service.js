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


/**
 * Base class that other services inherit from
 * @private
 * @param {Object} [options]
 * @constructor
 */
function BaseService(user_options) {
  if (!(this instanceof BaseService)) {
    // it might be better to just create a new instance and return that.. but that can't be done here, it has to be done in each individual service. So this is still a good failsafe even in that case.
    throw new Error('"new" keyword required to create Watson service instances');
  }
  var options = extend({}, user_options);

  options = this.initCredentials(options);

  options = omit(options, ['version', 'username', 'password',
    'use_vcap_services', 'use_unauthenticated', 'apikey']);

  if (options.url)
    options.url = helper.stripTrailingSlash(options.url);

  this._options = extend({qs: {}, url: this.constructor.URL}, this.serviceDefaults, options);
}

BaseService.prototype.initCredentials = function(options) {
  if (options.token) {
    options.headers = options.headers || {};
    options.headers['X-Watson-Authorization-Token'] = options.token;
    return options;
  }

  options.jar = request.jar();

  // Get credentials from environment properties or Bluemix
  // but prefer credentials provided pragmatically!
  options = extend(
    {},
    this.getCredentialsFromBluemix(this.name),
    this.getCredentialsFromEnvironment(this.name),
    options
  );

  // Use api_key or username and password as Authorization
  var user = options.username,
    pass = options.password,
    api_key = options.api_key;

  if (!options.use_unauthenticated) {
    // Check if 'api_key' or 'username' and 'password' were provided
    if (typeof api_key === 'undefined') {
      if (typeof user === 'undefined' || typeof pass === 'undefined') {
          throw new Error('Argument error: api_key or username and password were not specified');
      }

      // Calculate and add api_key
      options.api_key = new Buffer(user + ':' + pass).toString('base64');
    }
  }

  return options;
};

/**
 * Pulls credentials from env properties
 *
 * Property checked is uppercase service.name suffixed by _USERNAME and _PASSWORD
 *
 * For example, if service.name is speech_to_text, env properties are SPEECH_TO_TEXT_USERNAME and SPEECH_TO_TEXT_PASSWORD
 *
 * @param name
 * @returns {{username: String|undefined, password: String|undefined}}
 */
BaseService.prototype.getCredentialsFromEnvironment = function(name) {
  name = name.toUpperCase();
  return {
    username: process.env[name + '_USERNAME'],
    password: process.env[name + '_PASSWORD']
  }
};

/**
 * Pulls credentials from VCAP_SERVICES env property that bluemix sets
 *
 * @private
 * @returns {{}}
 */
BaseService.prototype.getCredentialsFromBluemix = function(vcap_services_name) {
  return vcapServices.getCredentials(vcap_services_name);
};



module.exports = BaseService;
