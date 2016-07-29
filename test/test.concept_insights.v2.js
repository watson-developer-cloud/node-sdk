'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var qs     = require('querystring');
var extend = require('extend');

/* To do:
 ConceptInsightsAccounts.prototype.getAccountsInfo = function(params, callback) {
 ConceptInsightsCorpora.prototype.listCorpora = function(params, callback) {
 ConceptInsightsCorpora.prototype.getDocumentAnnotations = function(params, callback) {
 ConceptInsightsCorpora.prototype.getCorpusProcessingState = function(params, callback) {
 ConceptInsightsCorpora.prototype.getCorpusStats = function(params, callback) {
 ConceptInsightsCorpora.prototype.getRelatedConcepts = function(params, callback) {
 ConceptInsightsCorpora.prototype.getRelationScores = function(params, callback) {
 */

describe('concept_insights.v2', function() {

  var noop = function() {};

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v2'
  };

  before(function() {
    nock.disableNetConnect();
  });

  after(function() {
    nock.cleanAll();
  });

  var concept_insights = watson.concept_insights(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('corpora.getCorpus()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.getCorpus({}, missingParameter);
    });
    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var corpus = {},
        path = '/v2' + corpusid;

      nock(service.url)
        .get(path)
        .reply(200, corpus);

      var req = concept_insights.corpora.getCorpus({ 'corpus' : corpusid }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('corpora.deleteCorpus()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.deleteCorpus({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var path = '/v2' + corpusid;

      nock(service.url)
        .delete(path)
        .reply(200);

      var req = concept_insights.corpora.deleteCorpus({
        corpus: corpusid
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('corpora.listDocuments()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.listDocuments({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var path = '/v2' + corpusid + '/documents';

      nock(service.url)
        .get(path)
        .reply(200);

      var req = concept_insights.corpora.listDocuments({
        corpus: corpusid
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });

    it('should allow arbitrary limit values', function(done) {
      var corpusid = '/corpora/testa/testu';

      var scope = nock('http://ibm.com:80', {"encodedQueryParams":true})
        .get('/v2/corpora/testa/testu/documents')
        .query({"limit":"123"})
        .reply(204);

      concept_insights.corpora.listDocuments({
        corpus: corpusid,
        limit: 123
      }, function(err) {
        if (err) {
          return done(err);
        }
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('corpora.createCorpus()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.createCorpus({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var path = '/v2' + corpusid;

      nock(service.url).persist()
        .put(path)
        .reply(200);

      var req = concept_insights.corpora.createCorpus({
        corpus: corpusid
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'PUT');
    });
  });

  describe('corpora.deleteDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.deleteDocument({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var documentid = '/corpora/testa/testu/documents/testd';
      var path = '/v2' + documentid;

      nock(service.url).persist()
        .delete(path)
        .reply(200);

      var req = concept_insights.corpora.deleteDocument({
        id: documentid
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('corpora.getDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.getDocument({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var documentid = '/corpora/testa/testu/documents/testd';
      var path = '/v2' + documentid;

      nock(service.url).persist()
        .get(path)
        .reply(200);

      var req = concept_insights.corpora.getDocument({
        id: documentid
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('corpora.updateDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.updateDocument({}, missingParameter);
      concept_insights.corpora.updateDocument({id:''}, missingParameter);
      concept_insights.corpora.updateDocument({document:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var documentid = '/corpora/testa/testu/documents/testd';
      var path = '/v2' + documentid;

      nock(service.url).persist()
        .post(path)
        .reply(200);

      var req = concept_insights.corpora.updateDocument({
        id: documentid,
        document: {}
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'POST');
    });
  });

  describe('corpora.createDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.createDocument({}, missingParameter);
      concept_insights.corpora.createDocument({id:''}, missingParameter);
      concept_insights.corpora.createDocument({document:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var documentid = '/corpora/testa/testu/documents/testd';
      var path = '/v2' + documentid;

      nock(service.url).persist()
        .put(path)
        .reply(200);

      var req = concept_insights.corpora.createDocument({
        id : documentid,
        document : {}
      }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'PUT');
    });
  });

  describe('graphs.getConcept()', function(){

    it('should check no parameters provided', function() {
      concept_insights.graphs.getConcept({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var conceptid = '/graphs/wikipedia/en20120601/nodes/IBM';
      var path = '/v2' + conceptid;
      var service_response = {
        'abstract': 'a1',
        'id': 'id1',
        'label': 'label1',
        'link': 'link1'
      };

      nock(service.url).persist()
        .get(path)
        .reply(200, service_response);

      var req = concept_insights.graphs.getConcept({ id: conceptid }, noop);
      assert.equal(req.uri.href, service.url + path);
      assert.equal(req.method, 'GET');
    });
  });

  describe('graphs.searchConceptByLabel()', function(){

    it('should check no parameters provided', function() {
      concept_insights.graphs.searchConceptByLabel({}, missingParameter);
      concept_insights.graphs.searchConceptByLabel({graph:''}, missingParameter);
      concept_insights.graphs.searchConceptByLabel({query:''}, missingParameter);
      concept_insights.graphs.searchConceptByLabel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var graphid = '/graphs/wikipedia/en20120601';
      var path = '/v2' + graphid + '/label_search',
        payload = {graph: graphid, query: 'foo'},
        service_request = extend({query: payload.query}),
        service_response = {
          'matches': [ {
            'id': 'id1',
            'label': 'label1'
          },{
            'id': 'id2',
            'label': 'label2'
          } ] };

      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

      var req = concept_insights.graphs.searchConceptByLabel(payload, noop);
      assert.equal(req.uri.href, service.url + path + '?' +
        qs.stringify(service_request));

      assert.equal(req.method, 'GET');
    });
  });

  describe('graphs.getRelatedConcepts()', function(){

    it('should check no parameters provided', function() {
      concept_insights.graphs.getRelatedConcepts({}, missingParameter);
      concept_insights.graphs.getRelatedConcepts({concepts: [] }, missingParameter);
      concept_insights.graphs.getRelatedConcepts({graph:''}, missingParameter);
      concept_insights.graphs.getRelatedConcepts(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var graphid = '/graphs/wikipedia/en20120601';
      var path = '/v2' + graphid + '/related_concepts',
        payload = {graph: graphid, concepts: ['foo','bar'] },
        service_request = extend({concepts: payload.concepts}),
        service_response = {
          'concepts': [ {
            'concept': 'id1',
            'score': 0.9
          },{
            'concept': 'id2',
            'score': 0.8
          } ] };
      service_request.concepts = JSON.stringify(service_request.concepts);
      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

      var req = concept_insights.graphs.getRelatedConcepts(payload, noop);
      assert.equal(req.uri.href, service.url + path + '?' +
        qs.stringify(service_request));

      assert.equal(req.method, 'GET');
    });
  });

  describe('graphs.annotateText()', function(){

    it('should check no parameters provided', function() {
      concept_insights.graphs.annotateText({}, missingParameter);
      concept_insights.graphs.annotateText({graph:''}, missingParameter);
      concept_insights.graphs.annotateText({text:''}, missingParameter);
      concept_insights.graphs.annotateText(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var graphid = '/graphs/wikipedia/en20120601';
      var path = '/v2' + graphid + '/annotate_text';
      var payload = {graph: graphid, text:'this is a test'},
        service_request =  payload.text,
        service_response = { };

      nock(service.url).persist()
        .post(path, service_request)
        .reply(200, service_response);

      var req = concept_insights.graphs.annotateText(payload, noop);
      assert.equal(req.uri.href, service.url + path);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(body, service_request);
      assert.equal(req.method, 'POST');
    });
  });

  describe('graphs.getRelationScores()', function(){

    it('should check no parameters provided', function() {
      concept_insights.graphs.getRelationScores({}, missingParameter);
      concept_insights.graphs.getRelationScores({concepts: ''}, missingParameter);
      concept_insights.graphs.getRelationScores({id:''}, missingParameter);
      concept_insights.graphs.getRelationScores(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var conceptid = '/graphs/wikipedia/en20120601/nodes/IBM';
      var path = '/v2' + conceptid + '/relation_scores',
        payload = {id: conceptid, concepts: ['',''] },
        service_request = {concepts: payload.concepts},
        service_response = { };

      service_request.concepts = JSON.stringify(service_request.concepts);

      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

      var req = concept_insights.graphs.getRelationScores(payload, noop);
      assert.equal(req.uri.href, service.url + path + '?' +
        qs.stringify(service_request));

      assert.equal(req.method, 'GET');
    });
  });

  describe('corpora.searchByLabel()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.searchByLabel({}, missingParameter);
      concept_insights.corpora.searchByLabel({corpus:''}, missingParameter);
      concept_insights.corpora.searchByLabel({query:''}, missingParameter);
      concept_insights.corpora.searchByLabel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var path = '/v2' + corpusid + '/label_search';
      var payload = {corpus: corpusid, query:'bar'},
        service_request = {query:'bar'},
        service_response = [{
          'id': 'id1',
          'label': 'label1'
        },{
          'id': 'id2',
          'label': 'label2'
        }];

      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

      var req = concept_insights.corpora.searchByLabel(payload, noop);
      assert.equal(req.uri.href, service.url + path + '?' +
        qs.stringify(service_request));

      assert.equal(req.method, 'GET');
    });
  });

  describe('corpora.getRelatedDocuments()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.getRelatedDocuments({}, missingParameter);
      concept_insights.corpora.getRelatedDocuments({corpus:''}, missingParameter);
      concept_insights.corpora.getRelatedDocuments({ids: [] }, missingParameter);
      concept_insights.corpora.getRelatedDocuments(null, missingParameter);
    });

    it('should generate a valid payload', function() {
      var corpusid = '/corpora/testa/testu';
      var path = '/v2' + corpusid + '/conceptual_search';
      var payload = {corpus:corpusid, ids:['bar', 'foo']},
        service_request = {
          ids:   ['bar', 'foo']
        },
        service_response = {
        };

      // format the service_request params the way the actual API expects
      service_request.ids = JSON.stringify(service_request.ids);

      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);


      var req = concept_insights.corpora.getRelatedDocuments(payload, noop);
      var actual = req.uri.href,
        expected = service.url + path + '?' + qs.stringify(service_request);
      assert.equal(actual, expected);
      assert.equal(req.method, 'GET');
    });


    it('should not accept a single string for the ids', function() {
      concept_insights.corpora.getRelatedDocuments({corpus:'test', ids: 'foo'}, missingParameter);
    });
  });

  describe('corpora.getDocumentState()', function(){

    it('should check no parameters provided', function() {
      concept_insights.corpora.getDocumentProcessingState({}, missingParameter);
    });

    it('should generate a valid payload', function() {
      var documentid = '/corpora/testa/testu/documents/testd';
      var path = '/v2' + documentid + '/processing_state';
      var payload = {id: documentid},
        service_response = { };

      nock(service.url).persist()
        .get(path)
        .reply(200, service_response);

      var req = concept_insights.corpora.getDocumentProcessingState(payload, noop);
      assert.equal(req.uri.href, service.url + path);

      assert.equal(req.method, 'GET');
    });
  });

});
