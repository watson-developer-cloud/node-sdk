'use strict';
require('dotenv').config({ silent: true }); // optional, handy for local development
var SpeechToText = require('ibm-watson/speech-to-text/v1');
var LineIn = require('line-in'); // the `mic` package also works - it's more flexible but requires a bit more setup
var wav = require('wav');

var speechToText = new SpeechToText({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
});

var lineIn = new LineIn(); // 2-channel 16-bit little-endian signed integer pcm encoded audio @ 44100 Hz

var wavStream = new wav.Writer({
  sampleRate: 44100,
  channels: 2,
});

var recognizeStream = speechToText.recognizeUsingWebSocket({
  content_type: 'audio/wav',
  interim_results: true,
});

lineIn.pipe(wavStream);

wavStream.pipe(recognizeStream);

recognizeStream.pipe(process.stdout);
