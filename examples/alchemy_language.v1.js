'use strict';

var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
  api_key: '<api_key>'
});

var params = {
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

alchemy_language.sentiment(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
