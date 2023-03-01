# Upgrading to ibm-watson@8.0
 [Breaking Changes](#breaking-changes)
  - [UMD bundle watson.js no longer supported](#umd-bundle-watson.js-no-longer-supported)
  - [Support for Node v14 dropped](#support-for-node-v14-dropped)
  - [Breaking changes by service](#breaking-changes-by-service)

- [New Features by Service](#new-features-by-service)

## Breaking changes

### UMD bundle watson.js no longer supported
The previously generated `watson.js` UMD bundle will no longer be generated to support updated core requirements

### Support for Node v14 Dropped
In preparation for Node 14 EOL, the SDK no longer supports Node version 14, as reflected in the `engines` property in the package.json file. Version 14 will reach end of life on 30 April 2023.

### Breaking changes by service

#### Assistant v2
- Parameter `createSession` removed from `createSession` function
- Interface `Environment` property `language` removed
- Interface `EnvironmentReleaseReference` renamed to `BaseEnvironmentReleaseReference`
- Interface `EnvironmentOrchestration` renamed to `BaseEnvironmentOrchestration`
- Interface `SkillReference` renamed to `EnvironmentSkill`

#### Discovery v2
- Parameter `smartDocumentUnderstanding` removed from `createCollection` function
- Interface `QueryResponsePassage` and `QueryResultPassage` property `confidence` removed
- Interface `DocumentClassifierEnrichment` property `enrichmentId` is no longer an optional
- QueryAggregation interfaces restructured

#### Natural Language Understanding
- All `sentimentModel` functions removed

#### Speech to Text
- `AR_AR_BROADBANDMODEL` model removed in favor of `AR_MS_BROADBANDMODEL` model


### New Features by Service

#### Assistant v2
- `createAssistant` function
- `listAssistants` function
- `deleteAssistant` function
- `updateEnvironment` function
- `createRelease` function
- `deleteRelease` function
- `getSkill` function
- `updateSkill` function
- `exportSkills` function
- `importSkills` function
- `importSkillsStatus` function
- Improved typing for `message` function call
See details of these functions on IBM's documentation site [here](https://cloud.ibm.com/apidocs/assistant-v2?code=node)

#### Discovery v2
- Aggregation types `QueryTopicAggregation` and `QueryTrendAggregation` added

#### Speech to Text
- added `FR_CA_MULTIMEDIA`, `JA_JP_TELEPHONY`, `NL_NL_MULTIMEDIA`, `SV_SE_TELEPHONY` models

#### Text to Speech
- added `EN_AU_HEIDIEXPRESSIVE`, `EN_AU_JACKEXPRESSIVE`, `EN_US_ALLISONEXPRESSIVE`, `EN_US_EMMAEXPRESSIVE`, `EN_US_LISAEXPRESSIVE`, `EN_US_MICHAELEXPRESSIVE`, `KO_KR_JINV3VOICE`
- Parameters `ratePercentage` and `pitchPercentage` added to `synthesize` function
See details of these new parameters on IBM's documentation site [here](https://cloud.ibm.com/apidocs/text-to-speech?code=node#synthesize)
