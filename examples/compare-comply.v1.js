const fs = require('fs');
const CompareComplyV1 = require('ibm-watson/compare-comply/v1');

const compareComply = new CompareComplyV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2018-12-06',
});

const params = {
  file1: fs.createReadStream(__dirname + '/../test/resources/contract_A.pdf'),
  file1Filename: 'contract_A.pdf',
  file1Label: 'example-file-1',
  file2: fs.createReadStream(__dirname + '/../test/resources/contract_B.pdf'),
  file2Filename: 'contract_B.pdf',
  file2Label: 'example-file-2',
};

compareComply
  .compareDocuments(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
