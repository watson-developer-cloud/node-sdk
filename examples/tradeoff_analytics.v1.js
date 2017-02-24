'use strict';

const TradeoffAnalyticsV1 = require('watson-developer-cloud/tradeoff-analytics/v1');

const tradeoff_analytics = new TradeoffAnalyticsV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

// From file
const params = require('./resources/problem.json');

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
