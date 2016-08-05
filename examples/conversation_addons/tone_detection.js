/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

require('dotenv').config({silent: true});
var watson = require('watson-developer-cloud');  // watson sdk
var Promise = require('bluebird');

//var watson_promisified = Promise.nodeify('watson-developer-cloud');

/**
 * Instantiate the Watson Tone Analyzer
 * Credentials can be found on the Bluemix Platform.
 */
var tone_analyzer = watson.tone_analyzer({
	url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
	username: process.env.TONE_ANALYZER_USERNAME,
	password: process.env.TONE_ANALYZER_PASSWORD,  
	version_date: '2016-05-19',
	version: 'v3'
});

/*
 * ERROR - can't promisify tone_analyzer!
 */
//var promisifiedToneAnalyzer = Promise.promisifyAll(tone_analyzer);

/**
 * Thresholds for identifying meaningful tones returned by the Watson Tone Analyzer.
 * These can be adjusted according to client/application requirements.
 * For more information: https://www.ibm.com/watson/developercloud/doc/tone-analyzer/understanding-tone.shtml
 */ 
var EMOTION_SCORE_THRESHOLD = 0.5;
var LANGUAGE_SCORE_THRESHOLD = 0.6;
var SOCIAL_SCORE_THRESHOLD = 0.75;

/**
 * Labels for the different tones returned by the Watson Tone Analyzer
 */
var EMOTION_TONE_LABEL = "emotion_tone";
var LANGUAGE_TONE_LABEL = "language_tone";
var SOCIAL_TONE_LABEL = "social_tone";


/**
 * Public functions for this module
 */
module.exports = {
  initToneContext,
  invokeTone,
  updateUserTone,
  invokeToneAsync
};

/**
 * initToneContext initializes a user object containing tone data (from the Watson Tone Analyzer)
 * @returns user json object with the emotion, language and social tones.  The current
 * tone identifies the tone for a specific conversation turn, and the history provides the conversation for 
 * all tones up to the current tone for a conversation instance with a user.
 */
function initToneContext() {
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
 * invokeTone calls the Watson Tone Analyzer with the (input) text and passes the payload returned by the 
 * Tone Analyzer to the callback function.
 * @param text - the input text provided by a user during a conversation turn
 * @param callback - the callback function to invoke after the Watson Tone Analyzer has processed the (input) text and returned a payload
 * @returns none
 */
function invokeTone(text, callback) {

	tone_analyzer.tone({text:text},
	    function(err, data) {
	      if (err) {
	        callback(null);
	      } else {
	        callback(data);
	      }
    });
  };

  
 
  
 //ERROR: TypeError: Cannot read property '_options' of undefined
  /*
 var tonePromisified = Promise.promisify(tone_analyzer.tone);
 function invokeTonePromisified(text){
	 console.log("invokeTonePromisified called " + text);
	 return tonePromisified({text:text});
 };
 */
 
 /*
 var tone_analyzer_promisified = Promise.denodeify(fs.writeFile):

	  writeFile(filename, content)
	    .then(addDBUser)
  */
 
 
  //invokeToneAsync?? - check examples (AW Aug 5)
  function invokeToneAsync(text) {
	  console.log("invokeTonePromisified called " + text);
	  
	  return new Promise(
		   function (resolve, reject){
			   tone_analyzer.tone(
					{text: text}, 
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
 * updateUserTone processes the Tone Analyzer payload, if not erroneous, to pull out the emotion, language and social
 * tones, and further processes this data to identify the meaningful tones (i.e., those tones that meet a 
 * specified threshold).  The user json object is updated to includes these tones.
 * @param user
 * @param toneAnalyzerPayload
 * @returns
 */
function updateUserTone (payload, toneAnalyzerPayload) {
    var emotionTone = null;
    var languageTone = null;
    var socialTone = null;
    
    //added this in - Aug 5
    var user = payload.context.user;
    
    console.log(JSON.stringify(toneAnalyzerPayload,2,null));


    if (toneAnalyzerPayload && toneAnalyzerPayload.document_tone) {
      toneAnalyzerPayload.document_tone.tone_categories.forEach(function(toneCategory) {
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
    
    //return user;
    return payload;
};  
  
/**
 * getEmotionProfile identifies the primary emotion in the emotion tones in the payload returned by the Tone Analyzer
 * @param emotionTone a json object containing the emotion tones in the payload returned by the Tone Analyzer
 * @returns the primary emotion if one of the emotion tones has a score that is greater than or equal to the 
 * EMOTION_SCORE_THRESHOLD; otherwise, returns 'neutral'
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

    // There is a primary emotion only if the highest score is > 0.5
  if (maxScore <= EMOTION_SCORE_THRESHOLD) {
    primaryEmotion = 'neutral';
  }

  return primaryEmotion;
}

/**
 * getLanguageProfile identifies the language tones that are greater than the LANGUAGE_SCORE_THRESHOLD
 * @param languageTone a json object containing the language tones in the payload returned by the Tone Analyzer
 * @returns a space-separated string containing the language tones that have a score that meets or exceeds the
 * LANGUAGE_SCORE_THRESHOLD
 */
function getLanguageProfile(languageTone) {
  var languageProfile = '';

  languageTone.tones.forEach(function(lang) {
    if (lang.score >= LANGUAGE_SCORE_THRESHOLD) {
      languageProfile += lang.tone_name.toLowerCase() + ' ';
    }
  });

  return languageProfile;
};

/**
 * getSocialProfile identifies the language tones that are greater than the LANGUAGE_SCORE_THRESHOLD
 * @param socialTone a json object containing the social tones in the payload returned by the Tone Analyzer
 * @returns a space-separated string containing the social tones that have a score that meets or exceeds the
 * SOCIAL_SCORE_THRESHOLD
 */
function getSocialProfile(socialTone) {
  var socialProfile = '';

  socialTone.tones.forEach(function(social) {
    if (social.score >= SOCIAL_SCORE_THRESHOLD) {
      socialProfile += social.tone_name.toLowerCase() + ' ';
    }
  });

  return socialProfile;
};
