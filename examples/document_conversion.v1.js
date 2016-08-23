'use strict';

var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');

var document_conversion = new DocumentConversionV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version_date: '2015-12-01'
});

// convert a single document
document_conversion.convert({
  // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
  file: fs.createReadStream(__dirname + '/resources/example.html'),
  conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
  config: {
    // split the html file by "h2", "h3" and "h4" tags
    html_to_answer_units: {
      selectors: [ 'h2','h3', 'h4']
    }
  }
}, function (err, response) {
  console.log("----------\n");
  console.log("convert a single document\n");
  console.log("----------\n");
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});

// dry run of indexing a single document
document_conversion.index({
  file: fs.createReadStream(__dirname + '/resources/sample-docx.docx'),
  config: {
    retrieve_and_rank: {
      dry_run: true
    }
  }
}, function (err, response) {
  console.log("----------\n");
  console.log("dry run of indexing a single document\n");
  console.log("----------\n");
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});

// dry run of indexing only metadata
document_conversion.index({
  metadata: {
    metadata: [
      { name: 'id', value: '1' },
      { name: 'SomeMetadataName', value: 'SomeMetadataValue' }
    ]
  },
  config: {
    retrieve_and_rank: {
      dry_run: true
    }
  }
}, function (err, response) {
  console.log("----------\n");
  console.log("dry run of indexing only metadata\n");
  console.log("----------\n");
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});

// dry run of indexing a single document with metadata and additional configuration for convert_document and field mapping
document_conversion.index({
  file: fs.createReadStream(__dirname + '/resources/example.html'),
  metadata: {
    metadata: [
      { name: 'id', value: '2' },
      { name: 'Author', value: 'IBM' },
      { name: 'Date Created', value: '2016-03-21' },
      { name: 'Category', value: 'Example' }
    ]
  },
  config: {
    convert_document: {
      normalized_html: {
        // Exclude all anchor tags "<a>"
        exclude_tags_completely: [ 'a' ]
      }
    },
    retrieve_and_rank: {
      dry_run: true,
      fields: {
        mappings: [
          { from: 'Author', to: 'Created By' },
          { from: 'Date Created', to: 'Created On' }
        ],
        include: [
          'Created By',
          'Created On'
        ],
        exclude: [
          'Category'
        ]
      }
    }
  }
}, function (err, response) {
  console.log("----------\n");
  console.log("dry run of indexing a single document with metadata and additional configuration for convert_document and field mappings\n");
  console.log("----------\n");
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});

// indexing a single document with metadata and additional configuration for convert_document and field mappings
document_conversion.index({
  file: fs.createReadStream(__dirname + '/resources/example.html'),
  metadata: {
    metadata: [
      { name: 'id', value: '3' },
      { name: 'SomeMetadataName', value: 'SomeMetadataValue' }
    ]
  },
  config: {
    convert_document: {
      normalized_html: {
        // Exclude all anchor tags "<a>"
        exclude_tags_completely: [ 'a' ]
      }
    },
    retrieve_and_rank: {
      dry_run: false,
      service_instance_id: 'INSERT YOUR RETRIEVE AND RANK SERVICE INSTANCE ID HERE',
      cluster_id: 'INSERT YOUR RETRIEVE AND RANK SERVICE SOLR CLUSTER ID HERE',
      search_collection: 'INSERT YOUR RETRIEVE AND RANK SERVICE SOLR SEARCH COLLECTION NAME HERE',
      fields: {
        mappings: [
          { from: 'SomeMetadataName', to: 'Created By' }
        ]
      }
    }
  }
}, function (err, response) {
  console.log("----------\n");
  console.log("indexing a single document with metadata and additional configuration for convert_document and field mappings\n");
  console.log("----------\n");
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});
