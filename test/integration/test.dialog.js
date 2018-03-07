'use strict';

const nock = require('nock');
const watson = require('../../index');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const THIRTY_SECONDS = 30000;
const TEN_SECONDS = 10000;
const TWO_SECONDS = 2000;

describe('dialog_integration', function() {
  this.timeout(THIRTY_SECONDS * 3);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let dialog;
  let dialog_id;
  const client_id = 31;

  before(function() {
    auth.dialog.version = 'v1';
    dialog = watson.dialog(auth.dialog);
    dialog_id = auth.dialog.dialog_id;
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

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

  // todo: fix this test.
  // Error: Content not specified. Include content as part of the body of the request.
  it.skip('updateContent()', function(done) {
    this.timeout(TEN_SECONDS);
    const params = {
      dialog_id: dialog_id,
      client_id: client_id,
    };
    dialog.updateContent(params, done);
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
