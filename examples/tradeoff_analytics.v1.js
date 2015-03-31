'use strict';

var watson = require('watson-developer-cloud');

var tradeoff_analytics = watson.tradeoff_analytics({
  username: 'INSERT YOUR USERNAME FOR THE CONCEPT EXPANSION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE CONCEPT EXPANSION SERVICE HERE',
  version: 'v1'
});

// From file
var params = require('./resources/problem');

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
