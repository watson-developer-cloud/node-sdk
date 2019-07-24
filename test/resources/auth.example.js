/**
 * (C) Copyright IBM Corp. 2015, 2018.
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

module.exports = {
  relationship_extraction: {
    url: 'https://gateway.watsonplatform.net/relationship-extraction-beta/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  concept_insights: {
    url: 'https://gateway.watsonplatform.net/concept-insights/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
    account_id: 'larmu8up2pa3',
  },
  speech_to_text: {
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  text_to_speech: {
    url: 'https://stream.watsonplatform.net/text-to-speech/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  tradeoff_analytics: {
    url: 'https://gateway.watsonplatform.net/tradeoff-analytics/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  visual_recognition: {
    v3: {
      url: 'https://gateway-a.watsonplatform.net/visual-recognition/api',
      api_key: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1,
      },
    },
  },
  personality_insights: {
    v2: {
      url: 'https://gateway.watsonplatform.net/personality-insights/api',
      username: '',
      password: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1,
      },
    },
    v3: {
      url: 'https://gateway.watsonplatform.net/personality-insights/api',
      username: '',
      password: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1,
      },
    },
  },
  dialog: {
    url: 'https://gateway.watsonplatform.net/dialog/api',
    username: '',
    password: '',
    dialog_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  language_translator: {
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  tone_analyzer: {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  alchemy: {
    api_key: '',
  },
  document_conversion: {
    url: 'https://gateway.watsonplatform.net/document-conversion/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  retrieve_and_rank: {
    url: 'https://gateway.watsonplatform.net/retrieve-and-rank/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  natural_language_classifier: {
    url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
    username: '',
    password: '',
    classifier_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  assistant: {
    url: 'https://gateway.watsonplatform.net/assistant/api',
    username: '',
    password: '',
    workspace_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
  discovery: {
    username: '',
    password: '',
    environment_id: '',
    configuration_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1,
    },
  },
};
