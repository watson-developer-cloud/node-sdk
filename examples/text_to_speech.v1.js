const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const fs = require('fs');

const textToSpeech = new TextToSpeechV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
});

const synthesizeParams = {
  text: 'Hello from IBM Watson',
  accept: 'audio/mp3',
  voice: 'en-US_AllisonVoice',
};

textToSpeech
  .synthesize(synthesizeParams)
  .then(response => {
    const audio = response.result;
    audio.pipe(fs.createWriteStream('hello_world.mp3'));
  })
  .catch(err => {
    console.log('error:', err);
  });
