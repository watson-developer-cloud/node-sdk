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

/**
 * @module watson-developer-cloud
 */

export import AuthorizationV1 = require('./authorization/v1');

export import ConversationV1 = require('./conversation/v1');

export import DiscoveryV1 = require('./discovery/v1');

export import DialogV1 = require('./dialog/v1');

export import LanguageTranslatorV2 = require('./language-translator/v2');

export import NaturalLanguageClassifierV1 = require('./natural-language-classifier/v1');

export import NaturalLanguageUnderstandingV1 = require('./natural-language-understanding/v1');

export import PersonalityInsightsV3 = require('./personality-insights/v3');

export import SpeechToTextV1 = require('./speech-to-text/v1');

export import TextToSpeechV1 = require('./text-to-speech/v1');

export import ToneAnalyzerV3 = require('./tone-analyzer/v3');

export import VisualRecognitionV3 = require('./visual-recognition/v3');

// js service files need to be imported this way as
// a hack to supress compiler warnings about using
// a .js file with the es6 import construct
export const PersonalityInsightsV2 = require('./personality-insights/v2');

// adding shim constructors for backwards compatibility

// 2-d map of snake_case service names & version => constructor function
// e.g. servicesByVersion.text_to_speech.v1 === export import TextToSpeechV1;
const servicesByVersion = {};
Object.keys(exports).forEach(key => {
  const Service = exports[key];
  const name = Service.prototype.name;
  const version = Service.prototype.version;
  servicesByVersion[name] = servicesByVersion[name] || {};
  servicesByVersion[name][version] = Service;
});

Object.keys(servicesByVersion).forEach(serviceName => {
  Object.defineProperty(exports, serviceName, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(options) {
      options = options || {};

      // previously, AlchemyAPI did not require a version to be specified
      if (serviceName.indexOf('alchemy_') === 0) {
        options.version = 'v1';
      }

      const Service = servicesByVersion[serviceName][options.version];

      if (!Service) {
        throw new Error(
          'Unable to find ' + serviceName + ' version ' + options.version
        );
      }

      return new Service(options);
    }
  });
});

// removed services
// we don't want these services listed (so non-enumerable), but we do want a clear error message
// if old code happens to try using one
[
  'concept_insights',
  'relationship_extraction',
  'message_resonance',
  'question_and_answer',
  'visual_insights',
  'concept_expansion',
  'retrieve_and_rank',
  'alchemy_language',
  'alchemy_data_news',
  'tradeoff_analytics'
].forEach(serviceName => {
  Object.defineProperty(exports, serviceName, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function() {
      throw new Error('The ' + serviceName + ' service is no longer available');
    }
  });
});
['AlchemyVisionV1', 'alchemy_vision'].forEach(serviceName => {
  Object.defineProperty(exports, serviceName, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function() {
      throw new Error(
        'The Alchemy Vision service is no longer available, please use Visual Recognition instead.'
      );
    }
  });
});
