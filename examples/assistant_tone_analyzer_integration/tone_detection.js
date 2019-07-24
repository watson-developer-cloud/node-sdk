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

var Promise = require('bluebird');

/**
 * Public functions for this module
 */
module.exports = {
  updateUserTone: updateUserTone,
  invokeToneAsync: invokeToneAsync,
};

/**
 * invokeToneAsync is an asynchronous function that calls the Tone Analyzer service and returns a Promise
 * @param assistantPayload json object returned by the Watson Assistant Service
 * @param toneAnalyzer an instance of the Watson Tone Analyzer service
 * @return a Promise for the result of calling the toneAnalyzer with the assistantPayload
 * (which contains the user's input text)
 */
function invokeToneAsync(assistantPayload, toneAnalyzer) {
  return new Promise(function(resolve, reject) {
    toneAnalyzer.tone({ text: assistantPayload.input.text }, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * updateUserTone processes the Tone Analyzer payload to identify the most significant tone
 * (i.e., the tone with the largest score). The assistantPayload json object is updated
 * to include these tones.
 * @param assistantPayload json object returned by the Watson assistant Service
 * @param toneAnalyzerPayload json object returned by the Watson Tone Analyzer Service
 * @return assistantPayload where the user object has been updated with tone information from the toneAnalyzerPayload
 */
function updateUserTone(assistantPayload, toneAnalyzerPayload, maintainHistory) {
  if (typeof assistantPayload.context === 'undefined') {
    assistantPayload.context = {};
  }

  if (typeof assistantPayload.context.user === 'undefined') {
    assistantPayload.context = initUser();
  }

  // For convenience sake, define a variable for the user object
  var user = assistantPayload.context.user;

  // Extract the document-level tones
  if (toneAnalyzerPayload && toneAnalyzerPayload.document_tone) {
    updateTone(user, toneAnalyzerPayload.document_tone.tones, maintainHistory);
  }

  assistantPayload.context.user = user;

  return assistantPayload;
}

/**
 * initToneContext initializes a user object containing tone data (from the Watson Tone Analyzer)
 * @return user json object. The current tone identifies the tone for a specific assistant turn,
 * and the history provides the assistant for all tones up to the current tone for a assistant
 * instance with a user.
 */
function initUser() {
  return {
    user: {
      tone: {
        current: null,
      },
    },
  };
}

/**
 * updateTone updates the user tone with the primary tone - the tone with the largest score
 * @param user a json object representing user information (tone) to be used in conversing with the assistant Service
 * @param tones an array containing the document-level tones in the payload returned by the Tone Analyzer
 */
function updateTone(user, tones, maintainHistory) {
  var maxScore = 0.0;
  var primaryTone = null;
  var primaryToneScore = null;

  tones.forEach(function(tone) {
    if (tone.score > maxScore) {
      maxScore = tone.score;
      primaryTone = tone.tone_name.toLowerCase();
      primaryToneScore = tone.score;
    }
  });

  // update user tone
  user.tone.current = primaryTone;

  if (maintainHistory) {
    if (typeof user.tone.history === 'undefined') {
      user.tone.history = [];
    }
    user.tone.history.push({
      tone_name: primaryTone,
      score: primaryToneScore,
    });
  }
}
