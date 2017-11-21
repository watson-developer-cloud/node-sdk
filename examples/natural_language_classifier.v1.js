'use strict';

const NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
const fs = require('fs');

const natural_language_classifier = new NaturalLanguageClassifierV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

// Creating a classifier
const params = {
  training_data: fs.createReadStream('../test/resources/weather_data_train.csv'),
  metadata: Buffer.from(JSON.stringify({language: 'en', name: 'my-classifier'}), 'utf8')
};

natural_language_classifier.createClassifier(params, function(err, response) {
  if (err) {
    console.log(err);
  } else {
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
  }
});

// Using a classifier
natural_language_classifier.classify(
  {
    text: 'Is it sunny?',
    classifier_id: '<classifier-id>'
  }, // from the previous command
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
