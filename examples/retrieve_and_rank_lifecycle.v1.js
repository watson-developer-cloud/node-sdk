'use strict';

var RetrieveAndRankV1 = require('watson-developer-cloud/retrieve-and-rank/v1');
var async  = require('async');

var retrieve = new RetrieveAndRankV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

var clusterId;

// Label to identify your cluster in responses.
var clusterName = 'example_cluster';

// The empty string will create a free cluster. Input an integer to create a cluster of that many units.
var clusterSize = 1;

async.series([

  function createCluster(done) {
    retrieve.createCluster({cluster_name: clusterName, cluster_size: clusterSize}, function getId(err, res) {
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
    retrieve.listClusters({}, function(err, res) {
      printResponse(err, 'Error listing Solr clusters: ', res, done);
    });
  },

  function resizeCluster(done) {
    console.log('Resizing Solr cluster.');
    retrieve.resizeCluster({cluster_id: clusterId, cluster_size: 2}, function(err, res) {
      printResponse(err, 'Error resizing Solr cluster: ', res, done);
    });
  },

  function getResizeStatus(done) {
    console.log('Getting Solr cluster\'s resize status.');
    retrieve.getResizeStatus({cluster_id: clusterId}, function(err, res) {
      printResponse(err, 'Error getting resize status: ', res, done);
    });
  },

  function getClusterStats(done) {
    console.log('Getting stats from Solr cluster ' + clusterId);
    retrieve.getClusterStats({cluster_id: clusterId}, function(err, res) {
      printResponse(err, 'Error getting Solr cluster stats: ', res, done);
    });
  },

  function deleteCluster(done) {
    console.log('Deleting Solr cluster ' + clusterId);
    retrieve.deleteCluster({cluster_id: clusterId}, function(err) {
      printResponse(err, 'Error deleting Solr cluster: ', 'Deleted Solr cluster ' + clusterId, done);
    });
  }
]);

function waitForCluster(clusterId, callback) {
  retrieve.pollCluster({cluster_id: clusterId}, function isReady(err, res) {
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
