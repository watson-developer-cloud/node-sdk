'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_insights = watson.visual_insights({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

var params = {
  images_file: fs.createReadStream('./resources/images.zip')
};

visual_insights.summary(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
