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
    let _conversions;
    let _enrichments;
    let _normalizations;
    if (params && params.file) {
      _conversions = params.file.conversions;
      _enrichments = params.file.enrichments;
      _normalizations = params.file.normalizations;
    }
    const _params = extend(
      {
        name: '_',
        conversions: _conversions,
        enrichments: _enrichments,
        normalizations: _normalizations
      },
      params
    );
    return super.updateConfiguration(_params, callback);
  }

  getCollections(params, callback) {
    return super.listCollections(params, callback);
  }

  createCollection(params, callback) {
    // language_code is now called language
    const _language = params.language_code || 'en_us';
    const _params = extend({ language: _language }, params);
    return super.createCollection(_params, callback);
  }

  updateCollection(params, callback) {
    // collection_name is now called name
    // language_code is now called language
    let _collection_name: string;
    let _language: string = 'en_us';
    if (params) {
      if (params.name) {
        _collection_name = params.name;
      }
      if (params.language_code) {
        _language = params.language_code;
      }
    }
    const _params = extend(
      { language: _language, name: _collection_name },
      params
    );
    return super.updateCollection(_params, callback);
  }

  getCollectionFields(params, callback) {
    // listFields expects an array of collection ids
    let _collection_id;
    if (params && !Array.isArray(params.collection_id)) {
      _collection_id = [params.collection_id];
    }
    const _params = extend({ collection_ids: _collection_id }, params);
    return super.listFields(_params, callback);
  }

  addDocument(params, callback) {
    // addDocument expects metadata as a string
    let _metadata: string;
    if (params && params.metadata) {
      _metadata =
        typeof params.metadata === 'object'
          ? JSON.stringify(params.metadata)
          : params.metadata;
    }
    const _params = extend(params, { metadata: _metadata });
    return super.addDocument(_params, callback);
  }

  getConfigurations(params, callback) {
    return super.listConfigurations(params, callback);
  }

  createConfiguration(params, callback) {
    // name is now a required parameter
    // file is now split into conversions, enrichments and normalizations
    let _conversions;
    let _enrichments;
    let _normalizations;
    if (params && params.file) {
      _conversions = params.file.conversions;
      _enrichments = params.file.enrichments;
      _normalizations = params.file.normalizations;
    }
    const _params = extend(
      {
        name: '_',
        conversions: _conversions,
        enrichments: _enrichments,
        normalizations: _normalizations
      },
      params
    );
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

  updateDocument(params, callback) {
    // addDocument expects metadata as a string
    let _metadata: string;
    if (params && params.metadata) {
      _metadata =
        typeof params.metadata === 'object'
          ? JSON.stringify(params.metadata)
          : params.metadata;
    }
    const _params = extend(params, { metadata: _metadata });
    super.addDocument(_params, callback);
  }

  query(params, callback) {
    let _params: any = {};
    let _collection_id;
    let _return_fields;
    let _passages;
    if (params.collection_id) {
      _collection_id = !Array.isArray(params.collection_id)
        ? [params.collection_id]
        : params.collection_id;
    }
    // query and natural_language_query can't both be populated
    if (params.query && params.natural_language_query) {
      delete params.natural_language_query;
    }
    if (params.return) {
      _return_fields = params.return.split(',');
    }
    // params.passages is now a boolean with properties passed in
    // indepdently, i.e params.passage_<property_name> etc...
    if (params.passages && Object.keys(params.passages).length > 0) {
      Object.keys(params.passages).forEach(function(key) {
        _passages[`passages_${key}`] = params.passages[key];
      });
    }
    _params = extend(
      {
        collection_ids: _collection_id,
        return_fields: _return_fields
      },
      _passages,
      params
    );
    return super.query(_params, callback);
  }
}

export = DiscoveryV1;
