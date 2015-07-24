'use strict';

var watson = require('../lib/index');
var fs     = require('fs');
var async  = require('async');

var search = watson.search({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1',
  url: 'https://gateway.watsonplatform.net/search/api'
});

var clusterId;
var configName    = 'example_config';
var configZipPath = 'path/to/config.zip';

async.series([
  function deleteExistingClusters(done) {
    console.log('Deleting exisiting Solr clusters.');
    search.deleteClusters({}, function(err, res) {
      printResponse(err, 'Error deleting exisiting Solr clusters: ', res, done);
    });
  },

  function createCluster(done) {
    search.createCluster({}, function getId(err, res) {
      if (err) {
        return console.log('Error creating Solr cluster: ' + JSON.stringify(err));
      }
      clusterId = res.solr_cluster_id;
      console.log('Solr cluster creation request submitted.');
      done();
    });
  },

  function waitForClusterToBeReady(done) {
    waitForCluster(clusterId, done);
  },

  function listClusters(done) {
    console.log('Listing Solr clusters.');
    search.listClusters({}, function(err, res) {
      printResponse(err, 'Error listing Solr clusters: ', res, done);
    });
  },

  function uploadConfig(done) {
    console.log('Uploading Solr config ' +  configName);
    search.uploadConfig({clusterId: clusterId, configName: configName, configZipPath: configZipPath},
      function(err, res) {
      printResponse(err, 'Error uploading Solr config: ', 'Uploaded Solr config ' + configName, done);
    });
  },

  function listConfigs(done) {
    console.log('Listing Solr configs for cluster ' + clusterId);
    search.listConfigs({clusterId: clusterId}, function(err, res) {
      printResponse(err, 'Error listing Solr configs: ', res, done);
    });
  },

  function getConfig(done) {
    console.log('Getting Solr config ' + configName);
    search.getConfig({clusterId: clusterId, configName: configName}, function(err, res) {
      if (err) {
        console.log('Error getting config: ' + JSON.stringify(err, null, 2));
      } else {
        // Save response to a local file here
      }
      done();
    });
  },

  function deleteConfig(done) {
    console.log('Deleting Solr config ' + configName);
    search.deleteConfig({clusterId: clusterId, configName: configName}, function(err, res) {
      printResponse(err, 'Error deleting config: ', 'Deleted Solr config ' + configName, done);
    });
  },

  function deleteCluster(done) {
    console.log('Deleting Solr cluster ' + clusterId);
    search.deleteCluster({clusterId: clusterId}, function(err, res) {
      printResponse(err, 'Error deleting Solr cluster: ', 'Deleted Solr cluster ' + configName, done);
    });
  }
]);

function waitForCluster(clusterId, callback) {
  search.pollCluster({clusterId: clusterId}, function isReady(err, res) {
    if(err){
      return console.log('Error polling Solr cluster: ' + JSON.stringify(err, null, 2));
    }

    console.log('Waiting for Solr cluster ' + clusterId + ' to be ready...');
    if (res.solr_cluster_status == 'READY') {
      console.log('Solr cluster ' + clusterId + ' is ready.');
      callback();
    } else {
      setTimeout(function() { waitForCluster(clusterId, callback); }, 5000);
    }
  });
}

function printResponse(error, errorMessage, response, callback) {
  if (error) {
    if (error.code) {
      console.log(errorMessage + JSON.stringify(error, null, 2));
    } else {
      console.log(errorMessage + error);
    }
  } else {
    console.log(response);
  }
  callback();
}
