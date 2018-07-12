'use strict';

const assert = require('assert');
const DiscoveryV1 = require('../../discovery/v1');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

const nock = require('nock');

describe('discovery-v1', function() {
  const noop = function() {};
  const missingParams = function(err, res) {
    assert(err && err.message && err.message.match(/Missing/));
  };

  // Test params
  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: DiscoveryV1.VERSION_DATE_2017_08_01,
  };

  const service_v2016_04_27 = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: DiscoveryV1.VERSION_DATE_2017_04_27,
  };

  const service_v2016_12_15 = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: DiscoveryV1.VERSION_DATE_2016_12_15,
  };

  const service_without_version = {
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    username: 'batman',
  };

  const queryPayload = {
    collection_id: 'col-guid',
    environment_id: 'env-guid',
  };

  const paths = {
    environments: '/v1/environments',
    environmentinfo: '/v1/environments/env-guid',
    fields: '/v1/environments/env-guid/fields',
    collections: '/v1/environments/env-guid/collections',
    collectioninfo: '/v1/environments/env-guid/collections/col-guid',
    collectionfields: '/v1/environments/env-guid/collections/col-guid/fields',
    configurations: '/v1/environments/env-guid/configurations',
    configurationinfo: '/v1/environments/env-guid/configurations/config-guid',
    testconfiguration: '/v1/environments/env-guid/preview',
    delete_collection: '/v1/environments/env-guid/collections/col-guid',
    add_document: '/v1/environments/env-guid/collections/col-guid/documents',
    documentinfo: '/v1/environments/env-guid/collections/col-guid/documents/document-guid',
    query: '/v1/environments/env-guid/collections/col-guid/query',
    queryNotices: '/v1/environments/env-guid/collections/col-guid/notices',
    federatedquery: '/v1/environments/env-guid/query',
    federatednotices: '/v1/environments/env-guid/notices',
    trainingdata: '/v1/environments/env-guid/collections/col-guid/training_data',
    createtrainingexample:
      '/v1/environments/env-guid/collections/col-guid/training_data/query-guid/examples',
    trainingdatainfo: '/v1/environments/env-guid/collections/col-guid/training_data/query-guid',
    trainingexample:
      '/v1/environments/env-guid/collections/col-guid/training_data/query-guid/examples/example-guid',
    queryRelations: '/v1/environments/env-guid/collections/col-guid/query_relations',
    queryEntities: '/v1/environments/env-guid/collections/col-guid/query_entities',
    credentials: '/v1/environments/env-guid/credentials',
  };

  it('should generate version was not specified (negative test)', function() {
    function doThrowThing() {
      const discovery = new DiscoveryV1(service_without_version);
      assert(discovery);
    }
    assert.throws(doThrowThing, /version was not specified/);
  });

  describe('discovery versions', function() {
    [service, service_v2016_04_27, service_v2016_12_15].forEach(service => {
      beforeEach(function() {
        nock.disableNetConnect();
        // grr! these should be in the individual tests where they are needed!
        nock(service.url)
          .post(paths.environments + '?version=' + service.version)
          .reply(200, { environment_id: 'yes' })
          .get(paths.environmentinfo + '?version=' + service.version)
          .reply(200, { environment_id: 'info' })
          .put(paths.environmentinfo + '?version=' + service.version)
          .reply(200, { environment_id: 'yes' })
          .delete(paths.environmentinfo + '?version=' + service.version)
          .reply(200, { environment_id: 'info' })
          .get(paths.collections + '?version=' + service.version)
          .reply(200, { collection_id: 'yes' })
          .get(paths.collectioninfo + '?version=' + service.version)
          .reply(200, { collection_id: 'info' })
          .get(paths.query + '?version=' + service.version)
          .reply(200, { query: 'yes' })
          .post(paths.collections + '?version=' + service.version)
          .reply(200, { collection_id: 'yes' })
          .delete(paths.delete_collection + '?version=' + service.version)
          .reply(200, { config: 'yes' })
          .post(paths.add_document + '?version=' + service.version)
          .reply(200, { add_doc: 'yes' })
          .delete(paths.documentinfo + '?version=' + service.version)
          .reply(200, { delete_doc: 'yes' })
          .get(paths.configurations + '?version=' + service.version)
          .reply(200, { configs: 'yes' })
          .get(paths.fields + '?version=' + service.version)
          .reply(200, { fields: 'yes' });
      });

      afterEach(function() {
        nock.cleanAll();
      });

      const discovery = new DiscoveryV1(service);

      describe(`discovery(version=${service.version})`, function() {
        it('should generate a valid payload', function() {
          const req = discovery.getEnvironments({}, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.environments + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should create an environment', function() {
          const req = discovery.createEnvironment(
            {
              name: 'new environment',
              description: 'my description',
            },
            noop
          );
          assert.equal(req.method, 'POST');
        });

        it('should create an environment with size 1 by default', function() {
          const req = discovery.createEnvironment(
            {
              name: 'new environment',
              description: 'my description',
            },
            noop
          );
          const jsonBodyParts = readMultipartReqJsons(req);
          assert.equal(jsonBodyParts.length, 1);
          assert.equal(jsonBodyParts[0].size, 1);
        });

        it('should create an environment with size 0', function() {
          const req = discovery.createEnvironment(
            {
              name: 'new environment',
              description: 'my description',
              size: 0,
            },
            noop
          );
          const jsonBodyParts = readMultipartReqJsons(req);
          assert.equal(jsonBodyParts.length, 1);
          assert.equal(jsonBodyParts[0].size, 0);
        });

        it('should update an environment', function() {
          const req = discovery.updateEnvironment(
            {
              environment_id: 'env-guid',
              name: 'my environment updated',
              description: 'my description updated',
            },
            noop
          );
          assert.equal(req.method, 'PUT');
        });

        it('should get an environment information', function() {
          const req = discovery.getEnvironment({ environment_id: 'env-guid' }, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.environmentinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should delete an environment', function() {
          const req = discovery.deleteEnvironment({ environment_id: 'env-guid' }, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.environmentinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should create a collection in an environment', function() {
          const req = discovery.createCollection(
            {
              environment_id: 'env-guid',
              configuration_id: 'config-guid',
              name: 'new collection',
              description: 'my description',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.collections + '?version=' + service.version
          );
          assert.equal(req.method, 'POST');
        });

        it('should get collections from an environment', function() {
          const req = discovery.getCollections({ environment_id: 'env-guid' }, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.collections + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should update collection in an environment', function() {
          const req = discovery.updateCollection(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.collectioninfo + '?version=' + service.version
          );
          assert.equal(req.method, 'PUT');
        });

        it('should get information about a specific collections fields', function() {
          const params = {
            environment_id: 'env-guid',
            collection_id: 'col-guid',
          };
          const req = discovery.getCollectionFields(params, noop);
          assert.equal(
            req.uri.href,
            service.url +
              paths.fields +
              '?version=' +
              service.version +
              '&collection_ids=' +
              params.collection_id
          );
          assert.equal(req.method, 'GET');
        });

        it('should get information about a specific collection and environment', function() {
          const req = discovery.getCollection(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.collectioninfo + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should list collections fields', function() {
          const params = {
            environment_id: 'env-guid',
            collection_id: 'col-guid',
          };
          const req = discovery.listCollectionFields(params, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.collectionfields + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should delete a collection in an environment', function() {
          const req = discovery.deleteCollection(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.delete_collection + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should get information about configurations in a specific environment', function() {
          const req = discovery.getConfigurations({ environment_id: 'env-guid' }, noop);
          assert.equal(
            req.uri.href,
            service.url + paths.configurations + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should create a new configuration using a file', function() {
          const req = discovery.createConfiguration(
            {
              environment_id: 'env-guid',
              // file is a JSON Object not a file
              file: JSON.parse(
                fs.readFileSync(path.join(__dirname, '../resources/discovery-sampleAddConf.json'))
              ),
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.configurations + '?version=' + service.version
          );
          assert.equal(req.method, 'POST');
        });

        it('should test the new configuration', function() {
          const req = discovery.testConfigurationInEnvironment(
            {
              environment_id: 'env-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.testconfiguration + '?version=' + service.version
          );
          assert.equal(req.method, 'POST');
        });

        it('should update an existing configuration using a file', function() {
          const req = discovery.updateConfiguration(
            {
              environment_id: 'env-guid',
              configuration_id: 'config-guid',
              // file is a JSON Object not a file
              file: JSON.parse(
                fs.readFileSync(
                  path.join(__dirname, '../resources/discovery-sampleUpdateConf.json')
                )
              ),
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.configurationinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'PUT');
        });

        it('should get information about a specific configuration in a specific environment', function() {
          const req = discovery.getConfiguration(
            { environment_id: 'env-guid', configuration_id: 'config-guid' },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.configurationinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should delete a configuration in an environment', function() {
          const req = discovery.deleteConfiguration(
            {
              environment_id: 'env-guid',
              configuration_id: 'config-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.configurationinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        describe('addDocument()', function() {
          it('should add a document to a collection and environment', function() {
            const req = discovery.addDocument(
              {
                environment_id: 'env-guid',
                collection_id: 'col-guid',
                file: fs.createReadStream(path.join(__dirname, '../resources/sampleHtml.html')),
              },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.add_document + '?version=' + service.version
            );
            assert.equal(req.method, 'POST');
          });

          it('should get document status for a document in collection', function() {
            const req = discovery.getDocumentStatus(
              {
                environment_id: 'env-guid',
                collection_id: 'col-guid',
                document_id: 'document-guid',
              },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.documentinfo + '?version=' + service.version
            );
            assert.equal(req.method, 'GET');
          });

          it('should update document in collection', function() {
            const req = discovery.updateDocument(
              {
                environment_id: 'env-guid',
                collection_id: 'col-guid',
                document_id: 'document-guid',
                file: fs.createReadStream(path.join(__dirname, '../resources/sampleHtml.html')),
              },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.documentinfo + '?version=' + service.version
            );
            assert.equal(req.method, 'POST');
          });

          // https://github.com/watson-developer-cloud/node-sdk/issues/474
          it('should accept an object for metadata', function(done) {
            nock.cleanAll();
            nock.disableNetConnect();
            const expectation = nock('http://ibm.com:80', {
              encodedQueryParams: true,
            })
              .post('/v1/environments/env-guid/collections/col-guid/documents')
              .query({ version: service.version })
              .reply({
                status: 'processing',
                document_id: '45556e23-f2b1-449d-8f27-489b514000ff',
              });
            discovery.addDocument(
              {
                environment_id: 'env-guid',
                collection_id: 'col-guid',
                file: fs.createReadStream(path.join(__dirname, '../resources/sampleHtml.html')),
                metadata: { action: 'testing' },
              },
              function(err) {
                assert.ifError(err);
                expectation.isDone();
                done();
              }
            );
          });
        });

        it('should delete a document in a collection and environment', function() {
          const req = discovery.deleteDocument(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              document_id: 'document-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.documentinfo + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should perform a query', function() {
          const req = discovery.query(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              filter: 'yesplease',
              count: 10,
              sort: ['+field_1', '-field_2'],
              natural_language_query: 'a question about stuff and things',
              passages: true,
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url +
            paths.query +
            '?version=' +
            service.version + // query string params order changed, shouldn't be a problem for the service...
              '&filter=yesplease&natural_language_query=a%20question%20about%20stuff%20and%20things&passages=true&count=10&sort=%2Bfield_1%2C-field_2'
          );
          assert.equal(req.method, 'GET');
        });

        it('should perform a query for notices', function() {
          const req = discovery.queryNotices(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              filter: 'yesplease',
              count: 10,
              sort: ['+field_1', '-field_2'],
              natural_language_query: 'a question about stuff and things',
              passages: true,
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url +
            paths.queryNotices +
            '?version=' +
            service.version + // query string params order changed, shouldn't be a problem for the service...
              '&filter=yesplease&natural_language_query=a%20question%20about%20stuff%20and%20things&passages=true&count=10&sort=%2Bfield_1%2C-field_2'
          );
          assert.equal(req.method, 'GET');
        });

        it('should perform a federated query', function() {
          const req = discovery.federatedQuery(
            {
              environment_id: 'env-guid',
              collection_ids: ['col1-guid', 'col2-guid'],
              filter: 'yesplease',
              count: 10,
              sort: ['+field_1', '-field_2'],
              natural_language_query: 'a question about stuff and things',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url +
            paths.federatedquery +
            '?version=' +
            service.version + // query string params order changed, shouldn't be a problem for the service...
              '&collection_ids=col1-guid%2Ccol2-guid&filter=yesplease&natural_language_query=a%20question%20about%20stuff%20and%20things&count=10&sort=%2Bfield_1%2C-field_2'
          );
          assert.equal(req.method, 'GET');
        });

        it('should perform a federated query for notices', function() {
          const req = discovery.federatedQueryNotices(
            {
              environment_id: 'env-guid',
              collection_ids: ['col1-guid', 'col2-guid'],
              filter: 'yesplease',
              count: 10,
              sort: ['+field_1', '-field_2'],
              natural_language_query: 'a question about stuff and things',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url +
            paths.federatednotices +
            '?version=' +
            service.version + // query string params order changed, shouldn't be a problem for the service...
              '&collection_ids=col1-guid%2Ccol2-guid&filter=yesplease&natural_language_query=a%20question%20about%20stuff%20and%20things&count=10&sort=%2Bfield_1%2C-field_2'
          );
          assert.equal(req.method, 'GET');
        });

        it('should add training data', function() {
          const req = discovery.addTrainingData(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              filter: 'yesplease',
              natural_language_query: 'a question about stuff and things',
              examples: '[]',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingdata + '?version=' + service.version
          );
          assert.equal(req.method, 'POST');
        });

        it('should create a training example', function() {
          const req = discovery.createTrainingExample(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.createtrainingexample + '?version=' + service.version
          );
          assert.equal(req.method, 'POST');
        });

        it('should delete all of the training data for this collection', function() {
          const req = discovery.deleteAllTrainingData(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingdata + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should delete the training data and all associated examples from the training data set', function() {
          const req = discovery.deleteTrainingData(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingdatainfo + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should delete a training examples from the training data set', function() {
          const req = discovery.deleteTrainingExample(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
              example_id: 'example-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingexample + '?version=' + service.version
          );
          assert.equal(req.method, 'DELETE');
        });

        it('should get the training data and all associated examples from the training data set', function() {
          const req = discovery.getTrainingData(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingdatainfo + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('get the details of training examples from the training data set', function() {
          const req = discovery.getTrainingExample(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
              example_id: 'example-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingexample + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should list the training data for the collection', function() {
          const req = discovery.listTrainingData(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingdata + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should list examples for the training data', function() {
          const req = discovery.listTrainingExamples(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.createtrainingexample + '?version=' + service.version
          );
          assert.equal(req.method, 'GET');
        });

        it('should update examples for the training data', function() {
          const req = discovery.updateTrainingExample(
            {
              environment_id: 'env-guid',
              collection_id: 'col-guid',
              query_id: 'query-guid',
              example_id: 'example-guid',
            },
            noop
          );
          assert.equal(
            req.uri.href,
            service.url + paths.trainingexample + '?version=' + service.version
          );
          assert.equal(req.method, 'PUT');
        });

        /**
         * Return an array of parsed objects representing all valid JSON parts of a multipart request.
         * @param {*} req
         * @return {Array}
         */
        function readMultipartReqJsons(req) {
          const result = [];
          if (req && req.body && req.body.length) {
            // req is no longer an array, so .forEach doesn't make sense
            // probably because we're using multi-part syntax with an array
            // anymore in the generated code
            const body = [req.body];
            body.forEach(part => {
              try {
                result.push(JSON.parse(Buffer.from(part).toString('ascii')));
              } catch (err) {
                // JSON parse error -> this part is not JSON: skip.
              }
            });
          }

          return result;
        }

        describe('_ensureFilename()', function() {
          it('should pass through ReadStreams unmodified', function() {
            const src = fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx'));
            assert.equal(DiscoveryV1._ensureFilename(src), src);
          });

          it('should pass through value/options objects with a filename', function() {
            const src = {
              value: 'foo',
              options: {
                filename: 'foo.bar',
              },
            };
            const actual = DiscoveryV1._ensureFilename(src);
            assert.equal(actual, src);
            assert.deepEqual(actual, {
              value: 'foo',
              options: {
                filename: 'foo.bar',
              },
            });
          });

          it('should create new object/values with a filename when missing', function() {
            const src = {
              value: '{"foo": "bar"}',
              options: {
                contentType: 'application/json',
              },
            };
            const actual = DiscoveryV1._ensureFilename(src);
            assert.deepEqual(actual, {
              value: '{"foo": "bar"}',
              options: {
                contentType: 'application/json',
                filename: '_',
              },
            });
            assert.notEqual(
              actual,
              src,
              'it should be a new object, not a modification of the existing one'
            );
          });

          it('should wrap buffers', function() {
            const src = Buffer.from([1, 2, 3, 4]);
            assert.deepEqual(DiscoveryV1._ensureFilename(src), {
              value: src,
              options: {
                filename: '_',
              },
            });
          });

          it('should wrap strings', function() {
            const src = 'foo';
            assert.deepEqual(DiscoveryV1._ensureFilename(src), {
              value: src,
              options: {
                filename: '_',
              },
            });
          });

          it('should wrap streams', function() {
            const src = new stream.Readable();
            assert.deepEqual(DiscoveryV1._ensureFilename(src), {
              value: src,
              options: {
                filename: '_',
              },
            });
          });
        }); // end of _ensureFilename()
        describe('queryRelations()', function() {
          it('should check no parameters are provided', function() {
            discovery.queryRelations(null, missingParams);
            discovery.queryRelations(undefined, missingParams);
            discovery.queryRelations({}, missingParams);
            discovery.queryRelations({ environment_id: 'env-guid' }, missingParams);
            discovery.queryRelations({ collection_id: 'col-guid' }, missingParams);
          });
          it('should generate a valid payload', function() {
            const req = discovery.queryRelations(queryPayload, noop);
            assert.equal(
              req.uri.href,
              service.url + paths.queryRelations + '?version=' + service.version
            );
          });
        });

        describe('queryEntities()', function() {
          it('should check no parameters are provided', function() {
            discovery.queryEntities(null, missingParams);
            discovery.queryEntities(undefined, missingParams);
            discovery.queryEntities({}, missingParams);
            discovery.queryEntities({ environment_id: 'env-guid' }, missingParams);
            discovery.queryEntities({ collection_id: 'col-guid' }, missingParams);
          });
          it('should generate a valid payload', function() {
            const req = discovery.queryEntities(queryPayload, noop);
            assert.equal(
              req.uri.href,
              service.url + paths.queryEntities + '?version=' + service.version
            );
          });
        });
        describe('credentials tests', function() {
          it('should create credentials', function() {
            const req = discovery.createCredentials(
              { environment_id: 'env-guid', source_type: 'box' },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.credentials + '?version=' + service.version
            );
            assert.equal(req.method, 'POST');
            assert.equal(JSON.parse(req.body).source_type, 'box');
          });

          it('should list credentials', function() {
            const req = discovery.listCredentials({ environment_id: 'env-guid' }, noop);
            assert.equal(
              req.uri.href,
              service.url + paths.credentials + '?version=' + service.version
            );
            assert.equal(req.method, 'GET');
          });

          it('should get credentials', function() {
            const req = discovery.getSourceCredentials(
              { environment_id: 'env-guid', credential_id: 'cred-guid' },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.credentials + '/cred-guid?version=' + service.version
            );
            assert.equal(req.method, 'GET');
          });

          it('should update credentials', function() {
            const req = discovery.updateCredentials(
              { environment_id: 'env-guid', credential_id: 'cred-guid', source_type: 'sharepoint' },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.credentials + '/cred-guid?version=' + service.version
            );
            assert.equal(req.method, 'PUT');
            assert.equal(JSON.parse(req.body).source_type, 'sharepoint');
          });

          it('should delete credentials', function() {
            const req = discovery.deleteCredentials(
              { environment_id: 'env-guid', credential_id: 'cred-guid' },
              noop
            );
            assert.equal(
              req.uri.href,
              service.url + paths.credentials + '/cred-guid?version=' + service.version
            );
            assert.equal(req.method, 'DELETE');
          });
        });
      });
    });
  });
});
