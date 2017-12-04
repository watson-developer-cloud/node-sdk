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

const Promise = require('bluebird');

/**
 * Thresholds for identifying meaningful tones returned by the Watson Tone Analyzer.  Current values are
 * based on the recommendations made by the Watson Tone Analyzer at
 * https://www.ibm.com/watson/developercloud/doc/tone-analyzer/understanding-tone.shtml
 * These thresholds can be adjusted to client/domain requirements.
 */
const PRIMARY_EMOTION_SCORE_THRESHOLD = 0.5;

/**
 * Labels for the tone categories returned by the Watson Tone Analyzer
 */
const EMOTION_TONE_LABEL = 'emotion_tone';

/**
 * Public functions for this module
 */
module.exports = {
  updateUserTone: updateUserTone,
  invokeToneAsync: invokeToneAsync
};

/**
 * invokeToneAsync is an asynchronous function that calls the Tone Analyzer service and returns a Promise
 * @param conversationPayload json object returned by the Watson Conversation Service
 * @param tone_analyzer an instance of the Watson Tone Analyzer service
 * @return a Promise for the result of calling the tone_analyzer with the conversationPayload
 * (which contains the user's input text)
 */
function invokeToneAsync(conversationPayload, tone_analyzer) {
  return new Promise(function(resolve, reject) {
    tone_analyzer.tone(
      {
        text: conversationPayload.input.text
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
}

/**
 * updateUserTone processes the Tone Analyzer payload to pull out the emotion, language and social
 * tones, and identify the meaningful tones (i.e., those tones that meet the specified thresholds).
 * The conversationPayload json object is updated to include these tones.
 * @param conversationPayload json object returned by the Watson Conversation Service
 * @param toneAnalyzerPayload json object returned by the Watson Tone Analyzer Service
 * @return conversationPayload where the user object has been updated with tone information from the toneAnalyzerPayload
 */
function updateUserTone(conversationPayload, toneAnalyzerPayload, maintainHistory) {
  let emotionTone = null;

  if (typeof conversationPayload.context === 'undefined') {
    conversationPayload.context = {};
  }

  if (typeof conversationPayload.context.user === 'undefined') {
    conversationPayload.context = initUser();
  }

  // For convenience sake, define a variable for the user object
  const user = conversationPayload.context.user;

  // Extract the tones - emotion, language and social
  if (toneAnalyzerPayload && toneAnalyzerPayload.document_tone) {
    toneAnalyzerPayload.document_tone.tone_categories.forEach(function(toneCategory) {
      if (toneCategory.category_id === EMOTION_TONE_LABEL) {
        emotionTone = toneCategory;
      }
    });

    updateEmotionTone(user, emotionTone, maintainHistory);
  }

  conversationPayload.context.user = user;

  return conversationPayload;
}

/**
 * initToneContext initializes a user object containing tone data (from the Watson Tone Analyzer)
 * @return user json object with the emotion, language and social tones.  The current
 * tone identifies the tone for a specific conversation turn, and the history provides the conversation for
 * all tones up to the current tone for a conversation instance with a user.
 */
function initUser() {
  return {
    user: {
      tone: {
        emotion: {
          current: null
        }
      }
    }
  };
}

/**
 * updateEmotionTone updates the user emotion tone with the primary emotion - the emotion tone that has
 * a score greater than or equal to the EMOTION_SCORE_THRESHOLD; otherwise primary emotion will be 'neutral'
 * @param user a json object representing user information (tone) to be used in conversing with the Conversation Service
 * @param emotionTone a json object containing the emotion tones in the payload returned by the Tone Analyzer
 */
function updateEmotionTone(user, emotionTone, maintainHistory) {
  let maxScore = 0.0;
  let primaryEmotion = null;
  let primaryEmotionScore = null;

  emotionTone.tones.forEach(function(tone) {
    if (tone.score > maxScore) {
      maxScore = tone.score;
      primaryEmotion = tone.tone_name.toLowerCase();
      primaryEmotionScore = tone.score;
    }
  });

  if (maxScore <= PRIMARY_EMOTION_SCORE_THRESHOLD) {
    primaryEmotion = 'neutral';
    primaryEmotionScore = null;
  }

  // update user emotion tone
  user.tone.emotion.current = primaryEmotion;

  if (maintainHistory) {
    if (typeof user.tone.emotion.history === 'undefined') {
      user.tone.emotion.history = [];
    }
    user.tone.emotion.history.push({
      tone_name: primaryEmotion,
      score: primaryEmotionScore
    });
  }
}
