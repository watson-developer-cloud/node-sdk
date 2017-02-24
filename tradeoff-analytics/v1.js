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

const requestFactory = require('../lib/requestwrapper');
const omit = require('object.omit');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 *
 * @param {Object} options
 * @constructor
 */
function TradeoffAnalyticsV1(options) {
  BaseService.call(this, options);
}
util.inherits(TradeoffAnalyticsV1, BaseService);
TradeoffAnalyticsV1.prototype.name = 'tradeoff_analytics';
TradeoffAnalyticsV1.prototype.version = 'v1';
TradeoffAnalyticsV1.URL = 'https://gateway.watsonplatform.net/tradeoff-analytics/api';

/**
 * Returns a dilemma that contains the problem and a resolution.
 * The problem contains a set of options and objectives.
 * The resolution contains a set of optimal options,
 * their analytical characteristics, and representation on a 2D space.
 *
 * @param  {Array}  params.columns List of possible objectives
 * @param  {String} params.subject Name of the decision problem
 * @param  {String} params.options A list of options. Typically, the rows in a
 *                                 table representation of your data
 * @param  {String} params.metadataHeader Value of the x-watson-metadata header to be forwarded
 * 								                        for analytics purposes
 * @param  {String} params.generate_visualization Boolean (default = true). if false, the algorithm
 *                                                will not create the "map" visualization, and will typically run much faster
 * @param  {String} params.find_preferable_options Boolean (default = false). if true the algorithm includes a refined subset of best candidate options
 * that will most likely satisfy the greatest number of users.
 */
TradeoffAnalyticsV1.prototype.dilemmas = function(params, callback) {
  params = params || {};
  const qs = {};
  if (params.find_preferable_options) {
    qs.find_preferable_options = true;
  }
  if (params.generate_visualization === false) {
    qs.generate_visualization = false;
  }
  const parameters = {
    options: {
      method: 'POST',
      url: '/v1/dilemmas',
      body: omit(params, ['metadata_header', 'generate_visualization', 'find_preferable_options']),
      headers: {
        'x-watson-metadata': params.metadata_header
      },
      qs: qs,
      json: true
    },
    requiredParams: ['columns', 'subject', 'options'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Forward events from the Tradeoff Analytics widget to the service
 *
 * @param  {String} params - the array of events to forward to the service
 * @param  {String} params.metadataHeader Value of the x-watson-metadata header to be forwarded
 * 								   for analytics purposes
 */
TradeoffAnalyticsV1.prototype.events = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      method: 'POST',
      url: '/v1/events',
      body: omit(params, ['metadata_header', 'generate_visualization']),
      headers: {
        'x-watson-metadata': params.metadata_header
      },
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = TradeoffAnalyticsV1;
