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

module.exports = function alchemyErrorFormatter(cb) {
  return function(err, result, response) {
    if (err) {
      cb(err, result);
    } else {
      if (result.status !== 'OK') {
        err = new Error(result.statusInfo || response['headers']['x-alchemyapi-error-msg']);
        err.code = 400;
        err.body = result;
        extend(err, result);
        result = null;
      }
      cb(err, result);
    }
  };
};
