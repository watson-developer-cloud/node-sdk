'use strict';

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

const visual_recognition = new VisualRecognitionV3({
  api_key: 'INSERT YOUR API KEY HERE',
  version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
});

const params = {
  // must be a .zip file containing images
  images_file: fs.createReadStream('./resources/car.png')
};

visual_recognition.classify(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
