'use strict';

var DiscoveryV1 = require('../discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  // if left unspecified here, the SDK will fall back to the DISCOVERY_USERNAME and DISCOVERY_PASSWORD
  // environment properties, and then Bluemix's VCAP_SERVICES environment property
  //username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  //password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
  username: '7b37f162-2e2c-4aee-9ea6-cb9d888ef751',
  password: 'bH43fATuEMb2',
  version_date: DiscoveryV1.VERSION_DATE_2016_12_15
});

discovery.getEnvironments({}, function(error, data) {
  console.log(JSON.stringify(data, null ,2));
});

var buffer = fs.readFileSync('../test/resources/sampleHtml.html');

discovery.addDocument({
  environment_id: '3526dd92-5b18-4284-b5c0-f20e2f92307f',
  collection_id: '90203b57-3de9-4db8-b11b-2a353ad99a4d',
  file: buffer,
}, function(error, data) {
  console.log(error);
  console.log(data);
});
