'use strict';

var watson = require('watson-developer-cloud');
var fs     = require('fs');

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

// Creating a classifier
var params = {
  language: 'en',
  name: 'my-classifier',
  training_data: fs.createReadStream('./resources/training_data.csv')
};

natural_language_classifier.create(params, function(err, response) {
  if (err)
    console.log(err);
  else
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
});


// Using a classifier
natural_language_classifier.classify({
  text: 'Is it sunny?',
  classifier: '<classifier-id>' }, // from the previous command
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});