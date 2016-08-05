
var watson = require('watson-developer-cloud');
var tone_detection = require("./conversation_addons/tone_detection.js");

var conversation = watson.conversation({
  username: '49ab433a-f379-4b67-86f2-950715f473a9',
  password: 'lG2qAe0DcERY',
  version: 'v1',
  version_date: '2016-07-01'
});

 var tone_analyzer = watson.tone_analyzer({
   username: '5a440129-bfbe-4bcc-9d3f-621a26ad4318',
   password: 'UCXw5ULTWP46',
   version_date: '2016-05-19',
   version: 'v3'
});
  
 var payload = {
    workspace_id: '7c6f674e-a387-45d6-aa11-73474d3a3350',
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
