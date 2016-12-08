'use strict';

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

var params = {
  content_type: 'audio/wav'
};

// create the stream
var recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
fs.createReadStream(__dirname + '/resources/speech.wav').pipe(recognizeStream);

// and pipe out the transcription
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));


// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

['data', 'results', 'speaker_labels', 'error', 'connection-close'].forEach(function(eventName) {
  recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
});


//Change the following parameters appropriately
//Note that 'interval' and 'times' are OPTIONAL. You can choose to get rid of these fields.
//By default, 'interval' is set to 5000 milliseconds and 'times' is set to 30.
var corporaParams = {
  "customization_id": "d83aa3c0-bd6f-11e6-acaa-019f979b8xyz",
  "interval": 1000,
  "times": 20
};

//wait until corpus has been analyzed
//Using the above parameters, whenCorporaAnalyzed checks for the corpora status at most 20 "times" until the corpus has been analyzed.
//It waits for an "interval" of 1000 milliseconds after every status check.
//If the corpus has not been analyzed after 20 times, then it throws an error.
speech_to_text.whenCorporaAnalyzed(corporaParams, function(err, res) {
  if (err) {
    console.error(JSON.stringify(err, null, 2));
  } else {
    console.log(JSON.stringify(res, null, 2));
    console.log('Corpus analysis done!');
  }
});
