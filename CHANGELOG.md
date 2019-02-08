# [3.18.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.17.0...v3.18.0) (2019-02-06)


### Features

* **compare-comply:** new constants and new model properties added ([d9dc7cc](https://github.com/watson-developer-cloud/node-sdk/commit/d9dc7cc))
* **discovery:** add method `getStopwordListStatus` ([ea9eaf9](https://github.com/watson-developer-cloud/node-sdk/commit/ea9eaf9))
* **speech-to-text:** optional parameter `force` added to the method `upgradeAcousticModel` ([ceaa843](https://github.com/watson-developer-cloud/node-sdk/commit/ceaa843))

# [3.17.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.16.1...v3.17.0) (2019-02-04)


### Features

* enable reading credentials from ibm-credentials.env file ([ce02aa8](https://github.com/watson-developer-cloud/node-sdk/commit/ce02aa8))

## [3.16.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.16.0...v3.16.1) (2019-01-19)


### Bug Fixes

* fix `getTransactionId` method for the `RecognizeStream` class ([e5bbe2c](https://github.com/watson-developer-cloud/node-sdk/commit/e5bbe2c))

# [3.16.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.15.4...v3.16.0) (2019-01-17)


### Features

* **discovery:** add methods `createStopwordList`, `deleteStopwordList`, `createGateway`, `deleteGateway`, `getGateway`, and `listGateways` ([8a6753e](https://github.com/watson-developer-cloud/node-sdk/commit/8a6753e))
* **speech-to-text:** new methods added: addGrammar, deleteGrammar, getGrammar, listGrammars ([7ab567a](https://github.com/watson-developer-cloud/node-sdk/commit/7ab567a))
* **visual-recognition:** parameter `accept_language` added to method `detectFaces` ([82190c7](https://github.com/watson-developer-cloud/node-sdk/commit/82190c7))

## [3.15.4](https://github.com/watson-developer-cloud/node-sdk/compare/v3.15.3...v3.15.4) (2019-01-15)


### Bug Fixes

* fix bug that prevents `audio` from being sent as a buffer for `recognize` ([3f97b80](https://github.com/watson-developer-cloud/node-sdk/commit/3f97b80))

## [3.15.3](https://github.com/watson-developer-cloud/node-sdk/compare/v3.15.2...v3.15.3) (2019-01-15)


### Bug Fixes

* package.json to reduce vulnerabilities ([e61d1de](https://github.com/watson-developer-cloud/node-sdk/commit/e61d1de))

## [3.15.2](https://github.com/watson-developer-cloud/node-sdk/compare/v3.15.1...v3.15.2) (2019-01-14)


### Bug Fixes

* query parameters no longer cause text-to-speech over websockets to crash ([775e6d2](https://github.com/watson-developer-cloud/node-sdk/commit/775e6d2))
* Remove the `disabled` property from `CreateDialogNode`. It is for internal use only. ([4b72d0e](https://github.com/watson-developer-cloud/node-sdk/commit/4b72d0e))

## [3.15.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.15.0...v3.15.1) (2019-01-07)


### Bug Fixes

* add `disabled` property to CreateDialogNode ([41cd8dc](https://github.com/watson-developer-cloud/node-sdk/commit/41cd8dc))
* add `user_defined` property to MessageOutput model ([ea28bf3](https://github.com/watson-developer-cloud/node-sdk/commit/ea28bf3))

# [3.15.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.14.0...v3.15.0) (2018-12-07)


### Features

* add support for Compare and Comply service ([fa22ae5](https://github.com/watson-developer-cloud/node-sdk/commit/fa22ae5))
* **discovery:** adds new model, RetrievalDetails ([1821719](https://github.com/watson-developer-cloud/node-sdk/commit/1821719))
* **natural-language-understanding:** new properties added to models to match the service ([3bf1e5e](https://github.com/watson-developer-cloud/node-sdk/commit/3bf1e5e))

# [3.14.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.13.1...v3.14.0) (2018-12-06)


### Features

* **text-to-speech:** add support for using `synthesize` over a websocket connection ([94ba896](https://github.com/watson-developer-cloud/node-sdk/commit/94ba896))

## [3.13.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.13.0...v3.13.1) (2018-11-26)


### Bug Fixes

* **discovery:** update mis-defined parameters to match the service ([d1fb9a9](https://github.com/watson-developer-cloud/node-sdk/commit/d1fb9a9))
* **speech-to-text:** `content_type` is no longer a required parameter for `recognize()` or `createJob()` (it is now optional) ([d64c06a](https://github.com/watson-developer-cloud/node-sdk/commit/d64c06a))
* **speech-to-text:** add support for `language_customization_id` parameter to the WebSockets method, deprecate `customization_id` ([bf2cd68](https://github.com/watson-developer-cloud/node-sdk/commit/bf2cd68))

# [3.13.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.12.0...v3.13.0) (2018-10-30)


### Features

* **discovery:** add new methods: `createTokenizationDictionary`, `deleteTokenizationDictionary`, and `getTokenizationDictionaryStatus` ([d5ba660](https://github.com/watson-developer-cloud/node-sdk/commit/d5ba660))

# [3.12.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.11.1...v3.12.0) (2018-10-10)


### Features

* **discovery:** new parameters added to match updates to the service ([838b044](https://github.com/watson-developer-cloud/node-sdk/commit/838b044))

## [3.11.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.11.0...v3.11.1) (2018-09-28)


### Bug Fixes

* **icp:** disabling ssl verification now works for websocket connection ([f8466c8](https://github.com/watson-developer-cloud/node-sdk/commit/f8466c8))

# [3.11.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.10.0...v3.11.0) (2018-09-24)


### Features

* add support for assistant v2 ([8a99676](https://github.com/watson-developer-cloud/node-sdk/commit/8a99676))

# [3.10.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.9.1...v3.10.0) (2018-09-13)


### Features

* new languages models supported for speech to text ([a2669dd](https://github.com/watson-developer-cloud/node-sdk/commit/a2669dd))
* support authenticating with ibm cloud private ([0d1774c](https://github.com/watson-developer-cloud/node-sdk/commit/0d1774c))

## [3.9.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.9.0...v3.9.1) (2018-08-30)


### Bug Fixes

* add an optional filename parameter for methods accepting a file ([9a6cb59](https://github.com/watson-developer-cloud/node-sdk/commit/9a6cb59))

# [3.9.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.8.0...v3.9.0) (2018-08-15)


### Features

* **regenerate:** add methods for new discovery metrics endpoints ([f396eca](https://github.com/watson-developer-cloud/node-sdk/commit/f396eca))

# [3.8.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.7.1...v3.8.0) (2018-08-07)


### Features

* regenerate service sdks 7/30/18 ([0f95a92](https://github.com/watson-developer-cloud/node-sdk/commit/0f95a92))

## Version 3.7.0
7/12/18
* Operations added for `Credentials` resource (Discovery)

## Version 3.6.0
7/11/18
* Support base_model_version parameter in `recognize()` (Speech-to-Text)
* Authentication service now supports returning IAM tokens

## Version 3.5.1
6/25/18
* Fixes bug retrieving Assistant credentials from VCAP services
* Fixes bug that prevented IAM authentication with Speech to Text websockets

## Version 3.5.0
6/12/18
* Support for Language Translator V3

## Version 3.4.5
6/4/18
* Fixes bug for Visual Recognition service that caused authentication errors when reading credentials from VCAP Services or environment files

## Version 3.4.3
5/31/18
* Fixes bug for Visual Recognition service that gave the incorrect URL for CF instances. Old service instances no longer have to specify the URL
* General IAM authentication URL changed from https://iam.ng.bluemix.net/identity/token to https://iam.bluemix.net/identity/token
* `deleteUserData()` methods in Speech to Text, Text to Speech, Visual Recognition

## Version 3.4.2
5/18/18
* Updates dependencies to remove security vulnerability
* Adds methods `deleteUserData` to Assistant, Conversation, and Discovery

## Version 3.4.1
5/3/18
* Updates dependencies to be compatible with Node v10

## Version 3.4.0
4/26/18
* Support for custom headers https://github.com/watson-developer-cloud/node-sdk#sending-request-headers

* Support for retrieving HTTP response https://github.com/watson-developer-cloud/node-sdk#sending-request-headers

* Support for IAM tokens, which will be supported by services in future releases.

## Version 3.3.0
4/5/18
* Visual Recognition
  * New method `getCoreMlModel` adds support for CoreML
  * Breaking: `detectFaces` no longer supports identity information in the response.
    * `name`, `score`, `type_hierarchy` removed from response [Release notes](https://console.bluemix.net/docs/services/visual-recognition/release-notes.html#2april2018)

* Natural Language Classifier
 * New method 'classifyCollection`

Conversation/Assistant
 * timestamp parameters `created` and `updated` are optional, not required
 * `context` parameter is optional in `message`




## Version 3.2.1
3/15/18
* Renames Assistant from v1-generated to v1

## Version 3.2.0
3/15/18
* Adds Assistant Service (Conversation has been renamed to Assistant)

## Version 3.1.1
3/8/18
* Adds warnings to methods with changed names
* Ensures that new parameters are passed into methods when calling them using the older format used in the adapters.

## Version 3.1.0
3/7/18

### **Breaking changes:**

Speech to text
- param `audio` is now required in recognize method
- methods `createSession`, `deleteSession`, `getSessionStatus` deprecated

### **Non Breaking:**

- All code is regenerated to reflect the newest versions of all services
- Methods with exclusively text/plain body parameters now are correctly generated
- Fixes linting in build
   - Adds new linter, tslint for typescript files

SpeechToText:
- `addAudio` method: param `audio_resource` is now type ReadableStream|FileObject|Buffer instead of ByteArray[]
- `transfer-encoding` is removed from `recognize` method

Conversation
- `include_audit` parameters are now supported
- `node_visited_details` is now supported

Tone Analyzer
- Adds support for `content_language` for `tone_chat` endpoint

Visual Recognition
- Items in ‘parameters’ are now top level params

## [v3.0.7](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v3.0.7)
 * services use `version` instead of `version_date` and should pass in dates directly such as `'2017-02-27'` instead of calling date constants.

## [v3.0.6](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v3.0.6)
 * All .ts files are removed from the npm package
 * Fixes issue of enforcing our typescript compiler settings when other typescript projects use our package
 * All instances of ReadableStream changed to NodeJs.ReadableStream, blob type added to /lib/, both changes done to correctly link these types for typescript users

## [v3.0.5](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v3.0.5)
 * [User-Agent] in header is no longer overwritten but instead appended, this change only affects metrics of this SDK

## [v3.0.4](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v3.0.4)
 * Fixed bug in visual recognition to correctly use owners parameter
 * Fixed bug in NLU where environment variables storing credentials were not read when running locally
 * Dependencies updated to fix security vulnerabilities

## [v3.0.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v3.0.3)

* Added support for customization_weight or acoustic_customization_id  in speech-to-text/v1


## Version 3.0

_2017-11-29_

_This version contains several breaking changes._

Version 3.0 introduces automatically generated client code. The client code is generated from [Swagger](https://swagger.io/). Several deprecated services have been removed from this release. Furthermore, language has been changed from *NodeJS* to *TypeScript*, and file extensions have been changed from `*.js` to `*.ts`

Services that are **not affected** in this release:

 * Authorization
 * Dialog

Services that are **affected** in this release:

 * Conversation
 * Discovery
 * Language Translator
 * Natural Language Classifier
 * Natural Language Understanding
 * Personality Insights
 * Text to Speech
 * Tone Analyzer
 * Speech to Text
 * Visual Recognition

Services that are **removed** in this release:

 * Alchemy Language
 * Alchemy Data News
 * Document Conversion
 * Retrieve and Rank
 * Tradeoff Analytics

Upon upgrading the SDK, follow the migration guide [here](https://github.com/watson-developer-cloud/node-sdk/wiki/Migration-Guide). 

## [v2.39.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.39.0)
* Added support for `highlight` param in `DiscoveryV1.query()`

## [v2.38.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.38.0)
* DiscoveryV1.VERSION_DATE_2017_08_01 = '2017-08-01';

## [v2.37.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.37.0)
* `ToneAnalyzerV3.tone()` now accepts `language` parameter to specify `content-language` header for input.

### [v2.36.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.36.1)
* Improved formatting of Alchemy Language error messages

## [v2.36.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.36.0)
* Added `ConversationV1.VERSION_DATE_2017_05_26`

## [v2.35.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.35.0)
* Added `DiscoveryV1.updateJsonDocument` to compliment`addJsonDocument()`

## [v2.34.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.34.0)
* Added `DiscoveryV1.addJsonDocument()` method to make uploading in-memory JSON structures easier
* Fixed bug in `DiscoveryV1.addDocument()` that prevented setting custom filenames [#474](https://github.com/watson-developer-cloud/node-sdk/issues/474)

## [v2.33.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.33.0)
* Added support for `fuzzy_match` param in Conversation entities methods
* Added support for JSON metadata when adding documents to Discovery [#474](https://github.com/watson-developer-cloud/node-sdk/issues/474)

### [v2.32.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.32.1)
* Discovery: fix createEnv with size 0

## [v2.32.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.32.0)
* Add natural_language_query and passages parameters to Discovery.query()
* Fix collection name param for Discovery.createCollection ([#https://github.com/watson-developer-cloud/node-sdk/issues/457](https://github.com/watson-developer-cloud/node-sdk/issues/457))

### [v2.31.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.30.1)
* Bumped `solr-client` dependency to latest version

### [v2.31.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.30.1)
* Added VisualRecognitionV3.VERSION_DATE_2016_05_20 constant

## [v2.31.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.31.0)
* Added support for sort param on DiscoveryV1.query() ([#446](https://github.com/watson-developer-cloud/node-sdk/pull/446))
* Added DiscoveryV1.VERSION_DATE_2017_04_27
* Made utterances a top-level param for ToneAnalyzerV3.tone_chat() ([#439](https://github.com/watson-developer-cloud/node-sdk/pull/439))

## [v2.30.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.30.0)
* Added support for Conversation entities (w/ values and synonyms) and logs
* Added support for updating Discovery environments

## [v2.29.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.29.0)
* Added tone_chat endpoint for Tone Analyzer
* Added support for WebM and Ogg/Vorbis formats to Speech to Text

### [v2.28.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.28.1)
* Fixed Visual Recognition credentials in dedicated environments ([#436](https://github.com/watson-developer-cloud/node-sdk/issues/426))

## [v2.28.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.28.0)
* bumped vcap_services library version
* Fixed bug with STT async recognition & multiple callback events
* Moved changelog to wiki

### [v2.27.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.27.1)
* Fixed issue when creating STT Async recognize job with multiple callback events ([#415](https://github.com/watson-developer-cloud/node-sdk/issues/415))

## [v2.27.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.27.0)
* Add support for Conversation Counter Examples API

### [v2.26.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.26.1)
* Correct name of `events` parameter in STT async recognize.

## [v2.26.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.26.0)
* Conversation sorting and pagination for workspaces, intents, and examples

### [v2.25.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.25.1)
* Natural Language Understanding: fixed credentials pulling from bluemix

## [v2.25.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.25.0)
* Natural Language Understanding: new version_date and addition of listModels() and deleteModel() methods

### [v2.24.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.24.1)
* STT RecognizeStream now exposes Transaction ID

### [v2.23.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.23.1)
* Restored support for Node.js 4.0-4.4

## [v2.23.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.23.0)
* Added support for Conversation intents and examples

### [v2.22.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.22.2)
* Speech to Text createRecognitionJob() now accepts all params from .recognize()
* Speech to Text getRecognitionJobs() accepts an optional params object in order to match the signature of the rest of the API

### [v2.22.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.22.1)
* Make callback_url optional for Speech to Text createRecognitionJob()

## [v2.22.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.22.0)
* Speech to Text Asychronous API support

## [v2.21.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.21.0)
* Added support for sort paramater in SpeechToTextV1.getWords()
* Added updateDocument() method to DiscoveryV1
* Fixed up internal code to avoid using the deprecated `new Buffer(...)` API
* Improved documentation

## [v2.20.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.20.0)
* Conversation VersionDate 2017-02-03

## [v2.19.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.19.0)
* Added support for find_preferable_options flag in Tradeoff Analytics

## [v2.18.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.18.0)
* Added various methods to Conversation service to create and manage workspaces
* Prevent docs site files from being included in npm releases

### [v2.17.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.17.1)
* Fixed bug in STT getWords method (#390)

## [v2.17.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.17.0)
* No API changes, but significant internal changes. Should behave exactly the same, but releasing as a standalone version out of caution.

## [v2.16.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.16.0)
* Added NaturalLanguageUnderstandingV1
* Added support for pulling SERVICE_NAME_URL from enviroment properties along with username and password (or api key)

### [v2.15.5](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.15.5)
* stt.whenCustomizationReady() no longer incorrectly requires that a corpus be added. (#382)
* various JSDoc corrections

### [v2.15.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.15.2)
* Fix slightly-incorrect URL in Language Translator V2 example and error message

## [v2.15.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.15.0)
* SDK now emits missing parameter errors on returned stream if no callback is supplied (#368 / #377)

### [v2.14.8](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.8)
* Fix DocumentConversion#convert() to accept config params as documented in api ref
* Fix param checking on various TTS customization methods

### [v2.14.6](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.6)
* Fix incorrect error messages (#373)

### [v2.14.5](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.5)
* Fix issue where adding a document as buffer/string fails in Discovery v1 (#370)
* Fix issue where STT RecognizeStream could fail to emit speaker_labels event in rare circumstances

### [v2.14.4](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.4)
* Update jsdoc for Speech to text

### [v2.14.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.3)
* Expose discovery v1 in index

### [v2.14.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.2)
* Same fix for language translation

### [v2.14.7](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.7)
* Fixed DocumentConversionV1.convert() to accept config params as a seperate object, matching api ref documentation (#375)

### [v2.14.6](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.6)
* Fix regression in error handler that would incorrectly overwrite error message in some cases

### [v2.14.5](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.5)
* Fix isue where STT RecognizeStream could fail to emit a speaker_labels events in certain rare circumstances
* Added Discovery add createEnvironment and deleteEnvironment methods
* Fix Discovery addDocument when adding a Buffer

### [v2.14.4](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.4)
* Update JSDOc for speech to Text

### [v2.14.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.3)
* Expose discovery v1 in index.js

### [v2.14.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.2)
* Fix content type for language translation (#362)

### [v2.14.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.1)
* Fix content type for language translator (#362)

## [v2.14.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.14.0)
* Added Discovery V1 (general availability release)

## [v2.13.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.13.0)
* Added STT whenCorporaAnalyzed() helper, #353
* Bumped dependencies

## [v2.12.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.12.0)
* Added Speech to Text speaker_labels support, added new speaker_labels event to RecognizeStream

### [v2.11.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.11.1)
* Fixed main file path in package.json
* added a conversation example

## [v2.11.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.11.0)
* Added several methods and a version_date constant to DiscoveryV1Experimental

### [v2.10.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.10.1)
* Added version_date constants to ConversationV1, updated docs, examples, etc to latest version_date.

### [v2.9.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.9.1)
* Added customization_id support to STT RecognizeStream

## [v2.9.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.9.0)
* Allow VisualRecognitionV3.classify() to accept Buffers (with automatic content-type detection) or Objects with specified filename or content-type
* Improve Visual Recognition error formatting
* Document Conversion: Remove forced utf-8 charset header for html files

### [v2.8.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.8.3)
* Fixed issue with formatting multiple keywords for STT recognize() - #261

### [v2.8.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.8.1)
* Added `getCredentials()` method to base service, primarily for use with AuthorizationV1()

### [v2.7.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.7.1)
* dependency fix

## [v2.7.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.7.0)
* Speech to Text customization support

### [v2.6.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.6.1)
* Ensure errors are always instanceof Error
* Doc improvements

## [v2.6.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.6.0)
* Added support for Personality Insights V3

## [v2.5.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.5.0)
* Split LanguageTranslationV2 into a seperate service from LanguageTranslatorV2, added a warning when translator service is used without specifying a url since the default is currently incorrect.
* Fixed bug with setting user-agent header

### [v2.4.7](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.7)
* Fixed issue with send data on non-open WebSockets for STT RecognizeStream - see #322

### [v2.4.6](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.6)
* Fixed credential bugs in R&R and STT

### [v2.4.5](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.5)
* Fixed bug where credentials could be lost when calling certain methods in Language Translator and Dialog services

### [v2.4.4](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.4)
* Doc-only changes, focused on Language Translation/Translator differences and temporary workaround

### [v2.4.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.3)
* Fix issue with automatically loading Alchemy* credentials from the Bluemix environment

### [v2.4.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.1)
* Revert part of credential change: Alchemy* services again use `apikey` while visual recognition uses `api_key`
  (Most endpoints accept either, but this split follows the documented API for each service.)

## [v2.4.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.4.0)
* Added support for Visual Recognition similarity search beta
* Refactored handling of credentials to support constraints in similarity search

## [v2.3.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.3.0)
* Add support for RetrieveAndRankV1.rank() answers param

## [v2.2.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.2.0)
* Added support for creating and managing TTS Customizations

### [v2.1.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.1.3)
* Deprecation warning for Dialog
* Added TTS .voice() and .pronunciation() methods
* Added support for `customization_id` to existing TTS methods
* Typo and JSDoc fixes
* Fixed bug with pulling api key from env properties for alchemy services

### [v2.1.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.1.2)
* Added profanity_filter support to STT RecognizeStream

### [v2.1.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.1.1)
* Corrected some examples to use - instead of _
* Renamed NLC folder to use - instead of _

## [v2.1.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.1.0)
* Updated AlchemyLanguageV1.emotion() to support new targeted_emotion parameter & endpoint
* Added Conversation/Tone Analyzer integration example
* Updated Readme & Examples to use newer constructor style

### [v2.0.3](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.0.3)
* Use actual Error instances for errors (#298)

### [v2.0.2](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.0.2)

* Added support for the `intents`, `entities` and `output` parameters in ConveersationV1.message()
* Removed sunset services: Concept Insights and Relationship Extraction
* Dependency bump


### [v2.0.1](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.0.1)

* Added VisualRecognitionV3.retrainClassifier() to facilitate updating of existing custom classifiers
* Added support for `alternate_intents` parameter in ConversationV1.message()


# [v2.0.0](https://github.com/watson-developer-cloud/node-sdk/releases/tag/v2.0.0)

* Breaking: prefer programatic (user-supplied) credentials over bluemix-provided ones (VCAP_SERVICES)
* New preferred method of instantiating services: `new watson.PersonalityInsightsV2({/*...*/});` instead of `watson.personality_insights({/*...*/});`. Older method still works
* Restructured code to support client-side usage via tools such as Browserify and Webpack. Most services support CORS; this will be documented and the remaining service teams will be nagged.
* Added a changelog to capture both major breaking changes and smaller


# Breaking Changes for v1.0

Several breaking changes were introduced with the v1.0.0 release:

  * Experimental and Beta services now require the appropriate tag to be added to their version:
    * Concept Expansion `v1` is now `v1-beta`
    * Question and Answer `v1` is now `v1-beta`
    * Relationship Extraction `v1` is now `v1-beta`
    * Tone Analyzer `v3` is now `v3` (latest) or `v3-beta` (compatibility with old Beta plan)
    * Visual Insights `v1` is now `v1-experimental`
    * Visual Recognition `v1` is now `v1-beta`
  * Speech to Text gained a new `createRecognizeStream()` method replacing the existing live streaming methods with a simpler Read/Write stream.
    The older methods are still available in v1.0 but each log a deprecation warning (unless `{silent: true}` is passed in) and will be removed from a future release.
    The affected methods are:
    * `recognizeLive()`
    * `observeResult()`
    * `getRecognizeStatus()`
  * The Document Conversion API has been reduced to a single `convert()` method; it no longer offers batch conversion or cloud storage of files.
  * Several deprecated services have been removed:
    * Message Resonance
    * Tone Analyzer v1 and v2 (replaced by v3)
    * Search (replaced by Retrieve and Rank)
  * Dropped support for node.js v0.10.x (For reference: the WDC Node.js SDK now officially support the latest 0.12, LTS, and Stable releases of Node.js.)
