'use strict';

var assert = require('assert');
var watson = require('../lib/index');

describe('wrapper', function() {

  var create_service = watson.message_resonance;

  it('should check for missing parameters', function() {
    assert.throws(function() {
        create_service(undefined);
      },
      /version was not specified/
    );
    assert.throws(function() {
        create_service({});
      },
      /version was not specified/
    );
  });

  it('should check for missing version', function() {
    assert.throws(function() {
        create_service({
          username: 'user',
          password: 'pass'
        });
      },
      /version was not specified/
    );
    assert.throws(function() {
        create_service({
          api_key: 'keykeykey'
        });
      },
      /version was not specified/
    );
  });

  it('should check for missing authentication', function() {
    assert.throws(function() {
        create_service({
          version: 'v1',
          username: 'user'
        });
      },
      /api_key or username and password were not specified/
    );
    assert.throws(function() {
        create_service({
          version: 'v1',
          password: 'pass'
        });
      },
      /api_key or username and password were not specified/
    );

    assert.ok(create_service({
      api_key: 'keykeykey',
      version: 'v1'
    }));
    assert.ok(create_service({
      password: 'pass',
      username: 'user',
      version: 'v1'
    }));
  });

});