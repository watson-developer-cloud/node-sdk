# [10.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v9.1.0...v10.0.0) (2024-12-04)


### Code Refactoring

* **auth:** remove deprecated AuthorizationV1 class ([3f8addb](https://github.com/watson-developer-cloud/node-sdk/commit/3f8addb469c7e7ec97bb39b4f8552cda4f8fa040))


### Features

* **discov1:** remove discoV1 ([936edc1](https://github.com/watson-developer-cloud/node-sdk/commit/936edc130ea73760932a30444b8ad8c146a07b56))
* **discov2:** add functions for new batches api ([5f81415](https://github.com/watson-developer-cloud/node-sdk/commit/5f814151a3dd7be7ae8c6c16bc7e06942c3ceb45))
* **lt:** remove lt and other deprecated resources ([6478da6](https://github.com/watson-developer-cloud/node-sdk/commit/6478da6791df6fc2bd03056eb6cbdef1a1567af5))
* **stt:** add new speech models ([c4105ca](https://github.com/watson-developer-cloud/node-sdk/commit/c4105cac719a15791fbde45edfed740914bb5693))
* **WxA:** add new functions and update required params ([b710609](https://github.com/watson-developer-cloud/node-sdk/commit/b71060916e44604543b54f2d42368a18fd4d18df))


### BREAKING CHANGES

* **auth:** AuthorizationV1 is removed in favor of the long supported node-sdk-core authenticators located in /auth
* **WxA:** `environmentId` now required for `message` and `messageStateless` functions

Add support for message streaming and new APIs
New functions: createProviders, listProviders, updateProviders, createReleaseExport, downloadReleaseExport, createReleaseImport, getReleaseImportStatus, messageStream, messageStreamStateless
* **lt:** LanguageTranslator functionality has been removed
* **discov1:** DiscoveryV1 functionality has been removed

# [9.1.0](https://github.com/watson-developer-cloud/node-sdk/compare/v9.0.1...v9.1.0) (2024-05-17)


### Features

* **discov2:** add ocrEnabled parameter ([5a9c30e](https://github.com/watson-developer-cloud/node-sdk/commit/5a9c30e181e043f7ba6aee8af1772944c94a0a3a))
* **stt:** add speechBeginEvent param to recognize func ([8f19640](https://github.com/watson-developer-cloud/node-sdk/commit/8f196401c48674ddb3503069dcd17ff7a6e16b2a))
* **stt:** remove interimResults and lowLatency wss params ([6c79d93](https://github.com/watson-developer-cloud/node-sdk/commit/6c79d93e8f4e57422238a4076eb90fe49c9f14bf))

## [9.0.1](https://github.com/watson-developer-cloud/node-sdk/compare/v9.0.0...v9.0.1) (2024-03-13)


### Bug Fixes

* **stt:** change smartFormattingVersion type to number ([3db377b](https://github.com/watson-developer-cloud/node-sdk/commit/3db377bb58c5c2bbbfbb7d28889dd503a8116bee))
* **wss:** add smartFormattingVersion param ([d64f155](https://github.com/watson-developer-cloud/node-sdk/commit/d64f15513ff786d167168b4d863c8a99ca8eff7e))

# [9.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v8.0.0...v9.0.0) (2024-02-26)


### Features

* **disco-v2:** interface changes ([619d09b](https://github.com/watson-developer-cloud/node-sdk/commit/619d09b80580a13b30fd467ca6af47d245e2f5de))
* **disco-v2:** new params for EnrichmentOptions ([e826b89](https://github.com/watson-developer-cloud/node-sdk/commit/e826b8955ce896d34436b08c4ec7fc7854a45d66))
* **mcsp:** expose McspAuthenticator ([94d3efc](https://github.com/watson-developer-cloud/node-sdk/commit/94d3efc9fba715ff35e5269f4e210c9a3c6dbf50))
* **stt:** new params ([06bb328](https://github.com/watson-developer-cloud/node-sdk/commit/06bb3286fd3828bd3486845e3691d483c65bfc1e))
* **ts:** add better ts typing and linting ([762c6bf](https://github.com/watson-developer-cloud/node-sdk/commit/762c6bf23e61003abf133ae6430f8d9fec08c56e))
* **wa-v2:** new params orchestration and asyncCallout ([5124107](https://github.com/watson-developer-cloud/node-sdk/commit/5124107fedda2aaa574202ceda69af56739b347e))
* **wa-v2:** support for private variables ([784c476](https://github.com/watson-developer-cloud/node-sdk/commit/784c476800cdc73ba7c1413482f5591d5d3d168f))


### BREAKING CHANGES

* **wa-v2:** Renaming and changing of multiple interfaces

# [8.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v7.1.2...v8.0.0) (2023-03-16)


### Bug Fixes

* **deps:** upgrade core version to address jsonwebtoken vulnerability ([67b169d](https://github.com/watson-developer-cloud/node-sdk/commit/67b169d795b6d7c828e078b891ac3b0940ef0def))


### Features

* **assistantv2:** add several new functions ([2eae4e9](https://github.com/watson-developer-cloud/node-sdk/commit/2eae4e975cd97408f9ad65af642e858e2fd12b56))
* **assistantv2:** improved typing ([730114e](https://github.com/watson-developer-cloud/node-sdk/commit/730114ee39ac780d089416923cbc1ef7037f1d52))
* **discov2:** new aggregation types ([9409082](https://github.com/watson-developer-cloud/node-sdk/commit/9409082da9436860632543f57eb69a5e12472776))
* **lt,stt:** add and remove model constants ([d41c7ee](https://github.com/watson-developer-cloud/node-sdk/commit/d41c7ee5f88438df5b5e123e67656d4a78e7bf26))
* **nlu:** remove all sentimentModel functions ([0f17d68](https://github.com/watson-developer-cloud/node-sdk/commit/0f17d6871f501c61bc62a30d1760ed932adc7982))
* **nlu:** remove beta model param from Sentiment ([8815b1a](https://github.com/watson-developer-cloud/node-sdk/commit/8815b1a0e6f39dc6202c344a944ecbf4250cf7e7))
* **stt, tts:** add more models ([93cbe80](https://github.com/watson-developer-cloud/node-sdk/commit/93cbe8014586ab8b31fbb579628b1ff46c54f75c))
* **tts:** add new params to websocket function ([13ab63f](https://github.com/watson-developer-cloud/node-sdk/commit/13ab63f8493b6d0feffcdfd610b554684e80cb53))
* **tts:** add params and add model constants ([b9fad7b](https://github.com/watson-developer-cloud/node-sdk/commit/b9fad7b8e4c6982705c60ceb5adc8684bd7ef81a))


### BREAKING CHANGES

* **assistantv2:** createSession param removed
* **assistantv2:** removing and changing of interface properties
* **discov2:** confidence property removed
* **discov2:** smartDocumentUnderstanding param removed
* **discov2:** QueryAggregation structure changed
* **nlu:** remove all sentimentModel functions and interfaces

## [7.1.2](https://github.com/watson-developer-cloud/node-sdk/compare/v7.1.1...v7.1.2) (2022-10-25)


### Bug Fixes

* **deps:** upgrade core version to address file-type vulnerability ([c724fc3](https://github.com/watson-developer-cloud/node-sdk/commit/c724fc3a6bb6646c1bb8565f1fdaec69bff33666))

## [7.1.1](https://github.com/watson-developer-cloud/node-sdk/compare/v7.1.0...v7.1.1) (2022-08-16)


### Bug Fixes

* **package.json:** rollback core version ([f74c48c](https://github.com/watson-developer-cloud/node-sdk/commit/f74c48c128e562b682b1c2571df1a569ffb4bc32))

# [7.1.0](https://github.com/watson-developer-cloud/node-sdk/compare/v7.0.0...v7.1.0) (2022-08-10)


### Features

* **assistant-v1:** update models and add new methods ([e320105](https://github.com/watson-developer-cloud/node-sdk/commit/e320105607adcbd8700ebba16872d84de2fb6c9e))
* **assistant-v2:** update models and add new methods ([0a66745](https://github.com/watson-developer-cloud/node-sdk/commit/0a667450dcc10d0794a198d6bcd72f0edd40930e))
* **discovery-v2:** update models and add several new methods ([d8bf765](https://github.com/watson-developer-cloud/node-sdk/commit/d8bf765a9eed0645200e5e941c02128b8df6a67f))
* **nlu:** add trainingParameters parameter ([6e3f676](https://github.com/watson-developer-cloud/node-sdk/commit/6e3f67688d2d9cb650e3c4a2c269d5a54f3d5626))
* **package.json:** upgrade bm-cloud-sdk-core ([ab019de](https://github.com/watson-developer-cloud/node-sdk/commit/ab019de01ea3c6a16a11e324ab3461ad53931a78))
* **stt:** update parameters ([3be4085](https://github.com/watson-developer-cloud/node-sdk/commit/3be40857df486670ef405d6aba23683b6527a469))
* **tts:** add parameters ([a3ed589](https://github.com/watson-developer-cloud/node-sdk/commit/a3ed58939391d74eeccdda12397ff6361ce6ca60))
* **wss:** add new websocket params ([8cce07c](https://github.com/watson-developer-cloud/node-sdk/commit/8cce07c8aed80c3b443bf4a650071e06f0ff274e))

# [7.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v6.2.2...v7.0.0) (2022-03-21)


### Features

* **assistantv1:** assistant v1 generated with new spec ([5c6e9db](https://github.com/watson-developer-cloud/node-sdk/commit/5c6e9db67a3b99b66f9fa1ac4ecfcbb7f54ac54b))
* **assistantv2:** assistant v2 generated with new spec ([7f7d96f](https://github.com/watson-developer-cloud/node-sdk/commit/7f7d96fbbf0afc15cbb1e2243c88522daa9d42fd))
* **compare-comply:** remove compare-comply ([a851442](https://github.com/watson-developer-cloud/node-sdk/commit/a851442ae7afc981a786c04529921ceafad1552a))
* **discoveryv1:** discovery v1 generated with new spec ([cf1d976](https://github.com/watson-developer-cloud/node-sdk/commit/cf1d9760482f44a53cc3d1b2d4c19d052ce87acb))
* **discoveryv1:** regen with more recent defs ([46752a1](https://github.com/watson-developer-cloud/node-sdk/commit/46752a16b622f1e97589c392b34804480c78f0a9))
* **lt:** lT generated with new spec ([ed54e99](https://github.com/watson-developer-cloud/node-sdk/commit/ed54e99c587dc4be28846562003961a5878bdd32))
* **nlc:** remove NLC ([698b3be](https://github.com/watson-developer-cloud/node-sdk/commit/698b3be2811dfaed8e6094776ef534b3977d30c5))
* **nlu:** nLU generated with new spec ([beeb8a0](https://github.com/watson-developer-cloud/node-sdk/commit/beeb8a03d182487e1a1761c707b386e510c3bb33))
* **pi:** remove PI ([350ed36](https://github.com/watson-developer-cloud/node-sdk/commit/350ed3678ec26404f1fc47986bdda38ff5b0140a))
* **secrets:** run detect secrets ([5a5690a](https://github.com/watson-developer-cloud/node-sdk/commit/5a5690a8f7b697c9f19097d20ee465cd1302202e))
* **stt:** change addGrammar to take a file ([d21b462](https://github.com/watson-developer-cloud/node-sdk/commit/d21b462044c18b3d06c5592f4b038338b3c698d9))
* **stt:** stt generated with new spec ([ec98a33](https://github.com/watson-developer-cloud/node-sdk/commit/ec98a33d37eacb2209ea344550ca756a35e35654))
* **tone analyzer:** remove tone analyzer ([fbd5be1](https://github.com/watson-developer-cloud/node-sdk/commit/fbd5be13525ec0e9283d378b4dea1998f87f0f3a))
* **tts:** tTS generated with new spec ([b1e87d3](https://github.com/watson-developer-cloud/node-sdk/commit/b1e87d389f88f762cc23ecc9768c0620a589b64d))
* **vizrec:** remove vizrec ([a6f3134](https://github.com/watson-developer-cloud/node-sdk/commit/a6f31347d1d34fe08b10a7a102aab2cfc19987ff))


### BREAKING CHANGES

* **stt:** addGrammar no longer accepts a string and must take a file
* **discoveryv1:** QueryAggregation subclasses changed, be sure to regen models
* **stt:** Changed file type of addGrammar from String to Data
* **discoveryv1:** QueryAggregation - subclasses have changed
* **assistantv2:** MessageOutputDebug - renamed DialogNodesVisited to DialogNodeVisited; RuntimeEntity
- removed optional metadata property
* **assistantv1:** Removed required text property on outputdata and removed optional metadata property
from runtimeentity
* **tone analyzer:** Tone Analyzer functionality has been removed
* **vizrec:** VizRec functionality has been removed
* **pi:** PI functionality has been removed
* **nlc:** NLC functionality has been removed
* **compare-comply:** Compare and comply functionality has been removed

## [6.2.2](https://github.com/watson-developer-cloud/node-sdk/compare/v6.2.1...v6.2.2) (2022-01-19)


### Bug Fixes

* **stt:** update word confidence and timestamps type ([9f4d664](https://github.com/watson-developer-cloud/node-sdk/commit/9f4d6645fa8080b41f4f99fb0cf07e3f5b68a4c1))

## [6.2.1](https://github.com/watson-developer-cloud/node-sdk/compare/v6.2.0...v6.2.1) (2021-09-21)


### Bug Fixes

* **stt:** fix timestamps type to properly reflect response model ([1efa983](https://github.com/watson-developer-cloud/node-sdk/commit/1efa98382303fda77ba078541e0c7922d750339d))

# [6.2.0](https://github.com/watson-developer-cloud/node-sdk/compare/v6.1.2...v6.2.0) (2021-09-14)


### Bug Fixes

* **assistant_v2 discovery_v1:** regen with final release ([cc99978](https://github.com/watson-developer-cloud/node-sdk/commit/cc999789e4f308d7859434cd1338361274f26732))
* **discovery_v1:** update status model ([bb69a7e](https://github.com/watson-developer-cloud/node-sdk/commit/bb69a7eec2bce738d17b06b246d850e8e0dcf8ba))
* **nlu:** fix listClassificationModels ([8c09145](https://github.com/watson-developer-cloud/node-sdk/commit/8c09145e9f7ad41b767e1500bf5d87826257ff81))
* **package.json:** bump cloud sdk core version ([f4579b4](https://github.com/watson-developer-cloud/node-sdk/commit/f4579b47b7aca8ba67ac0978f7220345f4481a6f))
* regenerate with correct version ([16420fc](https://github.com/watson-developer-cloud/node-sdk/commit/16420fc224972fde458e52fbe4a62ec4a699d55d))
* **package.json:** bump axios version ([29b9b4e](https://github.com/watson-developer-cloud/node-sdk/commit/29b9b4ec47cf0d4b20b2b21c8f296f5f23e1a7ab))


### Features

* **assistant_v1:** alt_text property added ([32c7d2e](https://github.com/watson-developer-cloud/node-sdk/commit/32c7d2ebe194922dc971eda54067738643f08870))
* **assistant_v2:** add properties to model and Image response ([6f0bb29](https://github.com/watson-developer-cloud/node-sdk/commit/6f0bb29a009edc3f13defb89994f2fd62c8b4133))
* **discovery_v2:** update CreateProjectConstants Type enum ([f272fc6](https://github.com/watson-developer-cloud/node-sdk/commit/f272fc64a5e997679fb277f6a94c4c4aa571c2d7))
* **stt:** support more languages ([84bb18d](https://github.com/watson-developer-cloud/node-sdk/commit/84bb18da2a4431c4f59cd95f0e05c8d61cd7ab85))
* **tts:** new voice models added ([1e64b92](https://github.com/watson-developer-cloud/node-sdk/commit/1e64b92ed37428993c4f1f1cbedc7c733668ee81))

## [6.1.2](https://github.com/watson-developer-cloud/node-sdk/compare/v6.1.1...v6.1.2) (2021-08-25)


### Bug Fixes

* **nlc:** add deprecation warning ([5b269ae](https://github.com/watson-developer-cloud/node-sdk/commit/5b269ae1afec11bdc0eb078f82f12827d336f644)), closes [#9622](https://github.com/watson-developer-cloud/node-sdk/issues/9622)

## [6.1.1](https://github.com/watson-developer-cloud/node-sdk/compare/v6.1.0...v6.1.1) (2021-06-02)


### Bug Fixes

* **tts:** remove unnecessary filename param ([d30bb25](https://github.com/watson-developer-cloud/node-sdk/commit/d30bb259a4de3cc6e4f20f6bc7b1e328c60aa0b0))

# [6.1.0](https://github.com/watson-developer-cloud/node-sdk/compare/v6.0.4...v6.1.0) (2021-05-27)


### Bug Fixes

* **nlu:** remove ListCategoriesModelsResponse ([82a82a3](https://github.com/watson-developer-cloud/node-sdk/commit/82a82a3edd3ce3ba045f6320aeb1d53da9d3ca68))
* **wss,assistantv1:** address review changes ([ab0c8a2](https://github.com/watson-developer-cloud/node-sdk/commit/ab0c8a294450358a9222df3b361206c4b65bb72d))


### Features

* **assistantv1:** generation release changes ([8b10b2d](https://github.com/watson-developer-cloud/node-sdk/commit/8b10b2d6b1df0dcd20001f8898ef511b8d2b14f5))
* **assistantv2:** generation release changes ([403145e](https://github.com/watson-developer-cloud/node-sdk/commit/403145e3db666db5189ef7111dc25a062c53e9b2))
* **discov2:** generation release changes ([8e70b7f](https://github.com/watson-developer-cloud/node-sdk/commit/8e70b7faaa9d3fcd35e3c34aa9d5b04e80a2c81a))
* **nlu:** generation release changes ([4d74c0a](https://github.com/watson-developer-cloud/node-sdk/commit/4d74c0a6fccbf50685733c9a3002cea819f26c98))
* **stt:** update websocket parameters ([8f257e7](https://github.com/watson-developer-cloud/node-sdk/commit/8f257e7ffca1e13d895c6ae76f235306b30bd57d))
* **stt-tts:** generation release changes ([1bc946b](https://github.com/watson-developer-cloud/node-sdk/commit/1bc946b6e53cf75c03d8c51f0fba613615dae3bb))

## [6.0.4](https://github.com/watson-developer-cloud/node-sdk/compare/v6.0.3...v6.0.4) (2021-04-05)


### Bug Fixes

* update core to enable use with more front-end environments ([bb57a23](https://github.com/watson-developer-cloud/node-sdk/commit/bb57a23e311bfdf3b4c8636e3a9d4c03efd3dd78))

## [6.0.3](https://github.com/watson-developer-cloud/node-sdk/compare/v6.0.2...v6.0.3) (2021-02-22)


### Bug Fixes

* **cc:** add deprecation warning for Compare and Comply ([85c218a](https://github.com/watson-developer-cloud/node-sdk/commit/85c218a4d02a31534865bfde5ccede4fb113f00d))
* **stt:** handedit- fix timestamps time to properly reflect response model ([735bcd2](https://github.com/watson-developer-cloud/node-sdk/commit/735bcd23bdd32657c5ea8e79ab9f9ff741e1d2a3)), closes [#1084](https://github.com/watson-developer-cloud/node-sdk/issues/1084)

## [6.0.2](https://github.com/watson-developer-cloud/node-sdk/compare/v6.0.1...v6.0.2) (2021-01-08)


### Bug Fixes

* **package.json:** update dependencies to cover vulnerabilities ([2b839c8](https://github.com/watson-developer-cloud/node-sdk/commit/2b839c8ac2a5ba7caf407edf03c5add2ca2ea348))

## [6.0.1](https://github.com/watson-developer-cloud/node-sdk/compare/v6.0.0...v6.0.1) (2020-12-22)


### Bug Fixes

* kick off semantic release ([#1080](https://github.com/watson-developer-cloud/node-sdk/issues/1080)) ([dd178f3](https://github.com/watson-developer-cloud/node-sdk/commit/dd178f39e791ef198e7ed7c72c3821307784227b))

# [6.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.7.1...v6.0.0) (2020-12-11)

### BREAKING CHANGES

* Support for callbacks dropped
* Support for Node v10 dropped
* changes to services, see [MIGRATION-V6.md](https://github.com/watson-developer-cloud/node-sdk/blob/master/MIGRATION-V6.md)


## [5.7.1](https://github.com/watson-developer-cloud/node-sdk/compare/v5.7.0...v5.7.1) (2020-09-29)


### Bug Fixes

* add `getTransactionId` method to the SynthesizeStream ([#1058](https://github.com/watson-developer-cloud/node-sdk/issues/1058)) ([21a5a7f](https://github.com/watson-developer-cloud/node-sdk/commit/21a5a7f2a1975d5ecc8ae1654f81d680585c39d9))
* stop ignoring serviceUrl for Websocket methods ([#1060](https://github.com/watson-developer-cloud/node-sdk/issues/1060)) ([1901aae](https://github.com/watson-developer-cloud/node-sdk/commit/1901aae2f07e58c97ed26ed31906407581fb51c1))

# [5.7.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.6.2...v5.7.0) (2020-08-27)


### Bug Fixes

* added test to `getDocumentStatus()` ([e5c81d5](https://github.com/watson-developer-cloud/node-sdk/commit/e5c81d5a7b64b28b3558040cbbdea02792fb82a2))
* comments and necessary required params ([bef8089](https://github.com/watson-developer-cloud/node-sdk/commit/bef8089a7ebebc62917e63a151c10120e264d02c))
* small changes ([f7a5e3c](https://github.com/watson-developer-cloud/node-sdk/commit/f7a5e3ccc371a19c1e4d179ac69ab416c86da89b))
* visual reconition v4 ([b12f11e](https://github.com/watson-developer-cloud/node-sdk/commit/b12f11eb7e82c8418b7b377f60cbb3e17dfdf05f))


### Features

* **assistant-v2:** new method: `listLogs` ([ff6b79c](https://github.com/watson-developer-cloud/node-sdk/commit/ff6b79cd3259bd3930dd67672180a3f68f58f0f0))
* **discovery-v2:** new methods: ([01d426c](https://github.com/watson-developer-cloud/node-sdk/commit/01d426c490891ef167529f62beebff7a1e776cce))
* **discovery-v2-test:** added new tests for the new methods coming to ([82ea90f](https://github.com/watson-developer-cloud/node-sdk/commit/82ea90fe2f426a6179c74654559d9eab2cf59334))
* **language-translator-v3:** new method: listLanguages ([b9a7d41](https://github.com/watson-developer-cloud/node-sdk/commit/b9a7d418aee14ea0779eaced0da2b60590e3f1b5))
* **text-to-speech-v1:** new voices added ([be94a1a](https://github.com/watson-developer-cloud/node-sdk/commit/be94a1a4a87ffb2af7b8796b1528422bbfa115cc))

## [5.6.2](https://github.com/watson-developer-cloud/node-sdk/compare/v5.6.1...v5.6.2) (2020-08-06)


### Bug Fixes

* support `disableSslVerification` when user provides https agent ([#1055](https://github.com/watson-developer-cloud/node-sdk/issues/1055)) ([4ab77e1](https://github.com/watson-developer-cloud/node-sdk/commit/4ab77e19fac2b900246be7e3650c9d2ed5d46aa6))

## [5.6.1](https://github.com/watson-developer-cloud/node-sdk/compare/v5.6.0...v5.6.1) (2020-07-24)


### Bug Fixes

* update core version to 2.4.2 ([#1050](https://github.com/watson-developer-cloud/node-sdk/issues/1050)) ([24f2217](https://github.com/watson-developer-cloud/node-sdk/commit/24f22175549e373bb05dee719d7e49eadfc22bb5))

# [5.6.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.5.0...v5.6.0) (2020-06-03)


### Bug Fixes

* update dependencies and examples ([#1036](https://github.com/watson-developer-cloud/node-sdk/issues/1036)) ([fde46cf](https://github.com/watson-developer-cloud/node-sdk/commit/fde46cf6c7dd2487b81a2fd19fb85691ba2bff5e))


### Features

* **assistant-v2:** new method: `messageStateless` ([0ccc5bf](https://github.com/watson-developer-cloud/node-sdk/commit/0ccc5bf9975c7c8637709422dadf3bf7f2f29d06))
* **visual-recognition-v4:** new method: `getModelFile` ([55aec8c](https://github.com/watson-developer-cloud/node-sdk/commit/55aec8c77c7a24391329a68dd1be741f0fcc5fe2))

# [5.5.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.4.0...v5.5.0) (2020-04-24)


### Bug Fixes

* **discovery-v1:** property `indexed` corrected to `available` for model `EnvironmentDocuments` ([7bc2ccd](https://github.com/watson-developer-cloud/node-sdk/commit/7bc2ccdb303f621068e964bf147672b0c8e0db8e))


### Features

* **assistant-v1:** `RuntimeEntityAlternative` model added ([9ad75d7](https://github.com/watson-developer-cloud/node-sdk/commit/9ad75d7cbc94a6f686d72dfe71a7ef6b2188fda9))
* **assistant-v2:** `MessageContextSkillSystem` model added ([40fd822](https://github.com/watson-developer-cloud/node-sdk/commit/40fd822b668104ab11ba9e6711c7d6c85785c39e))
* **speech-to-text-v1:** parameters `speechDetectorSensitivity`, `backgroundAudioSuppression`, added to `recognize` ([7c91ea2](https://github.com/watson-developer-cloud/node-sdk/commit/7c91ea2263e9a4c7a1ac47bae9dffefc06082692))
* **text-to-speech-v1:** new voices and languages added ([dad6e0e](https://github.com/watson-developer-cloud/node-sdk/commit/dad6e0edcd86aeed5815809e7cb685734cb3deb7))

# [5.4.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.3.1...v5.4.0) (2020-02-13)


### Features

* **assistant-v1:** `includeAudit` and `append` parameters added to a number of methods ([35fb2a5](https://github.com/watson-developer-cloud/node-sdk/commit/35fb2a5c9692c6e8a67f9de969269a8d37eb2ebb))
* **visual-recognition-v4:** new methods added: `listObjectMetadata`, `updateObjectMetadata`, `getObjectMetadata`, `deleteObject` ([85281ae](https://github.com/watson-developer-cloud/node-sdk/commit/85281aeafaf39e92d7985ad588fcabb01d410c0a))

## [5.3.1](https://github.com/watson-developer-cloud/node-sdk/compare/v5.3.0...v5.3.1) (2020-01-29)


### Bug Fixes

* **Natural Language Understanding v1:** Restore model field in CategoriesOptions ([93e7b69](https://github.com/watson-developer-cloud/node-sdk/commit/93e7b6946ae92bc0499097bdfb92153509b924a2))

# [5.3.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.2.1...v5.3.0) (2020-01-16)


### Features

* **speech-to-text:** `endOfPhraseSilenceTime` and `splitTranscriptAtPhraseEnd` params added to `recognize`, `createJob`, and `recognizeUsingWebSocket` methods ([e3ff8db](https://github.com/watson-developer-cloud/node-sdk/commit/e3ff8db807456998d22bf42bbbc72cd271595c1c))
* add `serviceName` parameter for all services ([964e9e1](https://github.com/watson-developer-cloud/node-sdk/commit/964e9e1aff17e292f2dc3207c524c2f6669e76e2))

## [5.2.1](https://github.com/watson-developer-cloud/node-sdk/compare/v5.2.0...v5.2.1) (2019-12-09)


### Bug Fixes

* upgrade core version to 1.3.1 ([#1005](https://github.com/watson-developer-cloud/node-sdk/issues/1005)) ([239cdab](https://github.com/watson-developer-cloud/node-sdk/commit/239cdab))

# [5.2.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.1.0...v5.2.0) (2019-11-27)


### Features

* add support for discovery v2 service ([c2a79ff](https://github.com/watson-developer-cloud/node-sdk/commit/c2a79ff))
* **assistant-v1:** `webhooks` parameter added to `createWorkspace` and `updateWorkspace` ([c61b794](https://github.com/watson-developer-cloud/node-sdk/commit/c61b794))
* **visual-recognition-v4:** new method added - `getTrainingUsage` ([0756878](https://github.com/watson-developer-cloud/node-sdk/commit/0756878))

# [5.1.0](https://github.com/watson-developer-cloud/node-sdk/compare/v5.0.0...v5.1.0) (2019-10-07)


### Features

* **text-to-speech:** add method to repair wav header for a stream ([#981](https://github.com/watson-developer-cloud/node-sdk/issues/981)) ([42b0913](https://github.com/watson-developer-cloud/node-sdk/commit/42b0913))

# [5.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.5.1...v5.0.0) (2019-10-04)


### Bug Fixes

* make RecognizeStream.readableObjectMode always return Boolean ([#943](https://github.com/watson-developer-cloud/node-sdk/issues/943)) ([a276df4](https://github.com/watson-developer-cloud/node-sdk/commit/a276df4))


### Build System

* drop support for Node versions 6 and 8 ([3ea1fd7](https://github.com/watson-developer-cloud/node-sdk/commit/3ea1fd7))


### Code Refactoring

* change all websocket method parameters to lower camel case ([#941](https://github.com/watson-developer-cloud/node-sdk/issues/941)) ([cb6711f](https://github.com/watson-developer-cloud/node-sdk/commit/cb6711f))


### Features

* add support for new authenticators in all sdks and add new service features for major release ([#946](https://github.com/watson-developer-cloud/node-sdk/issues/946)) ([3acffc5](https://github.com/watson-developer-cloud/node-sdk/commit/3acffc5))


### BREAKING CHANGES

* Passing individual credentials to the service constructor will no longer work. An Authenticator must be initialized and passed in. For more information, see the migration guide.
* All parameters have been converted to their lower camel case version.
* Support for the `token` parameter has been removed
* Support for the `customization_id` parameter has been removed
* Method `setAuthorizationHeaderToken` has been removed from the WebSocket Stream classes
* `RecognizeStream.readableObjectMode` will always be a Boolean value - before, it could have been `undefined`.
* This SDK may no longer work with applications running on Node 6 or 8.

## [4.5.1](https://github.com/watson-developer-cloud/node-sdk/compare/v4.5.0...v4.5.1) (2019-09-19)


### Bug Fixes

* pass user-defined http(s) agent to websocket methods ([#953](https://github.com/watson-developer-cloud/node-sdk/issues/953)) ([4f1679c](https://github.com/watson-developer-cloud/node-sdk/commit/4f1679c))

# [4.5.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.4.0...v4.5.0) (2019-09-19)


### Bug Fixes

* ignore unecessary files for npm releases ([#962](https://github.com/watson-developer-cloud/node-sdk/issues/962)) ([93eb677](https://github.com/watson-developer-cloud/node-sdk/commit/93eb677))


### Features

* separate strings out of primary SynthesizeStream pipe ([#957](https://github.com/watson-developer-cloud/node-sdk/issues/957)) ([3014478](https://github.com/watson-developer-cloud/node-sdk/commit/3014478))

# [4.4.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.3.4...v4.4.0) (2019-08-20)


### Features

* **compare-comply:** new model ContractCurrencies added ([#935](https://github.com/watson-developer-cloud/node-sdk/issues/935)) ([132ad09](https://github.com/watson-developer-cloud/node-sdk/commit/132ad09))

## [4.3.4](https://github.com/watson-developer-cloud/node-sdk/compare/v4.3.3...v4.3.4) (2019-08-13)


### Bug Fixes

* disable analytics headers in browser to fix cors issues ([bdcf9d6](https://github.com/watson-developer-cloud/node-sdk/commit/bdcf9d6))
* disable analytics headers in browser to fix cors issues ([#932](https://github.com/watson-developer-cloud/node-sdk/issues/932)) ([bba47a0](https://github.com/watson-developer-cloud/node-sdk/commit/bba47a0))

## [4.3.3](https://github.com/watson-developer-cloud/node-sdk/compare/v4.3.2...v4.3.3) (2019-08-08)


### Bug Fixes

* send correct user-agent header for websocket methods ([#930](https://github.com/watson-developer-cloud/node-sdk/issues/930)) ([f24cac2](https://github.com/watson-developer-cloud/node-sdk/commit/f24cac2))

## [4.3.2](https://github.com/watson-developer-cloud/node-sdk/compare/v4.3.1...v4.3.2) (2019-08-07)


### Bug Fixes

* **core:** share request config across all requests ([#928](https://github.com/watson-developer-cloud/node-sdk/issues/928)) ([7fd5577](https://github.com/watson-developer-cloud/node-sdk/commit/7fd5577))

## [4.3.1](https://github.com/watson-developer-cloud/node-sdk/compare/v4.3.0...v4.3.1) (2019-08-05)


### Bug Fixes

* extend constructor options types to allow additional properties ([#925](https://github.com/watson-developer-cloud/node-sdk/issues/925)) ([03d241a](https://github.com/watson-developer-cloud/node-sdk/commit/03d241a))

# [4.3.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.6...v4.3.0) (2019-07-25)


### Bug Fixes

* **compare-comply:** `contract_type` corrected to `contract_types` in model `ClassifyReturn` ([a114881](https://github.com/watson-developer-cloud/node-sdk/commit/a114881))


### Features

* **assistant-v2:** support for search skill added ([a1c4f6d](https://github.com/watson-developer-cloud/node-sdk/commit/a1c4f6d))

## [4.2.6](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.5...v4.2.6) (2019-07-23)


### Bug Fixes

* properly store refreshed tokens in websocket libraries ([#920](https://github.com/watson-developer-cloud/node-sdk/issues/920)) ([4b8df28](https://github.com/watson-developer-cloud/node-sdk/commit/4b8df28))

## [4.2.5](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.4...v4.2.5) (2019-07-19)


### Bug Fixes

* AuthorizationV1.Options requires type definitions for iam_a… ([#917](https://github.com/watson-developer-cloud/node-sdk/issues/917)) ([b38d692](https://github.com/watson-developer-cloud/node-sdk/commit/b38d692))
* type definitions for iam_apikey and ibm_url ([13ac681](https://github.com/watson-developer-cloud/node-sdk/commit/13ac681))

## [4.2.4](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.3...v4.2.4) (2019-07-17)


### Bug Fixes

* refresh iam tokens in websocket methods ([#913](https://github.com/watson-developer-cloud/node-sdk/issues/913)) ([5a2876a](https://github.com/watson-developer-cloud/node-sdk/commit/5a2876a))

## [4.2.3](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.2...v4.2.3) (2019-07-17)


### Bug Fixes

* **speech-to-text:** support all allowed parameters in WebSocket method ([b91c1e2](https://github.com/watson-developer-cloud/node-sdk/commit/b91c1e2))
* **speech-to-text:** support all allowed parameters in WebSocket… ([#915](https://github.com/watson-developer-cloud/node-sdk/issues/915)) ([e9ef5da](https://github.com/watson-developer-cloud/node-sdk/commit/e9ef5da))

## [4.2.2](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.1...v4.2.2) (2019-07-12)


### Bug Fixes

* only set readableObjectMode in recognize-stream if not present ([#907](https://github.com/watson-developer-cloud/node-sdk/issues/907)) ([155c005](https://github.com/watson-developer-cloud/node-sdk/commit/155c005))

## [4.2.1](https://github.com/watson-developer-cloud/node-sdk/compare/v4.2.0...v4.2.1) (2019-06-14)


### Bug Fixes

* remove ReadStream since ReadableStream is correct ([b9f8c73](https://github.com/watson-developer-cloud/node-sdk/commit/b9f8c73))
* update second occurence of Map to Record ([3ded63a](https://github.com/watson-developer-cloud/node-sdk/commit/3ded63a))
* use Record instead of Map type for classifier update ([6dec631](https://github.com/watson-developer-cloud/node-sdk/commit/6dec631))

# [4.2.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.1.3...v4.2.0) (2019-06-10)


### Bug Fixes

* change Object types to custom `JsonObject` ([800afbe](https://github.com/watson-developer-cloud/node-sdk/commit/800afbe))
* updates from ibm-cloud-sdk-core: ([dfabc7a](https://github.com/watson-developer-cloud/node-sdk/commit/dfabc7a))
  - expose the body in the detailed response under the field `result`
  - add new token manager for ICP4D
  - default request body size to Infinity


### Features

* **language-translator:** the following methods have been added: `deleteDocument`, `getDocumentStatus`, `getTranslatedDocument`, `listDocuments`, `translateDocument` ([a0f2c20](https://github.com/watson-developer-cloud/node-sdk/commit/a0f2c20))
* Add `processing_metrics`, `processing_metrics_interval` and `audio_metrics` as query params in WebSocket `recognize` ([5b09882](https://github.com/watson-developer-cloud/node-sdk/commit/5b09882))

## [4.1.3](https://github.com/watson-developer-cloud/node-sdk/compare/v4.1.2...v4.1.3) (2019-05-24)


### Bug Fixes

* don't return request object in detailed response ([31628ff](https://github.com/watson-developer-cloud/node-sdk/commit/31628ff))
* don't return request object in detailed response ([#891](https://github.com/watson-developer-cloud/node-sdk/issues/891)) ([9f9174c](https://github.com/watson-developer-cloud/node-sdk/commit/9f9174c))

## [4.1.2](https://github.com/watson-developer-cloud/node-sdk/compare/v4.1.1...v4.1.2) (2019-05-22)


### Bug Fixes

* enable axios debug, disable gzip ([4e86717](https://github.com/watson-developer-cloud/node-sdk/commit/4e86717))

## [4.1.1](https://github.com/watson-developer-cloud/node-sdk/compare/v4.1.0...v4.1.1) (2019-05-13)


### Bug Fixes

* do not read credentials file in browser ([718895c](https://github.com/watson-developer-cloud/node-sdk/commit/718895c))

# [4.1.0](https://github.com/watson-developer-cloud/node-sdk/compare/v4.0.2...v4.1.0) (2019-04-29)


### Features

* **example:** add speech-to-text-to-redis example ([238cec3](https://github.com/watson-developer-cloud/node-sdk/commit/238cec3))

## [4.0.2](https://github.com/watson-developer-cloud/node-sdk/compare/v4.0.1...v4.0.2) (2019-04-24)


### Bug Fixes

* update vulnerable dependencies ([26f7dce](https://github.com/watson-developer-cloud/node-sdk/commit/26f7dce))

## [4.0.1](https://github.com/watson-developer-cloud/node-sdk/compare/v4.0.0...v4.0.1) (2019-03-29)


### Bug Fixes

* add compare comply keyword to package.json (to trigger release) ([7905445](https://github.com/watson-developer-cloud/node-sdk/commit/7905445))

# [4.0.0](https://github.com/watson-developer-cloud/node-sdk/compare/v3.18.4...v4.0.0) (2019-03-28)


### Bug Fixes

* **icp:** disabling ssl verification now works for websocket connection ([f8466c8](https://github.com/watson-developer-cloud/node-sdk/commit/f8466c8))
* update ibm-cloud-sdk-core to 0.1.1 ([29f87df](https://github.com/watson-developer-cloud/node-sdk/commit/29f87df))


### Build System

* remove support for node 4 ([1548413](https://github.com/watson-developer-cloud/node-sdk/commit/1548413))


### chore

* remove all code dealing with api_key in the base class ([92d48e2](https://github.com/watson-developer-cloud/node-sdk/commit/92d48e2))
* **conversation:** remove conversation service and all associated code ([c810de2](https://github.com/watson-developer-cloud/node-sdk/commit/c810de2))
* **dialog:** remove dialog service and all associated ([7d7408f](https://github.com/watson-developer-cloud/node-sdk/commit/7d7408f))
* **language-translator-v2:** remove language translator v2 service and all associated code ([83d9232](https://github.com/watson-developer-cloud/node-sdk/commit/83d9232))
* **personality-insights:** remove Personality Insights v2 ([e5e5302](https://github.com/watson-developer-cloud/node-sdk/commit/e5e5302))


### Code Refactoring

* **assistant-v1:** change name of variable `export` to `_export` ([91ed5a4](https://github.com/watson-developer-cloud/node-sdk/commit/91ed5a4))
* **assistant-v2:** parameter names changed for v4 ([f6adbe9](https://github.com/watson-developer-cloud/node-sdk/commit/f6adbe9))
* **compare-comply:** parameter names changed for v4 ([908d8e7](https://github.com/watson-developer-cloud/node-sdk/commit/908d8e7))
* refactor core code to use `axios` instead of `request` for network requests ([f656731](https://github.com/watson-developer-cloud/node-sdk/commit/f656731))
* **discovery:** remove compatibility layer for discovery ([8571a1f](https://github.com/watson-developer-cloud/node-sdk/commit/8571a1f))
* **discovery:** rename model `QueryResultResultMetadata` to `QueryResultMetadata` ([b1a124c](https://github.com/watson-developer-cloud/node-sdk/commit/b1a124c))
* **natural-language-classifier:** remove compatibility layer for natural language classifier ([0ac087c](https://github.com/watson-developer-cloud/node-sdk/commit/0ac087c))
* **natural-language-understanding:** remove compatibility layer for natural language understanding ([359cc79](https://github.com/watson-developer-cloud/node-sdk/commit/359cc79))
* **personality-insights-v3:** remove compatibility layer for personality insights v3 ([1b27685](https://github.com/watson-developer-cloud/node-sdk/commit/1b27685))
* **speech-to-text:** remove compatibility layer for speech to text ([310bdd0](https://github.com/watson-developer-cloud/node-sdk/commit/310bdd0))
* **text-to-speech:** remove compatibility layer for text to speech ([6994d3c](https://github.com/watson-developer-cloud/node-sdk/commit/6994d3c))
* **tone-analyzer:** remove compatibility layer for tone analyzer ([9f10898](https://github.com/watson-developer-cloud/node-sdk/commit/9f10898))
* **visual_recognition:** v4 changes ([3957e2d](https://github.com/watson-developer-cloud/node-sdk/commit/3957e2d))
* in `query` and `federatedQuery`, only accept string values for certain parameters. ([06d7c65](https://github.com/watson-developer-cloud/node-sdk/commit/06d7c65))
* in discovery, rename `getSourceCredentials` to `getCredentials` ([6fac701](https://github.com/watson-developer-cloud/node-sdk/commit/6fac701))
* **visual-recognition:** remove compatibility layer for visual recognition ([6377067](https://github.com/watson-developer-cloud/node-sdk/commit/6377067))
* remove index.ts file as it was deprecated starting in v3 ([4ea3c27](https://github.com/watson-developer-cloud/node-sdk/commit/4ea3c27))
* remove module for converting training_data to csv ([dd534f6](https://github.com/watson-developer-cloud/node-sdk/commit/dd534f6))
* require filenames for `createStopwordList` in discovery and `convertToHTML` in compare comply ([8f7c62f](https://github.com/watson-developer-cloud/node-sdk/commit/8f7c62f))
* stop using cookies in requests ([09e0e91](https://github.com/watson-developer-cloud/node-sdk/commit/09e0e91))


### Features

* **discovery:** add new methods: `createTokenizationDictionary`, `deleteTokenizationDictionary`, and `getTokenizationDictionaryStatus` ([d5ba660](https://github.com/watson-developer-cloud/node-sdk/commit/d5ba660))
* **discovery:** new parameters added to match updates to the service ([838b044](https://github.com/watson-developer-cloud/node-sdk/commit/838b044))
* add `sort` query parameter to `getWorkspace()` ([1df75ac](https://github.com/watson-developer-cloud/node-sdk/commit/1df75ac))
* add model `MessageContextSkill` ([15a4c7f](https://github.com/watson-developer-cloud/node-sdk/commit/15a4c7f))
* new error formatter, provides the same information regardless of service ([c324ab0](https://github.com/watson-developer-cloud/node-sdk/commit/c324ab0))
* The SDK now returns a Promise for all methods if a callback is not specified. Callbacks can still be used for backwards compatibility. ([fd6e20b](https://github.com/watson-developer-cloud/node-sdk/commit/fd6e20b))


### BREAKING CHANGES

* **visual_recognition:** For `updateClassifier` and `createClassifier`, the parameter `{classname}_positive_examples` is changed to a map called `positive_examples` with classnames as keys.
  * See the migration guide, UPGRADE-4.0.md, for more information.
  
* Node 4 will no longer be supported, considered during development, or tested with.
  * To migrate your code, upgrade to a newer major version of Node.
  
* **assistant-v2:** For `updateValue`, parameter `new_type` is changed to `new_value_type`. For `updateDialogNode`, parameter `new_type` is changed to `new_node_type`.
  * These method renames are breaking changes. Update the method names to migrate your code.
  
* There is no more `index.ts` file, so importing with `require('watson-developer-cloud')` will no longer work.
  * To migrate your code, import only the services that you need, e.g. `require('watson-developer-cloud/speech-to-text/v1')`.

* The methods `createStopwordList` in discovery and `convertToHTML` in comply comply now have new, required parameters
  * To migrate your code, include the parameter `stopword_filename` for `createStopwordList`, and `filename` for `convertToHTML`
  
* **assistant-v1:** The Assistant v1 parameter `export` is now `_export` is all instances.
  * To migrate your code, change any use of the `export` parameter to `_export`.
  
* The SDK used to document and allow array values for these parameters, converting them to strings to be sent to the service.
  * To migrate your code, convert any array values for these parameters to comma-separated values in a string.

* The module `json-training-to-csv` is no longer available.
  * To migrate your code, provide `training_data` to NLC as a CSV file.

* Cookies will no longer be sent or stored in requests. This should have very little impact on usage but is techincally a breaking change.
  * This affects internal functionality but has no effect on client code.
  
* Errors objects returned from service errors are now different
  * To migrate your code, see the upgrade guide for the new error structure

* Network responses received in callback function may now have different structures (results and errors). Requests no longer return a Stream.
  * See the UPGRADE-4.0.md file for more information.
  
* **personality-insights:** Personality Insights v2 is no longer available in the SDK
  * To migrate your code, use Personality Insights v3:
  
* **compare-comply:** Parameter `model_id` has been changed to `model` for the following methods: convertToHtml, classifyElements, extractTables, compareDocuments, deleteFeedback, getFeedback, createBatch, and updateBatch

* **speech-to-text:** Deprecated methods in Speech to Text are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/speech-to-text/api/v1/node.html?node

* **text-to-speech:** Deprecated methods in Text to Speech are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/text-to-speech/api/v1/node.html?node

* **visual-recognition:** Deprecated methods in Visual Recognition are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/visual-recognition/api/v3/node.html?node

* **tone-analyzer:** Deprecated methods in Tone Analyzer are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/node.html?node

* **personality-insights-v3:** Deprecated methods in Personality Insights v3 are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/personality-insights/api/v3/node.html?node

* **natural-language-understanding:** The `version_date` parameter in Natural Language Understanding is no longer supported.
  * To migrate your code, use the parameter name `version` instead.

* **natural-language-classifier:** Deprecated methods in Natural Language Classifier are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/node.html?node

* **discovery:** Deprecated methods in Discovery are no longer available. Changed parameter names are no longer interally corrected.
  * To migrate your code, use the methods and parameters currently available with the service as documented here: https://www.ibm.com/watson/developercloud/discovery/api/v1/node.html?node

* **conversation:** The Conversation service will no longer be available
  * To migrate your code, use the Assistant v1 or v2 service.

* **language-translator-v2:** The Language Translator V2 service will no longer be available
  * To migrate your code, use the Language Translator V3 service.

* **dialog:** The Dialog service will no longer be available
  * To migrate your code, use the Assistant v1 or v2 service.

* Support for the `api_key` parameter has been removed.
  * For instances of Visual Recognition, use `iam_apikey` to authenticate.

* **discovery:** The name of the model `QueryResultResultMetadata` has been changed to `QueryResultMetadata`
  * To migrate your code, use the model `QueryResultMetadata` instead of `QueryResultResultMetadata`:

## [3.18.4](https://github.com/watson-developer-cloud/node-sdk/compare/v3.18.3...v3.18.4) (2019-03-28)


### Bug Fixes

* allow users to use `iam_apikey` when authenticating for icp ([cdccbc1](https://github.com/watson-developer-cloud/node-sdk/commit/cdccbc1))

## [3.18.3](https://github.com/watson-developer-cloud/node-sdk/compare/v3.18.2...v3.18.3) (2019-03-19)


### Bug Fixes

* expose token manager from core code as a module ([4376e7c](https://github.com/watson-developer-cloud/node-sdk/commit/4376e7c))

## [3.18.2](https://github.com/watson-developer-cloud/node-sdk/compare/v3.18.1...v3.18.2) (2019-03-15)


### Bug Fixes

* make `access_token` an allowable query parameter in recognize / synthesize streams ([a2ad09e](https://github.com/watson-developer-cloud/node-sdk/commit/a2ad09e))

## [3.18.1](https://github.com/watson-developer-cloud/node-sdk/compare/v3.18.0...v3.18.1) (2019-02-14)


### Bug Fixes

* use dotenv v5 to maintain node 4.x compatibility ([c311651](https://github.com/watson-developer-cloud/node-sdk/commit/c311651))

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
    * `name`, `score`, `type_hierarchy` removed from response [Release notes](https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-release-notes#2april2018)

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
