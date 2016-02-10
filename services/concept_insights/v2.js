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

var omit = require('object.omit');
var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');

/**
 * Format the ids into a JSON array if is a string array
 * @param  {Array|String} ids the concept identifiers
 * @return {String}     The concept ids as JSON array
 * @private
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

/**
 *
 * @param {string} [somebody=https://gateway.watsonplatform.net/concept-insights/api] The service URL.
 * @param {string} username Username
 * @param {string} password Password
 * @constructor
 */
function ConceptInsights(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/concept-insights/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);

  this.accounts = new ConceptInsightsAccounts(this);
  this.graphs = new ConceptInsightsGraphs(this);
  this.corpora = new ConceptInsightsCorpora(this);
}

function ConceptInsightsAccounts(parent) {
  this._parent = parent;
}

function ConceptInsightsGraphs(parent) {
  this._parent = parent;
}

function ConceptInsightsCorpora(parent) {
  this._parent = parent;
}

/**
 * Retrieves account id for this service instance
 */
ConceptInsightsAccounts.prototype.getAccountsInfo = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2/accounts',
      method: 'GET',
      json: true
    },
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns a list of graphs that the authenticated user has read access to
 */
ConceptInsightsGraphs.prototype.listGraphs = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2/graphs',
      method: 'GET',
      json: true
    },
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the metadata for one concept
 */
ConceptInsightsGraphs.prototype.getConcept = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.id,
      method: 'GET',
      json: true,
      path: params,
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Searches for graph concepts by using partial matches
 */
