'use strict';

const AlchemyDataNewsV1 = require('watson-developer-cloud/alchemy-data-news/v1');

const alchemy_data_news = new AlchemyDataNewsV1({
  api_key: '<api_key>'
});

// News about company acquisitions in the past 24 hours:
// More information: http://docs.alchemyapi.com/docs/introduction
const params = {
  start: 'now-1d',
  end: 'now',
  count: 100,
  'q.enriched.url.enrichedTitle.relations.relation': '|action.verb.text=acquire,object.entities.entity.type=Company|',
  return: 'enriched.url.title'
};

alchemy_data_news.getNews(params, function(err, news) {
  if (err) {
    console.log('error:', err);
  } else {
    console.log(JSON.stringify(news, null, 2));
  }
});
