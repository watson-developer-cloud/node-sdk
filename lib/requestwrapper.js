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

var extend      = require('extend');
var request     = require('request');
var pkg         = require('../package.json');
var helper      = require('./helper');
var parseString = require('string');

var isBrowser = typeof window === "object";

function parsePath(path, params) {
  if (!path || !params) {
    return path;
  }
  var escapedParams = {};
  Object.keys(params).forEach(function(value) {
    escapedParams[value] = encodeURIComponent(params[value]);
  });

  return parseString(path).template(escapedParams, '{', '}').s;
}

/**
 * Check if the service/request have error and try to format them.
 * @param  {Function} cb the request callback
 * @private
 */
function formatErrorIfExists(cb) {
  return function(error, response, body) {

    // If we have an error return it.
    if (error) {
      cb(error, body, response);
      return;
    }

    try {
      body = JSON.parse(body);
    } catch (e) {} // eslint-disable-line no-empty

    // If we have a response and it contains an error
    if (body && (body.error || body.error_code)) {
      error = new Error(body.error || 'Error Code: ' + body.error_code);
      error.code = body.error_code;
      Object.keys(body).forEach(function(key) {
        error[key] = body[key];
      });
      body = null;
    }

    // If we still don't have an error and there was an error...
    if (!error && (response.statusCode < 200 || response.statusCode >= 300)) {
      error = new Error(body);
      error.code = response.statusCode;
      if (error.code === 401 || error.code === 403)
        error.body = error.message;
        error.message = 'Unauthorized: Access is denied due to invalid credentials.';
      body = null;
    }
    cb(error, body, response);
  };
}

/**
 * Creates the request.
 * 1. Merge default options with user provided options
 * 2. Checks for missing parameters
 * 3. Encode path and query parameters
 * 4. Call the api
 * @private
 * @return {ReadableStream|undefined}
 */
function createRequest(parameters, callback) {
  var missingParams = null,
    options = extend(true, {}, parameters.defaultOptions, parameters.options),
    path    = options.path,
    body    = options.body, // application/json or text/plain
    form    = options.form, // application/x-www-form-urlencoded
    formData= options.formData, // application/x-www-form-urlencoded
    qs      = options.qs; // Query parameters

  // Provide a default callback if it doesn't exists
  callback = typeof callback === 'function' ? callback : function() { /* no op */};

  // Missing parameters
  missingParams = helper.getMissingParams(extend({}, qs, body, form, formData, path),
    parameters.requiredParams);

  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  // Path params
  options.url = parsePath(options.url, path);
  delete options.path;

  // Headers
  options.headers = extend({}, options.headers);

  if (!isBrowser){
    options.headers['User-Agent'] = pkg.name + '-nodejs-'+ pkg.version;
  }

  // Query params
  if (options.qs && Object.keys(options.qs).length > 0)
  options.useQuerystring = true;


  // Add service default endpoint if options.url start with /
  if(options.url.charAt(0) === '/'){
      options.url = parameters.defaultOptions.url + options.url;
  }

  // Compression support
  options.gzip = true;

  return request(options, formatErrorIfExists(callback));
}

module.exports = createRequest;
