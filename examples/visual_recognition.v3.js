'use strict';

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  api_key: 'INSERT YOUR API KEY HERE',
  version: '2016-05-20'
});

var params = {
  // An image file (.jpg, .png) or .zip file with images
  // images_file: fs.createReadStream('./resources/car.png')
  images_file: fs.createReadStream('./resources/images.zip')
};

visualRecognition.classify(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
