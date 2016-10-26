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
