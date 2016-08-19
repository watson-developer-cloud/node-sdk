'use strict';

var util = require('util');
var extend = require('extend');
var BaseService = require('./base_service');

/**
 * Variation of BaseService for Alchemy API services (and Visual Recognition v3)
 * @param options
 * @constructor
 * @private
 */
function BaseServiceAlchemy(options) {
  BaseService.call(this, options);
}
util.inherits(BaseServiceAlchemy, BaseService);

/**
 * Grab the api key and also set the alchemy flag to true so that requestwrapper.js knows to use alchemy-style authentication
 *
 * @param options
 * @private
 */
BaseServiceAlchemy.prototype.initCredentials = function(options) {
  options.alchemy = true;
  options.api_key = options.apikey || options.api_key;
  options = extend(
    {},
    this.getCredentialsFromBluemix(this.name), // todo: test if this works
    this.getCredentialsFromEnvironment(this.name),
    options
  );
  if (!options.use_unauthenticated && !options.api_key) {
    throw new Error('Argument error: api_key was not specified');
  }
  return options
};

/**
 * Pulls api_key from SERVICE_NAME_API_KEY env property
 *
 * @param {String} name
 * @returns {{api_key: String|undefined}}
 */
BaseServiceAlchemy.prototype.getCredentialsFromEnvironment = function(name) {
  return {
    api_key: process.env[name.toUpperCase() + '_API_KEY']
  }
};

module.exports = BaseServiceAlchemy;
