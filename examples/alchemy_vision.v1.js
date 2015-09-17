'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var alchemy_vision = watson.alchemy_vision({
  api_key: '<api_key>'
});

var params = {
  image: fs.fs.createReadStream('src/test/resources/obama.jpg')
};

alchemy_vision.getImageKeywords(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});