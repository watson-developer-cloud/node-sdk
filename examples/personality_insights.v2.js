'use strict';

var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: 'INSERT YOUR USERNAME FOR THE CONCEPT EXPANSION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE CONCEPT EXPANSION SERVICE HERE',
  version: 'v2'
});

personality_insights.profile({
  text: 'Enter more than 100 unique words here...' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
