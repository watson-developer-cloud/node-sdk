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

module.exports = {
  relationship_extraction: {
    url: 'https://gateway.watsonplatform.net/relationship-extraction-beta/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1-beta'
  },
  concept_insights: {
    url: 'https://gateway.watsonplatform.net/concept-insights/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    account_id: 'larmu8up2pa3',
    version: 'v2'
  },
  speech_to_text: {
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  text_to_speech: {
    url: 'https://stream.watsonplatform.net/text-to-speech/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  tradeoff_analytics: {
    url: 'https://gateway.watsonplatform.net/tradeoff-analytics/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  visual_recognition: {
    v3: {
      url: 'https://gateway-a.watsonplatform.net/visual-recognition/api',
      api_key: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1
      },
      version: 'v3'
    }
  },
  personality_insights: {
    v2: {
      url: 'https://gateway.watsonplatform.net/personality-insights/api',
      username: '',
      password: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1
      },
      version: 'v2'
    },
    v3: {
      url: 'https://gateway.watsonplatform.net/personality-insights/api',
      username: '',
      password: '',
      headers: {
        'X-Watson-Learning-Opt-Out': 1,
        'X-Watson-Test': 1
      },
      version: 'v3',
      version_date: '2016-10-19'
    }
  },
  dialog: {
    url: 'https://gateway.watsonplatform.net/dialog/api',
    username: '',
    password: '',
    dialog_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  language_translator: {
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v2'
  },
  language_translation: {
    url: 'https://gateway.watsonplatform.net/language-translation/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v2'
  },
  tone_analyzer: {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v3',
    version_date: '2016-06-19'
  },
  alchemy: {
    api_key: ''
  },
  document_conversion: {
    url: 'https://gateway.watsonplatform.net/document-conversion/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1',
    version_date: '2015-12-01'
  },
  retrieve_and_rank: {
    url: 'https://gateway.watsonplatform.net/retrieve-and-rank/api',
    username: '',
    password: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  natural_language_classifier: {
    url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
    username: '',
    password: '',
    classifier_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  conversation: {
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: '',
    password: '',
    workspace_id: '',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    },
    version: 'v1'
  },
  discovery: {
    username: '',
    password: '',
    environment_id: '',
    configuration_id: '',
    version_date: '2016-07-11',
    headers: {
      'X-Watson-Learning-Opt-Out': 1,
      'X-Watson-Test': 1
    }
  },
  version: 'v1'
};
