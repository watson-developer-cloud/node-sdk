'use strict';

var assert = require('assert');
var watson = require('../index');
var helper = require('../lib/helper');

describe('wrapper', function() {

  var create_service = watson.speech_to_text;
  var vcap_services = {
    speech_to_text: [{
      credentials: {
        password: 'pass',
        url: 'http://ibm.com',
        username: 'user'
      }
    }]
  };

  it('should check for missing parameters', function() {
    assert.throws(function() {
        create_service(undefined);
      },
      /version/
    );
    assert.throws(function() {
        create_service({});
      },
      /version/
    );
  });

  it('should check for use_unauthenticated', function() {
    assert.ok(create_service({
      use_unauthenticated: true,
      version: 'v1'
    }));
    assert.throws(function() {
      create_service({
        use_unauthenticated: false,
        version: 'v1'
      });
    },
      /api_key or username and password were not specified/
    );
  });

  it('should check for missing version', function() {
    assert.throws(function() {
        create_service({
          username: 'user',
          password: 'pass'
        });
      },
      /version/
    );
    assert.throws(function() {
        create_service({
          api_key: 'keykeykey'
        });
      },
      /version/
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

  describe('env', function() {
    var env;
    before(function() {
      env = process.env;
      process.env = {};
    });
    after(function() {
      process.env = env;
    });

    it('should use VCAP_SERVICES to get credentials', function() {
      process.env.VCAP_SERVICES = JSON.stringify(vcap_services);
      var service = create_service({ version: 'v1', api_key: 'not-gonna-work'});

      // check api_key we get from VCAP_SERVICES
      assert.equal(service._options.api_key, 'not-gonna-work');
    });

    it('should use apikey (not documented) for alchemy service', function() {
      var service = watson.alchemy_language({ apikey: 'not-gonna-work'});
      assert.equal(service._options.api_key, 'not-gonna-work');
    });

    it('should use api_key for alchemy service', function() {
      var service = watson.alchemy_language({ api_key: 'not-gonna-work'});
      assert.equal(service._options.api_key, 'not-gonna-work');
    });

    it('should not use VCAP_SERVICES if use_vcap_services is false', function() {
      process.env.VCAP_SERVICES = JSON.stringify(vcap_services);
      var service = create_service({
        version: 'v1',
        api_key: 'not-gonna-work',
        use_vcap_services: false
      });

      // don't use VCAP_SERVICES if user_vcap_services == false
      assert.equal(service._options.api_key, 'not-gonna-work');
    });
  });


  it('should not delete parameters', function() {
    var service = create_service({
      version: 'v1',
      api_key: 'not-gonna-work',
      foo: 'bar',
      use_vcap_services: false,
      bar: 'foo'
    });

    // don't use VCAP_SERVICES if user_vcap_services == false
    assert.equal(service._options.api_key, 'not-gonna-work');
    assert.equal(service._options.foo, 'bar');
    assert.equal(service._options.bar, 'foo');
  });


  it('should throw an error when creating a search service instance', function(done) {
    try {
      watson.search({version: 'v1', api_key:''});
      done('Depracated service should not be created');
    } catch(e) {
      done();
    }
  });

  it('should throw an error when creating a message_resonance service instance', function(done) {
    try {
      watson.message_resonance({version: 'v1', api_key:''});
      done('Depracated service should not be created');
    } catch(e) {
      done();
    }
  });

  it('should throw an error when creating a inexistent service', function(done) {
    try {
      watson.not_a_real_service({version: 'v1', api_key:''});
      done('Inexistent service');
    } catch(e) {
      done();
    }
  });

  it('should ask for api_key when using an alchemy service', function(done) {
    try {
      watson.alchemy_language({version: 'v1'});
      done('service created without an api_key');
    } catch(e) {
      done();
    }
  });

  it('should alert users when trying to use a version without plan', function(done) {
    try {
      watson.question_and_answer({version: 'v1', api_key:''});
      done('service created without a proper version being specified');
    } catch(e) {
      done();
    }
  });

  it('should throw an error when creating a tone_analyzer v1 service instance', function(done) {
    try {
      watson.tone_analyzer({version: 'v1', api_key:''});
      done('Depracated service should not be created');
    } catch(e) {
      done();
    }
  });

  it('should detect the alchemy format', function() {
    assert.equal(null, helper.getFormat());
    assert.equal(null, helper.getFormat(null));
    assert.equal(null, helper.getFormat(null, null));
    assert.equal(null, helper.getFormat({}, null));
    assert.equal(null, helper.getFormat({ foo:'foo', bar:'bar'}, null));
    assert.equal('foo', helper.getFormat({ foo:'foo'}, ['foo']));
    assert.equal('bar', helper.getFormat({ foo:'foo', bar:'bar'}, ['bar', 'foo']));
  });
});
