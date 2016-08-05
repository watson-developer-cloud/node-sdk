
var watson = require('watson-developer-cloud');
var tone_detection = require("./conversation_addons/tone_detection.js");

var conversation = watson.conversation({
  username: '<username>',
  password: '<password>',
  version: 'v1',
  version_date: '2016-07-01'
});

 var tone_analyzer = watson.tone_analyzer({
   username: '<username>',
   password: '<password>',
   version_date: '2016-05-19',
   version: 'v3'
});
  
 var payload = {
    workspace_id: '<workspace id>',
    input: 'I am not happy today :(',
    context: {}
 };

 function invokeToneConversation(payload)
 {
   tone_detection.invokeToneAsync(payload,tone_analyzer)
     .then(tone => {
      console.log(tone);
      tone_detection.updateUserTone(payload, tone);
      console.log(payload);
      conversation.message(payload, function(err, data) {
	 if (err) {
          console.error(err);
	 }
	 else {
          console.log(JSON.stringify(response, null, 2));
	 }
      });
    })
   .catch(function(err){
     console.log("ERROR: " + JSON.stringify(err,2,null));
   })
 } 

 invokeToneConversation(payload);
