'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock   = require('nock');
var qs     = require('querystring');
var extend = require('extend');

describe('concept_insights', function() {

  var noop = function() {};

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
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

  describe('getCorpus()', function(){

    it('should generate a valid payload', function() {
        var corpus = {},
          path = '/v1/corpus';

        nock(service.url).persist()
        .get(path)
        .reply(200, corpus);

        var req = concept_insights.getCorpus(null, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('deleteCorpus()', function(){

    it('should check no parameters provided', function() {
      concept_insights.deleteCorpus({}, missingParameter);
      concept_insights.deleteCorpus({user:''}, missingParameter);
      concept_insights.deleteCorpus({corpus:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test';

        nock(service.url).persist()
        .delete(path)
        .reply(200);

        var req = concept_insights.deleteCorpus({
            user:'public',
            corpus:'test'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'DELETE');
    });
  });

  describe('getDocumentIds()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getDocumentIds({}, missingParameter);
      concept_insights.getDocumentIds({user:''}, missingParameter);
      concept_insights.getDocumentIds({corpus:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test';

        nock(service.url).persist()
        .get(path)
        .reply(200);

        var req = concept_insights.getDocumentIds({
            user:'public',
            corpus:'test'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('createCorpus()', function(){

    it('should check no parameters provided', function() {
      concept_insights.createCorpus({}, missingParameter);
      concept_insights.createCorpus({user:''}, missingParameter);
      concept_insights.createCorpus({corpus:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test';

        nock(service.url).persist()
        .put(path)
        .reply(200);

        var req = concept_insights.createCorpus({
            user:'public',
            corpus:'test'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'PUT');
    });
  });

  describe('deleteDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.deleteDocument({}, missingParameter);
      concept_insights.deleteDocument({user:''}, missingParameter);
      concept_insights.deleteDocument({corpus:''}, missingParameter);
      concept_insights.deleteDocument({corpus:'', user:''}, missingParameter);
      concept_insights.deleteDocument({corpus:'', documentid:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test/foo';

        nock(service.url).persist()
        .delete(path)
        .reply(200);

        var req = concept_insights.deleteDocument({
            user:'public',
            corpus:'test',
            documentid: 'foo'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'DELETE');
    });
  });

  describe('getDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getDocument({}, missingParameter);
      concept_insights.getDocument({user:''}, missingParameter);
      concept_insights.getDocument({corpus:''}, missingParameter);
      concept_insights.getDocument({corpus:'', user:''}, missingParameter);
      concept_insights.getDocument({corpus:'', documentid:''}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test/foo';

        nock(service.url).persist()
        .get(path)
        .reply(200);

        var req = concept_insights.getDocument({
            user:'public',
            corpus:'test',
            documentid: 'foo'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'GET');
    });
  });

  describe('updateDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.updateDocument({}, missingParameter);
      concept_insights.updateDocument({user:''}, missingParameter);
      concept_insights.updateDocument({corpus:''}, missingParameter);
      concept_insights.updateDocument({corpus:'', user:''}, missingParameter);
      concept_insights.updateDocument({corpus:'', documentid:''}, missingParameter);
      concept_insights.updateDocument({document:{label:'foo'}}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test/foo';

        nock(service.url).persist()
        .post(path)
        .reply(200);

        var req = concept_insights.updateDocument({
            user:'public',
            corpus:'test',
            documentid: 'foo'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'POST');
    });
  });

  describe('createDocument()', function(){

    it('should check no parameters provided', function() {
      concept_insights.createDocument({}, missingParameter);
      concept_insights.createDocument({user:''}, missingParameter);
      concept_insights.createDocument({corpus:''}, missingParameter);
      concept_insights.createDocument({corpus:'', user:''}, missingParameter);
      concept_insights.createDocument({corpus:'', documentid:''}, missingParameter);
      concept_insights.createDocument({document:{label:'foo'}}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/corpus/public/test/foo';

        nock(service.url).persist()
        .put(path)
        .reply(200);

        var req = concept_insights.createDocument({
            user:'public',
            corpus:'test',
            documentid: 'foo'
          }, noop);
        assert.equal(req.uri.href, service.url + path);
        assert.equal(req.method, 'PUT');
    });
  });

  describe('getConceptsMetadata()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getConceptsMetadata({}, missingParameter);
      concept_insights.getConceptsMetadata({ids:'asd'}, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/graph',
          payload = {ids:['foo','bar']},
          service_request = extend(
            {func: 'minfo'},
            payload,
            { ids:JSON.stringify(payload.ids) }),
          service_response = [{
            'abstract': 'a1',
            'id': 'id1',
            'label': 'label1',
            'link': 'link1',
            'type': 'type1'
          },{
            'abstract': 'a2',
            'id': 'id2',
            'label': 'label2',
            'link': 'link2',
            'type': 'type2'
          }];

        nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

        var req = concept_insights.getConceptsMetadata(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });

  describe('searchConceptByLabel()', function(){

    it('should check no parameters provided', function() {
      concept_insights.searchConceptByLabel({}, missingParameter);
      concept_insights.searchConceptByLabel({prefix:true}, missingParameter);
      concept_insights.searchConceptByLabel({graph:'', user:''}, missingParameter);
      concept_insights.searchConceptByLabel({label:''}, missingParameter);
      concept_insights.searchConceptByLabel(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/graph/public/test',
          payload = {label: 'foo', user:'public', graph:'test'},
          service_request = extend({func: 'labelSearch'},
            {label: payload.label}),
          service_response = [{
            'abstract': 'a1',
            'id': 'id1',
            'label': 'label1',
            'link': 'link1',
            'type': 'type1'
          },{
            'abstract': 'a2',
            'id': 'id2',
            'label': 'label2',
            'link': 'link2',
            'type': 'type2'
          }];

        nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

        var req = concept_insights.searchConceptByLabel(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });

  describe('getRelatedConcept()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getRelatedConcept({}, missingParameter);
      concept_insights.getRelatedConcept({concepts:true}, missingParameter);
      concept_insights.getRelatedConcept({graph:'', user:''}, missingParameter);
      concept_insights.getRelatedConcept({label:''}, missingParameter);
      concept_insights.getRelatedConcept(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/graph/public/test',
          payload = {concepts: ['foo'], user:'public', graph:'test'},
          service_request = extend({func: 'related'},
            {concepts: JSON.stringify(payload.concepts)}),
          service_response = [{
            'abstract': 'a1',
            'id': 'id1',
            'label': 'label1',
            'link': 'link1',
            'type': 'type1'
          },{
            'abstract': 'a2',
            'id': 'id2',
            'label': 'label2',
            'link': 'link2',
            'type': 'type2'
          }];

        nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

        var req = concept_insights.getRelatedConcept(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });

  describe('annotateText()', function(){

    it('should check no parameters provided', function() {
      concept_insights.annotateText({}, missingParameter);
      concept_insights.annotateText({graph:'', user:''}, missingParameter);
      concept_insights.annotateText({text:''}, missingParameter);
      concept_insights.annotateText(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/graph/public/test?func=annotateText',
          payload = {user:'public', graph:'test', text:'this is a test'},
          service_request = '"' + payload.text + '"',
          service_response = [{
            'abstract': 'a1',
            'id': 'id1',
            'label': 'label1',
            'link': 'link1',
            'type': 'type1'
          },{
            'abstract': 'a2',
            'id': 'id2',
            'label': 'label2',
            'link': 'link2',
            'type': 'type2'
          }];

        nock(service.url).persist()
        .post(path, service_request)
        .reply(200, service_response);

        var req = concept_insights.annotateText(payload, noop);
        assert.equal(req.uri.href, service.url + path);
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(body, service_request);
        assert.equal(req.method, 'POST');
    });
  });

  describe('labelSearch()', function(){

    it('should check no parameters provided', function() {
      concept_insights.labelSearch({}, missingParameter);
      concept_insights.labelSearch({corpus:'', user:''}, missingParameter);
      concept_insights.labelSearch({query:''}, missingParameter);
      concept_insights.labelSearch(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/searchable/public/test',
          payload = {user:'public', corpus:'test', query:'bar'},
          service_request = {func: 'labelSearch', query:'bar'},
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

        var req = concept_insights.labelSearch(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });

  describe('semanticSearch()', function(){

    it('should check no parameters provided', function() {
      concept_insights.semanticSearch({}, missingParameter);
      concept_insights.semanticSearch({corpus:'', user:''}, missingParameter);
      concept_insights.semanticSearch({label:''}, missingParameter);
      concept_insights.semanticSearch(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/searchable/public/test',
          payload = {user:'public', corpus:'test', ids:['bar', 'foo']},
          service_request = {func: 'semanticSearch', ids:payload.ids},
          service_response = {
            'stage': 'ready',
            'status': 'done',
            'timestamp': '2014-03-31T20:04:57.74-04:00'
          };

        // format the service_request params the way the actual API expects
        service_request.ids = JSON.stringify(service_request.ids);

        nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);


        var req = concept_insights.semanticSearch(payload, noop);
        var actual = req.uri.href,
            expected = service.url + path + '?' + qs.stringify(service_request);
        assert.equal(actual, expected);
        assert.equal(req.method, 'GET');
    });

    it('should still allow pre-stringified ids for backwards compatibility', function() {
      var path = '/v1/searchable/public/test',
        ids = ['bar', 'foo'],
        payload = {user:'public', corpus:'test', ids: JSON.stringify(ids)},
        service_request = {func: 'semanticSearch', ids:payload.ids},
        service_response = {
          'stage': 'ready',
          'status': 'done',
          'timestamp': '2014-03-31T20:04:57.74-04:00'
        };

      // format the service_request params the way the actual API expects
      service_request.ids = JSON.stringify(ids);

      nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);


      var req = concept_insights.semanticSearch(payload, noop);
      var actual = req.uri.href,
        expected = service.url + path + '?' + qs.stringify(service_request);
      assert.equal(actual, expected);
      assert.equal(req.method, 'GET');
    });

    it('should not accept a single string for the ids', function() {
      concept_insights.semanticSearch({user:'public', corpus:'test', ids: 'foo'}, missingParameter);
    });
  });

  describe('getDocumentState()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getDocumentState({}, missingParameter);
      concept_insights.getDocumentState({corpus:'', user:''}, missingParameter);
      concept_insights.getDocumentState({label:''}, missingParameter);
      concept_insights.getDocumentState(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/searchable/public/test/foo',
          payload = {user:'public', corpus:'test', documentid:'foo'},
          service_request = {func: 'getState'},
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

        var req = concept_insights.getDocumentState(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });

  describe('getDocumentToConceptScore()', function(){

    it('should check no parameters provided', function() {
      concept_insights.getDocumentToConceptScore({}, missingParameter);
      concept_insights.getDocumentToConceptScore({corpus:'', user:''}, missingParameter);
      concept_insights.getDocumentToConceptScore({label:''}, missingParameter);
      concept_insights.getDocumentToConceptScore(null, missingParameter);
    });

    it('should generate a valid payload', function() {
        var path = '/v1/searchable/public/test/foo',
          payload = {
            user:'public', corpus:'test',
            documentid:'foo', dest:['foo']
          },
          service_request = {func: 'relScore', dest:payload.dest},
          service_response = {'score': 0.95};

        nock(service.url).persist()
        .get(path, service_request)
        .reply(200, service_response);

        var req = concept_insights.getDocumentToConceptScore(payload, noop);
        assert.equal(req.uri.href, service.url + path + '?' +
          qs.stringify(service_request));

        assert.equal(req.method, 'GET');
    });
  });
});
