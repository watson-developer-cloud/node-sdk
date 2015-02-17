var watson = require('watson-developer-cloud-alpha');
var fs = require('fs');

var text_to_speech = watson.text_to_speech({
    username: 'INSERT YOUR USERNAME FOR THE SPEECH TO TEXT SERVICE HERE',
    password: 'INSERT YOUR PASSWORD FOR THE SPEECH TO TEXT PASSWORD HERE',
    version: 'v1'
});

var params = {
    text: 'Hello from IBM Watson',
    voice: 'VoiceEnUsMichael', // optional voice
    accept: 'audio/wav'
};

// pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));