'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  url: 'https://gateway-a.watsonplatform.net/visual-recognition/api',
  api_key: 'INSERT YOUR API KEY HERE',
  version: 'v3',
  version_date: '2016-05-19'
});

var params = {
  // must be a .zip file containing images
  images_file: fs.createReadStream('./resources/car.png')
};

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
