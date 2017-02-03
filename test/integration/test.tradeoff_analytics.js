'use strict';

const nock = require('nock');
const watson = require('../../index');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

describe('tradeoff_analytics_integration', function() {
  this.timeout(TWENTY_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let tradeoff_analytics;

  before(function() {
    tradeoff_analytics = watson.tradeoff_analytics(auth.tradeoff_analytics);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('dilemmas()', function(done) {
    const params = {
      subject: 'phone',
      columns: [
        {
          key: 'price',
          full_name: 'Price (Eur)',
          type: 'NUMERIC',
          is_objective: true,
          goal: 'MIN'
        },
        {
          key: 'RAM',
          full_name: 'RAM (MB)',
          type: 'NUMERIC',
          is_objective: false,
          goal: 'MAX'
        },
        {
          key: 'screen_size',
          full_name: 'Screen size (inch)',
          type: 'NUMERIC',
          is_objective: true,
          goal: 'MAX'
        },
        {
          key: 'camera',
          full_name: 'Camera (MP)',
          type: 'NUMERIC',
          is_objective: true,
          goal: 'MAX'
        },
        {
          key: 'memory_size',
          full_name: 'Memory size (GB)',
          type: 'NUMERIC',
          is_objective: false,
          goal: 'MAX'
        },
        {
          key: 'battery',
          full_name: 'Battery (mAh)',
          type: 'NUMERIC',
          is_objective: false,
          goal: 'MAX'
        },
        {
          key: 'weight',
          full_name: 'Weight (gr)',
          type: 'NUMERIC',
          is_objective: true,
          goal: 'MIN'
        }
      ],
      options: [
        {
          key: ' 1',
          name: 'Samsung Galaxy S4 White',
          values: {
            weight: 130,
            price: 239,
            RAM: 2048,
            battery: 2600,
            camera: 13,
            memory_size: 16,
            screen_size: 5
          }
        },
        {
          key: '2',
          name: 'Samsung Galaxy S4 Black',
          values: {
            weight: 130,
            price: 239,
            RAM: 2048,
            battery: 2600,
            camera: 13,
            memory_size: 16,
            screen_size: 5
          }
        },
        {
          key: '3',
          name: 'Samsung Galaxy S3 White',
          values: {
            weight: 133,
            price: 79,
            RAM: 2048,
            battery: 2100,
            camera: 8,
            memory_size: 16,
            screen_size: 4.8
          }
        }
      ]
    };
    tradeoff_analytics.dilemmas(params, done);
  });

  // for the last two days, this test has been consistently failing on Travis CI for Node v6 and v7,
  // but passing for v4 on travis and any version on my laptop
  // not sure what's up.
  it.skip('events()', function(done) {
    const params = [
      {
        widget_instance_uuid: 'e8d263d9-a0a7-43f4-81cf-2767ad246cb5',
        widget_show_uuid: null,
        dilemma_call_uuid: null,
        event_number: 0,
        category: 'widget',
        action: 'started',
        object: 'basic',
        value: {
          optionHighlighting: false,
          favorites: true,
          favoritesTab: false,
          optionDetails: true,
          filters: true,
          filterHistogram: false,
          objectivesOnly: true,
          optimalsList: true,
          autoExcludedList: true,
          incompleteList: true,
          tradeoffAnalyzer: true,
          undoRedo: false,
          exploreViz: 'both',
          questionEditor: 'editableNoToggle',
          bidiTextDir: 'auto',
          analytics: 'MetadataAndEvents'
        },
        timestamp: 1442414658641
      }
    ];
    tradeoff_analytics.events(params, done);
  });
});
