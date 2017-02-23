'use strict';

const util = require('util');
const extend = require('extend');
const BaseService = require('./base_service');

/**
 * Variation of BaseService for Alchemy API services (and Visual Recognition v3)
 * @param {Object} options
 * @constructor
 * @abstract
 * @private
 */
function BaseServiceAlchemy(options) {
  BaseService.call(this, options);
}
util.inherits(BaseServiceAlchemy, BaseService);

/**
 * Grab the api key
 *
 * @param {Object} options
 * @private
 */
BaseServiceAlchemy.prototype.initCredentials = function(options) {
  options.apikey = options.apikey || options.api_key;
  options = extend(
    {},
    this.getCredentialsFromBluemix('alchemy_api'), // this is the same for all Alchemy* services
    this.getCredentialsFromEnvironment(this.name),
    options
  );
  if (!options.use_unauthenticated) {
    if (!options.apikey) {
      throw new Error('Argument error: api_key was not specified');
    }
    // Per documentation, Alchemy* services use `apikey`, but Visual Recognition uses (`api_key`)
    // (Either will work in most cases, but there are a few exceptions.)
    options.qs = extend({ apikey: options.apikey }, options.qs);
  }
  return options;
};

/**
 * Pulls api_key from SERVICE_NAME_API_KEY env property
 *
 * @param {String} name
 * @return {{api_key: String|undefined}}
 */
BaseServiceAlchemy.prototype.getCredentialsFromEnvironment = function(name) {
  return {
    apikey: process.env[name.toUpperCase() + '_API_KEY'],
    url: process.env[name + '_URL']
  };
};

/**
 * Retrieve this service's credentials - useful for passing to the authorization service
 * @type {BaseService}
 * @return {{username: String, password: String, url: String}}
 */
BaseServiceAlchemy.prototype.getCredentials = function() {
  return {
    apikey: this._options.apikey,
    url: this._options.url
  };
};

module.exports = BaseServiceAlchemy;
