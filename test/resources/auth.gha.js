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
    url: 'https://api.us-south.assistant.watson.cloud.ibm.com',
    apikey: '_CVCfS14pvk6yni9qDK7UKZtgjZojLDIDObGBmENRWAg',
    workspaceId: '5b586426-c587-4775-950c-59b58db84b14',
    assistantId: '3920829d-69e9-4384-aa23-40b94d7218f3',
    headers: Object.assign(testingHeaders, { 'x-watson-origin': 'assistant-test' }),
  },
  compareComply: {
    url: 'https://api.us-south.compare-comply.watson.cloud.ibm.com',
    apikey: 'XjM8fK9vLj9f9gQPJsqNrYzfPnTiHW8fYQUG2-Rr8wLN',
    headers: testingHeaders,
    version: '2018-12-06',
  },
  discovery: {
    apikey: '4IXD4ViMzEbAiUt4rAOEw0GnXVOK_QLT4l5cx-pfmSD6',
    environmentId: '154d4dd7-a8bb-4a3d-9635-0acec9c94dab',
    configurationId: '3f3d4078-4760-469f-95ec-44aa91461505',
    collectionId: '5a4e2c25-b6d8-4a89-9fea-f08fa4c56a60',
    collectionId2: 'd70b06d0-ad91-445f-9267-ffe7f1f4e164',
    japaneseCollectionId: '05f6d7a9-4aa0-4503-af73-f2eb5fddfcfd', // This collection is no longer valid
    headers: testingHeaders,
    version_date: '2018-10-24',
  },
  discoveryV2: {
    url: 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/b8e433e6-6d74-4c3a-8e66-5c66c29e686f',
    apikey: '_SVinXKTcFTyyNusTX-CVHyiRSKY9FTZLLxV6UyBFEW8',
    projectId: '6e714330-80fe-4582-a500-6a4a9f066183',
    collectionId: '1adfe5d3-4eb5-a9bc-0000-01795d0c6d60',
    headers: testingHeaders,
  },
  languageTranslator: {
    url: 'https://api.us-south.language-translator.watson.cloud.ibm.com',
    apikey: 'y-vjnhjGNuh64I4RqLCHjgVutVMxo4ZVivTt7MoLLPFn',
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
    url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com',
    apikey: 'i9H3JaifgrMeVZbCad9WSZOI_WDcrHbd5ynSAtOpd_p4',
    headers: testingHeaders,
  },
  personalityInsights: {
    url: 'https://api.us-east.personality-insights.watson.cloud.ibm.com/instances/4c18b521-3abd-4c7c-bec7-6a3fd03644f1',
    apikey: 'U2X717eP-PhiHNEOt5c_NsO9ulZbtQ3yEM9dvfLePgwj',
    headers: testingHeaders,
    version: 'v3',
    version_date: '2016-10-19',
  },
  speechToText: {
    serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com',
    apikey: 'mpb-9dsWS0xYvMN2KhooxfnHZB7Lrz67ki6EUD2YS3rc',
    headers: testingHeaders,
    version: 'v1',
  },
  textToSpeech: {
    url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/a607e4b4-d2ad-48ff-a832-bf95842be468',
    apikey: 'bUxyHX_b1KcuUo9B4DMw07PvnBaSiKVWeKPhD5UAupEX',
    headers: testingHeaders,
    version: 'v1',
  },
  toneAnalyzer: {
    url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
    apikey: 'zlk_66yf_OxaCeaeZc11HmbABjICWYbTsjDujaanuk7l',
    headers: testingHeaders,
  },
  visualRecognition: {
    apikey: 'wKRTBQRszBJLp1tKNrr7yNuDlaeFg_HF2sJcLGxpbec1',
    testCollectionId: 'a06f7036-0529-49ee-bdf6-82ddec276923',
    headers: testingHeaders,
    version: 'v3',
  },
};
