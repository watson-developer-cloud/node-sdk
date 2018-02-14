'use strict';

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: '2017-09-21',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

toneAnalyzer.tone(
  {
    tone_input: 'Greetings from the Watson Developer Cloud Node SDK, we are pleased to say hello!',
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log('tone endpoint:');
      console.log(JSON.stringify(tone, null, 2));
    }
  }
);

var params = {
  utterances: [
    { text: 'My charger isn’t working.', user: 'customer' },
    {
      text:
        'Thanks for reaching out. Can you give me some more detail about the issue?',
      user: 'agent'
    },
    {
      text:
        "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
      user: 'customer'
    },
    {
      text:
        'I’m sorry you’re having issues with charging. What kind of charger do you have?',
      user: 'agent'
    }
  ]
};

toneAnalyzer.toneChat(params, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone_chat endpoint:');
    console.log(JSON.stringify(tone, null, 2));
  }
});
