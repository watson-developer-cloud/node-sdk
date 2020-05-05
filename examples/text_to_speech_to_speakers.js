'use strict';

// This example takes uncompressed wav audio from the Text to Speech service and plays it through the computer's speakers
// Should work on windows/mac/linux, but linux may require some extra setup first: https://www.npmjs.com/package/speaker

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const wav = require('wav');
const Speaker = require('speaker');

const textToSpeech = new TextToSpeechV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
});

const reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function (format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

textToSpeech
  .synthesize({ text: 'hello from IBM Watson', accept: 'audio/wav' })
  .then(response => {
    response.result.pipe(reader);
  })
  .catch(err => {
    console.log(err);
  });
