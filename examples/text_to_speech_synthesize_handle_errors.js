'use strict';

var TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
var fs = require('fs');
require('dotenv').config({ silent: true });

var textToSpeech = new TextToSpeechV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
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
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  )
  .on('response', function (res) {
    if (res.statusCode === 200) {
      stream.pipe(fs.createWriteStream('output.wav'));
    }
    // errors will be handled by the callback after the body is downloaded
  });
