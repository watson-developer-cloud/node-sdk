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

import fileType = require('file-type');
import extend = require('extend');
import { basename } from 'path';
import { lookup } from 'mime-types';
import { isReadable } from 'isstream';

// exported interfaces
export interface FileObject {
  value: ReadableStream | Buffer | string;
  options?: FileOptions;
}

// internal interfaces
export interface FileOptions {
  filename?: string;
  contentType?: string;
}

export interface FileParamAttributes {
  data: ReadableStream | Buffer | FileObject;
  contentType: string;
}

export interface FileStream extends ReadableStream {
  path: string | Buffer;
}

// custom type guards
function isFileObject(obj: any): obj is FileObject {
  return obj && obj.value;
}

function isFileStream(obj: any): obj is FileStream {
  return obj && isReadable(obj) && obj.path;
}

export function isFileParam(obj: any): boolean {
  return (
    obj &&
    (isReadable(obj) || Buffer.isBuffer(obj) || isFileObject(obj) || obj.data)
  );
}

export function isEmptyObject(obj: any): boolean {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * This function retrieves the content type of the input.
 * @param {ReadableStream|Buffer|string} inputData - The data to retrieve content type for.
 * @returns {string} the content type of the input.
 */
export function getContentType(
  inputData: ReadableStream | Buffer | string
): string {
  let contentType = null;
  if (isFileStream(inputData)) {
    // if the inputData is a ReadableStream
    const mimeType = lookup(inputData.path);
    contentType = { mime: mimeType || null };
  } else if (Buffer.isBuffer(inputData)) {
    // if the inputData is a Buffer
    contentType = fileType(inputData);
  } else if (typeof inputData == 'string') {
    // if the inputData is a string
    contentType = fileType(Buffer.from(inputData));
  }
  return contentType ? contentType.mime : null;
}

/**
 * 
 * @param {string} url - the url string.
 * @returns {string}
 */
export function stripTrailingSlash(url: string): string {
  // Match a forward slash / at the end of the string ($)
  return url.replace(/\/$/, '');
}

/**
 * Validates that all required params are provided
 * @param params - the method parameters.
 * @param requires - the required parameter names.
 * @returns {Error|null}
 */
export function getMissingParams(
  params: { [key: string]: any },
  requires: string[]
): string[] | Error {
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
  return missing.length > 0
    ? new Error('Missing required parameters: ' + missing.join(', '))
    : null;
}

/**
   * Return true if 'text' is html
   * @param  {string} text - The 'text' to analyze
   * @returns {boolean} true if 'text' has html tags
   */
export function isHTML(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

/**
 * Returns the first match from formats that is key the params map
 * otherwise null
 * @param  {Object} params - The parameters.
 * @param  {string[]} requires - The keys we want to check
 * @returns {string|null}
 *  */
export function getFormat(
  params: { [key: string]: any },
  formats: string[]
): string {
  if (!formats || !params) {
    return null;
  }
  for (let i = 0; i < formats.length; i++) {
    if (formats[i] in params) {
      return formats[i];
    }
  }
  return null;
}

/**
 * this function builds a `form-data` object for each file parameter
 * @param {FileParamAttributes} fileParams - the file parameter attributes
 * @param {ReadableStream|Buffer|FileObject} fileParams.data - the data content of the file
 * @param {string} fileParams.contentType - the content type of the file
 * @returns {FileObject}
 */
export function buildRequestFileObject(
  fileParams: FileParamAttributes
): FileObject {
  // build filename
  let filename: string | Buffer = null;
  if (
    isFileObject(fileParams.data) &&
    fileParams.data.options &&
    fileParams.data.value
  ) {
    // if FileObject with value and options
    filename = fileParams.data.options.filename;
  } else if (isFileStream(fileParams.data)) {
    // if readable stream with path property
    filename = fileParams.data.path;
  } else if (
    isFileObject(fileParams.data) &&
    isFileStream(fileParams.data.value)
  ) {
    // if FileObject with stream value
    filename = fileParams.data.value.path;
  }
  // toString handles the case when path is a buffer
  filename = filename ? basename(filename.toString()) : null;

  // build contentType
  let contentType: string = 'application/octet-stream';
  if (
    isFileObject(fileParams.data) &&
    fileParams.data.options &&
    fileParams.data.options.contentType
  ) {
    // if form-data object
    contentType = fileParams.data.options.contentType;
  } else if (fileParams.contentType) {
    // for multiple producers, this is either null, or the _content_type parameter
    // for single producers, this is the single content type
    contentType = fileParams.contentType;
  } else {
    // else utilize file-type package
    if (isFileObject(fileParams.data)) {
      contentType = getContentType(fileParams.data.value) || contentType;
    } else {
      contentType = getContentType(fileParams.data) || contentType;
    }
  }

  // build value
  let value: ReadableStream | Buffer | string = isFileObject(fileParams.data)
    ? fileParams.data.value
    : fileParams.data;
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

/**
 * this function converts an object's keys to lower case
 * @param {Object} headers - the header parameters
 * @returns {Object}
 */
export function toLowerKeys(obj: Object): Object {
  let _obj = {};
  if (obj) {
    _obj = extend(
      {},
      ...Object.keys(obj).map(key => ({
        [key.toLowerCase()]: obj[key]
      }))
    );
  }
  return _obj;
}
