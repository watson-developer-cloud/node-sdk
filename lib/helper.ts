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

import { fileType } from 'file-type';
import { isReadable } from 'isstream';
import { basename } from 'path';
import { lookup } from 'mime-types';

// exported interfaces
export interface FileObject {
  value: ReadableStream | Buffer | string;
  options?: FileOptions;
}

// internal interfaces
interface FileOptions {
  filename?: string;
  contentType?: string;
}

interface FileParamAttributes {
  data: ReadableStream|Buffer|FileObject;
  contentType?: string;
}

interface HasPath extends ReadableStream {
  path?: string|Buffer;
}

// custom type guards
function isFileObject(obj: any): obj is FileObject {
  return obj && obj.hasOwnProperty('value');
}

function isFileParamAttributes(obj: any): obj is FileParamAttributes {
  return obj && obj.hasOwnProperty('data') && obj.hasOwnProperty('contentType');
}

function hasPath(obj: any): obj is HasPath {
  return (
    obj &&
    obj.hasOwnProperty('path') &&
    (typeof obj['path'] === 'string' || Buffer.isBuffer(obj['path']))
  );
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
  if (isReadable(inputData) && hasPath(inputData)) {
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
  } else if (isReadable(fileParams.data) && hasPath(fileParams.data)) {
    // if readable stream with path property
    filename = fileParams.data.path;
  } else if (
    isFileObject(fileParams.data) &&
    isReadable(fileParams.data.value) &&
    hasPath(fileParams.data.value)
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
