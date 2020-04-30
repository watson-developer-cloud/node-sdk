'use strict';

var DiscoveryV1 = require('ibm-watson/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
  version: '2020-04-30',
});

discovery.getEnvironments({}, function (error, data) {
  console.log(JSON.stringify(data, null, 2));
});

// var file = fs.readFileSync('../test/resources/sampleHtml.html');
var file = fs.createReadStream('../test/resources/sampleWord.docx');

discovery.addDocument(
  {
    environment_id: 'YOUR ENVIRONMENT ID',
    collection_id: 'YOUR COLLECTION ID',
    file: file,
  },
  function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }
);
