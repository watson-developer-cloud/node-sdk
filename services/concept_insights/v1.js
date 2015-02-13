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

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');

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
  var body = params || {},
    path = { user: body.user, corpus: body.corpus };

  delete body.user;
  delete body.corpus;
  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}',
      method: 'PUT',
      json: true,
      body: body,
      path: path
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

/**
 * Retrieves a document from a corpus
 */
ConceptInsights.prototype.updateDocument = function(params, callback) {
  var new_document;

  if (params && params.document) {
    new_document = params.document;
    delete params.document;
  }

  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'POST',
      json: true,
      body: new_document,
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
  var new_document;

  if (params && params.document) {
    new_document = params.document;
    delete params.document;
  }

  var parameters = {
    options: {
      url: '/v1/corpus/{user}/{corpus}/{documentid}',
      method: 'PUT',
      json: true,
      body: new_document,
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
ConceptInsights.prototype.search_concepts_by_label = function(params, callback) {
  var qs = extend({func:'labelSearch'}, params),
    path = { user: qs.user, graph: qs.graph };

  delete qs.user;
  delete qs.graph;

  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'GET',
      qs: qs,
      json: true,
      path: path
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
  var qs = extend({func:'related'}, params),
    path = { user: qs.user, graph: qs.graph };

  delete qs.user;
  delete qs.graph;

  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'GET',
      qs: qs,
      json: true,
      path: path
    },
    requiredParams: ['user', 'graph', 'concepts'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Identifies concepts in a piece of text
 */
ConceptInsights.prototype.annotateText = function(_params, callback) {
  var params = _params || {},
    qs = {func:'annotateText'},
    path = { user: params.user, graph: params.graph },
    body = params.text;

  var parameters = {
    options: {
      url: '/v1/graph/{user}/{graph}',
      method: 'POST',
      qs: qs,
      body: body,
      json: true,
      path: path
    },
    requiredParams: ['user', 'graph'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a fuzzy search of corpus node labels and concept URIs for some text
 */
ConceptInsights.prototype.labelSearch = function(params, callback) {
  var qs = extend({func:'labelSearch'}, params),
    path = { user: qs.user, corpus: qs.corpus };

  delete qs.user;
  delete qs.corpus;

  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}',
      method: 'GET',
      qs: qs,
      json: true,
      path: path
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
  var qs = extend({func:'semanticSearch'}, params),
    path = { user: qs.user, corpus: qs.corpus };

  delete qs.user;
  delete qs.corpus;

  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}',
      method: 'GET',
      qs: qs,
      json: true,
      path: path
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
ConceptInsights.prototype.getDocumentToConceptScore = function(_params, callback) {
  var params = _params || {},
  qs = {func:'relScore', dest: params.dest};

  delete params.dest;

  var parameters = {
    options: {
      url: '/v1/searchable/{user}/{corpus}/{documentid}',
      method: 'GET',
      qs: qs,
      json: true,
      path: params
    },
    requiredParams: ['user', 'corpus', 'documentid', 'dest'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConceptInsights;


