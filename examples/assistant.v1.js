const AssistantV1 = require('ibm-watson/assistant/v1');

/**
 * Instantiate the Watson Assistant Service
 */
const assistant = new AssistantV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2020-04-01',
});

/**
 * Calls the assistant message api.
 * returns a promise
 */
const messageAsync = function (text, context) {
  const payload = {
    workspaceId: process.env.WORKSPACE_ID || '<workspace_id>',
    input: {
      text: text,
    },
    context: context,
  };
  return assistant.message(payload);
};

// This example makes two successive calls to assistant service.
// Note how the context is passed:
// In the first message the context is undefined. The service starts a new assistant.
// The context returned from the first call is passed in the second request - to continue the assistant.
messageAsync('first message', undefined)
  .then(response1 => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
    // FROM ASSISTANT SERVICE
    console.log(JSON.stringify(response1.result, null, 2), '\n--------');

    // invoke a second call to assistant
    return messageAsync('second message', response1.result.context);
  })
  .then(response2 => {
    console.log(JSON.stringify(response2.result, null, 2), '\n--------');
    console.log('Note that the two reponses should have the same context.conversation_id');
  })
  .catch(error => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
    // FROM ASSISTANT SERVICE
    console.error(JSON.stringify(error, null, 2));
  });
