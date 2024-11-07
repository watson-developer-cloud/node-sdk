/**
 * Copyright 2019 IBM Corp. All Rights Reserved.
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
 * @module ibm-watson
 * Provide the entire sdk in one module in order to be browserified
 */

export import AssistantV1 = require('./assistant/v1');

export import AssistantV2 = require('./assistant/v2');

export import NaturalLanguageUnderstandingV1 = require('./natural-language-understanding/v1');

export import SpeechToTextV1 = require('./speech-to-text/v1');

export import TextToSpeechV1 = require('./text-to-speech/v1');
