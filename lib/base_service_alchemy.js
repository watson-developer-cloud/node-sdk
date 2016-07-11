'use strict';

var util = require('util');
var BaseService = require('./base_service');

/**
 * Variation of BaseService for Alchemy API services (and Visual Recognition v3)
 * @param options
 * @constructor
 */
function BaseServiceAlchemy(options) {
  BaseService.call(this, options);
}
util.inherits(BaseServiceAlchemy, BaseService);

/**
 * Grab the api key and also set the alchemy flag to true so that requestwrapper.js knows to use alchemy-style authentication
 * @todo: check VCAP_SERVICES for an api key
 *
 * @param options
 * @private
 */
BaseServiceAlchemy.prototype.initCredentials = function(options) {
  options.alchemy = true;
  options.api_key = options.apikey || options.api_key;
  if (!options.use_unauthenticated && !options.api_key) {
    throw new Error('Argument error: api_key was not specified');
  }
  return options
};

module.exports = BaseServiceAlchemy;
