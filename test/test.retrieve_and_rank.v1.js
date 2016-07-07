'use strict';

var assert = require('assert');
var watson = require('../index');
var nock = require('nock');
var url = require('url');
var fs = require('fs');
var noop = function() {};

describe('retrieve_and_rank', function() {
  var clusterId = 'scffffffff_ffff_ffff_ffff_ffffffffffff';
  var configName = 'test_config';
  var collectionName = 'test_collection';
  var serviceUrl = 'http://retrieve-and-rank-service.com/path/to/service';

  var solrClustersPath = '/v1/solr_clusters';
  var listResponse = 'list response';
  var createResponse = 'create response';

  var solrClusterPath = '/v1/solr_clusters/' + clusterId;
  var pollResponse = 'poll response';
  var deleteResponse = 'delete response';
  var statsResponse = 'stats response';
  var resizeResponse = 'resize response';

  var configsPath = '/v1/solr_clusters/' + clusterId + '/config';
  var configPath = configsPath + '/' + configName;
  var configListResponse = 'config list response';
  var configUploadResponse = 'config upload response';
  var configGetResponse = 'config get response';
  var configDeleteResponse = 'config delete response';

  var collectionsPath = '/v1/solr_clusters/' + clusterId + '/solr/admin/collections';
  var collectionCreateResponse = 'collection create';
  var collectionListResponse = 'collection list';
  var collectionDeleteResponse = 'collection delete';

  var rankerPath = '/v1/rankers';
  var rankerId = 'foo';
  var rankPath = rankerPath + '/' + rankerId;
  var rankerData =  fs.createReadStream(__dirname + '/resources/ranker_test.csv');
  var rankerTrainData =  fs.createReadStream(__dirname + '/resources/ranker_train.csv');

  var createRankerResponse = 'rank created';
  var deleteRankerResponse = 'rank deleted';
  var getRankerResponse = 'rank status';
  var rankResponse = 'ranking';

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: serviceUrl,
    version: 'v1'
  };

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var search = watson.retrieve_and_rank(service);

  before(function createMockSearchService() {
    nock.disableNetConnect();
    nock(service.url).persist()
    .get(solrClustersPath).reply(200, listResponse)
    .post(solrClustersPath).reply(200, createResponse)

    .get(solrClusterPath).reply(200, pollResponse)
    .delete(solrClusterPath).reply(200, deleteResponse)
    .get(solrClusterPath + '/stats').reply(200, statsResponse)

    .get(solrClusterPath + '/cluster_size').reply(200, resizeResponse)
    .put(solrClusterPath + '/cluster_size').reply(200, resizeResponse)

    .get(configsPath).reply(200, configListResponse)
    .post(configPath).reply(200, configUploadResponse)
    .get(configPath).reply(200, configGetResponse)
    .delete(configPath).reply(200, configDeleteResponse)

    .post(collectionsPath + '?collection.configName=' + configName+ '&name='+collectionName+'&wt=json&action=CREATE')
      .reply(200, collectionCreateResponse)
    .get(collectionsPath + '?action=LIST&wt=json')
      .reply(200, collectionListResponse)
    .post(collectionsPath + '?name=' + collectionName+ '&wt=json&action=DELETE')
      .reply(200, collectionDeleteResponse)

    .post(rankerPath)
      .reply(200, createRankerResponse)
    .get(rankerPath)
      .reply(200, getRankerResponse)
    .delete(rankPath)
      .reply(200, deleteRankerResponse)
    .post(rankPath)
      .reply(200, rankResponse)
    .get(rankPath)
      .reply(200, getRankerResponse);

  });

  after(function() {
    nock.cleanAll();
  });

  it('can list Solr clusters', function(done) {
    search.listClusters({}, function(error, data) {
      assert.equal(data, listResponse);
      done(error);
    });
  });

  it('can create a Solr cluster without specified config', function(done) {
    search.createCluster({}, function(error, data) {
      assert.equal(data, createResponse);
      done(error);
    });
  });

  it('sets headers and body of request when creating a Solr cluster based on params', function(done) {
    var createParams = {
      cluster_size: '2',
      cluster_name: 'the_cluster',
      some_other_option: 'some_other_value'
    };

    var response = search.createCluster(createParams, noop);

    assert.equal(response.headers['content-type'], 'application/json');
    assert.deepEqual(JSON.parse(response.body), createParams);
    done();
  });

  it('can poll a Solr cluster', function(done) {
    search.pollCluster({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, pollResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on poll request', function() {
    search.pollCluster({}, missingParameter);
  });

  it('can delete a Solr cluster', function(done) {
    search.deleteCluster({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, deleteResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on delete request', function() {
    search.deleteCluster({}, missingParameter);
  });

  it('can get a Solr clusters stats', function(done) {
    search.getClusterStats({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, statsResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on stats request', function() {
    search.getClusterStats({}, missingParameter);
  });

  it('can resize a Solr cluster', function(done) {
    search.resizeCluster({
      cluster_id: clusterId,
      cluster_size: 1
    }, function(error, data) {
      assert.equal(data, resizeResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on resize request', function() {
    search.resizeCluster({cluster_size: 1}, missingParameter);
  });

  it('returns error when cluster_size is not specified on resize request', function() {
    search.resizeCluster({cluster_id: 'any_id'}, missingParameter);
  });

  it('can get a cluster\'s resize status', function(done) {
    search.getResizeStatus({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, resizeResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on resize status request', function() {
    search.getResizeStatus({}, missingParameter);
  });

  it('can list Solr configs', function(done) {
    search.listConfigs({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, configListResponse);
      done();
    });
  });

  it('returns error when cluster_id is not specified on list config request', function() {
    search.listConfigs({}, missingParameter);
  });

  it('can upload a Solr config', function(done) {
    var mockConfigFile = 'test/resources/mock_solr_config_file.zip';
    search.uploadConfig({
        cluster_id: clusterId,
        config_name: configName,
        config_zip_path: mockConfigFile
      },
      function(error, data) {
        assert.equal(data, configUploadResponse);
        done(error);
      });
  });

  it('sets headers and body of request when uploading a Solr config', function(done) {
    var mockConfigFile = 'test/resources/mock_solr_config_file.zip';
    var response = search.uploadConfig({
      cluster_id: clusterId,
      config_name: configName,
      config_zip_path: mockConfigFile
    }, noop);

    assert.equal(response.headers['content-type'], 'application/zip');
    done();
  });

  it('returns error when cluster_id is not specified on upload config request', function() {
    search.uploadConfig({}, missingParameter);
  });

  it('returns error when config_name is not specified on upload config request', function() {
    search.uploadConfig({
      cluster_id: clusterId
    }, missingParameter);
  });

  it('returns error when config_zip_path is not specified on upload config request', function() {
    search.uploadConfig({
      cluster_id: clusterId,
      config_name: configName
    }, missingParameter);
  });

  it('can get a Solr config', function(done) {
    search.getConfig({
      cluster_id: clusterId,
      config_name: configName
    }, function(error, data) {
      assert.equal(data, configGetResponse);
      done(error);
    });
  });

  it('returns error when cluster_id is not specified on get config request', function() {
    search.getConfig({}, missingParameter);
  });

  it('returns error when config_name is not specified on get config request', function() {
    search.getConfig({
      cluster_id: clusterId
    }, missingParameter);
  });

  it('can delete a Solr config', function(done) {
    search.deleteConfig({
      cluster_id: clusterId,
      config_name: configName
    }, function(error, data) {
      assert.equal(data, configDeleteResponse);
      done(error);
    });
  });

  it('returns error when cluster_id is not specified on delete config request', function() {
    search.deleteConfig({}, missingParameter);
  });

  it('returns error when config_name is not specified on delete config request', function() {
    search.deleteConfig({
      cluster_id: clusterId
    }, missingParameter);
  });

  it('can create a Solr collection', function(done) {
    search.createCollection({
        cluster_id: clusterId,
        collection_name: collectionName,
        config_name: configName
      },
      function(error, data) {
        assert.equal(data, collectionCreateResponse);
        done(error);
      });
  });

  it('returns error when cluster_id is not specified on create collection request', function() {
    search.createCollection({}, missingParameter);
  });

  it('returns error when collection_name is not specified on create collection request', function() {
    search.createCollection({
      cluster_id: clusterId
    }, missingParameter);
  });

  it('returns error when config_name is not specified on create collection request', function() {
    search.createCollection({
      cluster_id: clusterId,
      collection_name: collectionName
    }, missingParameter);
  });

  it('can list Solr collections', function(done) {
    search.listCollections({
      cluster_id: clusterId
    }, function(error, data) {
      assert.equal(data, collectionListResponse);
      done(error);
    });
  });

  it('returns error when cluster_id is not specified on list collection request', function() {
    search.listCollections({}, missingParameter);
  });

  it('can delete a Solr collection', function(done) {
    search.deleteCollection({
      cluster_id: clusterId,
      collection_name: collectionName
    }, function(error, data) {
      assert.equal(data, collectionDeleteResponse);
      done(error);
    });
  });

  it('returns error when cluster_id is not specified on delete collection request', function() {
    search.deleteCollection({}, missingParameter);
  });

  it('returns error when collection_name is not specified on delete collection request', function() {
    search.deleteCollection({
      cluster_id: clusterId
    }, missingParameter);
  });

  it('can create a Solr client using passed in params', function() {
    var solrClient = search.createSolrClient({
      cluster_id: clusterId,
      collection_name: collectionName
    });
    var parsedUrl = url.parse(serviceUrl);

    assert.equal(solrClient.options.host, parsedUrl.hostname);
    assert.equal(solrClient.options.port, 443);
    assert.equal(solrClient.options.path, parsedUrl.path + '/v1/solr_clusters/' + clusterId + '/solr');
    assert.equal(solrClient.options.core, collectionName);
    assert.equal(solrClient.options.secure, true);
  });

  it('returns error when cluster_id is not specified when building Solr client', function() {
    assert.throws(
      function() {
        search.createSolrClient({});
      },
      /required parameters: cluster_id/
    );
  });

  it('returns error when collection_name is not specified when building Solr client', function() {
    assert.throws(
      function() {
        search.createSolrClient({
          cluster_id: clusterId
        });
      },
      /required parameters: collection_name/
    );
  });

  it('generate valid request when creating a ranker', function() {
    search.uploadConfig({}, missingParameter);
  });
  it('check missing parameters', function() {
    search.createRanker({}, missingParameter);
    search.createRanker(null, missingParameter);

    search.rankerStatus({}, missingParameter);
    search.rankerStatus(null, missingParameter);

    search.deleteRanker({}, missingParameter);
    search.deleteRanker(null, missingParameter);

    search.rank({ranker_id: 'ranker1'}, missingParameter);
    search.rank({ranker_id: 'ranker1', answer_metadata: rankerData }, missingParameter);
  });

  it('should generate a valid payload when creating a ranker', function(done) {
    var req = search.createRanker({
      training_data: rankerTrainData,
      name: 'ranker1',
      language: 'en'
    }, function(error, data) {
      assert.equal(data, createRankerResponse);
      assert.equal(req.method, 'POST');
      done(error);
    });
  });
  it('should generate a valid payload when getting the rankers', function(done) {
    var req = search.listRankers(null, function(error, data) {
      assert.equal(data, getRankerResponse);
      assert.equal(req.method, 'GET');
      done(error);
    });
  });
  it('should generate a valid payload when getting the ranker status', function(done) {
    var req = search.rankerStatus({ranker_id : rankerId}, function(error, data) {
      assert.equal(data, getRankerResponse);
      assert.equal(req.method, 'GET');
      done(error);
    });
  });
  it('should generate a valid payload when deleting a ranker', function(done) {
    var req = search.deleteRanker({ranker_id : rankerId}, function(error, data) {
      assert.equal(data, deleteRankerResponse);
      assert.equal(req.method, 'DELETE');
      done(error);
    });
  });

});
