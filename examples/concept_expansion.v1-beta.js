'use strict';

var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1-beta'
});

var params = {
  seeds: ['nyc', 'dc', 'london', 'big cities'],
  label: 'cities'
};

concept_expansion.expand(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
