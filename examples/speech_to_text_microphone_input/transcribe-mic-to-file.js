'use strict';
var fs = require('fs');
require('dotenv').config({ silent: true }); // optional, handy for local development
var SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
var mic = require('mic');
var wav = require('wav');

var speechToText = new SpeechToText({
  // if left unspecified here, the SDK will fall back to the SPEECH_TO_TEXT_USERNAME and SPEECH_TO_TEXT_PASSWORD
  // environment properties, and then Bluemix's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

var micInstance = mic({
  rate: '48000',
  channels: '1',
  debug: false,
});

var micInputStream = micInstance.getAudioStream();

var wavStream = new wav.FileWriter('./audio.wav', {
  sampleRate: 48000,
  channels: 1,
});

var recognizeStream = speechToText.createRecognizeStream({
  content_type: 'audio/wav',
});

micInputStream.pipe(wavStream);

wavStream.pipe(recognizeStream);

recognizeStream.pipe(fs.createWriteStream('./transcription.txt'));

// note:
// If you just kill the process with control-c, the .wav file will have an incorrect header, and any in-flight
// transcription will be lost.
// This allows for a graceful termination of the recording, and the process will automatically exit after everything is
// complete.
console.log('Recording, press any key to exit');
process.stdin.setRawMode(true);
// process.stdin.resume();
process.stdin.once('data', function() {
  console.log('Cleaning up and exiting...');
  process.stdin.setRawMode(false);
  micInstance.stop();
  recognizeStream.on('end', function() {
    process.exit();
  });
});

micInstance.start();
