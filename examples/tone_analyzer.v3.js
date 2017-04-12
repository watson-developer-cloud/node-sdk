'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const tone_analyzer = new ToneAnalyzerV3({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version_date: '2016-05-19'
});

tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' }, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone endpoint:')
    console.log(JSON.stringify(tone, null, 2));
  }
});

const utterances = {
  "utterances": [
    {"text": "Hello, can you help me", "user": "customer"},
    {"text": "How are you ?", "user": "agent"},
    {"text": "Nothing is working :(", "user": "customer"},
    {"text": "Sorry to hear this", "user": "agent"}
  ]
};


tone_analyzer.tone_chat({utterances: utterances}, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone_chat endpoint:')
    console.log(JSON.stringify(tone, null, 2));
  }
});
