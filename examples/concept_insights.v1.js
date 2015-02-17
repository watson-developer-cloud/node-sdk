'use strict';

var watson = require('watson-developer-cloud-alpha');

var concept_insights = watson.concept_insights({
  username: 'INSERT YOUR USERNAME FOR THE CONCEPT INSIGHTS SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE CONCEPT INSIGHTS PASSWORD HERE',
  version: 'v1'
});

var params = {
  user: 'wikipedia',
  graph: 'en-20120601',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// Retrieve the concepts for input text
concept_insights.annotateText(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});