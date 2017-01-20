'use strict';

var nock = require('nock');
var watson = require('../../index');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

var FIVE_SECONDS = 5000;
var TWO_SECONDS = 2000;


describe('alchemy_data_news_integration', function() {
  this.timeout(FIVE_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long

  this.retries(1);

  var alchemy_data_news;


  before(function() {
    alchemy_data_news = watson.alchemy_data_news(auth.alchemy);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });


  it('getNews()', function(done) {
    alchemy_data_news.getNews({
      start: 'now-1d',
      end: 'now',
      count: 100,
      'q.enriched.url.enrichedTitle.relations.relation': '|action.verb.text=acquire,object.entities.entity.type=Company|',
      return: 'enriched.url.title'
    }, done);
  });
});
