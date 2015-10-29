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

var pick           = require('object.pick');
var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');

var concept_decode = {
  'zZzAmpersandzZz'  : '&',
  ' zZzApostrophezZz' : '\'',
  ' zZzAtzZz'         : '@',
  'zZzBackslashzZz'   : '\\',
  ' zZzCloseParenzZz' : ')',
  ' zZzColonzZz'      : ':',
  ' zZzCommazZz'      : ',',
  'zZzCommazZz'       : ',',
  ' zZzDashzZz '      : '-',
  'zZzDollarzZz'      : '$',
  ' zZzEqualszZz '    : '=',
  ' zZzExclamationzZz': '!',
  'zZzHashzZz'        : '#',
  'zZzOpenParenzZz'   : '(',
  'zZzPercentzZz'     : '%',
  ' zZzPeriodzZz'     : '.',
  'zZzPipezZz'        : '|',
  'zZzPluszZz'        : '+',
  'zZzQuestionMarkzZz': '?',
  'zZzQuotezZz'       : '"',
  'zZzSemicolonzZz'   : ';',
  ' zZzSlashzZz'      : '/',
  'zZzSquareClosezZz' : ']',
  'zZzSquareOpenzZz'  : '[',
  'zZzStarzZz'        : '*',
  ' zZzUnderbarzZz'   : '_',
  };

// The concepts are encoded using the concept_decode map
// Create a regular expression to decode them to a human readable form
var decoderRegExp = new RegExp('/'+Object.keys(concept_decode).join('|')+'/','g');

function decodeConcept(encoded_concept) {
  return {
    prevalence: encoded_concept.prevalence,
    result: encoded_concept.result.replace(decoderRegExp,function(word) {
      return concept_decode[word];
    })
  };
}

function responseFormatter(cb) {
  return function(err, result) {
    if (err) {
      cb(err, result);
    }
    else {
      result.return_seeds = result.return_seeds.map(decodeConcept);
      cb(null, result);
    }
  };
}

function ConceptExpansion(options) {
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/concept-expansion-beta/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

ConceptExpansion.prototype.createJob = function(params, callback) {
  var body = extend({}, this._options, params);
  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/upload',
      body: pick(body, ['dataset', 'seeds', 'label']),
      json: true
    },
    requiredParams: ['dataset', 'seeds', 'label'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

ConceptExpansion.prototype.getStatus = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/status',
      json: true,
      qs: params
    },
    requiredParams: ['jobid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


ConceptExpansion.prototype.getResult = function(params, callback) {
  var parameters = {
    options: {
      method: 'PUT',
      url: '/v1/result',
      body: params,
      json: true
    },
    requiredParams: ['jobid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, responseFormatter(callback));
};

ConceptExpansion.prototype.expand = function(params, callback) {
  var self = this;

  return self.createJob(params, function(err, job) {
      if (err)
        return callback(err);

    var processStatus = function(err, _status) {
      if (err)
        return callback(err);

      var status = _status.state;
      //if Awaiting Work or In Flight
      if (status === 'A' || status === 'G') {

        setTimeout(function() {
          self.getStatus(job,processStatus);
        }, params.delay || 4000);

      } else if (status === 'R' ) { // If retrieved
        callback({error: 'retrieved'});
      } else if (status === 'F' ) { // If fail
        callback({error: 'fail'});
      } else if (status === 'D') { // if done
        self.getResult(job, callback);
      } else {
        callback({error:'Unrecognized status: '+status});
      }
    };

    self.getStatus(job,processStatus);
  });
};

module.exports = ConceptExpansion;