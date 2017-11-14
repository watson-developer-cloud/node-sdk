"use strict";
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
var extend = require("extend");
var requestFactory = require("../lib/requestwrapper");
var helper = require("../lib/helper");
var util = require("util");
var BaseService = require("../lib/base_service");
var GeneratedNaturalLanguageClassifierV1 = /** @class */ (function () {
    /**
     * Construct a GeneratedNaturalLanguageClassifierV1 object.
     *
     * @param {Object} options
     * @constructor
     */
    function GeneratedNaturalLanguageClassifierV1(options) {
        BaseService.call(this, options);
    }
    /*************************
     * naturalLanguageClassifier
     ************************/
    /**
     * Returns label information for the input.
     *
     * The status must be `Available` before you can use the classifier to classify text. Use `Get information about a classifier` to retrieve the status.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.classifier_id - Classifier ID to use.
     * @param {string} params.text - The submitted phrase.
     * @param {Function} [callback] - The callback that handles the response.
     */
    GeneratedNaturalLanguageClassifierV1.prototype.classify = function (params, callback) {
        var requiredParams = ['classifier_id', 'text'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var body = { text: params.text };
        var path = { classifier_id: params.classifier_id };
        var parameters = {
            options: {
                url: '/v1/classifiers/{classifier_id}/classify',
                method: 'POST',
                json: true,
                body: body,
                path: path
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    /**
     * Create classifier.
     *
     * Sends data to create and train a classifier and returns information about the new classifier.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {ReadableStream|Object|Uint8Array} params.metadata - Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier).
     * @param {ReadableStream|Object|Uint8Array} params.training_data - Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html).
     * @param {Function} [callback] - The callback that handles the response.
     */
    GeneratedNaturalLanguageClassifierV1.prototype.createClassifier = function (params, callback) {
        var requiredParams = ['metadata', 'training_data'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var formData = {
            training_metadata: helper.buildRequestFileObject({ data: params.metadata, contentType: 'application/json' }),
            training_data: helper.buildRequestFileObject({ data: params.training_data, contentType: 'text/csv' })
        };
        var parameters = {
            options: {
                url: '/v1/classifiers',
                method: 'POST',
                formData: formData
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'multipart/form-data'
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    /**
     * Delete classifier.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.classifier_id - Classifier ID to delete.
     * @param {Function} [callback] - The callback that handles the response.
     */
    GeneratedNaturalLanguageClassifierV1.prototype.deleteClassifier = function (params, callback) {
        var requiredParams = ['classifier_id'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var path = { classifier_id: params.classifier_id };
        var parameters = {
            options: {
                url: '/v1/classifiers/{classifier_id}',
                method: 'DELETE',
                path: path
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    /**
     * Get information about a classifier.
     *
     * Returns status and other information about a classifier.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.classifier_id - Classifier ID to query.
     * @param {Function} [callback] - The callback that handles the response.
     */
    GeneratedNaturalLanguageClassifierV1.prototype.getClassifier = function (params, callback) {
        var requiredParams = ['classifier_id'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var path = { classifier_id: params.classifier_id };
        var parameters = {
            options: {
                url: '/v1/classifiers/{classifier_id}',
                method: 'GET',
                path: path
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    /**
     * List classifiers.
     *
     * Returns an empty array if no classifiers are available.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {Function} [callback] - The callback that handles the response.
     */
    GeneratedNaturalLanguageClassifierV1.prototype.listClassifiers = function (params, callback) {
        params = params || {};
        if (typeof params === 'function' && !callback) {
            callback = params;
            params = {};
        }
        var parameters = {
            options: {
                url: '/v1/classifiers',
                method: 'GET'
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    GeneratedNaturalLanguageClassifierV1.URL = 'https://gateway.watsonplatform.net/natural-language-classifier/api';
    return GeneratedNaturalLanguageClassifierV1;
}());
util.inherits(GeneratedNaturalLanguageClassifierV1, BaseService);
GeneratedNaturalLanguageClassifierV1.prototype.name = 'natural_language_classifier';
GeneratedNaturalLanguageClassifierV1.prototype.version = 'v1';
module.exports = GeneratedNaturalLanguageClassifierV1;
