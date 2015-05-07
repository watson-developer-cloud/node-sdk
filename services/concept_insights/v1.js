/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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
var omit           = require('object.omit');
var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');

/**
 * Format the ids into a JSON array if is a string array
 * @param  {Array or string} ids the concept identifiers
 * @return {String}     The concept ids as JSON array
 */
function formatConceptIds(ids) {
  // Initially, we expected the user to supply JSON.stringify'd ids.
  // Now we expect an array of strings that we'll JSON.stringify our self.
  // We still support the old version for backwards compatibility,
  // BUT we don't want to accept any old string, only a valid JSON array,
  // so we parse and check it to be sure.

  if (!Array.isArray(ids)) {
    try {
      ids = JSON.parse(ids);
    } catch (ex) {
      // if it wasn't valid JSON, then it still won't be an array and
      // we'll throw an error when we check that in a couple of lines
    }
    if (!Array.isArray(ids)) {
      return null;
    }
  }
  return JSON.stringify(ids);
}

function ConceptInsights(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/concept-insights-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Retrieves the available corpora
 */
ConceptInsights.prototype.getCorpus = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/corpus',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a corpus by id
 */
ConceptInsights.prototype.deleteCorpus = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}',
      method: 'DELETE',
      path: params
    },
    requiredParams: ['user', 'corpus'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the documents of a corpus
 */
ConceptInsights.prototype.getDocumentIds = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates an empty corpus
 */
ConceptInsights.prototype.createCorpus = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}',
      method: 'PUT',
      json: true,
      body: omit(params, ['user', 'corpus']),
      path: params
    },
    requiredParams: ['user', 'corpus'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a document by ID
 */
ConceptInsights.prototype.deleteDocument = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'DELETE',
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves a document from a corpus
 */
ConceptInsights.prototype.getDocument = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


ConceptInsights.prototype.updateDocument = function(params, callback) {
  var documentToUpdate;

  if (params && params.document) {
    documentToUpdate = params.document;
  } else {
    callback(new Error('Missing required parameters: document'));
  }

  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'POST',
      json: true,
      body: documentToUpdate,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a document in a corpus
 */
ConceptInsights.prototype.createDocument = function(params, callback) {
  var newDocument;

  if (params && params.document) {
    newDocument = params.document;
    delete params.document;
  } else {
    callback(new Error('Missing required parameters: document'));
  }

  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'PUT',
      json: true,
      body: newDocument,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the metadata for multiple concepts
 */
ConceptInsights.prototype.getConceptsMetadata = function(params, callback) {
  params = params || {};
  params.ids = formatConceptIds(params.ids);

  if (params.ids === null) {
    callback(new Error('Missing or invalid required parameters: ids needs to be an array of strings'));
  }

  var parameters = {
    options: {
      url: '/v1/graph',
      method: 'GET',
      json: true,
      qs: extend({func: 'minfo'}, params)
    },
    requiredParams: ['ids'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Searches for graph concepts by using partial matches
 */
ConceptInsights.prototype.searchConceptByLabel = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'GET',
      qs: extend({func:'labelSearch'}, omit(params, ['user', 'graph'])),
      json: true,
      path: params
    },
    requiredParams: ['user', 'graph', 'label'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves concepts that are related to a concept
 */
ConceptInsights.prototype.getRelatedConcept = function(params, callback) {
  params = params || {};
  params.concepts = formatConceptIds(params.concepts);

  if (params.concepts === null) {
    callback(new Error('Missing or invalid required parameters: concepts needs to be an array of strings'));
  }

  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'GET',
      qs: extend({func:'related'}, omit(params, ['user', 'graph'])),
      json: true,
      path: params
    },
    requiredParams: ['user', 'graph', 'concepts'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Identifies concepts in a piece of text
 */
ConceptInsights.prototype.annotateText = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'POST',
      qs: extend({func:'annotateText'}, omit(params, ['user', 'graph', 'text'])),
      body: params.text,
      json: true,
      path: params
    },
    requiredParams: ['user', 'graph', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a fuzzy search of corpus node labels and concept URIs for some text
 */
ConceptInsights.prototype.labelSearch = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}',
      method: 'GET',
      qs: extend({func:'labelSearch'}, omit(params, ['user', 'corpus'])),
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'query'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a conceptual search within a corpus
 */
ConceptInsights.prototype.semanticSearch = function(params, callback) {
  params = params || {};
  params.ids = formatConceptIds(params.ids);

  if (params.ids === null) {
    callback(new Error('Missing or invalid required parameters: ids needs to be an array of strings'));
  }

  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}',
      method: 'GET',
      qs: extend({func:'semanticSearch'}, omit(params, ['user', 'corpus'])),
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'ids'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a conceptual search within a corpus
 */
ConceptInsights.prototype.getDocumentState = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}/{documentid}',
      method: 'GET',
      qs: {func:'getState'},
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns a score that denotes how related a document is to a concept
 */
ConceptInsights.prototype.getDocumentToConceptScore = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}/{documentid}',
      method: 'GET',
      qs: extend({func:'relScore'}, pick(params, ['dest'])),
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid', 'dest'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConceptInsights;


