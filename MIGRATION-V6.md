# Upgrading to ibm-watson@6.0

_Note: If migrating from a version less than 5.0, also see the [v5 migration guide wiki](https://github.com/watson-developer-cloud/node-sdk/wiki/v5-Migration-Guide)._

- [Breaking Changes](#breaking-changes)
  - [Support for callbacks dropped](#support-for-callbacks-dropped)
  - [Support for Node v10 dropped](#support-for-node-v10-dropped)
  - [Breaking changes by service](#breaking-changes-by-service)

- [New Features by Service](#new-features-by-service)

## Breaking changes
#### Support for Callbacks Dropped
Support for callbacks has been dropped in favor of promises. All functions will no longer accept a callback parameter. An example of replacing a callback with a promise using `then/catch` and `async/await` syntax is shown below
```js
//Callback
const assistant = new AssistantV2(options);
assistant.message(params, (err, res) => {
  if(err){
    console.log(err) //Print out error
    return
  }
  console.log(res.result) //Print out body
});
```

```js
//Promise with then/catch
const assistant = new AssistantV2(options);

assistant.message(params)
.then(res => {
  console.log(res.result) //Print out body
})
.catch(err => {
  console.log(err) //Print out error
})
```

```js
//Promise with async/await
//Use of the await keyword must be used within an async function
async myFunction() {
  const assistant = new AssistantV2(options);
  try{
    const res = await assistant.message(params);
    console.log(res.result) //Print out body
  } catch(err){
    console.log(err) //Print out error
  }
}
myFunction()
```

### Support for Node v10 Dropped
The SDK no longer supports Node version 10, as reflected in the `engines` property in the package.json file. Version 10 will reach end of life on 30 April 2021.

### Breaking changes by service
#### Assistant v1
- Parameter `context` type changed from `JsonObject` to `DialogNodeContext` in `createDialogNode()`
- Parameter `newContext` type changed from `JsonObject` to `DialogNodeContext` in `updateDialogNode()`
- Interface `Context` property `system` type changed from `SystemResponse` to `JsonObject`
- Interface `DialogNode` property `context` type changed from `JsonObject` to `DialogNodeContext`
- Interface `DialogSuggestion` property `output` type changed from `DialogSuggestionOutput` to `JsonObject`
- Interface `SystemResponse` removed
- Interface `DialogSuggestionOuput` removed
- Interface `DialogNodeOutputGeneric` expanded into multiple interfaces
- Interface `RuntimeResponseGeneric` expanded into multiple interfaces

#### Assistant v2
- Interface `MessageContext` property `skills` type changed from `MessageContextSkills` to `JsonObject`
- Interface `MessageContextStateless` property `skills` type changed from `MessageContextSkills` to `JsonObject`
- Interface `MessageInputOptions` property `_export` renamed to `export`
- Interface `MessageContextSkills` removed
- Interface `RuntimeResponseGeneric` expanded into multiple interfaces

#### Compare Comply
- Parameter `before` and `after` removed in `listFeedback()`
- Interface `OriginalLabelsOut` property `modification` removed
- Interface `UpdatedLabelsOut` property `modification` removed
- Interface `BatchStatus` property `_function` renamed to `function`

#### Discovery v1
- Interface `NluEnrichmentCategories` removed
- Interface `NluEnrichmentFeatures` property `categories` type changed from `NluEnrichmentCategories` to `JsonObject`

#### Discovery v2
- Interface `DefaultQueryParams` property `_return` renamed `return`

#### Natural Language Understanding
- Interface `AnalysisResults` property `metadata` type changed from `AnalysisResultsMetadata` to `FeaturesResultsMetadata`
- Interface `Features` property `metadata` type changed from `MetadataOptions` to `JsonObject`
- Interface `AnalysisResultsMetadata` removed
- Interface `MetadataOptions` removed

#### Personality Insights
- Interface `Content` property `content_items` renamed `contentItems`

#### Text to Speech
- Interface `CreateVoiceModelParams` renamed to `CreateCustomModelParams`
- Interface `ListVoiceModelParams` renamed to `ListCustomModelParams`
- Interface `GetVoiceModelParams` renamed to `GetCustomModelParams`
- Interface `UpdateVoiceModelParams` renamed to `UpdateCustomModelParams`
- Interface `DeleteVoiceModelParams` renamed to `DeleteCustomModelParams`
- Interface `CreateVoiceModelConstants` renamed to `CreateCustomModelConstants`
- Interface `ListVoiceModelConstants` renamed to `ListCustomModelConstants`
- Interface `VoiceModel` renamed to `CustomModel`
- Use of `VoiceModel[]` replaced with interface `CustomModels`

#### Visual Recognition v3
- Interface `Class` property `_class` renamed `class`
- Interface `ClassResult` property `_class` renamed `class`

#### Visual Recognition v4
- Interface `Collection` property `training_status` type changed from `TrainingStatus` to `CollectionTrainingStatus`
- Interface `ObjectDetail` property `location` type changed from `Location` to `ObjectDetailLocation`


### New Features by Service

#### Assistant v1
- `includeCount` parameter added to several methods: Whether to include information about the number of records that satisfy the request, regardless of the page limit.
- `bulkClassify()` method added: Identify intents and entities in multiple user utterances.
- Interface `DialogNodeContext` added
- Interface `DialogNodeOutput` property `integrations` added: Output intended for specific integrations. For more information, see the [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-responses-json)

#### Assistant v2
- `bulkClassify()` method added: Identify intents and entities in multiple user utterances.

#### Compare Comply
- Interface `Category` property `modification` added: The type of modification of the feedback entry in the updated labels response.
- Interface `TypeLabel` property `modification` added: The type of modification of the feedback entry in the updated labels response.

#### Discovery v2
- `analyzeDocument()` method added: Process a document using the specified collection's settings and return it for realtime use. **Note: This method is only supported on IBM Cloud Pak for Data instances of Discovery.**
- Interface `QueryResponsePassage` added
- Interface `QueryResponse` property `passages` added: Passages returned by Discovery.

#### Language Translator
- `translateDocument()` now supports these subtitle/caption formats: `text/sbv`, `text/srt`, and `text/vtt`

#### Natural Language Understanding
- Interface `FeaturesResultsMetadata` added: Webpage metadata, such as the author and the title of the page.

#### Speech to Text
- `recognize()` and `createJob()` now support Canadian French broadband and narrowband models
- `createLanguageModel()` and `createAcousticModel()` now supports Australian English broadband and narrowband models
- `addGrammar()` parameter `grammarFile` now supports `ReadableStream` and `Buffer`

#### Visual Recognition v4
- Interface `CollectionTrainingStatus` added: Training status information for the collection.
- Interface `ObjectDetailLocation` added: Defines the location of the bounding box around the object.
