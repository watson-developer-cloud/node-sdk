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

var watson = require('watson-developer-cloud');
var Promise = require('bluebird');

/**
 * Thresholds for identifying meaningful tones returned by the Watson Tone Analyzer.  Current values are
 * based on the recommendations made by the Watson Tone Analyzer at
 * https://www.ibm.com/watson/developercloud/doc/tone-analyzer/understanding-tone.shtml
 * These thresholds can be adjusted to client/domain requirements.
 */
var PRIMARY_EMOTION_SCORE_THRESHOLD = 0.50;
var EMOTION_HIGH_SCORE_THRESHOLD = 0.75;
var EMOTION_LOW_SCORE_THRESHOLD = 0.5;
var LANGUAGE_HIGH_SCORE_THRESHOLD = 0.75;
var LANGUAGE_LOW_SCORE_THRESHOLD = 0.25;
var SOCIAL_HIGH_SCORE_THRESHOLD = 0.75;
var SOCIAL_LOW_SCORE_THRESHOLD = 0.75;

/**
 * Labels for the tone categories returned by the Watson Tone Analyzer
 */
var EMOTION_TONE_LABEL = "emotion_tone";
var LANGUAGE_TONE_LABEL = "language_tone";
var SOCIAL_TONE_LABEL = "social_tone";

/**
 * Public functions for this module
 */
module.exports = {
	updateUserTone,
	invokeToneAsync
};

/**
 * invokeToneAsync is an asynchronous function that calls the Tone Analyzer service and returns a Promise 
 * @param conversationPayload json object returned by the Watson Conversation Service
 * @param tone_analyzer an instance of the Watson Tone Analyzer service
 * @returns a Promise for the result of calling the tone_analyzer with the conversationPayload
 * (which contains the user's input text) 
 */
function invokeToneAsync(conversationPayload, tone_analyzer) {
	return new Promise(
		function (resolve, reject){
			tone_analyzer.tone(
				{text: conversationPayload.input.text},
				(error, data) => {
					if (error){
						reject(error);
					}else {
						resolve(data);
					}
				});
		});
};

/**
 * updateUserTone processes the Tone Analyzer payload to pull out the emotion, language and social
 * tones, and identify the meaningful tones (i.e., those tones that meet the specified thresholds).  
 * The conversationPayload json object is updated to include these tones.
 * @param conversationPayload json object returned by the Watson Conversation Service
 * @param toneAnalyzerPayload json object returned by the Watson Tone Analyzer Service
 * @returns conversationPayload user object in the conversationPayload's context has been updated with tone information 
 */
function updateUserTone (conversationPayload, toneAnalyzerPayload) {
    var emotionTone = null;
    var languageTone = null;
    var socialTone = null;

    if(typeof conversationPayload.context === 'undefined')
    {
    	conversationPayload.context = {};
    }

    if(typeof conversationPayload.context.user === 'undefined')
    {
    	conversationPayload.context = initUser();
    }

    // For convenience sake, define a variable for the user object
    var user = conversationPayload.context.user;

    // Extract the tones - emotion, language and social
    if (toneAnalyzerPayload && toneAnalyzerPayload.document_tone) {
    	toneAnalyzerPayload.document_tone.tone_categories.forEach(
    		function(toneCategory) {
	    		if (toneCategory.category_id === EMOTION_TONE_LABEL) {
	    			emotionTone = toneCategory;
	    		}
	    		if (toneCategory.category_id === LANGUAGE_TONE_LABEL) {
	    			languageTone = toneCategory;
	    		}
	    		if (toneCategory.category_id === SOCIAL_TONE_LABEL) {
	    			socialTone = toneCategory;
	    		}
    		});

	      var emotionProfile = getEmotionProfile(emotionTone);
	      user.tone.emotion.current = emotionProfile;
	      if (typeof user.tone.emotion.history === 'undefined') {
	    	  user.tone.emotion.history = [emotionProfile];
	      } else {
	    	  user.tone.emotion.history.push(emotionProfile);
	      }

	      var languageProfile = getLanguageProfile(languageTone);
	      user.tone.language.current = languageProfile;
	      if (typeof user.tone.language.history === 'undefined') {
	    	  user.tone.language.history = [languageProfile];
	      } else {
	    	  user.tone.language.history.push(languageProfile);
	      }

	      var socialProfile = getSocialProfile(socialTone);
	      user.tone.social.current = socialProfile;
	      if (typeof user.tone.social.history === 'undefined') {
	    	  user.tone.social.history = [socialProfile];
	      } else {
	    	  user.tone.social.history.push(socialProfile);
	      }
    }
    
    conversationPayload.context.user = user;
    return conversationPayload;
};

