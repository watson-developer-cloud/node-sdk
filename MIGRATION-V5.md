# Upgrading to ibm-watson@5.0

_Note: If migrating from a version less than 4.0, also see the [v4 migration guide wiki](https://github.com/watson-developer-cloud/node-sdk/wiki/v4-Migration-Guide)._

- [Breaking changes](#breaking-changes)
   - [Support for Node v6 and v8 dropped](#support-for-node-v6-and-v8-dropped)

## Breaking changes
### Authentication mechanism redesigned - READ THIS
The SDK service constructors now accept `Authenticator` objects that are used to authenticate requests. The constructors **no longer accept** individual credentials like `username` and `password`. Rather, an `Authenticator` must be instantiated and passed to the constructor.

An `Authenticator` can either be initialized programmatically or read from the environment using the method `getAuthenticatorFromEnvironment`.

More details to come.

### All parameter names changed to lower camel case - READ THIS
To maintain a consistent style for the SDK, parameter names will now be formatted with the case convention "lowerCamelCase". For example, the parameter `workspace_id` is now `workspaceId`. This applies to all top-level parameters passed in to any method or constructor. This does not apply to sub-properties of models, which will still use "lower_snake_case".

### Detailed response is always returned
The "detailed response" (the full response, including headers and status code) is now always returned. Before we would preferentially return the body. The body is available under the key `result`. The key `data` is no longer used. This applies to both Promises and Callbacks.

#### Promises
The detailed response is always returned. The `return_response` parameter is removed.
```js
const response = await listWorkspaces();
console.log(response.result); // prints the body
console.log(response.headers); // prints the headers
```

#### Callbacks
The detailed response is sent in the second argument position, after the error. There is no third argument position.
```js
listWorkspaces((err, res) => {
  console.log(res.result); // prints the body
  console.log(res.headers); // prints the headers
});
```

### Support for Node v6 and v8 dropped
The SDK no longer supports Node versions 6 and 8, as reflected in the `engines` property in the package.json file. Version 6 reached end of life in April 2019 and Version 8 reaches end of life on 31 December 2019.

### WebSocket methods
- All parameters are now lower camel case
- Support for the `token` parameter has been removed
- Support for the `customization_id` parameter has been removed
- Method `setAuthorizationHeaderToken` has been removed from the WebSocket Stream classes. It now exists as a shared function called `setAuthorizationHeader` in `lib/websocket-utils.ts`.

#### RecognizeStream
- `RecognizeStream.readableObjectMode` will always be a Boolean value - before, it could have been `undefined`. This is to align with the new convention in Node 12.

#### URL parameter name changed
The variable name for the stored, URL parameter has been changed from `url` to `serviceUrl`. Note that `url` can still be compatibility passed into the constructor as an alias for `serviceUrl`. However, if you try to access the `url` property directly in your code, this is a breaking change.

#### Reading Credentials File
The order of priority has changed to give a file in the current working directory higher priority than one in the home directory. This will only impact your code if you have different files in each location.

### Breaking changes by service
#### Assistant v1
- Parameter `include_count` removed from method `listEntities`
- Parameter `include_count` removed from method `listValues`
- Parameter `include_count` removed from method `listSynonyms`
- Parameter `include_count` removed from method `listDialogNodes`
- Parameter `include_count` removed from method `listWorkspaces`
- Parameter `include_count` removed from method `listIntents`
- Parameter `include_count` removed from method `listExamples`
- Parameter `include_count` removed from method `listCounterexamples`
- Parameter `value_type` renamed to `type` in method `createValue`
- Parameter `new_value_type` renamed to `newType` in method `updateValue`
- Parameter `node_type` renamed to `type` in method `createDialogNode`
- Parameter `new_node_type` renamed to `newType`in method `updateDialogNode`
- Interface `DialogRuntimeResponseGeneric` renamed to `RuntimeResponseGeneric`
- Interface `DialogSuggestions` removed
- Additional properties no longer supported for interface `LogMessage`
- Additional properties no longer supported for interface `RuntimeEntity`
- Additional properties no longer supported for interface `RuntimeIntent`
- Property `value_type` renamed to `type` in interface `Value`
- Property `value_type` renamed to `type` in interface `CreateValue`
- Property `node_type` renamed to `type` in interface `DialogNode`
- Property `action_type` renamed to `type` in interface `DialogNodeAction`
- Property `output` changed type from `JsonObject` to `DialogSuggestionOutput` in interface `DialogSuggestion`

#### Assistant v2
- Property `action_type` renamed to `type` in interface `DialogNodeAction`
- Interface `DialogRuntimeResponseGeneric` renamed to `RuntimeResponseGeneric`

#### Compare Comply
- Parameter `filename` removed from method `convertToHtml`

#### Discovery
- Parameter `collectionIds` removed from method `query`
- Parameter `return_fields` renamed to `_return` in method `query`
- Parameter `logging_opt_out` renamed to `xWatsonLoggingOptOut` in method `query`
- Parameter `return_fields` renamed to `_return` in method `federatedQuery`
- Parameter `logging_opt_out` renamed to `xWatsonLoggingOptOut` in method `federatedQuery`
- Parameter `return_fields` renamed to `_return` in method `queryNotices`
- Parameter `return_fields` renamed to `_return` in method `federatedQueryNotices`
- Property `field_name` renamed to `field` in interface `Field`
- Property `field_type` renamed to `type` in interface `Field`
- Property `enrichment_name` renamed to `enrichment` in interface `Enrichment`
- Method `queryEntities()` removed
- Method `queryRelations()` removed
- Method `testConfigurationInEnvironment()` removed

#### Language Translator
- Parameter `default_models` renamed to `_default` in method `listModels`
- Property `translation_output` renamed to `translation` in interface `Translation`

#### Natural Language Classifier
- Parameter `metadata` renamed to `trainingMetadata` in method `createClassifier`

##### Speech to Text
* Property `final_results` renamed to `final` in interface `SpeakerLabelsResult`
* Property `final_results` renamed to `final` in interface `SpeechRecognitionResult`

#### Text to Speech
- The following voices are removed:
  - `DE_DE_BIRGITV2VOICE`
  - `DE_DE_DIETERV2VOICE`
  - `EN_US_ALLISONV2VOICE`
  - `EN_US_LISAV2VOICE`
  - `EN_US_MICHAELV2VOICE`
  - `IT_IT_FRANCESCAV2VOICE`

#### Visual Recognition
- Property `class_name` renamed to `_class` in interface `ClassResult`
- Method `detectFaces()` removed
