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
var requestFactory = require('../../lib/requestwrapper');
var isStream       = require('isstream');
var pick           = require('object.pick');
var omit           = require('object.omit');

function DocumentConversion(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/document-conversion-experimental/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}


DocumentConversion.prototype.conversion_target = {
  ANSWER_UNITS: 'ANSWER_UNITS',
  NORMALIZED_HTML: 'NORMALIZED_HTML',
  NORMALIZED_TEXT: 'NORMALIZED_TEXT'
};


DocumentConversion.prototype.job_status = {
  SUBMITTED: 'SUBMITTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
  CANCELLED: 'CANCELLED'
};

/**
 * Gets a list of existing batches.
 *
 * todo: make working with tokens / pagination easier
 *
 * @param {Number} [params.limit] limit the number of results returned
 * @param {String} [params.token] for pagination (see the `next` link in the `links` section of the response)
 * @param {String} [params.name] filter the results to only the one batch with the given name. If multiple batches share the same name, this will only return the first one.
 * @param {Date|string} [params.since]: filter the results to only those newer than this date. Date object or ISO 8601-formatted string
 */
DocumentConversion.prototype.getBatches = function(params, callback) {
  params = params || {};
  if (params.since && params.since instanceof Date) {
    params.since = params.since.toISOString();
  }
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/batches',
      qs: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a new batch
 *
 * @param {String} [params.name] optional name for the batch. Should be unique
 * @param {Array<Object>} [params.properties] optional list of properties. Each one should be an object with the keys "name" and "value" and string values for each key.
 */
DocumentConversion.prototype.createBatch = function(params, callback) {
  params = params || {};

  if (params.name === '') {
    callback(new Error('Batch name may not be blank'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/batches',
      body: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Gets an existing batch
 *
 * @param {String} batch_id
 */
DocumentConversion.prototype.getBatch = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/batches/{batch_id}',
      path: params,
      json: true
    },
    requiredParams:['batch_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Updates an existing batch
 * @param {String} batch_id the batch identifier
 *
 */
DocumentConversion.prototype.updateBatch = function(params, callback) {
  var parameters = {
    options: {
      method: 'PUT',
      url: '/v1/batches/{batch_id}',
      body: omit(params,['batch_id']),
      path: pick(params,['batch_id']),
      json: true
    },
    requiredParams:['batch_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets a list of existing documents in the batch
 *
 * @param {String} batch_id the batch identifier
 */
DocumentConversion.prototype.getBatchDocuments = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/batches/{batch_id}/documents',
      qs: omit(params,['batch_id']),
      path: pick(params,['batch_id']),
      json: true
    },
    requiredParams: ['batch_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


function fixupContentType(params) {
  if (params.file && params.file.path && /.html?$/.test(params.file.path)) {
    params.file = {
      value: params.file,
      options: {
        contentType: 'text/html; charset=utf-8'
      }
    };
  }
}

/**
 * One-off convert an attached document OR convert a previously uploaded document by ID
 *
 * To convert a previously uploaded document, set params.document_id
 *
 * @param  {Object} params.conversion_target Must be set to one of ['ANSWER_UNITS', 'NORMALIZED_HTML', 'NORMALIZED_TEXT']
 * @param  {Object} [params.document_id] Id of previously uploaded document to convert
 * @param  {ReadableStream} [params.file] The document file to convert.
 */
DocumentConversion.prototype.convert = function(params, callback) {
  params = params || {};
  if (!params.conversion_target || !DocumentConversion.prototype.conversion_target[params.conversion_target]) {
    var keys = Object.keys(DocumentConversion.prototype.conversion_target);
    var values = keys.map(function(v) { return DocumentConversion.prototype.conversion_target[v]; });

    callback(new Error('Missing required parameters: conversion_target. Possible values are: ' + values.join(', ')));
    return;
  }

  if (!params.file && !params.document_id) {
    callback(new Error('Missing required parameters: either params.file or params.document_id must be specified'));
    return;
  }

  if (params.file && !isStream(params.file) && !params.file.value) {
    callback(new Error('Missing required parameters: file is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/convert_document',
      json: true
    },
    defaultOptions: this._options
  };

  // send the parameters in the body or as formData depending on the request
  if (params.file) {
    fixupContentType(params);
    parameters.options.formData = {
      file: params.file,
      config: {
        value: JSON.stringify(omit(params,['file'])),
        options: {
          contentType: 'application/json; charset=utf-8'
        }
      }
    };
  } else {
    parameters.options.body = params;
  }

  return requestFactory(parameters, callback);
};


/**
 * Upload a document for later conversion
 *
 * @param  {ReadableStream} params.file The document file to convert.
 */
DocumentConversion.prototype.uploadDocument = function(params, callback) {
  params = params || {};

  if (!params.file) {
    callback(new Error('Missing required parameter: file'));
    return;
  }

  if (!isStream(params.file) && !params.file.value) {
    callback(new Error('file is not a standard Node.js Stream'));
    return;
  }

  fixupContentType(params);

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/documents',
      formData: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};



/**
 * Retrieve a list of all previously uploaded documents
 *
 * todo: make working with tokens / pagination easier
 *
 * @param {Number} [params.limit] limit the number of results returned
 * @param {String} [params.token] for pagination (see the `next` link in the `links` section of the response)
 * @param {String} [params.name] filter the results to only documents with the given name.
 */
DocumentConversion.prototype.getDocuments = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/documents',
      qs: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieve a previously uploaded document
 *
 * @param  {String} params.id The ID returned when the document was uploaded
 */
DocumentConversion.prototype.getDocument = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/documents/{id}',
      json: true,
      path: params
    },
    requiredParams:['id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Add a previously uploaded document to a batch
 *
 * @param  {String} params.id The ID returned when the document was uploaded
 */
DocumentConversion.prototype.addDocumentToBatch = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'PUT',
      url: '/v1/batches/{batch_id}/documents/{document_id}',
      json: true
    },
    requiredParams:['batch_id','document_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get the list of documents in a batch
 *
 * todo: make working with tokens / pagination easier
 *
 * @param {Number} [params.limit] limit the number of results returned
 * @param {String} [params.token] for pagination (see the `next` link in the `links` section of the response)
 * @param {Date|string} [params.since]: filter the results to only those newer than this date. Date object or ISO 8601-formatted string
 */
DocumentConversion.prototype.getBatchDocuments = function(params, callback) {
  params = params || {};

  if (params.since && params.since instanceof Date) {
    params.since = params.since.toISOString();
  }

  var parameters = {
    options: {
      method: 'PUT',
      url: '/v1/batches/{batch_id}/documents',
      qs: params,
      json: true
    },
    requiredParams:['batch_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about a document in a batch
 * @param params.batch_id
 * @param params.document_id
 * @param callback
 * @returns {*}
 */
DocumentConversion.prototype.getBatchDocument = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/batches/{batch_id}/documents/{document_id}',
      path: params,
      json: true
    },
    requiredParams:['batch_id', 'document_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a job to convert a batch of documents
 *
 * @param params.name
 * @param params.batch_id
 * @param params.conversion_target
 * @param callback
 */
DocumentConversion.prototype.createJob = function(params, callback) {
  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/jobs',
      body: params,
      json: true
    },
    requiredParams:['name', 'batch_id', 'conversion_target'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Gets a list of existing batches.
 *
 * todo: make working with tokens / pagination easier
 *
 * @param {Number} [params.limit] limit the number of results returned
 * @param {String} [params.token] for pagination (see the `next` link in the `links` section of the response)
 * @param {String} [params.name] filter the results to only the one batch with the given name. If multiple batches share the same name, this will only return the first one.
 * @param {Date|string} [params.since]: filter the results to only those newer than this date. Date object or ISO 8601-formatted string
 * @param {string} [params.status]: filter the results to only those newer than this date. Date object or ISO 8601-formatted string
 */
DocumentConversion.prototype.getJobs = function(params, callback) {
  params = params || {};

  if (params.since && params.since instanceof Date) {
    params.since = params.since.toISOString();
  }

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/jobs',
      qs: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Gets information about a job
 *
 * @param {String} params.job_id
 */
DocumentConversion.prototype.getJob = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/jobs/{job_id}',
      path: params,
      json: true
    },
    requiredParams:['job_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets the job processing log
 *
 * @param {String} params.job_id
 */
DocumentConversion.prototype.getJobLog = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/jobs/{job_id}/log',
      path: params
    },
    requiredParams:['job_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets a collection of generated outputs
 * todo: make working with tokens / pagination easier
 *
 * @param {Number} [params.limit] limit the number of results returned
 * @param {String} [params.token] for pagination (see the `next` link in the `links` section of the response)
 * @param {Date|string} [params.since]: filter the results to only those newer than this date. Date object or ISO 8601-formatted string
 * @param {String} [params.job_id] return only results fro the specified job
 * @param {String} [params.media_type] filter the results to only the given media_type
 */
DocumentConversion.prototype.getOutputs = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/output',
      qs: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets the content of the output
 *
 * @param {String} params.output_id
 */
DocumentConversion.prototype.getOutput = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/output/{output_id}',
      path: params,
      json: true
    },
    requiredParams:['output_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


module.exports = DocumentConversion;
