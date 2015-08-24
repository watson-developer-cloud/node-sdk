'use strict';

var watson = require('watson-developer-cloud');
var async  = require('async');

var search = watson.search({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1',
  url: 'https://gateway.watsonplatform.net/search/api'
});

var clusterId;

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

  function deleteCluster(done) {
    console.log('Deleting Solr cluster ' + clusterId);
    search.deleteCluster({clusterId: clusterId}, function(err) {
      printResponse(err, 'Error deleting Solr cluster: ', 'Deleted Solr cluster ' + clusterId, done);
    });
  }
]);

function waitForCluster(clusterId, callback) {
  search.pollCluster({clusterId: clusterId}, function isReady(err, res) {
    if(err) {
      return console.log('Error polling Solr cluster: ' + JSON.stringify(err, null, 2));
    }

    console.log('Waiting for Solr cluster ' + clusterId + ' to be ready...');
    if (res.solr_cluster_status === 'READY') {
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
