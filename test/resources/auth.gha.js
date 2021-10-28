/**
 * Copyright 2015, 2019 IBM Corp. All Rights Reserved.
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

const testingHeaders = {
  'X-Watson-Learning-Opt-Out': 1,
  'X-Watson-Test': 1,
};

module.exports = {
  assistant: {
    headers: testingHeaders,
    apikey: '',
  },
  compareComply: {
    apikey: '',
    headers: testingHeaders,
  },
  discovery: {
    apikey: '',
    headers: testingHeaders,
  },
  languageTranslator: {
    apikey: '',
    headers: testingHeaders,
  },
  naturalLanguageClassifier: {
    url: process.env.NATURAL_LANGUAGE_CLASSIFIER_URL,
    apikey: process.env.NATURAL_LANGUAGE_CLASSIFIER_APIKEY,
    classifierId: process.env.NATURAL_LANGUAGE_CLASSIFIER_ID,
    headers: testingHeaders,
    version: 'v1',
  },
  naturalLanguageUnderstanding: {
    apikey: '',
    headers: testingHeaders,
  },
  personalityInsights: {
    apikey: '',
    headers: testingHeaders,
  },
  speechToText: {
    apikey: '',
    headers: testingHeaders,
  },
  textToSpeech: {
    apikey: '',
    headers: testingHeaders,
  },
  toneAnalyzer: {
    apikey: '',
    headers: testingHeaders,
  },
  visualRecognition: {
    apikey: '',
    headers: testingHeaders,
  },
};
