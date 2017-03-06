# v2.25.1
* Natural Language Understanding: fixed credentials pulling from bluemix

# v2.25.0
* Natural Language Understanding: new version_date and addition of listModels() and deleteModel() methods

# v2.24.1
* STT RecognizeStream now exposes Transaction ID

# v2.23.1
* Restored support for Node.js 4.0-4.4

# v2.23.0
* Added support for Conversation intents and examples

# v2.22.2
* Speech to Text createRecognitionJob() now accepts all params from .recognize()
* Speech to Text getRecognitionJobs() accepts an optional params object in order to match the signature of the rest of the API

# v2.22.1
* Make callback_url optional for Speech to Text createRecognitionJob()

# v2.22.0
* Speech to Text Asychronous API support

# v2.21.0
* Added support for sort paramater in SpeechToTextV1.getWords()
* Added updateDocument() method to DiscoveryV1
* Fixed up internal code to avoid using the deprecated `new Buffer(...)` API
* Improved documentation

# v2.20.0
* Conversation VersionDate 2017-02-03

# v2.19.0
* Added support for find_preferable_options flag in Tradeoff Analytics

# v2.18.0
* Added various methods to Conversation service to create and manage workspaces
* Prevent docs site files from being included in npm releases

# v2.17.1
* Fixed bug in STT getWords method (#390)

# v2.17.0
* No API changes, but significant internal changes. Should behave exactly the same, but releasing as a standalone version out of caution.

# v2.16.0
* Added NaturalLanguageUnderstandingV1
* Added support for pulling SERVICE_NAME_URL from enviroment properties along with username and password (or api key)

# v2.15.5
* stt.whenCustomizationReady() no longer incorrectly requires that a corpus be added. (#382)
* various JSDoc corrections

# v2.15.2
* Fix slightly-incorrect URL in Language Translator V2 example and error message

# v2.15.0
* SDK now emits missing parameter errors on returned stream if no callback is supplied (#368 / #377)

# v2.14.8
* Fix DocumentConversion#convert() to accept config params as documented in api ref
* Fix param checking on various TTS customization methods

# v2.14.6
* Fix incorrect error messages (#373)

# v2.14.5
* Fix issue where adding a document as buffer/string fails in Discovery v1 (#370)
* Fix issue where STT RecognizeStream could fail to emit speaker_labels event in rare circumstances

# v2.14.4
* Update jsdoc for Speech to text

# v2.14.3
* Expose discovery v1 in index

# v2.14.2
* Same fix for language translation

# v2.14.7
* Fixed DocumentConversionV1.convert() to accept config params as a seperate object, matching api ref documentation (#375)

# v2.14.6
* Fix regression in error handler that would incorrectly overwrite error message in some cases

# v2.14.5
* Fix isue where STT RecognizeStream could fail to emit a speaker_labels events in certain rare circumstances
* Added Discovery add createEnvironment and deleteEnvironment methods
* Fix Discovery addDocument when adding a Buffer

# v2.14.4
* Update JSDOc for speech to Text

# v2.14.3
* Expose discovery v1 in index.js

# v2.14.2
* Fix content type for language translation (#362)

# v2.14.1
* Fix content type for language translator (#362)

# v2.14.0
* Added Discovery V1 (general availability release)

# v2.13.0
* Added STT whenCorporaAnalyzed() helper, #353
* Bumped dependencies

# v2.12.0
* Added Speech to Text speaker_labels support, added new speaker_labels event to RecognizeStream

# v2.11.1
* Fixed main file path in package.json
* added a conversation example

# v2.11.0
* Added several methods and a version_date constant to DiscoveryV1Experimental

# v2.10.1
* Added version_date constants to ConversationV1, updated docs, examples, etc to latest version_date.

# v2.9.1
* Added customization_id support to STT RecognizeStream

# v2.9.0
* Allow VisualRecognitionV3.classify() to accept Buffers (with automatic content-type detection) or Objects with specified filename or content-type
* Improve Visual Recognition error formatting
* Document Conversion: Remove forced utf-8 charset header for html files

# v2.8.3
* Fixed issue with formatting multiple keywords for STT recognize() - #261

# v2.8.1
* Added `getCredentials()` method to base service, primarily for use with AuthorizationV1()

# v2.7.1
* dependency fix

# v2.7.0
* Speech to Text customization support

# v2.6.1
* Ensure errors are always instanceof Error
* Doc improvements

# v2.6.0
* Added support for Personality Insights V3

# v2.5.0
* Split LanguageTranslationV2 into a seperate service from LanguageTranslatorV2, added a warning when translator service is used without specifying a url since the default is currently incorrect.
* Fixed bug with setting user-agent header

# v2.4.7
* Fixed issue with send data on non-open WebSockets for STT RecognizeStream - see #322

# v2.4.6
* Fixed credential bugs in R&R and STT

# v2.4.5
* Fixed bug where credentials could be lost when calling certain methods in Language Translator and Dialog services

# v2.4.4
* Doc-only changes, focused on Language Translation/Translator differences and temporary workaround

# v2.4.3
* Fix issue with automatically loading Alchemy* credentials from the Bluemix environment

# v2.4.1
* Revert part of credential change: Alchemy* services again use `apikey` while visual recognition uses `api_key`
  (Most endpoints accept either, but this split follows the documented API for each service.)

# v2.4.0
* Added support for Visual Recognition similarity search beta
* Refactored handling of credentials to support constraints in similarity search

# v2.3.0
* Add support for RetrieveAndRankV1.rank() answers param

# v2.2.0
* Added support for creating and managing TTS Customizations

# v2.1.3
* Deprecation warning for Dialog
* Added TTS .voice() and .pronunciation() methods
* Added support for `customization_id` to existing TTS methods
* Typo and JSDoc fixes
* Fixed bug with pulling api key from env properties for alchemy services

# v2.1.2
* Added profanity_filter support to STT RecognizeStream

# v2.1.1
* Corrected some examples to use - instead of _
* Renamed NLC folder to use - instead of _

# v2.1.0
* Updated AlchemyLanguageV1.emotion() to support new targeted_emotion parameter & endpoint
* Added Conversation/Tone Analyzer integration example
* Updated Readme & Examples to use newer constructor style

# v2.0.3
* Use actual Error instances for errors (#298)

# v2.0.2

* Added support for the `intents`, `entities` and `output` parameters in ConveersationV1.message()
* Removed sunset services: Concept Insights and Relationship Extraction
* Dependency bump


# v2.0.1

* Added VisualRecognitionV3.retrainClassifier() to facilitate updating of existing custom classifiers
* Added support for `alternate_intents` parameter in ConversationV1.message()


# v2.0.0

* Breaking: prefer programatic (user-supplied) credentials over bluemix-provided ones (VCAP_SERVICES)
* New preferred method of instantiating services: `new watson.PersonalityInsightsV2({/*...*/});` instead of `watson.personality_insights({/*...*/});`. Older method still works
* Restructured code to support client-side usage via tools such as Browserify and Webpack. Most services support CORS; this will be documented and the remaining service teams will be nagged.
* Added a changelog to capture both major breaking changes and smaller


## Breaking Changes for v1.0

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
