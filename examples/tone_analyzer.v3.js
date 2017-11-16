'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const tone_analyzer = new ToneAnalyzerV3({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version_date: '2017-09-21'
});

tone_analyzer.tone({ tone_input: 'Greetings from Watson Developer Cloud!', content_type: 'text/plain' }, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone endpoint:');
    console.log(JSON.stringify(tone, null, 2));
  }
});

const params = {
  utterances: [
    { text: 'My charger isn’t working.', user: 'customer' },
    { text: 'Thanks for reaching out. Can you give me some more detail about the issue?', user: 'agent' },
    {
      text: "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
      user: 'customer'
    },
    { text: 'I’m sorry you’re having issues with charging. What kind of charger do you have?', user: 'agent' }
  ]
};

tone_analyzer.toneChat(params, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone_chat endpoint:');
    console.log(JSON.stringify(tone, null, 2));
  }
});
