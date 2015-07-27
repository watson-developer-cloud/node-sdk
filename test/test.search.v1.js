'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var qs     = require('querystring');
var nock   = require('nock');
var fs     = require('fs');

describe('search', function() {
  var clusterId      = 'scffffffff_ffff_ffff_ffff_ffffffffffff';
  var configName     = 'test_config';
  var collectionName = 'test_collection';

  var solrClustersPath  = '/v1/solr_clusters';
  var listResponse      = 'list response';
  var deleteAllResponse = 'delete all response';
  var createResponse    = 'create response';

  var solrClusterPath = '/v1/solr_clusters/' + clusterId;
  var pollResponse    = 'poll response';
  var deleteResponse  = 'delete response';

  var configsPath          = '/v1/solr_clusters/' + clusterId + '/config';
  var configPath           = configsPath + '/' + configName;
  var configListResponse   = 'config list response';
  var configUploadResponse = 'config upload response';
  var configGetResponse    = 'config get response';
  var configDeleteResponse = 'config delete response';

  var collectionsPath          = '/v1/solr_clusters/' + clusterId + '/solr/admin/collections';
  var collectionCreateResponse = 'collection create';
  var collectionListResponse   = 'collection list';
  var collectionDeleteResponse = 'collection delete';

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var missingClusterId = function(err) {
    assert.ok((err instanceof Error) && /required parameter: clusterId/.test(err));
  };
  var missingConfigName = function(err) {
    assert.ok((err instanceof Error) && /required parameter: configName/.test(err));
  };
  var missingCollectionName = function(err) {
    assert.ok((err instanceof Error) && /required parameter: collectionName/.test(err));
  };
  var missingConfigZipPath = function(err) {
    assert.ok((err instanceof Error) && /required parameter: configZipPath/.test(err));
  };

  var search = watson.search(service);

  before(function createMockSearchService() {
    nock.disableNetConnect();
    nock(service.url).persist()
      .get(solrClustersPath).reply(200, listResponse)
      .delete(solrClustersPath).reply(200, deleteAllResponse)
      .post(solrClustersPath).reply(200, createResponse)

      .get(solrClusterPath).reply(200, pollResponse)
      .delete(solrClusterPath).reply(200, deleteResponse)

      .get(configsPath).reply(200, configListResponse)
      .post(configPath).reply(200, configUploadResponse)
      .get(configPath).reply(200, configGetResponse)
      .delete(configPath).reply(200, configDeleteResponse)

      .get(collectionsPath + '?action=CREATE&name=' + collectionName + '&collection.configName=' + configName)
        .reply(200, collectionCreateResponse)
      .get(collectionsPath + '?action=LIST').reply(200, collectionListResponse)
      .get(collectionsPath + '?action=DELETE&name=' + collectionName).reply(200, collectionDeleteResponse);
  });

  after(function() {
    nock.cleanAll();
  });

  it('can list Solr clusters', function(done) {
    search.listClusters({}, function(error, data) {
      assert.equal(data, listResponse);
      done();
    });
  });

  it('can delete all Solr clusters', function(done) {
    search.deleteClusters({}, function(error, data) {
      assert.equal(data, deleteAllResponse);
      done();
    });
  });

  it('can create a Solr cluster', function(done) {
    search.createCluster({}, function(error, data) {
      assert.equal(data, createResponse);
      done();
    });
  });

  it('can poll a Solr cluster', function(done) {
    search.pollCluster({clusterId: clusterId}, function(error, data) {
      assert.equal(data, pollResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on poll request', function() {
    search.pollCluster({}, missingClusterId);
  });

  it('can delete a Solr cluster', function(done) {
    search.deleteCluster({clusterId: clusterId}, function(error, data) {
      assert.equal(data, deleteResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on delete request', function() {
    search.deleteCluster({}, missingClusterId);
  });

  it('can list Solr configs', function(done) {
    search.listConfigs({clusterId: clusterId}, function(error, data) {
      assert.equal(data, configListResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on list config request', function() {
    search.listConfigs({}, missingClusterId);
  });

  it('can upload a Solr config', function(done) {
    var mockConfigFile = 'test/resources/mock_solr_config_file.zip';
    var response = search.uploadConfig({clusterId: clusterId, configName: configName, configZipPath: mockConfigFile},
      function(error, data) {
      assert.equal(data, configUploadResponse);
      done();
    });
  });

  it('sets headers and body of request when uploading a Solr config', function(done) {
    var mockConfigFile = 'test/resources/mock_solr_config_file.zip';
    var response = search.uploadConfig({clusterId: clusterId, configName: configName, configZipPath: mockConfigFile},
      function(error, data) {});

    assert.equal(response.headers['Content-Type'], 'application/zip');
    assert.deepEqual(response.body, fs.readFileSync(mockConfigFile));
    done();
  });

  it('returns error when clusterId is not specified on upload config request', function() {
    search.uploadConfig({}, missingClusterId);
  });

  it('returns error when configName is not specified on upload config request', function() {
    search.uploadConfig({clusterId: clusterId}, missingConfigName);
  });

  it('returns error when configZipPath is not specified on upload config request', function() {
    search.uploadConfig({clusterId: clusterId, configName: configName}, missingConfigZipPath);
  });

  it('can get a Solr config', function(done) {
    search.getConfig({clusterId: clusterId, configName: configName}, function(error, data) {
      assert.equal(data, configGetResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on get config request', function() {
    search.getConfig({}, missingClusterId);
  });

  it('returns error when configName is not specified on get config request', function() {
    search.getConfig({clusterId: clusterId}, missingConfigName);
  });

  it('can delete a Solr config', function(done) {
    search.deleteConfig({clusterId: clusterId, configName: configName}, function(error, data) {
      assert.equal(data, configDeleteResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on delete config request', function() {
    search.deleteConfig({}, missingClusterId);
  });

  it('returns error when configName is not specified on delete config request', function() {
    search.deleteConfig({clusterId: clusterId}, missingConfigName);
  });

  it('can create a Solr collection', function(done) {
    search.createCollection({clusterId: clusterId, collectionName: collectionName, configName: configName},
      function(error, data) {
      assert.equal(data, collectionCreateResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on create collection request', function() {
    search.createCollection({}, missingClusterId);
  });

  it('returns error when collectionName is not specified on create collection request', function() {
    search.createCollection({clusterId: clusterId}, missingCollectionName);
  });

  it('returns error when configName is not specified on create collection request', function() {
    search.createCollection({clusterId: clusterId, collectionName: collectionName}, missingConfigName);
  });

  it('can list Solr collections', function(done) {
    search.listCollections({clusterId: clusterId}, function(error, data) {
      assert.equal(data, collectionListResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on list collection request', function() {
    search.listCollections({}, missingClusterId);
  });

  it('can delete a Solr collection', function(done) {
    search.deleteCollection({clusterId: clusterId, collectionName: collectionName}, function(error, data) {
      assert.equal(data, collectionDeleteResponse);
      done();
    });
  });

  it('returns error when clusterId is not specified on delete collection request', function() {
    search.deleteCollection({}, missingClusterId);
  });

  it('returns error when collectionName is not specified on delete collection request', function() {
    search.deleteCollection({clusterId: clusterId}, missingCollectionName);
  });
});
