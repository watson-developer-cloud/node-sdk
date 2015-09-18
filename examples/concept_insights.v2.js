'use strict';

var watson = require('watson-developer-cloud');

var concept_insights = watson.concept_insights({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v2'
});

var params = {
  graph: '/graphs/wikipedia/en20120601',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// Retrieve the concepts for input text
concept_insights.graphs.annotateText(params, function(err, res) {
  if (err)
    console.log(err);
  else {
    console.log('Annotated Text');
    console.log(JSON.stringify(res, null, 2));
  }
});
