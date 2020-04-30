'use strict';

var NaturalLanguageClassifierV1 = require('ibm-watson/natural-language-classifier/v1');
var fs = require('fs');

var classifier = new NaturalLanguageClassifierV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
  version: '2020-04-30',
});

// Optionally for IAM authentication
/* var classifier = new NaturalLanguageClassifierV1({
  url: '<service_url>',
  version: '<version-date>',
  iam_apikey: '<iam_api_key>',
  iam_url: '<iam_url>', // optional - the default value is https://iam.cloud.ibm.com/identity/token
}); */

// Creating a classifier
var params = {
  training_data: fs.createReadStream('../test/resources/weather_data_train.csv'),
  metadata: Buffer.from(JSON.stringify({ language: 'en', name: 'my-classifier' }), 'utf8'),
};

classifier.createClassifier(params, function (err, response) {
  if (err) {
    console.log(err);
  } else {
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
  }
});

// Using a classifier
classifier.classify(
  {
    text: 'Is it sunny?',
    classifier_id: '<classifier-id>',
  }, // from the previous command
  function (err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
