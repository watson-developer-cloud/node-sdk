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

const fileType = require('file-type');
const isReadable = require('isstream').isReadable;
const path = require('path');
const mime = require('mime-types');

/**
 * This function retrieves the content type of the input.
 * @param {ReadableStream|Buffer|String} inputData The data to retrieve content type for.
 * @return {String} the content type of the input.
 */
function getContentType(inputData) {
  let contentType = null;
  if (isReadable(inputData)) {
    // if the inputData is a Stream
    const mimeType = mime.lookup(inputData.path);
    contentType = { mime: mimeType || null };
  } else if (Buffer.isBuffer(inputData)) {
    // if the inputData is a Buffer
    contentType = fileType(inputData);
  } else if (typeof inputData == 'string') {
    // if the inputData is a String
    contentType = fileType(Buffer.from(inputData));
  }
  return contentType ? contentType.mime : null;
}

module.exports = {
  stripTrailingSlash: function(url) {
    // Match a forward slash / at the end of the string ($)
    return url.replace(/\/$/, '');
  },
  /**
   * Validates that all required params are provided
   * @param params
   * @param requires
   * @return {Error|null}
   */
  getMissingParams: function(params, requires) {
    let missing;

    if (!requires) {
      return null;
    } else if (!params) {
      missing = requires;
    } else {
      missing = [];

      requires.forEach(function(require) {
        if (!params[require]) {
          missing.push(require);
        }
      });
    }

    return missing.length > 0 ? new Error('Missing required parameters: ' + missing.join(', ')) : null;
  },
  /**
   * Return true if 'text' is html
   * @param  {String}  text The 'text' to analyze
   * @return {Boolean}      true if 'text' has html tags
   */
  isHTML: function(text) {
    return /<[a-z][\s\S]*>/i.test(text);
  },
  /**
   * Returns the first match from formats that is key the params map
   * otherwise null
   * @param  {Object}  params   The parameters
   * @param  {Array}  requires The keys we want to check
   */
  getFormat: function(params, formats) {
    if (!formats || !params) {
      return null;
    }

    for (let i = 0; i < formats.length; i++) {
      if (formats[i] in params) {
        return formats[i];
      }
    }
    return null;
  },
  /**
   * this function builds a `form-data` object for each file parameter
   * @param {Object} fileParams - the file parameter attributes
   * @param {ReadableStream|Object|String|Buffer} fileParams.data - the data content of the file
   * @param {String} fileParams.contentType - the content type of the file
   */
  buildRequestFileObject: function(fileParams) {
    // build filename
    let filename = null;
    if (fileParams.data.options && fileParams.data.value) {
      // if form-data object
      filename = fileParams.data.options.filename;
    } else if (fileParams.data.path) {
      // if fs.createReadStream
      filename = fileParams.data.path;
    } else if (fileParams.data.value && fileParams.data.value.path) {
      filename = fileParams.data.value.path;
    }
    // toString handles the case when path is a buffer
    filename = filename ? path.basename(filename.toString('utf-8')) : null;
    // build contentType
    let contentType = 'application/octet-stream';
    if (fileParams.data.options && fileParams.data.options.contentType) {
      // if form-data object
      contentType = fileParams.data.options.contentType;
    } else if (fileParams.contentType) {
      // for multiple producers, this is either null, or the _content_type parameter
      // for single producers, this is the single content type
      contentType = fileParams.contentType;
    } else {
      // else utilize file-type package
      contentType = getContentType(fileParams.data.value) || getContentType(fileParams.data) || contentType;
    }
    // build value
    let value = fileParams.data.value || fileParams.data;
    if (typeof value === 'string') {
      value = Buffer.from(value);
    }
    return {
      value: value,
      options: {
        filename: filename,
        contentType: contentType
      }
    };
  }
};

module.exports.getContentType = getContentType;
