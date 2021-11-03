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
    url: process.env.ASSISTANT_URL,
    apikey: process.env.ASSISTANT_APIKEY,
    workspaceId: process.env.ASSISTANT_WORKSPACE_ID,
    assistantId: process.env.ASSISTANT_ASSISTANT_ID,
    headers: Object.assign(testingHeaders, { 'x-watson-origin': 'assistant-test' }),
  },
  compareComply: {
    url: process.env.COMPARE_COMPLY_URL,
    apikey: process.env.COMPARE_COMPLY_APIKEY,
    feedbackId: process.env.COMPARE_COMPLY_FEEDBACK_ID,
    headers: testingHeaders,
    version: '2018-12-06',
  },
  languageTranslator: {
    url: process.env.LANGUAGE_TRANSLATOR_URL,
    apikey: process.env.LANGUAGE_TRANSLATOR_APIKEY,
    headers: testingHeaders,
    version: 'v3',
  },
  naturalLanguageClassifier: {
    url: process.env.NATURAL_LANGUAGE_CLASSIFIER_URL,
    apikey: process.env.NATURAL_LANGUAGE_CLASSIFIER_APIKEY,
    classifierId: process.env.NATURAL_LANGUAGE_CLASSIFIER_ID,
    headers: testingHeaders,
    version: 'v1',
  },
  naturalLanguageUnderstanding: {
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
    apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY,
    headers: testingHeaders,
  },
  personalityInsights: {
    url: process.env.PERSONALITY_INSIGHTS_URL,
    apikey: process.env.PERSONALITY_INSIGHTS_APIKEY,
    headers: testingHeaders,
    version: 'v3',
    version_date: '2016-10-19',
  },
  speechToText: {
    serviceUrl: process.env.SPEECH_TO_TEXT_URL,
    apikey: process.env.SPEECH_TO_TEXT_APIKEY,
    headers: testingHeaders,
    version: 'v1',
  },
  textToSpeech: {
    url: process.env.TEXT_TO_SPEECH_URL,
    apikey: process.env.TEXT_TO_SPEECH_APIKEY,
    headers: testingHeaders,
    version: 'v1',
  },
  toneAnalyzer: {
    url: process.env.TONE_ANALYZER_URL,
    apikey: process.env.TONE_ANALYZER_APIKEY,
    headers: testingHeaders,
  },
  visualRecognition: {
    url: process.env.VISUAL_RECOGNITION_URL,
    apikey: process.env.VISUAL_RECOGNITION_APIKEY,
    testCollectionId: process.env.VISUAL_RECOGNITION_COLLECTION_ID,
    headers: testingHeaders,
    version: 'v3',
  },
  discovery: {
    apikey: process.env.DISCOVERY_APIKEY,
    environmentId: process.env.DISCOVERY_ENVIRONMENT_ID,
    configurationId: process.env.DISCOVERY_CONFIGURATION_ID,
    collectionId: process.env.DISCOVERY_COLLECTION_ID1,
    collectionId2: process.env.DISCOVERY_COLLECTION_ID2,
    japaneseCollectionId: process.env.DISCOVERY_COLLECTION_ID3, // This collection is no longer valid
    version_date: '2018-10-24',
    headers: testingHeaders,
  },
};
