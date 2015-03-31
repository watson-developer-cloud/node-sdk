'use strict';

var watson = require('watson-developer-cloud');

var question_and_answer_healthcare = watson.question_and_answer({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1',
  dataset: 'healthcare' /* The dataset can be specified when creating
                         * the service or when calling it */
});

question_and_answer_healthcare.ask({
  text: 'What is HIV?'}, function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
