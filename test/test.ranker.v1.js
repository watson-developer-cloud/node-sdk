'use strict';

var watson = require('../lib/index');
var fs = require('fs');
var nock = require('nock');

var service = {
  username: '0475fdfa-753f-4f4a-bd75-defcb94ee9de',
  password: 'hDERI6dbPINd',
  url: 'https://gateway-d.watsonplatform.net/retrieve-and-rank/api',
  version: 'v1'
};

var service = watson.retrieve_and_rank(service);

describe('ranker', function() {
  before(function () {
    nock.enableNetConnect();
  });

  after(function () {});

  it('create a ranker, get its status and rank with it', function(done) {
    this.timeout(20000000);

    var training_data = fs.createReadStream(__dirname + '/resources/ranker_train.csv');
    var ranker_test = fs.createReadStream(__dirname + '/resources/ranker_test.csv');

    service.createRanker({training_data: training_data}, function(err, ranker) {
        if (err) {
          return done(err);
        }

      var processStatus = function(err, rankerStatus) {
        console.log('rankerStatus:',rankerStatus);
        if (err) {
          return done(err);
        }

        //if Awaiting Work or In Flight
        if (rankerStatus.status !== 'Available') {
          setTimeout(function() {
            service.rankerStatus(ranker, processStatus);
          }, 4000);

        } else { // if done

          service.rank({
            ranker_id: ranker.ranked_id,
            answer_data: ranker_test,
            answer_metadata: { answers: 5}
          }, done);
        }
      };

      service.rankerStatus(ranker, processStatus);
    });
  });

  it('rank_with_ranker', function(done) {
    this.timeout(20000000);
    var params = {
      ranker_id: 'F12207-rank-6',
      answer_data: fs.createReadStream(__dirname + '/resources/ranker_test.csv'),
      answer_metadata: { answers: 5}
    };

    service.rank(params, function(err, ranker) {
      if (err) {
        return done(err);
      } else {
        console.log(ranker);
        return done();
      }
    });
  });
});
