'use strict';

var watson = require('watson-developer-cloud-alpha');

var tradeoff_analytics = watson.tradeoff_analytics({
  username: 'INSERT YOUR USERNAME FOR THE VISUAL RECOGNITION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE VISUAL RECOGNITION PASSWORD HERE',
  version: 'v1'
});

var params = {
  'subject': 'phone',
  'columns': [{
    'key': 'price',
    'full_name': 'Price (Eur)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }, {
    'key': 'RAM',
    'full_name': 'RAM (MB)',
    'type': 'NUMERIC',
    'is_objective': false,
    'goal': 'MAX'
  }, {
    'key': 'weight',
    'full_name': 'Weight (gr)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }],
  'options': [{
    'key': ' 1',
    'name': 'Samsung Galaxy S4 White',
    'values': {
      'weight': 130,
      'price': 239,
      'RAM': 2048
    }
  }, {
    'key': '2',
    'name': 'Samsung Galaxy S4 Black',
    'values': {
      'weight': 130,
      'price': 240,
      'RAM': 2048
    }
  }, {
    'key': '3',
    'name': 'Samsung Galaxy S3 White',
    'values': {
      'weight': 133,
      'price': 79,
      'RAM': 2048
    }
  }]
};

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});