/**
 * initToneContext initializes a user object containing tone data (from the Watson Tone Analyzer)
 * @returns user json object with the emotion, language and social tones.  The current
 * tone identifies the tone for a specific conversation turn, and the history provides the conversation for
 * all tones up to the current tone for a conversation instance with a user.
 */
function initUser() {
    return {
      'user': {
        'tone': {
          'emotion': {
            'current': null,
            'history': []
          },
          'language': {
            'current': null,
            'history': []
          },
          'social': {
            'current': null,
            'history': []
          }
        }
      }
    };
};


/**
 * getEmotionProfile identifies the primary emotion in the emotion tones in the payload returned by the Tone Analyzer
 * @param emotionTone a json object containing the emotion tones in the payload returned by the Tone Analyzer
 * @returns the primary emotion if one of the emotion tones has a score that is greater than or equal to the
 * EMOTION_SCORE_THRESHOLD; otherwise, 'neutral'
 */
function getEmotionProfile(emotionTone) {
  var maxScore = 0;
  var primaryEmotion = null;

  emotionTone.tones.forEach(function(emotion) {
    if (emotion.score > maxScore) {
    	maxScore = emotion.score;
    	primaryEmotion = emotion.tone_name.toLowerCase();
    }
  });

  if (maxScore <= PRIMARY_EMOTION_SCORE_THRESHOLD) {
	  primaryEmotion = 'neutral';
  }

  return primaryEmotion;
}

/**
 * getLanguageProfile identifies the language tones that are greater or equal to the LANGUAGE_HIGH_SCORE_THRESHOLD or
 * lower than or equal to the LANGUAGE_LOW_SCORE_THRESHOLD
 * @param languageTone a json object containing the language tones in the payload returned by the Tone Analyzer
 * @returns an array containing the language tones that have a high or low score as defined by the user-defined
 * thresholds
 */
function getLanguageProfile(languageTone) {
  var languageToneProfile = [];

  languageTone.tones.forEach(function(lang) {
    if (lang.score >= LANGUAGE_HIGH_SCORE_THRESHOLD) {
    	languageToneProfile.push(lang.tone_name.toLowerCase() + '_high');
    }
    if (lang.score <= LANGUAGE_LOW_SCORE_THRESHOLD) {
    	languageToneProfile.push(lang.tone_name.toLowerCase() + '_low');
    }
  });

  return languageToneProfile;
};

/**
 * getSocialProfile identifies the language tones that are greater than the SOCIAL_HIGH_SCORE_THRESHOLD or
 * lower than or equal to the SOCIAL_LOW_SCORE_THRESHOLD
 * @param socialTone a json object containing the social tones in the payload returned by the Tone Analyzer
 * @returns an array containing the social tones that have a high or low score as defined by the user-defined
 * thresholds
 */
function getSocialProfile(socialTone) {
  var socialToneProfile = [];

  socialTone.tones.forEach(function(social) {
    if (social.score >= SOCIAL_HIGH_SCORE_THRESHOLD) {
    	socialToneProfile.push(social.tone_name.toLowerCase() + '_high');
    }
    if (social.score <= SOCIAL_LOW_SCORE_THRESHOLD) {
    	socialToneProfile.push(social.tone_name.toLowerCase() + '_low');
    }
  });

  return socialToneProfile;
};