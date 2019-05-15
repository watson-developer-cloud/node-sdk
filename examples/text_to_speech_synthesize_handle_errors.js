'use strict';

var TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
var fs = require('fs');
require('dotenv').config({ silent: true });

var textToSpeech = new TextToSpeechV1({
  // if left unspecified here, the SDK will fall back to the TEXT_TO_SPEECH_USERNAME and TEXT_TO_SPEECH_PASSWORD
  // environment properties, and then IBM Cloud's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

// Synthesize speech and pipe to disk,
// but avoid piping errors
var stream = textToSpeech
  .synthesize(
    {
      text: 'Hello from IBM Watson',
      voice: 'INVALID_VOICE', // comment this line to show the example working correctly
      accept: 'audio/wav', // default is audio/ogg; codec=opus
    },
    function(error) {
      if (error) {
        console.log(error);
      }
    }
  )
  .on('response', function(res) {
    if (res.statusCode === 200) {
      stream.pipe(fs.createWriteStream('output.wav'));
    }
    // errors will be handled by the callback after the body is downloaded
  });
