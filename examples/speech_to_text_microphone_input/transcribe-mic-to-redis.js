// Adapted from other examples
// Copyright (c) 2019 IBM
//
// This creates a redis list with the latest words picked up by watson speech to text
// This is a great starting out point for microservices reacting to live speech data
// Note: This deletes and populates the redis list multiple times a second, you may wish
// to optimize that out depending on your use case.
//
// IBM Cloud Redis: https://www.ibm.com/cloud/databases-for-redis
//
// set environment variables: SPEECH_TO_TEXT_IAM_APIKEY and REDIS_CONN_URL

'use strict';
var BUFFER_LENGTH = 100;

var REDIS_CONN_URL = process.env.REDIS_CONN_URL;
var Redis = require('ioredis');

require('dotenv').config({ silent: true }); // optional, handy for local development
var SpeechToText = require('ibm-watson/speech-to-text/v1');
// var LineIn = require('line-in'); // the `mic` package also works - it's more flexible but requires a bit more setup
var mic = require('mic');
var wav = require('wav');

var speechToText = new SpeechToText({
  // pick up SPEECH_TO_TEXT_IAM_APIKEY env variable here
});

// connect to "DB"
var redis = new Redis(REDIS_CONN_URL);

// init buffer
redis.del('speech-to-text-buffer');
for (var i = 0; i < BUFFER_LENGTH; i++) {
  redis.lpush('speech-to-text-buffer', 'init');
}

// var lineIn = new LineIn(); // 2-channel 16-bit little-endian signed integer pcm encoded audio @ 44100 Hz
var micInstance = mic({
  rate: '48000',
  channels: '1',
  debug: false,
});

var micInputStream = micInstance.getAudioStream();

var wavStream = new wav.Writer({
  sampleRate: 44100,
  channels: 2,
});

var recognizeStream = speechToText.recognizeUsingWebSocket({
  content_type: 'audio/wav',
  interim_results: true,
  inactivity_timeout: -1,
  objectMode: true,
  max_alternatives: 1,
  word_alternatives_threshold: 0.9,
  speaker_labels: true,
});

// lineIn.pipe(wavStream);
micInputStream.pipe(wavStream);

wavStream.pipe(recognizeStream);

// recognizeStream.pipe(process.stdout);
recognizeStream.on('data', function(message) {
  console.log(message);

  try {
    var transcript = message.results[0].alternatives[0].transcript;
    console.log(transcript);
    redis.del('speech-to-text-buffer');
    transcript.split(' ').forEach(function(word) {
      // console.log(word);
      // redis.rpop('speech-to-text-buffer');
      redis.rpush('speech-to-text-buffer', word);
    });
  } catch (error) {
    console.log(error);
  }
});

console.log('Recording, press any key to exit');

micInstance.start();
