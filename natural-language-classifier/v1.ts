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

import Request = require('request'); 
import extend = require('extend');
import requestFactory = require('../lib/requestwrapper');
import helper = require('../lib/helper');
import util = require('util');
import BaseService = require('../lib/base_service');
import GeneratedNaturalLanguageClassifierV1 = require('./v1-generated');

class NaturalLanguageClassifierV1 extends GeneratedNaturalLanguageClassifierV1 {

  constructor(options) {
    super(options);
  }

  /**
   * Creates a classifier
   */
  create(params, callback) {
    // TODO
  }

  /**
   * Returns the classification information for a classifier on a phrase
   */
  classify(params, callback) {
    params = params || {};
    if (!params.classifier_id) {
      params.classifier_id = params.classifier;
    }
    return super.classify(params, callback);
  }

  /**
   * Returns the training status of the classifier
   */
  status(params, callback) {
    params = params || {};
    if (!params.classifier_id) {
      params.classifier_id = params.classifier;
    }
    return super.getClassifier(params, callback);
  }

  /**
   * Retrieves the list of classifiers for the user
   */
   list(params, callback) {
     params = params || {};
     return super.listClassifiers(params, callback);
   }

  /**
   * Deletes a classifier
   */
  remove(params, callback) {
    params = params || {};
    if (!params.classifier_id) {
      params.classifier_id = params.classifier;
    }
    return super.deleteClassifier(params, callback);
  }
}

export = NaturalLanguageClassifierV1;