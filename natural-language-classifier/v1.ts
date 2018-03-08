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

import isStream = require('isstream');
import omit = require('object.omit');
import { getMissingParams } from '../lib/helper';
import toCSV = require('../lib/json-training-to-csv');
import GeneratedNaturalLanguageClassifierV1 = require('./v1-generated');

class NaturalLanguageClassifierV1 extends GeneratedNaturalLanguageClassifierV1 {
  constructor(options) {
    super(options);
  }

  create(params, callback) {
    console.warn("WARNING: create() was renamed to createClassifier(). Support for create() will be removed in the next major release");
    if (!params || !params.training_data) {
      callback(new Error('Missing required parameters: training_data'));
      return;
    }

    if (
      !(
        Array.isArray(params.training_data) ||
        typeof params.training_data === 'string' ||
        isStream(params.training_data)
      )
    ) {
      callback(
        new Error('training_data needs to be a String, Array or Stream')
      );
      return;
    }

    toCSV(params.training_data, (err, csv) => {
      if (err) {
        callback(err);
        return;
      }

      const newParams: GeneratedNaturalLanguageClassifierV1.CreateClassifierParams = {
        metadata: Buffer.from(
          JSON.stringify(omit(params, ['training_data'])),
          'utf8'
        ),
        training_data: csv
      };

      return super.createClassifier(newParams, callback);
    });
  }

  classify(params, callback) {
    const newParams = params || {};
    if (!newParams.classifier_id) {
      newParams.classifier_id = newParams.classifier;
    }
    return super.classify(newParams, callback);
  }

  status(params, callback) {
    console.warn("WARNING: status() was renamed to getClassifier(). Support for status() will be removed in the next major release");
    const newParams = params || {};
    if (!newParams.classifier_id) {
      newParams.classifier_id = newParams.classifier;
    }
    return super.getClassifier(newParams, callback);
  }

  list(params, callback) {
    console.warn("WARNING: list() was renamed to listClassifiers(). Support for list() will be removed in the next major release");
    return super.listClassifiers(params, callback);
  }

  remove(params, callback) {
    console.warn("WARNING: remove() was renamed to deleteClassifier(). Support for remove() will be removed in the next major release");
    const newParams = params || {};
    if (!newParams.classifier_id) {
      newParams.classifier_id = newParams.classifier;
    }
    return super.deleteClassifier(newParams, callback);
  }
}

export = NaturalLanguageClassifierV1;
