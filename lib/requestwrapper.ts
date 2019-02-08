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
import https = require('https');
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
 * Determine if the error is due to bad credentials
 * @private
 * @param {Object} error - error object returned from axios
 * @returns {boolean} true if error is due to authentication
 */
function isAuthenticationError(error: any): boolean {
  let isAuthErr = false;
  const code = error.status;
  const body = error.data;

  // handle specific error from iam service, should be relevant across platforms
  const isIamServiceError = body.context &&
    body.context.url &&
    body.context.url.indexOf('iam') > -1;

  if (code === 401 || code === 403 || isIamServiceError) {
    isAuthErr = true;
  }

  return isAuthErr;
}

/**
 * Format error returned by axios
 * @param  {Function} cb the request callback
 * @private
 * @returns {request.RequestCallback}
 */
export function formatError(axiosError: any) {
  // return an actual error object,
  // but make it flexible so we can add properties like 'body'
  const error: any = new Error();

  // axios specific handling
  if (axiosError.response) {
    axiosError = axiosError.response;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    delete axiosError.config;
    delete axiosError.request;

    error.name = axiosError.statusText;
    error.code = axiosError.status;
    error.message = axiosError.data.error && typeof axiosError.data.error === 'string' 
      ? axiosError.data.error
      : axiosError.statusText;

    // some services bury the useful error message within 'data'
    // adding it to the error under the key 'body' as a string or object
    let errorBody;
    try {
      // try/catch to handle objects with circular references
      errorBody = JSON.stringify(axiosError.data);
    } catch (e) {
      // ignore the error, use the object, and tack on a warning
      errorBody = axiosError.data;
      errorBody.warning = 'body contains circular reference';
    }

    error.body = errorBody;

    // attach headers to error object
    error.headers = axiosError.headers;

    // print a more descriptive error message for auth issues
    if (isAuthenticationError(axiosError)) {
      error.message = 'Access is denied due to invalid credentials.';
    }

  } else if (axiosError.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.message = 'Response not received. Body of error is HTTP ClientRequest object';
    error.body = axiosError.request;

  } else {
    // Something happened in setting up the request that triggered an Error
    error.message = axiosError.message;
  }

  return error;
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
  const { path, body, form, formData, qs, method, rejectUnauthorized } = options;
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
  options.headers = extend({}, options.headers);

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

  // accept gzip encoded responses if Accept-Encoding is not already set
  headers['Accept-Encoding'] = headers['Accept-Encoding'] || 'gzip';

  const requestParams = {
    url,
    method,
    headers,
    params: qs,
    data,
    responseType: options.responseType || 'json',
    paramsSerializer: params => {
      return querystring.stringify(params);
    },
    httpsAgent: new https.Agent({ rejectUnauthorized }),
  };

  axios(requestParams)
    .then(res => {
      _callback(null, res.data, res);
    })
    .catch(error => {
      _callback(formatError(error));
    });
}
