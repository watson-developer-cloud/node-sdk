# Upgrading to watson-developer-cloud@4.0
- [Breaking changes]
   - [Methods no longer return stream]
   - [Error Handling Compatibility]
   - [Default Methods Compatibility]
   - [Removed Services]
   - [Constructor Compatibility]
   - [Assistant V1 Compatibility]
   - [Assistant V2 Compatibility]
   - [Discovery Compatibility]
   - [Compare Comply Compatibility]
   - [Natural Language Classifier Compatibility]
   - [Personality Insights v3 Compatibility]
   - [Speech to Text Compatibility]
   - [Text to Speech Compatibility]
   - [Tone Analyzer Compatibility]
   - [Visual Recognition Compatibility]


## Breaking changes
### Methods no longer return stream
Previously, if a callback was not provided, each service method would return a pipeable stream. Now, this will no longer happen. A Promise is returned instead. This should not affect many users, as authenticating with IAM already prevented methods from returning streams.

### Response Handling Compatibility
The entire response is received with the third callback (if using callbacks) or when using Promises with `return_response: true` set as a parameter. This response now has a different structure for consistency with the other Watson SDKs.

The object returned has the following properties:
- `data`: The body of the response
- `headers`: The HTTP response headers
- `status`: The HTTP status code
- `statusText`: The HTTP status message
- `request`: The actual request instance sent to the service
- `config`: The parameters used to build the request


### Error Handling Compatibility
The logic that formats errors returned from a service has been changed. That means that the Error object returned now has a different structure. If there is logic in your code that parses the error returned from service methods, this will need to change. The new structure is outlined below.

The object returned is of class `Error` and has the following properties:
- `name`: Short title describing the error. Ex) 'Not Found'
- `code`: HTTP status code. Ex) 404
- `message`: More descriptive error message. Ex) Model not found.
- `body`: Full error object returned by the service, stringified. If the object cannot be stringified due to a circular reference, it will be left as an object 
- `headers`: Object containing response headers returned from the service, including the transaction id

If a request is made but no response is received (very rare), `error.body` will be an instance of [HTTP.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest).

### Default Methods Compatibility
- The method `getCredentials`, which formerly returned an object containing all user credentials (username, password, etc.), has been renamed to `getServiceCredentials`

### Removed Services
The following services have been deprecated for an extended period of time and will no longer be supported in the SDK:
- Dialog
- Language Translator v2
- Conversation v1


### Constructor Compatibility
- Parameter name changed: `version_date` -> `version`
- The parameter `apikey` is no longer supported

### Assistant V1 Compatibility
- Parameter name changed: `export` -> `_export` (_All instances_)

#### updateValue
- Parameter name changed: `new_type` -> `new_value_type`

#### updateDialogNode
- Parameter name changed: `new_type` -> `new_node_type`

### Assistant V2 Compatibility
- Interface `MessageContextSkill` removed

### Compare Comply Compatibility
#### convertToHtml
- Parameter name changed: `model_id` -> `model`

#### classifyElements
- Parameter name changed: `model_id` -> `model`

#### extractTables
- Parameter name changed: `model_id` -> `model`

#### compareDocuments
- Parameter name changed: `model_id` -> `model`

#### deleteFeedback
- Parameter name changed: `model_id` -> `model`

#### getFeedback
- Parameter name changed: `model_id` -> `model`

#### createBatch
- Parameter name changed: `model_id` -> `model`

#### updateBatch
- Parameter name changed: `model_id` -> `model`

### Discovery Compatibility
#### getSourceCredentials
- Method name changed: `getSourceCredentials` -> `getCredentials`

#### createStopwordList
- Parameter `stopword_filename` is now **required**

#### getEnvironments
- Method name changed: `getEnvironments` -> `listEnvironments`

#### getCollections
- Method name changed: `getCollections` -> `listCollections`

#### getConfigurations
- Method name changed: `getConfigurations` -> `listConfigurations`

#### getCollectionFields
- Method name changed: `getCollectionFields` -> `listFields`
- Parameter name changed: `collection_id` -> `collection_ids` (`collection_ids` is an Array)

#### addJsonDocument
- Method name changed: `addJsonDocument` -> `addDocument`

#### updateJsonDocument
- Method name changed: `updateJsonDocument` -> `updateDocument`

#### createEnvironment
- Parameter `size` will no longer be set to `1` if not given

#### createConfiguration
- Parameter `name` is now **required**
- Parameter `file` is now split into `conversions`, `enrichments` and `normalizations`

#### updateConfiguration
- Parameter `name` is now **required**
- Parameter `file` is now split into `conversions`, `enrichments` and `normalizations`

#### createCollection
- Parameter name changed: `language_code` -> `language`
- Parameter `language` will no longer be set to `'en_us'` if not given

#### updateCollection
- Parameter name changed: `collection_name` -> `name`

#### query
- Parameter name changed: `return` -> `return_fields`
- `query` and `natural_language_query` can't both be populated - this is no longer corrected internally
- Parameter name changed: `passages.fields` -> `passages_fields`
- Parameter name changed: `passages.count` -> `passages_count`
- Parameter name changed: `passages.characters` -> `passages_characters`
- Parameter type changed from Array to String: `return_fields`, `sort`, `passages_fields`, `collection_ids`, `similar_document_ids`, `similar_fields`

#### federatedQuery
- Parameter type changed from Array to String: `return_fields`, `sort`, `passages_fields`, `collection_ids`, `similar_document_ids`, `similar_fields`

#### model QueryResultResultMetadata
- Model name changed: `QueryResultResultMetadata` -> `QueryResultMetadata`

### Natural Language Classifier Compatibility
#### create
- Method name changed: `create` -> `createClassifier`
- Parameter `training_data` is now **required** to be CSV format
- Parameter `metadata` no longer constructed internally

