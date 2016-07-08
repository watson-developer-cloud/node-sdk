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

var extend         = require('extend');
var helper         = require('../lib/helper');
var requestFactory = require('../lib/requestwrapper');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function RelationshipExtractionV1Beta(options) {
  BaseService.call(this, options);
}
util.inherits(RelationshipExtractionV1Beta, BaseService);
RelationshipExtractionV1Beta.prototype.name = 'relationship_extraction';
RelationshipExtractionV1Beta.prototype.version = 'v1-beta';
RelationshipExtractionV1Beta.prototype.serviceDefaults = {
  url: 'https://gateway.watsonplatform.net/relationship-extraction-beta/api'
};

RelationshipExtractionV1Beta.prototype.extract = function(_params, callback) {
  var params = extend(this._options, _params);

  var missingParams = helper.getMissingParams(params, ['dataset','text']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/sire/0',
      form : {
        rt: params.format || 'json',
        sid: params.dataset,
        txt: params.text // Change 'text' to 'txt'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = RelationshipExtractionV1Beta;
