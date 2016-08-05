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

require('dotenv').config({silent: true});
require('json-query');

var express = require('express');  // app server
var bodyParser = require('body-parser');  // parser for post requests
var watson = require('watson-developer-cloud');  // watson sdk
var tone_detection = require("./addons/tone_conversation_detection_addon.js");
var Promise = require('bluebird');


var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());


// Create the service wrapper
var conversation = watson.conversation({
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: process.env.CONVERSATION_USERNAME || '<username>',
  password: process.env.CONVERSATION_PASSWORD || '<password>',
  version_date: '2016-07-11',
  version: 'v1'
});


// Endpoint to be call from the client side
app.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({'output': {'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
    '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
      'Once a workspace has been defined the intents may be imported from ' +
    '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'}});
  }
  var payload = {
    workspace_id: workspace,
    context: {}
  };
	// Extract the input and context from the request, and add it to the payload to be sent to the 
	// conversation service
	if (req.body) {

		// INPUT - check for input in the body of the request 
		if (req.body.input) {
			payload.input = req.body.input;
		}else{
			return new Error('Error: no input provided in request.');
		}
		
		// INPUT - user's input text is whitespace - no intent provided
		if (!(req.body.input.text).trim().length){
			return res.json({'output': {'text': 'No input has been provided.  Please state your intent.'}});
		}
		
		// CONTEXT - context/state maintained by client app
		if (req.body.context) { 		
			payload.context = req.body.context;
			
			// USER - if there is no user in the context, initialize one and add to the context
			if(typeof req.body.context.user == 'undefined'){
				var emptyUser = tone_detection.initToneContext();
				//THIS MIGHT NOT WORK!!
				payload.context = extend(payload.context, { emptyUser });
				invokeAddOns_Tone(payload,req,res);
	
		}
		else {
			invokeAddOns_Tone(payload,req,res);
		}
              } 
		// If there is no context, create it and add a user object to it
		else {
			payload.context = tone_detection.initToneContext();
			invokeAddOns_Tone(payload,req,res);
		}	

	
	}
});




function invokeAddOns_Tone(payload,req,res)
{
	
	tone_detection.invokeToneAsync(req.body.input.text)
		.then(tone => {
			//tone_detection.updateUserTone(payload.context.user, tone);
			tone_detection.updateUserTone(payload, tone);
			// Send the input to the conversation service
		
		conversation.message(payload, function(err, data) {
				if (err) {
					return res.status(err.code || 500).json(err);
				}
				else {
					tone_expression.invokeToneExpression(data,req.body.input.text, 
						function(agentTone){
							return res.json(tone_expression.personalizeMessage((updateMessage(data)),agentTone, payload.context.user.tone.emotion.current));
					});
				}
			});
	});	
}



module.exports = app;