#### classify
- Parameter name changed: `classifier` -> `classifier_id`

#### status
- Method name changed: `status` -> `getClassifier`
- Parameter name changed: `classifier` -> `classifier_id`

#### list
- Method name changed: `list` -> `listClassifiers`

#### remove
- Method name changed: `remove` -> `deleteClassifier`
- Parameter name changed: `classifier` -> `classifier_id`


### Personality Insights v3 Compatibility
#### profile
- Parameters `accept_language`, `content_type`, `content_language` now belong at the top-level of the `params` object, rather than within `headers`
- Parameter `accept` is no longer supported - use `profile()` for `application/json` and `profileAsCsv()` for `text/csv`
- Parameters `text` and `contentItems` are no longer supported
- Parameter `content_items` belongs within the parameter `content` and not at the top level - this is no longer internally corrected

#### profile_csv
- Method name changed: `profile_csv` -> `profileAsCsv`


### Speech to Text Compatibility
#### getModels
- Method name changed: `getModels` -> `listModels`

#### getCustomization
- Method name changed: `getCustomization` -> `getLanguageModel`

#### getRecognitionJob
- Method name changed: `getRecognitionJob` -> `checkJob`

#### createCustomization
- Method name changed: `createCustomization` -> `createLanguageModel`

#### getRecognitionJobs
- Method name changed: `getRecognitionJobs` -> `checkJobs`

#### deleteRecognitionJob
- Method name changed: `deleteRecognitionJob` -> `deleteJob`

#### getCustomizations
- Method name changed: `getCustomizations` -> `listLanguageModels`

#### createRecognitionJob
- Method name changed: `createRecognitionJob` -> `createJob`
- The parameter `events` must be a comma-separated string, **not** an Array. This is no longer corrected internally

#### addCorpus
- Parameter name changed: `name` -> `corpus_name`
- Parameter name changed: `corpus` -> `corpus_file`

#### getCorpus
- Parameter name changed: `name` -> `corpus_name`

#### deleteCorpus
- Parameter name changed: `name` -> `corpus_name`

#### getCorpora
- Method name changed: `getCorpora` -> `listCorpora`

#### addWord
- Parameter name changed: `name` -> `corpus_name`

#### getWords
- Method name changed: `word` -> `word_name`

#### getWord
- Method name changed: `word` -> `word_name`

#### deleteWord
- Method name changed: `word` -> `word_name`

#### trainCustomization
- Method name changed: `trainCustomization` -> `trainLanguageModel`

#### resetCustomization
- Method name changed: `resetCustomization` -> `resetLanguageModel`

#### deleteCustomization
- Method name changed: `deleteCustomization` -> `deleteLanguageModel`

#### createRecognizeStream
- Method name changed: `createRecognizeStream` -> `recognizeUsingWebSocket`

#### recognizeLive
- This method is no longer supported. Use `recognizeUsingWebSocket` instead

#### observeResult
- This method is no longer supported. Use `recognizeUsingWebSocket` instead


### Text to Speech Compatibility
#### getCustomizations
- Method name changed: `getCustomizations` -> `listVoiceModels`

#### getCustomization
- Method name changed: `getCustomization` -> `getVoiceModel`

#### updateCustomization
- Method name changed: `updateCustomization` -> `updateVoiceModel`

#### deleteCustomization
- Method name changed: `deleteCustomization` -> `deleteVoiceModel`

#### createCustomization
- Method name changed: `createCustomization` -> `createVoiceModel`

#### getWords
- Method name changed: `getWords` -> `listWords`

#### voices
- Method name changed: `voices` -> `listVoices`

#### voice
- Method name changed: `voice` -> `getVoice`

#### pronunciation
- Method name changed: `pronunciation` -> `getPronunciation`


### Tone Analyzer Compatibility
#### tone
- Parameter name changed: `text` -> `tone_input`
- Parameter `content_type` is now **required**
- Parameter `tones` is now **required** to be an Array
- Parameter name changed: `language` -> `content_language`

#### tone_chat
- Method name changed: `tone_chat` -> `toneChat`
- Parameter `utterances` is now **required** to be at the top level of the params object


### Visual Recognition Compatibility
#### createClassifier
- Parameter `{classname}_positive_examples` changed to map `positive_examples`

Instead of passing in multiple parameters like `car_positive_examples` and `boat_positive_examples`, the method now takes a single map with the classnames as the keys:
```json
"positive_examples": {
   "car": <car examples>,
   "boat": <boat examples>
}
```

#### updateClassifier
- Parameter `{classname}_positive_examples` changed to map `positive_examples`

Instead of passing in multiple parameters like `car_positive_examples` and `boat_positive_examples`, the method now takes a single map with the classnames as the keys:
```json
"positive_examples": {
   "car": <car examples>,
   "boat": <boat examples>
}
```

#### classify
- Parameter name changed: `image_file` -> `images_file`
- Parameter `parameters` is no longer supported

#### detectFaces
- Parameter name changed: `image_file` -> `images_file`
- Parameter `parameters` is no longer supported

#### retrainClassifier
- Method name changed: `retrainClassifier` -> `updateClassifier`

#### recognizeText
- This method is no longer supported

#### createCollection
- This method is no longer supported

#### getCollection
- This method is no longer supported

#### listCollections
- This method is no longer supported

#### deleteCollection
- This method is no longer supported

#### addImage
- This method is no longer supported

#### listImages
- This method is no longer supported

#### getImage
- This method is no longer supported

#### deleteImage
- This method is no longer supported

#### setImageData
- This method is no longer supported

#### getImageData
- This method is no longer supported

#### deleteImageData
- This method is no longer supported

#### findSimilar
- This method is no longer supported


