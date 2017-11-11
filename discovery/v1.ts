import GeneratedDiscoveryV1 = require('./v1-generated');
import extend = require('extend');
import isStream = require('isstream');

class DiscoveryV1 extends GeneratedDiscoveryV1 {
  static VERSION_DATE_2017_08_01: string = '2017-08-01';
  static VERSION_DATE_2017_04_27: string = '2017-04-27';
  static VERSION_DATE_2016_12_15: string = '2016-12-15';

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
    if (params.size !== 0 && !params.size) {
      params.size = 1;
    }
    return super.createEnvironment(params, callback);
  }

  updateEnvironment(params, callback) {
    // Should work as is
    return super.updateEnvironment(params, callback);
  }

  updateConfiguration(params, callback) {
    // file is now called configuration
    if (params && params.file) {
      params.configuration = params.file;
    }
    const _params = extend({ name: '_' }, params);
    return super.updateConfiguration(_params, callback);
  }

  getCollections(params, callback) {
    return super.listCollections(params, callback);
  }

  createCollection(params, callback) {
    const language = params.language_code || 'en_us';
    const _params = extend({ language: language }, params);
    return super.createCollection(_params, callback);
  }

  updateCollection(params, callback) {
    // collection_name is now called name
    // language_code is no longer a parameter
    if (params && params.name) {
      params.collection_name = params.name;
    }
    const language = params.language_code || 'en_us';
    const _params = extend({ language: language }, params);
    return super.updateCollection(_params, callback);
  }

  getCollectionFields(params, callback) {
    if (!Array.isArray(params.collection_id)) {
      params.collection_id = [params.collection_id];
    }
    const _params = extend(params, { collection_ids: params.collection_id });
    return super.listFields(_params, callback);
  }

  addDocument(params, callback) {
    if (params.metadata && typeof params.metadata === 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    const _params = extend({}, params);
    return super.addDocument(_params, callback);
  }

  getConfigurations(params, callback) {
    return super.listConfigurations(params, callback);
  }

  createConfiguration(params, callback) {
    const _params = extend({ name: '_' }, params);
    return super.createConfiguration(_params, callback);
  }

  addJsonDocument(params, callback) {
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

  updateDocument(params, callback) {
    if (params.metadata && typeof params.metadata === 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    const _params = extend({}, params);
    super.addDocument(_params, callback);
  }

  query(params, callback) {
    let _params = {};
    if (params.collection_id) {
      params.collection_ids = !Array.isArray(params.collection_id)
        ? [params.collection_id]
        : params.collection_id;
    }
    // query and natural_language_query can't both be populated
    if (params.query && params.natural_language_query) {
      delete params.natural_language_query;
    }
    if (params.return) {
      params.return_fields = params.return.split(',');
    }
    if (params.passages && Object.keys(params.passages).length > 0) {
      Object.keys(params.passages).forEach(function(key) {
        params[`passages_${key}`] = params.passages[key];
      });
    }
    _params = extend({}, params);
    return super.query(<any>_params, callback);
  }
}

export = DiscoveryV1;
