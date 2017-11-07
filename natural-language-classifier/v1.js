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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GeneratedNaturalLanguageClassifierV1 = require("./v1-generated");
var NaturalLanguageClassifierV1 = /** @class */ (function (_super) {
    __extends(NaturalLanguageClassifierV1, _super);
    function NaturalLanguageClassifierV1(options) {
        return _super.call(this, options) || this;
    }
    /**
     * Creates a classifier
     */
    NaturalLanguageClassifierV1.prototype.create = function (params, callback) {
        // TODO
    };
    /**
     * Returns the classification information for a classifier on a phrase
     */
    NaturalLanguageClassifierV1.prototype.classify = function (params, callback) {
        params = params || {};
        if (!params.classifier_id) {
            params.classifier_id = params.classifier;
        }
        return _super.prototype.classify.call(this, params, callback);
    };
    /**
     * Returns the training status of the classifier
     */
    NaturalLanguageClassifierV1.prototype.status = function (params, callback) {
        params = params || {};
        if (!params.classifier_id) {
            params.classifier_id = params.classifier;
        }
        return _super.prototype.getClassifier.call(this, params, callback);
    };
    /**
     * Retrieves the list of classifiers for the user
     */
    NaturalLanguageClassifierV1.prototype.list = function (params, callback) {
        params = params || {};
        return _super.prototype.listClassifiers.call(this, params, callback);
    };
    /**
     * Deletes a classifier
     */
    NaturalLanguageClassifierV1.prototype.remove = function (params, callback) {
        params = params || {};
        if (!params.classifier_id) {
            params.classifier_id = params.classifier;
        }
        return _super.prototype.deleteClassifier.call(this, params, callback);
    };
    return NaturalLanguageClassifierV1;
}(GeneratedNaturalLanguageClassifierV1));
module.exports = NaturalLanguageClassifierV1;
