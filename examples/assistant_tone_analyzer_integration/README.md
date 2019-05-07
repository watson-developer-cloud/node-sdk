# Assistant and Tone Analyzer Integration Example

This example provides sample code for integrating [Tone Analyzer][tone_analyzer] and [Assistant][assistant].

  * [tone_detection.js][tone_assistant_integration_example_tone_detection] - sample code to initialize a user object in the assistant payload's context (initUser), to call Tone Analyzer to retrieve tone for a user's input (invokeToneAsync), and to update tone in the user object in the assistant payload's context (updateUserTone).

  * [tone_assistant_integration.v1.js][tone_assistant_integration_example] - sample code to use tone_detection.js to get and add tone to the payload and send a request to the Assistant Service's message endpoint.


Requirements to run the sample code

  * [Tone Analyzer Service credentials][tone_analyzer_service]
  * [Assistant Service credentials][assistant_service]
  * [Assistant Workspace ID][assistant_simple_workspace]

Credentials & the Workspace ID can be set in environment properties, a .env file, or directly in the code.


Command to run the sample code

`npm install # just once, to download dependencies`
`node tone_assistant_integration.v1.js`

[assistant]: https://www.ibm.com/watson/services/conversation/
[tone_analyzer]: https://www.ibm.com/watson/services/tone-analyzer/
[assistant_service]: https://cloud.ibm.com/catalog/services/watson-assistant
[tone_analyzer_service]: https://cloud.ibm.com/catalog/services/tone-analyzer
[assistant_simple_workspace]: https://github.com/watson-developer-cloud/assistant-simple#workspace
[tone_assistant_integration_example]: https://github.com/watson-developer-cloud/node-sdk/blob/master/examples/assistant_tone_analyzer_integration/tone_assistant_integration.v1.js
[tone_assistant_integration_example_tone_detection]: https://github.com/watson-developer-cloud/node-sdk/blob/master/examples/assistant_tone_analyzer_integration/tone_detection.js
