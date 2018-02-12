/**
 * Copyright 2017 IBM All Rights Reserved.
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

import GeneratedDiscoveryV1 = require('./v1-generated');
import extend = require('extend');
import isStream = require('isstream');

class DiscoveryV1 extends GeneratedDiscoveryV1 {
  static VERSION_DATE_2017_09_01: string = '2017-09-01';
  static VERSION_DATE_2017_08_01: string = '2017-08-01';
  static VERSION_DATE_2017_07_19: string = '2017-07-19';
  static VERSION_DATE_2017_06_25: string = '2017-06-25';
  static VERSION_DATE_2016_12_01: string = '2016-12-01';
  static VERSION_DATE_2017_04_27: string = '2017-04-27';
  static VERSION_DATE_2016_12_15: string = '2016-12-15';

  constructor(options) {
    // For backward compatibility, allow version to be passed in version_date.
    const _options = extend({}, options);
    _options.version = _options.version_date || _options.version;
    super(_options);
  }

  static _ensureFilename(file) {
    // no changes needed for streams created by fs.ReadStream (or similar looking streams)
    if (isStream.isReadable(file) && file.path) {
      return file;
    }

    // next handle request-style value/options objects
    if (
      file &&
      file.hasOwnProperty('value') &&
      file.hasOwnProperty('options')
    ) {
      if (file.options.filename) {
        return file;
      }
      return {
        value: file.value,
        options: extend({ filename: '_' }, file.options)
      };
    }

    // finally, handle all other cases by wrapping them in a request-style value/options object
    return {
      value: file,
      options: {
        filename: '_'
      }
    };
  }

  getEnvironments(params, callback) {
    return super.listEnvironments(params, callback);
  }

  createEnvironment(params, callback) {
    // make sure environments with size 0 can be created
    if (params.size !== 0 && !params.size) {
      params.size = 1;
    }
    return super.createEnvironment(params, callback);
  }

  updateEnvironment(params, callback) {
    return super.updateEnvironment(params, callback);
  }

  updateConfiguration(params, callback) {
    // name is now a required parameter
    // file is now split into conversions, enrichments and normalizations
    const _params = params || {};
    if (_params.file) {
      const { conversions, enrichments, normalizations } = _params.file;
      _params.conversions = conversions;
      _params.enrichments = enrichments;
      _params.normalizations = normalizations;
    }
    _params.name = _params.name || '_';
    return super.updateConfiguration(_params, callback);
  }

  getCollections(params, callback) {
    return super.listCollections(params, callback);
  }

  createCollection(params, callback) {
    // language_code is now called language
    if (params) {
      params.language = params.language || params.language_code || 'en_us';
    }
    return super.createCollection(params, callback);
  }

  updateCollection(params, callback) {
    // collection_name is now called name
    if (params) {
      params.name = params.name || params.collection_name;
    }
    return super.updateCollection(params, callback);
  }

  getCollectionFields(params, callback) {
    // listFields expects an array of collection ids
    if (params && !Array.isArray(params.collection_id)) {
      params.collection_ids = [params.collection_id];
    }
    return super.listFields(params, callback);
  }

  getConfigurations(params, callback) {
    return super.listConfigurations(params, callback);
  }

  createConfiguration(params, callback) {
    // name is now a required parameter
    // file is now split into conversions, enrichments and normalizations
    const _params = params || {};
    if (_params.file) {
      const { conversions, enrichments, normalizations } = _params.file;
      _params.conversions = conversions;
      _params.enrichments = enrichments;
      _params.normalizations = normalizations;
    }
    _params.name = _params.name || '_';
    return super.createConfiguration(_params, callback);
  }

  addJsonDocument(params, callback) {
    const fileParamType: string = typeof params.file;
    if (fileParamType !== 'object') {
      throw new Error(
        `Argument error: params.file must be an object, but got ${fileParamType}.`
      );
    }
    const _params = extend(params, {
      file: {
        value: JSON.stringify(params.file),
        options: {
          filename: '_.json'
        }
      }
    });
    return this.addDocument(_params, callback);
  }

  updateJsonDocument(params, callback) {
    const fileParamType = typeof params.file;
    if (fileParamType !== 'object') {
      throw new Error(
        `Argument error: params.file must be an object, but got ${fileParamType}.`
      );
    }
    const _params = extend(params, {
      file: {
        value: JSON.stringify(params.file),
        options: {
          filename: '_.json'
        }
      }
    });
    return this.updateDocument(_params, callback);
  }

  query(params, callback) {
    let _params = params || {};
    // query and natural_language_query can't both be populated
    if (_params.query && _params.natural_language_query) {
      delete _params.natural_language_query;
    }
    if (_params.return) {
      _params.return_fields = _params.return;
    }
    // passages parameters are now snake case
    Object.keys(_params).forEach(
      key =>
        key.match(/passages\..*/i) &&
        (_params[key.replace('.', '_')] = _params[key])
    );
    return super.query(_params, callback);
  }
}

export = DiscoveryV1;
