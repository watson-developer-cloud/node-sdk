'use strict';

const nock = require('nock');
const watson = require('../../index');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const FIVE_SECONDS = 5000;
const TWO_SECONDS = 2000;

describe('alchemy_data_news_integration', function() {
  this.timeout(FIVE_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let alchemy_data_news;

  before(function() {
    alchemy_data_news = watson.alchemy_data_news(auth.alchemy);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('getNews()', function(done) {
    alchemy_data_news.getNews(
      {
        start: 'now-1d',
        end: 'now',
        count: 100,
        'q.enriched.url.enrichedTitle.relations.relation': '|action.verb.text=acquire,object.entities.entity.type=Company|',
        return: 'enriched.url.title'
      },
      done
    );
  });
});
