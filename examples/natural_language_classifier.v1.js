'use strict';

const NaturalLanguageClassifierV1 = require('ibm-watson/natural-language-classifier/v1');
const fs = require('fs');

const classifier = new NaturalLanguageClassifierV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
});

// Creating a classifier
const params = {
  trainingData: fs.createReadStream('./resources/weather_data_train.csv'),
  trainingMetadata: Buffer.from(JSON.stringify({ language: 'en', name: 'my-classifier' }), 'utf8'),
};

classifier
  .createClassifier(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));

// Using a classifier
classifier
  .classify({
    text: 'Is it sunny?',
    classifier_id: '<classifier-id>',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
