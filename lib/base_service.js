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
const extend = require('extend');
const vcapServices = require('vcap_services');
const helper = require('./helper');
const request = require('request');
const bufferFrom = require('buffer-from'); // new Buffer() is deprecated, replaced with Buffer.from() in node v4.5.0+ - this uses the new api when possible but falls back to the old one otherwise

/**
 * Internal base class that other services inherit from
 * @param {Object} options
 * @param {String} [options.username] - required unless use_unauthenticated is set
 * @param {String} [options.password] - required unless use_unauthenticated is set
 * @param {Boolean} [options.use_unauthenticated] - skip credential requirement
 * @param {Object} [options.headers]
 * @param {Boolean} [options.headers.X-Watson-Learning-Opt-Out=false] - opt-out of data collection
 * @param {String} [options.url] - override default service base url
 * @private
 * @abstract
 * @constructor
 */
function BaseService(user_options) {
  if (!(this instanceof BaseService)) {
    // it might be better to just create a new instance and return that.. but that can't be done here, it has to be done in each individual service. So this is still a good failsafe even in that case.
    throw new Error('"new" keyword required to create Watson service instances');
  }
  let options = extend({}, user_options);

  options = this.initCredentials(options);

  if (options.url) {
    options.url = helper.stripTrailingSlash(options.url);
  }

  this._options = extend({ qs: {}, url: this.constructor.URL }, this.serviceDefaults, options);
}

/**
 * @private
 * @param {Object} options
 * @return {*}
 */
BaseService.prototype.initCredentials = function(options) {
  if (options.token) {
    options.headers = options.headers || {};
    options.headers['X-Watson-Authorization-Token'] = options.token;
    return options;
  }

  options.jar = request.jar();

  // Get credentials from environment properties or Bluemix
  // but prefer credentials provided pragmatically!
  options = extend({}, this.getCredentialsFromBluemix(this.name), this.getCredentialsFromEnvironment(this.name), options);

  if (!options.use_unauthenticated) {
    if (!options.username || !options.password) {
      throw new Error('Argument error: username and password are required unless use_unauthenticated is set');
    }

    // Calculate and add Authorization header to base options
    const authHeader = {
      Authorization: 'Basic ' + bufferFrom(options.username + ':' + options.password).toString('base64')
    };
    options.headers = extend(authHeader, options.headers);
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
 * @private
 * @param name
 * @return {{username: String|undefined, password: String|undefined, url: String|undefined}}
 */
BaseService.prototype.getCredentialsFromEnvironment = function(name) {
  name = name.toUpperCase();
  return {
    username: process.env[name + '_USERNAME'],
    password: process.env[name + '_PASSWORD'],
    url: process.env[name + '_URL']
  };
};

/**
 * Pulls credentials from VCAP_SERVICES env property that bluemix sets
 *
 * @private
 * @return {Object}
 */
BaseService.prototype.getCredentialsFromBluemix = function(vcap_services_name) {
  return vcapServices.getCredentials(vcap_services_name);
};

/**
 * Retrieve this service's credentials - useful for passing to the authorization service
 *
 * Only returns a URL when token auth is used.
 *
 * @return {{username: String, password: String, url: String}}
 */
BaseService.prototype.getCredentials = function() {
  return {
    username: this._options.username,
    password: this._options.password,
    url: this._options.url
  };
};

module.exports = BaseService;
