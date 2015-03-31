'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var text_to_speech = watson.text_to_speech({
  username: 'INSERT YOUR USERNAME FOR THE CONCEPT EXPANSION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE CONCEPT EXPANSION SERVICE HERE',
  version: 'v1'
});

var params = {
  text: 'Hello from IBM Watson',
  voice: 'VoiceEnUsMichael', // Optional voice
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
