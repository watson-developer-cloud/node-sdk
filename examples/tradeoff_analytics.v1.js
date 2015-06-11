'use strict';

var watson = require('watson-developer-cloud');

var tradeoff_analytics = watson.tradeoff_analytics({
  url: 'https://gateway.watsonplatform.net/tradeoff-analytics/api',
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

// From file
var params = require('./resources/problem.json');

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
