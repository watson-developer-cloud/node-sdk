
var watson = require('watson-developer-cloud');
var tone_detection = require("./conversation_addons/tone_detection.js");
require('dotenv').config({silent: true});

var conversation = watson.conversation({
	  url: 'https://gateway.watsonplatform.net/conversation/api',
	  username: process.env.CONVERSATION_USERNAME || '<username>',
	  password: process.env.CONVERSATION_PASSWORD || '<password>',
	  version_date: '2016-07-11',
	  version: 'v1'
	});

 var tone_analyzer = watson.tone_analyzer({
   username: process.env.TONE_ANALYZER_USERNAME || '<username>',
   password: process.env.TONE_ANALYZER_PASSWORD || '<password>',
   version_date: '2016-05-19',
   version: 'v3'
});
  
 var payload = {
    workspace_id: process.env.WORKSPACE_ID || '<workspace-id>',
    input: {
    	text: "I am not happy today :("
    },
    context: {}
 };

 function invokeToneConversation(payload)
 {
   tone_detection.invokeToneAsync(payload,tone_analyzer)
     .then(tone => {
	      tone_detection.updateUserTone(payload, tone);
	      conversation.message(payload, function(err, data) {
	    	  if (err) {
	    		  console.error(err);
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
