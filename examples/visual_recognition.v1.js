'use strict';

var watson = require('watson-developer-cloud-alpha');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  username: 'INSERT YOUR USERNAME FOR THE VISUAL RECOGNITION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE VISUAL RECOGNITION PASSWORD HERE',
  version: 'v1'
});
var params = {
  // From file
  image_file: fs.createReadStream('car.png')
};
visual_recognition.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, 'labels', 2));
});