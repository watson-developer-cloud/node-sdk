'use strict';
/* eslint no-redeclare: 0*/

const AlchemyVisionV1 = require('watson-developer-cloud/alchemy-vision/v1');
const fs = require('fs');

const alchemy_vision = new AlchemyVisionV1({
  api_key: '<api_key>'
});

// Image keywords
alchemy_vision.getImageKeywords(
  {
    image: fs.createReadStream('resources/car.png'),
    forceShowAll: 1 // Includes lower confidence tags
  },
  function(err, keywords) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(keywords, null, 2));
    }
  }
);

alchemy_vision.getImageKeywords(
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Morris-Chair-Ironwood.jpg'
  },
  function(err, keywords) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(keywords, null, 2));
    }
  }
);

// Face recognize
alchemy_vision.recognizeFaces(
  {
    knowledgeGraph: 1, // Include knowledge graph information in the the results.
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Scarlett_Johansson_-_Captain_America_2_press_conference_%28retouched%29_2.jpg'
  },
  function(err, keywords) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(keywords, null, 2));
    }
  }
);

alchemy_vision.recognizeFaces(
  {
    image: fs.createReadStream('resources/face.jpg')
  },
  function(err, keywords) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(keywords, null, 2));
    }
  }
);

// Get image links
alchemy_vision.getImageLinks(
  {
    url: 'http://www.zillow.com/'
  },
  function(err, keywords) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(keywords, null, 2));
    }
  }
);
// Someone needs to fix this - it always returns an error 404.
/* var params = {
  html: fs.readFileSync('resources/example.html')
};

alchemy_vision.getImageLinks(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});*/
