# Conversation and Tone Analyzer Integration Example

This example provides sample code for integrating [Tone Analyzer][tone_analyzer] and [Conversation][conversation].

  * [tone_detection.js][tone_conversation_integration_example_tone_detection] - sample code to initialize a user object in the conversation payload's context (initUser), to call Tone Analyzer to retrieve tone for a user's input (invokeToneAsync), and to update tone in the user object in the conversation payload's context (updateUserTone).

  * [tone_conversation_integration.v1.js][tone_conversation_integration_example] - sample code to use tone_detection.js to get and add tone to the payload and send a request to the Conversation Service's message endpoint.


Requirements to run the sample code

  * [Tone Analyzer Service credentials][bluemix_tone_analyzer_service]
  * [Conversation Service credentials][bluemix_conversation_service]
  * [Conversation Workspace ID][conversation_simple_workspace]

Credentials & the Workspace ID can be set in environment properties, a .env file, or directly in the code.


Command to run the sample code

`npm install # just once, to download dependencies`
`node tone_conversation_integration.v1.js`

[conversation]: https://www.ibm.com/watson/developercloud/conversation.html
[tone_analyzer]: http://www.ibm.com/watson/developercloud/tone-analyzer.html
[bluemix_conversation_service]: https://console.ng.bluemix.net/catalog/services/conversation/
[bluemix_tone_analyzer_service]: https://console.ng.bluemix.net/catalog/services/tone-analyzer/
[conversation_simple_workspace]: https://github.com/watson-developer-cloud/conversation-simple#workspace
[tone_conversation_integration_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/tone_conversation_integration.v1.js
[tone_conversation_integration_example_tone_detection]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/conversation_addons/tone_detection.js
