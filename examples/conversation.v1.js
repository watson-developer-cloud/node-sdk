'use strict';
/* eslint-env es6*/

const watson = require('watson-developer-cloud');

/**
 * Instantiate the Watson Conversation Service
 */
const conversation = new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME || '<conversation_username>',
  password: process.env.CONVERSATION_PASSWORD || '<conversation_password>',
  version_date: watson.ConversationV1.VERSION_DATE_2017_02_03
});

/**
 * Conversation service is stateless.
 * The application need to maintain the conversation state.
 * A context object is returned in the messgage response and the app should pass it in the next message request
 */
let currentContext = undefined;

/**
 * Calls the conversation message api. 
 * returns a promise
 */
const message = function(text) {
  const payload = {
    workspace_id: process.env.WORKSPACE_ID || '<workspace_id>',
    input: {
      text: text
    },
    // pass the context from previous response
    context: currentContext
  };
  return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
    if (err) {
      reject(err);
    } else {
      // remember the conversation state
      currentContext = data.context;
      resolve(data);
    }
  }));
};

// This example makes two successive calls to conversation service.
message('first message').then(response1 => {
  // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
  // FROM CONVERSATION SERVICE
  console.log(JSON.stringify(response1, null, 2));

  // invoke a second call to conversation
  message('second message')
    .then(response2 => {
      console.log(JSON.stringify(response2, null, 2));
      console.log('Note that the two reponses have the same context.conversation_id');
    })
    .catch(err => {
      // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
      // FROM CONVERSATION SERVICE
      console.error(JSON.stringify(err, null, 2));
    });
});
