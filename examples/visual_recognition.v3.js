const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const fs = require('fs');

const visualRecognition = new VisualRecognitionV3({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2018-03-19',
});

const params = {
  // An image file (.jpg, .png) or .zip file with images
  imagesFile: fs.createReadStream('./resources/images.zip'),
};

visualRecognition
  .classify(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
