'use strict';

const fs = require('fs');
const CompareComplyV1 = require('ibm-watson/compare-comply/v1');

const compareComply = new CompareComplyV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
  version: '2018-12-06',
});

const params = {
  file_1: fs.createReadStream(__dirname + '/../test/resources/contract_A.pdf'),
  file_1_filename: 'contract_A.pdf',
  file_1_label: 'example-file-1',
  file_2: fs.createReadStream(__dirname + '/../test/resources/contract_B.pdf'),
  file_2_filename: 'contract_B.pdf',
  file_2_label: 'example-file-2',
};

compareComply.compareDocuments(params, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
