'use strict';

var watson = require('watson-developer-cloud');

var message_resonance = watson.message_resonance({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version:'v1'
});

message_resonance.resonance({
  text: 'IBM Watson Developer Cloud', dataset: 1 },
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
