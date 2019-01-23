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

import axios from 'axios';
import extend = require('extend');
import FormData = require('form-data');
import querystring = require('querystring');
import { PassThrough as readableStream } from 'stream';
import { buildRequestFileObject, getMissingParams, isEmptyObject, isFileParam } from './helper';

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');
const isBrowser = typeof window === 'object';
const globalTransactionId = 'x-global-transaction-id';

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
export function formatErrorIfExists(cb: Function) {
  return (error, response, body) => {
    // eslint-disable-line complexity

    // If we have an error return it.
    if (error) {
      // first ensure that it's an instanceof Error
      if (!(error instanceof Error)) {
        body = error;
        error = new Error(error.message || error.error || error);
        error.body = body;
      }
      if (response && response.headers) {
        error[globalTransactionId] = response.headers[globalTransactionId];
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
      const err = {
        error: response.statusMessage,
        code: response.statusMessage === 'invalid-api-key' ? 401 : 400,
      };
      if (response.headers) {
        err[globalTransactionId] = response.headers[globalTransactionId];
      }
      cb(err, null);
      return;
    }

    // If we have a response and it contains an error
    if (body && (body.error || body.error_code)) {
      // visual recognition sets body.error to a json object with code/description/error_id instead of putting them top-left
      if (typeof body.error === 'object' && body.error.description) {
        const errObj = body.error; // just in case there's a body.error.error...
        Object.keys(body.error).forEach(key => {
          body[key] = body.error[key];
        });
        Object.keys(body.error).forEach(key => {
          body[key] = body.error[key];
        });
        body.error = errObj.description;
      } else if (typeof body.error === 'object' && typeof body.error.error === 'object') {
        // this can happen with, for example, the assistant createSynonym() API
        body.rawError = body.error;
        body.error = JSON.stringify(body.error.error);
      }
      // language translaton returns json with error_code and error_message
      error = new Error(body.error || body.error_message || 'Error Code: ' + body.error_code);
      error.code = body.error_code;
      Object.keys(body).forEach(key => {
        error[key] = body[key];
      });
      body = null;
    }
    // If we still don't have an error and there was an error...
    if (!error && (response.statusCode < 200 || response.statusCode >= 300)) {
      error = new Error(typeof body === 'object' ? JSON.stringify(body) : body);
      error.code = response.statusCode;
      body = null;
    }

    // ensure a more descriptive error message
    if (error && (error.code === 401 || error.code === 403)) {
      error.body = error.message;
      error.message = 'Unauthorized: Access is denied due to invalid credentials.';
    }
    if (error && response && response.headers) {
      error[globalTransactionId] = response.headers[globalTransactionId];
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
export function sendRequest(parameters, _callback) {
  const options = extend(true, {}, parameters.defaultOptions, parameters.options);
  const { path, body, form, formData, qs, method } = options;
  let { url, headers } = options;

  const multipartForm = new FormData();

  // Form params
  if (formData) {
    // Remove keys with undefined/null values
    // Remove empty objects
    // Remove non-valid inputs for buildRequestFileObject,
    // i.e things like {contentType: <contentType>}
    Object.keys(formData).forEach(key => {
      if (formData[key] == null ||
        isEmptyObject(formData[key]) ||
        (formData[key].hasOwnProperty('contentType') && !formData[key].hasOwnProperty('data'))) {
        delete formData[key];
      }
    });
    // Convert file form parameters to request-style objects
    Object.keys(formData).forEach(key => {
      if (formData[key].data != null) {
        formData[key] = buildRequestFileObject(formData[key]);
      }
    });

    // Stringify arrays
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key] = formData[key].join(',');
      }
    });

    // Convert non-file form parameters to strings
    Object.keys(formData).forEach(key => {
      if (!isFileParam(formData[key]) &&
        !Array.isArray(formData[key]) &&
        typeof formData[key] === 'object') {
        (formData[key] = JSON.stringify(formData[key]));
      }
    });

    // build multipart form data
    Object.keys(formData).forEach(key => {
      // handle files differently to maintain options
      if (formData[key].value) {
        multipartForm.append(key, formData[key].value, formData[key].options);
      } else {
        multipartForm.append(key, formData[key]);
      }
    });
  }

  // Path params
  url = parsePath(url, path);

  // Headers
  headers = extend({}, headers);
  if (!isBrowser) {
    headers['User-Agent'] = `${pkg.name}-nodejs-${pkg.version};${headers['User-Agent'] || ''}`;
  }

  // Convert array-valued query params to strings
  if (qs && Object.keys(qs).length > 0) {
    Object.keys(qs).forEach(
      key => Array.isArray(qs[key]) && (qs[key] = qs[key].join(','))
    );
  }

  // Add service default endpoint if options.url start with /
  if (url && url.charAt(0) === '/') {
    url = parameters.defaultOptions.url + url;
  }

  let data = body;

  if (form) {
    data = querystring.stringify(form);
    headers['Content-type'] = 'application/x-www-form-urlencoded';
  }

  if (formData) {
    data = multipartForm;
    // form-data generates headers that MUST be included or the request will fail
    headers = extend(true, {}, headers, multipartForm.getHeaders());
  }

  const axiosObject = {
    url,
    method,
    headers,
    params: qs,
    data,
    responseType: options.responseType || 'json',
    paramsSerializer: params => {
      return querystring.stringify(params);
    }
  };

  axios(axiosObject)
    .then(res => {
      _callback(null, res.data, res);
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        delete error.response.config;
        delete error.response.request;
        _callback(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        _callback(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        _callback(error.message);
      }
    });
}
