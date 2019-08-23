/**
 * (C) Copyright IBM Corp. 2019.
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
 * limitations under the License
 */

import camelcase = require('camelcase');
import extend = require('extend');

/**
 * To adhere to our Node style guideline, we expose lowerCamelCase parameters to the user. However, the
 * service expects different case conventions so we have to serialize the user-provided params. We do this
 * by passing in the user params with the allowed params, looking for the camelcase version of each allowed
 * param, and creating an object with the correct keys.
 *
 * @param {object} options - the user-provided options, with lower camel case parameters
 * @param {string[]} allowedParams - array of the parameter names that the service allows
 * @returns {object}
 */
export function processUserParameters(options: any, allowedParams: string[]): any {
  const processedOptions = {};

  // look for the camelcase version of each parameter - that is what we expose to the user
  allowedParams.forEach(param => {
    const keyName = camelcase(param);
    if (options[keyName] !== undefined) {
      processedOptions[param] = options[keyName];
    }
  });

  return processedOptions;
}

/**
 * This function retrieves an access token and stores it in the
 * request header before calling the callback function.
 *
 * @param {object} options - the internal options of a websocket stream class
 * @param {Function} callback
 */
 export function setAuthorizationHeader(options: any, callback: Function): void {
  // assuming the token manger would fall under property 'tokenManager'
  // this will likely change with the new authenticators anyways
  if (options.tokenManager) {
    options.tokenManager.getToken((err, token) => {
      if (err) {
        return callback(err);
      }
      const authHeader = { authorization: 'Bearer ' + token };
      options.headers = extend(options.headers, authHeader);
      callback(null);
    });
  } else {
    callback(null);
  }
}
