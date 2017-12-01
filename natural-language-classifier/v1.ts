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

import GeneratedNaturalLanguageClassifierV1 = require('./v1-generated');
import toCSV = require('../lib/json-training-to-csv');
import isStream = require('isstream');
import omit = require('object.omit');
import { getMissingParams } from '../lib/helper';

class NaturalLanguageClassifierV1 extends GeneratedNaturalLanguageClassifierV1 {
  constructor(options) {
    super(options);
  }

  create(params, callback) {
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

      const _params: GeneratedNaturalLanguageClassifierV1.CreateClassifierParams = {
        metadata: Buffer.from(
          JSON.stringify(omit(params, ['training_data'])),
          'utf8'
        ),
        training_data: csv
      };

      return super.createClassifier(_params, callback);
    });
  }

  classify(params, callback) {
    const _params = params || {};
    if (!_params.classifier_id) {
      _params.classifier_id = _params.classifier;
    }
    return super.classify(_params, callback);
  }

  status(params, callback) {
    const _params = params || {};
    if (!_params.classifier_id) {
      _params.classifier_id = _params.classifier;
    }
    return super.getClassifier(_params, callback);
  }

  list(params, callback) {
    return super.listClassifiers(params, callback);
  }

  remove(params, callback) {
    const _params = params || {};
    if (!_params.classifier_id) {
      _params.classifier_id = _params.classifier;
    }
    return super.deleteClassifier(_params, callback);
  }
}

export = NaturalLanguageClassifierV1;
