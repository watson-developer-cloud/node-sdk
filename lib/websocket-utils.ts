/**
 * (C) Copyright IBM Corp. 2019, 2020.
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
    } else if (options[param] !== undefined) {
      // if the user used the service property name, warn them and give them the name to use
      console.warn(`Unrecognized parameter: "${param}". Did you mean "${keyName}"?`);
    }
  });

  return processedOptions;
}

/**
 * Pulls the transaction ID from the connection headers and returns it in a Promise.
 * This function is used by the RecognizeStream and the SynthesizeStream - they both expose
 * a method called `getTransactionId` that relies on this code to read the ID from the
 * connection.
 *
 * @param {object} streamContext - the context (i.e. "this") of the invoking stream class
 * @returns {Promise<string>} - Resolves with the transaction ID as a string
 */
export function extractTransactionId(streamContext: any) {
  return new Promise<string>((resolve, reject) => {
    if (
      streamContext.socket &&
      streamContext.socket._client &&
      streamContext.socket._client.response &&
      streamContext.socket._client.response.headers
    ) {
      resolve(
        (streamContext.socket._client.response.headers['x-global-transaction-id'] as string)
      );
    } else {
      streamContext.on('open', () =>
        resolve(
          (streamContext.socket._client.response.headers['x-global-transaction-id'] as string)
        )
      );
      streamContext.on('error', reject);
    }
  });
}
