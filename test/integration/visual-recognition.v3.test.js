'use strict';
const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const VisualRecognitionV3 = require('../../visual-recognition/v3');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

const THIRTY_SECONDS = 30000;

describe('visual recognition v3 integration', () => {
  // ugh.
  jest.setTimeout(THIRTY_SECONDS * 4);

  const options = authHelper.auth.visualRecognition;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const visualRecognition = new VisualRecognitionV3(
    Object.assign({}, options, {
      version: '2019-03-27',
    })
  );

  describe('classify()', () => {
    it('should classify an uploaded image', done => {
      const params = {
        imagesFile: fs.createReadStream(__dirname + '/../resources/car.png'),
      };
      visualRecognition.classify(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.images_processed).toBe(1);
        expect(result.images[0].image).toBe('car.png');
        expect(result.images[0].classifiers.length).toBeTruthy();
        expect(
          result.images[0].classifiers[0].classes.some(c => {
            return c.class === 'car';
          })
        ).toBe(true);

        done();
      });
    });

    it('should classify from a buffer', done => {
      const params = {
        imagesFile: fs.readFileSync(__dirname + '/../resources/car.png'),
      };
      visualRecognition.classify(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.images_processed).toBe(1);
        expect(result.images[0].classifiers.length).toBeTruthy();
        expect(
          result.images[0].classifiers[0].classes.some(c => {
            return c.class === 'car';
          })
        ).toBe(true);

        done();
      });
    });

    it('should classify an image via url', done => {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/car.png',
      };
      visualRecognition.classify(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        expect(result.images_processed).toBe(1);
        expect(result.images[0].resolved_url).toBe(
          'https://watson-test-resources.mybluemix.net/resources/car.png'
        );
        expect(result.images[0].source_url).toBe(
          'https://watson-test-resources.mybluemix.net/resources/car.png'
        );
        expect(result.images[0].classifiers.length).toBeTruthy();
        expect(
          result.images[0].classifiers[0].classes.some(c => {
            return c.class === 'car';
          })
        ).toBe(true);

        done();
      });
    });
  });
}); // vr
