'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

var params = {
  // From file
  audio: fs.createReadStream('./resources/speech.wav'),
  content_type: 'audio/l16; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
