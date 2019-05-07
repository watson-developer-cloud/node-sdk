/**
 * Tone Analyzer integration with Assistant
 *
 * This example demonstrates how to detect and interpret the tone for a user's input (a assistant turn)
 * using the Tone Analyzer Service, and add it to the payload to be sent in a request to the Assistant
 * Service API message endpoint.
 *
 * Service credentials can be provided directly in this file, or can be saved to a .env file located in the
 * same directory.
 *
 * Requirements:
 *   1. Tone Analyzer Service instance:
 *   - https://cloud.ibm.com/catalog/services/tone-analyzer
 *   - credentials for this service to be provided below in tone_analyzer variable
 *    - replace <tone_analyzer_username> and <tone_analyzer_password>
 *   2. Assistant Service instance:
 *   - https://cloud.ibm.com/catalog/services/watson-assistant
 *   - credentials for this service to be provided below in the assistant variable
 *    - replace <assistant_username> and <assistant_password>
 *   3. Workspace id:
 *   - a workspace containing intents, entities and dialog nodes must be created using the tool
 *     available through the IBM Cloud Assistant Service. Details are available at
 *     https://github.com/watson-developer-cloud/assistant-simple#workspace
 *    - replace <workspace_id> in the payload variable
 *
 * Run the code using the command:
 *   node tone_assistant_integration.v1.js
 */

'use strict';
/* eslint-env es6*/

var AssistantV1 = require('ibm-watson/assistant/v1');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
var tone_detection = require('./tone_detection.js');
require('dotenv').config({ silent: true });

/**
 * Instantiate the Watson Assistant Service
 */
var assistant = new AssistantV1({
  username: process.env.ASSISTANT_USERNAME || '<assistant_username>',
  password: process.env.ASSISTANT_PASSWORD || '<assistant_password>',
  version: '2017-05-26'
});

/**
 * Instantiate the Watson Tone Analyzer Service
 */
var toneAnalyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME || '<tone_analyzer_username>',
  password: process.env.TONE_ANALYZER_PASSWORD || '<tone_analyzer_password>',
  version: '2017-09-21'
});

/**
 * This example stores tone for each user utterance in assistant context.
 * Change this to false, if you do not want to maintain history
 */
var maintainToneHistoryInContext = true;

/**
 * Payload for the Watson Assistant Service
 * <workspace-id> and user input text required.
 */
var payload = {
  workspace_id: process.env.WORKSPACE_ID || '<workspace_id>',
  input: {
    text: 'I am not happy today :('
  }
};

/**
 * invokeToneAssistant calls the invokeToneAsync function to get the tone information for the user's
 * input text (input.text in the payload json object), adds/updates the user's tone in the payload's context,
 * and sends the payload to the assistant service to get a response which is printed to screen.
 * @param payload a json object containing the basic information needed to converse with the Assistant Service's
 * message endpoint.
 *
 * Note: as indicated below, the console.log statements can be replaced with application-specific code to process
 * the err or data object returned by the Assistant Service.
 */
function invokeToneAssistant(payload, maintainToneHistoryInContext) {
  tone_detection
    .invokeToneAsync(payload, toneAnalyzer)
    .then(tone => {
      tone_detection.updateUserTone(
        payload,
        tone,
        maintainToneHistoryInContext
      );
      assistant.message(payload, function(err, data) {
        if (err) {
          // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
          // FROM ASSISTANT SERVICE
          console.error(JSON.stringify(err, null, 2));
        } else {
          // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
          // FROM ASSISTANT SERVICE
          console.log(JSON.stringify(data, null, 2));
        }
      });
    })
    .catch(function(err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

invokeToneAssistant(payload, maintainToneHistoryInContext);