ConceptInsightsGraphs.prototype.searchConceptByLabel = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.graph + '/label_search',
      method: 'GET',
      qs: omit(params, ['graph']),
      json: true,
      path: params
    },
    requiredParams: ['graph', 'query'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves concepts that are related to a concept
 */
ConceptInsightsGraphs.prototype.getRelatedConcepts = function(params, callback) {
  params = params || {};
  params.concepts = formatConceptIds(params.concepts);

  if (params.concepts === null) {
    callback(new Error('Missing or invalid required parameters: concepts needs to be an array of strings'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2' + params.graph + '/related_concepts',
      method: 'GET',
      qs: omit(params, ['graph']),
      json: true,
      path: params
    },
    requiredParams: ['graph', 'concepts'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Identifies concepts in a piece of text
 */
ConceptInsightsGraphs.prototype.annotateText = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.graph + '/annotate_text',
      method: 'POST',
      qs: omit(params, ['graph', 'text', 'content_type']),
      body: params.text,
      json: false, // prevent transformation of body into JSON
      path: params,
      headers: {
        'content-type': params.content_type ? params.content_type : 'text/plain'
      }
    },
    requiredParams: ['graph', 'text'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns a list of scores that denotes how related a source concept is
 * to a list of individual concepts
 */
ConceptInsightsGraphs.prototype.getRelationScores = function(params, callback) {
  params = params || {};

  params.concepts = formatConceptIds(params.concepts);

  if (params.concepts === null) {
    callback(new Error('Missing or invalid required parameters: concepts needs to be an array of strings'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2' + params.id + '/relation_scores',
      method: 'GET',
      qs: omit(params, ['id']),
      json: true,
      path: params
    },
    requiredParams: ['id', 'concepts'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the available corpora
 */
ConceptInsightsCorpora.prototype.listCorpora = function(params, callback) {
  var path = '/v2/corpora';
  if (params && params.account_id)
    path += '/' + params.account_id;

  var parameters = {
    options: {
      url: path,
      method: 'GET',
      json: true
    },
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get corpus object by id
 */
ConceptInsightsCorpora.prototype.getCorpus = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.corpus,
      method: 'GET',
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates an empty corpus
 */
ConceptInsightsCorpora.prototype.createCorpus = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v2' + params.corpus,
      method: 'PUT',
      json: true,
      body: omit(params, ['corpus']),
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a corpus by id
 */
ConceptInsightsCorpora.prototype.deleteCorpus = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.corpus,
      method: 'DELETE',
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the document ids of a corpus
 */
ConceptInsightsCorpora.prototype.listDocuments = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.corpus + '/documents',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves a document from a corpus
 */
ConceptInsightsCorpora.prototype.getDocument = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.id,
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a document in a corpus
 */
ConceptInsightsCorpora.prototype.createDocument = function(params, callback) {
  var newDocument;

  if (params && params.document) {
    newDocument = params.document;
    delete params.document;
  } else {
    callback(new Error('Missing required parameters: document'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2' + params.id,
      method: 'PUT',
      json: true,
      body: newDocument,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Updated existing document in a corpus
 */
ConceptInsightsCorpora.prototype.updateDocument = function(params, callback) {
  var documentToUpdate;

  if (params && params.document) {
    documentToUpdate = params.document;
  } else {
    callback(new Error('Missing required parameters: document'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2' + params.id,
      method: 'POST',
      json: true,
      body: documentToUpdate,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Deletes a document by ID
 */
ConceptInsightsCorpora.prototype.deleteDocument = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.id,
      method: 'DELETE',
      json: true,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves conceptual view of document (including annotations)
 */
ConceptInsightsCorpora.prototype.getDocumentAnnotations = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.id + '/annotations',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get processing state of a Corpus
 */
ConceptInsightsCorpora.prototype.getCorpusProcessingState = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.corpus + '/processing_state',
      method: 'GET',
      qs: omit(params, ['corpus']),
      json: true,
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get concept statistics regarding a processed Corpus
 */
ConceptInsightsCorpora.prototype.getCorpusStats = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.corpus + '/stats',
      method: 'GET',
      qs: omit(params, ['corpus']),
      json: true,
      path: params
    },
    requiredParams: ['corpus'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a fuzzy search of corpus node labels and concept URIs for some text
 */
ConceptInsightsCorpora.prototype.searchByLabel = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v2' + params.corpus + '/label_search',
      method: 'GET',
      qs: omit(params, ['corpus']),
      json: true,
      path: params
    },
    requiredParams: ['corpus', 'query'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Performs a conceptual search within a corpus
 */
ConceptInsightsCorpora.prototype.getRelatedDocuments = function(params, callback) {
  params = params || {};

  params.ids = formatConceptIds(params.ids);

  if (params.ids === null) {
    callback(new Error('Missing or invalid required parameters: ids needs to be an array of strings'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2' + params.corpus + '/conceptual_search',
      method: 'GET',
      qs: omit(params, ['corpus']),
      json: true,
      path: params
    },
    requiredParams: ['corpus', 'ids'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves concepts that are related to an entire corpus or a specific document
 */
ConceptInsightsCorpora.prototype.getRelatedConcepts = function(params, callback) {
  params = params || {};
  var parameters;
  if (params.hasOwnProperty('id')) {
    parameters = {
      options: {
        url: '/v2' + params.id + '/related_concepts',
        method: 'GET',
        qs: omit(params, ['id']),
        json: true,
        path: params
      },
      requiredParams: ['id'],
      defaultOptions: this._parent._options
    };
  } else {
    parameters = {
      options: {
        url: '/v2' + params.corpus + '/related_concepts',
        method: 'GET',
        qs: omit(params, ['corpus']),
        json: true,
        path: params
      },
      requiredParams: ['corpus'],
      defaultOptions: this._parent._options
    };
  }
  return requestFactory(parameters, callback);
};

/**
 * Returns a list of scores that denotes how related a document or entire corpus
 * is to a list of individual concepts
 */
ConceptInsightsCorpora.prototype.getRelationScores = function(params, callback) {
  params = params || {};

  params.concepts = formatConceptIds(params.concepts);

  if (params.concepts === null) {
    callback(new Error('Missing or invalid required parameter: concepts needs to be an array of strings'));
    return;
  }

  var parameters;
  if (params.hasOwnProperty('id')) {
    parameters = {
      options: {
        url: '/v2' + params.id + '/relation_scores',
        method: 'GET',
        qs: omit(params, ['id']),
        json: true,
        path: params
      },
      requiredParams: ['id', 'concepts'],
      defaultOptions: this._parent._options
    };
  } else {
    parameters = {
      options: {
        url: '/v2' + params.corpus + '/relation_scores',
        method: 'GET',
        qs: omit(params, ['corpus']),
        json: true,
        path: params
      },
      requiredParams: ['corpus', 'concepts'],
      defaultOptions: this._parent._options
    };
  }
  return requestFactory(parameters, callback);
};

/**
 * Retrieves processing state of document
 */
ConceptInsightsCorpora.prototype.getDocumentProcessingState = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2' + params.id + '/processing_state',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['id'],
    defaultOptions: this._parent._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConceptInsights;
