'use strict';

var nock = require('nock');
var watson = require('../../index');

var FIVE_SECONDS = 5000;
var TWO_SECONDS = 2000;

describe('natural_language_understanding', function() {
  this.timeout(FIVE_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.retries(1);

  var nlu;


  before(function() {
    nlu = new watson.NaturalLanguageUnderstandingV1({username: 'user', password: 'pass'});
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });


  it('analyze()', function() {
    const query = new nlu.QueryBuilder();
    query.getAllFeatures().withTextString('hello this is a test');
    nlu.analyze(query, null, function() { });
  });
});