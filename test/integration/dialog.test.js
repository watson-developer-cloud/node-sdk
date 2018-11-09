'use strict';

const watson = require('../../index');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const THIRTY_SECONDS = 30000;

describe('dialog_integration', function() {
  jest.setTimeout(THIRTY_SECONDS * 3);

  auth.dialog.version = 'v1';
  const dialog = watson.dialog(auth.dialog);
  const dialog_id = auth.dialog.dialog_id;
  const client_id = 31;

  it('getProfile()', function(done) {
    const params = {
      dialog_id: dialog_id,
      client_id: client_id,
      name: ['size', 'method'],
    };
    dialog.getProfile(params, done);
  });

  it('updateProfile()', function(done) {
    const params = {
      dialog_id: dialog_id,
      client_id: client_id,
      name_values: [
        {
          name: 'size',
          value: 'large',
        },
        {
          name: 'topping1',
          value: 'cheese',
        },
      ],
    };
    dialog.updateProfile(params, done);
  });

  it('getConversation()', function(done) {
    const params = {
      dialog_id: dialog_id,
      client_id: client_id,
      date_from: '2015-07-20 00:00:00',
      date_to: '2015-07-30 00:00:00',
    };
    dialog.getConversation(params, done);
  });

  it('conversation()', function(done) {
    const params = {
      dialog_id: dialog_id,
      client_id: client_id,
      input: 'Hello',
    };
    dialog.conversation(params, done);
  });

  it('getContent()', function(done) {
    const params = {
      dialog_id: dialog_id,
    };
    dialog.getContent(params, done);
  });

  it('getDialogs()', function(done) {
    const params = {};
    dialog.getDialogs(params, done);
  });
});
