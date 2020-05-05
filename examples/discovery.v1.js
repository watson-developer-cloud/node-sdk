const DiscoveryV1 = require('ibm-watson/discovery/v1');
const fs = require('fs');

const discovery = new DiscoveryV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2019-04-30',
});

discovery
  .listEnvironments()
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));

const file = fs.createReadStream('./resources/sample-docx.docx');

discovery
  .addDocument({
    environmentId: 'YOUR ENVIRONMENT ID',
    collectionId: 'YOUR COLLECTION ID',
    file,
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
