const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2017-09-21',
});

toneAnalyzer
  .tone({
    toneInput: 'Greetings from the Watson Developer Cloud Node SDK, we are pleased to say hello!',
    contentType: 'text/plain',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));

toneAnalyzer
  .toneChat({
    utterances: [
      { text: 'My charger isn’t working.', user: 'customer' },
      {
        text: 'Thanks for reaching out. Can you give me some more detail about the issue?',
        user: 'agent',
      },
      {
        text:
          "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
        user: 'customer',
      },
      {
        text: 'I’m sorry you’re having issues with charging. What kind of charger do you have?',
        user: 'agent',
      },
    ],
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
