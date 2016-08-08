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
var watson = require('watson-developer-cloud');
var tone_detection = require("./conversation_addons/tone_detection.js");
require('dotenv').config({silent: true});

/**
 * Instantiate the Watson Conversation Service
 */
var conversation = watson.conversation({
	  url: 'https://gateway.watsonplatform.net/conversation/api',
	  username: process.env.CONVERSATION_USERNAME || '<conversation_username>',
	  password: process.env.CONVERSATION_PASSWORD || '<conversation_password>',
	  version_date: '2016-07-11',
	  version: 'v1'
	});

/**
 * Instantiate the Watson Tone Analyzer Service
 */
var tone_analyzer = new watson.tone_analyzer({
   username: process.env.TONE_ANALYZER_USERNAME || '<tone_analyzer_username>',
   password: process.env.TONE_ANALYZER_PASSWORD || '<tone_analyzer_password>',
   version_date: '2016-05-19',
   version: 'v3'
});


/**
 * Payload for the Watson Conversation Service
 * <workspace-id> and user input text required.
 */
var payload = {
    workspace_id: process.env.WORKSPACE_ID || '<workspace-id>',
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
 * Note: the print statements can be replaced with code to process the err or data object returned in the Conversation
 *       Service's response.  
 */
 function invokeToneConversation(payload)
 {
   tone_detection.invokeToneAsync(payload,tone_analyzer)
     .then(tone => {
	      tone_detection.updateUserTone(payload, tone);
	      conversation.message(payload, function(err, data) {
	    	  if (err) {
	    		  console.error(JSON.stringify(err,2,null));
	    	  }
	    	  else {
	    		  console.log(JSON.stringify(data, null, 2));
	    	  }
	      });
     })
     .catch(function(err){
    	 console.log(JSON.stringify(err,2,null));
     })
 } 

 invokeToneConversation(payload);
