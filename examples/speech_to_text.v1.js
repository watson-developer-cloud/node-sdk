'use strict';

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const speech_to_text = new SpeechToTextV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

const params = {
  content_type: 'audio/wav'
};

// create the stream
const recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
fs.createReadStream(__dirname + '/resources/speech.wav').pipe(recognizeStream);

// and pipe out the transcription
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

['data', 'results', 'speaker_labels', 'error', 'close'].forEach(function(eventName) {
  recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
});

