'use strict';
/*eslint no-redeclare: 0*/

var AlchemyVisionV1 = require('watson-developer-cloud/alchemy-vision/v1');
var fs = require('fs');

var alchemy_vision = new AlchemyVisionV1({
  api_key: '<api_key>'
});

// Image keywords
var params = {
  image: fs.createReadStream('resources/car.png'),
  forceShowAll: 1 // Includes lower confidence tags
};

alchemy_vision.getImageKeywords(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});

var params = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Morris-Chair-Ironwood.jpg'
};

alchemy_vision.getImageKeywords(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});

// Face recognize
var params = {
  knowledgeGraph: 1, // Include knowledge graph information in the the results.
  url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Scarlett_Johansson_-_Captain_America_2_press_conference_%28retouched%29_2.jpg'
};

alchemy_vision.recognizeFaces(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});

var params = {
  image: fs.createReadStream('resources/face.jpg')
};

alchemy_vision.recognizeFaces(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});

// Get image links
var params = {
  url: 'http://www.zillow.com/'
};

alchemy_vision.getImageLinks(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});

// Someone needs to fix this - it always returns an error 404.
/*var params = {
  html: fs.readFileSync('resources/example.html')
};

alchemy_vision.getImageLinks(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});*/
