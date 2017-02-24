'use strict';

const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const path = require('path');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWO_MINUTES = 2 * 60 * 10000;
const TWO_SECONDS = 2000;
const TWENTY_SECONDS = 20 * 1000;

describe('alchemy_vision_integration', function() {
  this.timeout(TWO_MINUTES);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let alchemy_vision;
  let imageFile;

  before(function() {
    alchemy_vision = watson.alchemy_vision(auth.alchemy);
    imageFile = fs.createReadStream(path.join(__dirname, '../resources/obama.jpg'));
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('getImageLinks() with url', function(done) {
    alchemy_vision.getImageLinks(
      {
        url: 'http://www.ibm.com/'
      },
      done
    );
  });

  it('getImageLinks() with html', function(done) {
    alchemy_vision.getImageLinks(
      {
        html: '<div><img src="https://watson-test-resources.mybluemix.net/resources/obama.jpg" /></div>'
      },
      done
    );
  });

  it('getImageKeywordsWithFile()', function(done) {
    alchemy_vision.getImageKeywords({ image: imageFile }, done);
  });

  it('getImageKeywordsWithUrl()', function(done) {
    alchemy_vision.getImageKeywords(
      {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
      },
      done
    );
  });

  // this service endpoint is super-flaky, disabling the test for now
  it.skip('recognizeFacesWithFile()', function(done) {
    this.timeout(TWENTY_SECONDS * 6);
    this.retries(5);
    alchemy_vision.recognizeFaces({ image: imageFile }, done);
  });

  it.skip('recognizeFacesWithUrl()', function(done) {
    alchemy_vision.recognizeFaces(
      {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
      },
      done
    );
  });

  // currently failing due to a service-level issue
  it.skip('getImageSceneText()', function(done) {
    alchemy_vision.getImageSceneText(
      {
        url: 'https://watson-test-resources.mybluemix.net/resources/open.png'
      },
      done
    );
  });
});
