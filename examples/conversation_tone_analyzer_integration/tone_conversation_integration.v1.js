/**
 * Tone Analyzer integration with Conversation
 *
 * This example demonstrates how to detect and interpret the tone for a user's input (a conversation turn)
 * using the Tone Analyzer Service, and add it to the payload to be sent in a request to the Conversation
 * Service API message endpoint.
 *
 * Service credentials can be provided directly in this file, or can be saved to a .env file located in the
 * same directory.
 *
 * Requirements:
 *   1. Tone Analyzer Service instance:
 *   	- https://console.ng.bluemix.net/catalog/services/tone-analyzer/
 *      - credentials for this service to be provided below in tone_analyzer variable
 *      	- replace <tone_analyzer_username> and <tone_analyzer_password>
 *   2. Conversation Service instance:
 *   	- https://console.ng.bluemix.net/catalog/services/conversation/
 *   	- credentials for this service to be provided below in the conversation variable
 *   		- replace <conversation_username> and <conversation_password>
 *   3. Workspace id:
 *   	- a workspace containing intents, entities and dialog nodes must be created using the tool
 *        available through the Bluemix Conversation Service.  Details are available at
 *        https://github.com/watson-developer-cloud/conversation-simple#workspace
 *      - replace <workspace_id> in the payload variable
 *
 * Run the code using the command:
 *   node tone_conversation_integration.v1.js
 */

'use strict';
/*eslint-env es6*/

var watson = require('watson-developer-cloud');
var tone_detection = require("./tone_detection.js");
require('dotenv').config({silent: true});


/**
 * Instantiate the Watson Conversation Service
 */
var conversation = new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME || '<conversation_username>',
  password: process.env.CONVERSATION_PASSWORD || '<conversation_password>',
  version_date: '2016-07-11'
});

/**
 * Instantiate the Watson Tone Analyzer Service
 */
var tone_analyzer = new watson.ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME || '<tone_analyzer_username>',
  password: process.env.TONE_ANALYZER_PASSWORD || '<tone_analyzer_password>',
  version_date: '2016-05-19'
});

/**
 * This example stores tone for each user utterance in conversation context.
 * Change this to false, if you do not want to maintain history
 */
var maintainToneHistoryInContext = true;

/**
 * Payload for the Watson Conversation Service
 * <workspace-id> and user input text required.
 */
var payload = {
    workspace_id: process.env.WORKSPACE_ID || '<workspace_id>',
    input: {
      text: "I am not happy today :("
    }
};

/**
 * invokeToneConversation calls the invokeToneAsync function to get the tone information for the user's
 * input text (input.text in the payload json object), adds/updates the user's tone in the payload's context,
 * and sends the payload to the conversation service to get a response which is printed to screen.
 * @param payload a json object containing the basic information needed to converse with the Conversation Service's
 *        message endpoint.
 *
 * Note: as indicated below, the console.log statements can be replaced with application-specific code to process
 * 		 the err or data object returned by the Conversation Service.
 */
function invokeToneConversation(payload,maintainToneHistoryInContext)
{
  tone_detection.invokeToneAsync(payload,tone_analyzer)
  .then( (tone) => {
    tone_detection.updateUserTone(payload, tone, maintainToneHistoryInContext);
    conversation.message(payload, function(err, data) {
      if (err) {
        // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
        // FROM CONVERSATION SERVICE
        console.error(JSON.stringify(err, null, 2));
      }
      else {
        // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
        // FROM CONVERSATION SERVICE
        console.log(JSON.stringify(data, null, 2));
      }
    });
  })
  .catch(function(err){
    console.log(JSON.stringify(err, null, 2));
  })
}

invokeToneConversation(payload,maintainToneHistoryInContext);
