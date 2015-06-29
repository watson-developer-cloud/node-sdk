'use strict';

var watson = require('watson-developer-cloud');

var natural_language_classifier = watson.natural_language_classifier({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

natural_language_classifier.classify({
  text: 'Is it sunny?',
  classifier: '<classifier-id>' },
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
