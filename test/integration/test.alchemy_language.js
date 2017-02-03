'use strict';

const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

describe('alchemy_language_integration', function() {
  this.timeout(THIRTY_SECONDS * 5);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let alchemy_language;
  let text;

  before(function() {
    alchemy_language = watson.alchemy_language(auth.alchemy);
    text = fs.readFileSync(__dirname + '/../resources/alchemy-text.txt', 'utf8');
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('entities()', function(done) {
    alchemy_language.entities(
      {
        text: text
      },
      done
    );
  });

  it('keywords()', function(done) {
    alchemy_language.keywords(
      {
        text: text
      },
      done
    );
  });

  it('concepts()', function(done) {
    alchemy_language.concepts(
      {
        text: text
      },
      done
    );
  });

  it('emotion()', function(done) {
    alchemy_language.emotion(
      {
        text: text
      },
      done
    );
  });

  it('sentiment()', function(done) {
    alchemy_language.sentiment(
      {
        text: text
      },
      done
    );
  });

  it('sentiment_targeted()', function(done) {
    alchemy_language.sentiment(
      {
        text: text,
        target: 'Peter Higgs'
      },
      done
    );
  });

  it('sentiment_multiple_targets_with_pipe()', function(done) {
    alchemy_language.sentiment(
      {
        text: text,
        targets: 'United States|Peter Higgs'
      },
      done
    );
  });

  it('sentiment_multiple_targets_with_array()', function(done) {
    alchemy_language.sentiment(
      {
        text: text,
        targets: ['United States', 'Peter Higgs']
      },
      done
    );
  });

  it('category()', function(done) {
    alchemy_language.category(
      {
        text: text
      },
      done
    );
  });

  it('publicationDate()', function(done) {
    alchemy_language.publicationDate(
      {
        html: text
      },
      done
    );
  });

  it('relations()', function(done) {
    alchemy_language.relations(
      {
        text: text
      },
      done
    );
  });

  it('language()', function(done) {
    alchemy_language.language(
      {
        text: text
      },
      done
    );
  });

  it('text()', function(done) {
    alchemy_language.text(
      {
        html: text
      },
      done
    );
  });

  it('text_raw()', function(done) {
    alchemy_language.text(
      {
        html: text,
        raw: true
      },
      done
    );
  });

  it('authors()', function(done) {
    alchemy_language.authors(
      {
        html: text
      },
      done
    );
  });

  it('feeds()', function(done) {
    alchemy_language.feeds(
      {
        url: 'https://developer.ibm.com/watson/blog/'
      },
      done
    );
  });

  it('microformats()', function(done) {
    alchemy_language.microformats(
      {
        url: 'http://www.alchemyapi.com/products/alchemylanguage/microformats-parsing'
      },
      done
    );
  });

  it('taxonomy()', function(done) {
    alchemy_language.taxonomy(
      {
        html: text
      },
      done
    );
  });

  it('combined()', function(done) {
    alchemy_language.combined(
      {
        text: text
      },
      done
    );
  });

  describe('typedRelations()', function() {
    it('should process html', function(done) {
      alchemy_language.typedRelations(
        {
          html: text
        },
        done
      );
    });

    it('should process text', function(done) {
      alchemy_language.typedRelations(
        {
          text: text
        },
        done
      );
    });
  });
});
