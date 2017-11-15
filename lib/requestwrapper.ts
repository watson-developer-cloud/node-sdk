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

import * as extend from 'extend';
import * as request from 'request';
import * as isStream from 'isstream';
import { getMissingParams, isFileObject } from './helper';
import { PassThrough as readableStream } from 'stream';
import { readFileSync } from 'fs';
import { join } from 'path';

const pkgPath = join(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath).toString('utf-8'));
const isBrowser = typeof window === 'object';

/**
 * @private
 * @param {string} path
 * @param {Object} params
 * @returns {string}
 */
function parsePath(path: string, params: Object): string {
  if (!path || !params) {
    return path;
  }
  return Object.keys(params).reduce((parsedPath, param) => {
    const value = encodeURIComponent(params[param]);
    return parsedPath.replace(new RegExp(`{${param}}`), value);
  }, path);
}

/**
 * Check if the service/request have error and try to format them.
 * @param  {Function} cb the request callback
 * @private
 * @returns {request.RequestCallback}
 */
function formatErrorIfExists(cb: Function): request.RequestCallback {
  return function(error, response, body) {
    // eslint-disable-line complexity

    // If we have an error return it.
    if (error) {
      // first ensure that it's an instanceof Error
      if (!(error instanceof Error)) {
        body = error;
        error = new Error(error.message || error.error || error);
        error.body = body;
      }
      cb(error, body, response);
      return;
    }

    try {
      // in most cases, request will have already parsed the body as JSON
      body = JSON.parse(body);
    } catch (e) {
      // if it fails, just return the body as-is
    }

    // for api-key services
    if (response.statusMessage === 'invalid-api-key') {
      cb(
        {
          error: response.statusMessage,
          code: response.statusMessage === 'invalid-api-key' ? 401 : 400
        },
        null
      );
      return;
    }

    // If we have a response and it contains an error
    if (body && (body.error || body.error_code)) {
      // visual recognition sets body.error to a json object with code/description/error_id instead of putting them top-left
      if (typeof body.error === 'object' && body.error.description) {
        const errObj = body.error; // just in case there's a body.error.error...
        Object.keys(body.error).forEach(function(key) {
          body[key] = body.error[key];
        });
        body.error = errObj.description;
      } else if (
        typeof body.error == 'object' &&
        typeof body.error.error == 'object'
      ) {
        // this can happen with, for example, the conversation createSynonym() API
        body.rawError = body.error;
        body.error = JSON.stringify(body.error.error); //
      }
      // language translaton returns json with error_code and error_message
      error = new Error(
        body.error || body.error_message || 'Error Code: ' + body.error_code
      );
      error.code = body.error_code;
      Object.keys(body).forEach(function(key) {
        error[key] = body[key];
      });
      body = null;
    }

    // If we still don't have an error and there was an error...
    if (!error && (response.statusCode < 200 || response.statusCode >= 300)) {
      // The JSON stringify for the error below is for the Dialog service
      // It stringifies "[object Object]" into the correct error (PR #445)
      error = new Error(typeof body == 'object' ? JSON.stringify(body) : body);
      error.code = response.statusCode;
      if (error.code === 401 || error.code === 403) {
        error.body = error.message;
        error.message =
          'Unauthorized: Access is denied due to invalid credentials.';
      }
      body = null;
    }
    cb(error, body, response);
    return;
  };
}

/**
 * Creates the request.
 * 1. Merge default options with user provided options
 * 2. Checks for missing parameters
 * 3. Encode path and query parameters
 * 4. Call the api
 * @private
 * @returns {ReadableStream|undefined}
 * @throws {Error}
 */
export function createRequest(parameters, _callback) {
  let missingParams = null;
  const options = extend(
    true,
    {},
    parameters.defaultOptions,
    parameters.options
  );
  const path = options.path;
  const body = options.body; // application/json or text/plain
  const form = options.form; // application/x-www-form-urlencoded
  const formData = options.formData; // application/x-www-form-urlencoded
  const qs = options.qs; // Query parameters

  // Provide a default callback if it doesn't exists
  const callback =
    typeof _callback === 'function' ? _callback /* no op */ : function() {};

  // Missing parameters
  if (parameters.options.requiredParams) {
    // eslint-disable-next-line no-console
    console.warn(
      new Error(
        'requiredParams set on parameters.options - it should be set directly on parameters'
      )
    );
  }

  missingParams = getMissingParams(
    parameters.originalParams || extend({}, qs, body, form, formData, path),
    parameters.requiredParams
  );

  if (missingParams) {
    if (typeof _callback === 'function') {
      return callback(missingParams);
    } else {
      const errorStream = new readableStream();
      setTimeout(function() {
        errorStream.emit('error', missingParams);
      }, 0);
      return errorStream;
    }
  }

  // Form params
  if (formData) {
    // Remove keys with undefined/null values
    Object.keys(formData).forEach(key => {
      formData[key] == null && delete formData[key];
    });
    // Convert non-file form parameters to strings
    Object.keys(formData).forEach(key => {
      // Make sure it's not a file
      if (
        !isStream(formData[key]) &&
        !Buffer.isBuffer(formData[key]) &&
        !isFileObject(formData[key])
      ) {
        formData[key] =
          typeof formData[key] === 'object'
            ? JSON.stringify(formData[key])
            : formData[key];
      }
    });
  }

  // Path params
  options.url = parsePath(options.url, path);
  delete options.path;

  // Headers
  options.headers = extend({}, options.headers);
  if (!isBrowser) {
    options.headers['User-Agent'] = pkg.name + '-nodejs-' + pkg.version;
  }

  // Query params
  if (options.qs && Object.keys(options.qs).length > 0) {
    options.useQuerystring = true;
  }

  // Add service default endpoint if options.url start with /
  if (options.url.charAt(0) === '/') {
    options.url = parameters.defaultOptions.url + options.url;
  }

  // Compression support
  options.gzip = true;

  return request(options, formatErrorIfExists(callback));
}
