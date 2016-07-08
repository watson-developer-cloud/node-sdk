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

/**
 * @module watson-developer-cloud
 */
exports.AlchemyDataNewsV1 = require('./alchemy_data_news/v1');
exports.AlchemyLanguageV1 = require('./alchemy_language/v1');
exports.AlchemyVisionV1 = require('./alchemy_vision/v1');

exports.AuthorizationV1 = require('./authorization/v1');

exports.ConceptInsightsV2 = require('./concept_insights/v2');

exports.ConversationV1 = require('./conversation/v1');
exports.ConversationV1Experimental = require('./conversation/v1-experimental');

exports.DialogV1 = require('./dialog/v1');

exports.DocumentConversionV1 = require('./document_conversion/v1');

exports.LanguageTranslatorV2 = require('./language_translator/v2');

exports.NaturalLanguageClassifierV1 = require('./natural_language_classifier/v1');

exports.PersonalityInsightsV2 = require('./personality_insights/v2');

exports.RelationshipExtractionV1Beta = require('./relationship_extraction/v1-beta');

exports.RetrieveAndRankV1 = require('./retrieve_and_rank/v1');

exports.SpeechToTextV1 = require('./speech_to_text/v1');

exports.TextToSpeechV1 = require('./text_to_speech/v1');

exports.ToneAnalyzerV3 = require('./tone_analyzer/v3');

exports.TradeoffAnalyticsV1 = require('./tradeoff_analytics/v1');

exports.VisualRecognitionV3 = require('./visual_recognition/v3');



// adding shim constructors for backwards compatibility

// 2-d map of snake_case service names & version => constructor function
// e.g. servicesByVersion.text_to_speech.v1 === exports.TextToSpeechV1;
var servicesByVersion = {};
Object.keys(exports).forEach(function(key) {
  var Service = exports[key];
  var name = Service.prototype.name;
  var version = Service.prototype.version;
  servicesByVersion[name] = servicesByVersion[name] || {};
  servicesByVersion[name][version] = Service;
});

Object.keys(servicesByVersion).forEach(function(serviceName) {
    Object.defineProperty(exports, serviceName, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(options) {
        options = options || {};

        // previously, AlchemyAPI did not require a version to be specified
        if(serviceName.indexOf('alchemy_') === 0) {
          options.version = 'v1';
        }

        var Service = servicesByVersion[serviceName][options.version];

        if (!Service) {
          throw new Error('Unable to find ' + serviceName + ' version ' + options.version);
        }

        return new Service(options);
      }
  });
});

// removed services
// we don't want these services listed (so non-enumerable), but we do want a clear error message
// if old code happens to try using one
['message_resonance', 'question_and_answer', 'visual_insights', 'concept_expansion'].forEach(function(serviceName) {
  Object.defineProperty(exports, serviceName, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function() {
      throw new Error('The ' + serviceName + ' service is no longer available');
    }
  });
});

Object.defineProperty(exports, 'language_translation', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function(options) {
    if (!options.silent) {
      //eslint-disable-next-line no-console
      console.warn(new Error("Watson language_translation is now language_translator. Set {silent: true} to disable this message.").stack)
    }
    return exports.language_translator(options);
  }
});
