'use strict';

// This example takes uncompressed wav audio from the Text to Speech service and plays it through the computer's speakers
// Should work on windows/mac/linux, but linux may require some extra setup first: https://www.npmjs.com/package/speaker

var TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
var wav = require('wav');
var Speaker = require('speaker');
require('dotenv').load({ silent: true }); // imports environment properties from a .env file if present

var textToSpeech = new TextToSpeechV1({
  // if left unspecified here, the SDK will fall back to the TEXT_TO_SPEECH_USERNAME and TEXT_TO_SPEECH_PASSWORD
  // environment properties, and then IBM Cloud's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

var reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function(format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

textToSpeech
  .synthesize({ text: 'hello from IBM Watson', accept: 'audio/wav' })
  .then(res => {
    res.pipe(reader);
  })
  .catch(err => {
    console.log(err);
  });
