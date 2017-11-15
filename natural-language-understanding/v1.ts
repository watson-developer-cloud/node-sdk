/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';

/**
 * Analyze various features of text content at scale. Provide text, raw HTML, or a public URL, and IBM Watson Natural Language Understanding will give you results for the features you request. The service cleans HTML content before analysis by default, so the results can ignore most advertisements and other unwanted content.    ### Concepts  Identify general concepts that are referenced or alluded to in your content. Concepts that are detected typically have an associated link to a DBpedia resource.    ### Entities  Detect important people, places, geopolitical entities and other types of entities in your content. Entity detection recognizes consecutive coreferences of each entity. For example, analysis of the following text would count \"Barack Obama\" and \"He\" as the same entity:    \"Barack Obama was the 44th President of the United States. He took office in January 2009.\"    ### Keywords  Determine the most important keywords in your content. Keyword phrases are organized by relevance in the results.    ### Categories  Categorize your content into a hierarchical 5-level taxonomy. For example, \"Leonardo DiCaprio won an Oscar\" returns \"/art and entertainment/movies and tv/movies\" as the most confident classification.    ### Sentiment  Determine whether your content conveys postive or negative sentiment. Sentiment information can be returned for detected entities, keywords, or user-specified target phrases found in the text.    ### Emotion  Detect anger, disgust, fear, joy, or sadness that is conveyed by your content. Emotion information can be returned for detected entities, keywords, or user-specified target phrases found in the text.    ### Relations  Recognize when two entities are related, and identify the type of relation.  For example, you can identify an \"awardedTo\" relation between an award and its recipient.    ### Semantic Roles  Parse sentences into subject-action-object form, and identify entities and keywords that are subjects or objects of an action.    ### Metadata  Get author information, publication date, and the title of your text/HTML content.
 */

class NaturalLanguageUnderstandingV1 extends BaseService {
  name: string; // set by prototype to 'natural-language-understanding'
  version: string; // set by prototype to 'v1'

  static VERSION_DATE_2016_01_23: string = '2016-01-23';
  static VERSION_DATE_2017_02_27: string = '2017-02-27';

  static URL: string = 'https://gateway.watsonplatform.net/natural-language-understanding/api';

  /**
   * Construct a NaturalLanguageUnderstandingV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/natural-language-understanding/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @returns {NaturalLanguageUnderstandingV1}
   * @throws {Error}
   * @constructor
   */
  constructor(options: NaturalLanguageUnderstandingV1.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error(
        'Argument error: version_date was not specified, use NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27'
      );
    }
    this._options.qs.version = options.version_date;
  }

  /**
   * Analyze text, HTML, or a public webpage.
   *
   * Analyzes text, HTML, or a public webpage with one or more text analysis features.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Features} params.features - Specific features to analyze the document for.
   * @param {string} [params.text] - The plain text to analyze.
   * @param {string} [params.html] - The HTML file to analyze.
   * @param {string} [params.url] - The web page to analyze.
   * @param {boolean} [params.clean] - Remove website elements, such as links, ads, etc.
   * @param {string} [params.xpath] - XPath query for targeting nodes in HTML.
   * @param {boolean} [params.fallback_to_raw] - Whether to use raw HTML content if text cleaning fails.
   * @param {boolean} [params.return_analyzed_text] - Whether or not to return the analyzed text.
   * @param {string} [params.language] - ISO 639-1 code indicating the language to use in the analysis.
   * @param {number} [params.limit_text_characters] - Sets the maximum number of characters that are processed by the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  analyze(
    params: NaturalLanguageUnderstandingV1.AnalyzeParams,
    callback?: NaturalLanguageUnderstandingV1.Callback<
      NaturalLanguageUnderstandingV1.AnalysisResults
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['features'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      features: _params.features,
      text: _params.text,
      html: _params.html,
      url: _params.url,
      clean: _params.clean,
      xpath: _params.xpath,
      fallback_to_raw: _params.fallback_to_raw,
      return_analyzed_text: _params.return_analyzed_text,
      language: _params.language,
      limit_text_characters: _params.limit_text_characters
    };
    const parameters = {
      options: {
        url: '/v1/analyze',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete model.
   *
   * Deletes a custom model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - model_id of the model to delete.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteModel(
    params: NaturalLanguageUnderstandingV1.DeleteModelParams,
    callback?: NaturalLanguageUnderstandingV1.Callback<
      NaturalLanguageUnderstandingV1.InlineResponse200
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      model_id: _params.model_id
    };
    const parameters = {
      options: {
        url: '/v1/models/{model_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List models.
   *
   * Lists available models for Relations and Entities features, including Watson Knowledge Studio custom models that you have created and linked to your Natural Language Understanding service.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listModels(
    params?: NaturalLanguageUnderstandingV1.ListModelsParams,
    callback?: NaturalLanguageUnderstandingV1.Callback<
      NaturalLanguageUnderstandingV1.ListModelsResults
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const parameters = {
      options: {
        url: '/v1/models',
        method: 'GET'
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

NaturalLanguageUnderstandingV1.prototype.name =
  'natural-language-understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';

namespace NaturalLanguageUnderstandingV1 {
  export interface Empty {}

  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  export type Options = {
    version_date: string;
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  export interface AnalyzeParams {
    features: Features;
    text?: string;
    html?: string;
    url?: string;
    clean?: boolean;
    xpath?: string;
    fallback_to_raw?: boolean;
    return_analyzed_text?: boolean;
    language?: string;
    limit_text_characters?: number;
  }

  export interface DeleteModelParams {
    model_id: string;
  }

  export interface ListModelsParams {}

  export interface Author {
    name?: string;
  }

  export interface CategoriesOptions {}

  export interface CategoriesResult {
    label?: string;
    score?: number;
  }

  export interface ConceptsOptions {
    limit?: number;
  }

  export interface ConceptsResult {
    text?: string;
    relevance?: number;
    dbpedia_resource?: string;
  }

  export interface DisambiguationResult {
    name?: string;
    dbpedia_resource?: string;
    subtype?: string[];
  }

  export interface DocumentEmotionResults {
    emotion?: EmotionScores;
  }

  export interface DocumentSentimentResults {
    label?: string;
    score?: number;
  }

  export interface EmotionOptions {
    document?: boolean;
    targets?: string[];
  }

  export interface EmotionResult {
    document?: DocumentEmotionResults;
    targets?: TargetedEmotionResults[];
  }

  export interface EmotionScores {
    anger?: number;
    disgust?: number;
    fear?: number;
    joy?: number;
    sadness?: number;
  }

  export interface EntitiesOptions {
    limit?: number;
    model?: string;
    sentiment?: boolean;
    emotion?: boolean;
  }

  export interface EntitiesResult {
    type?: string;
    relevance?: number;
    count?: number;
    text?: string;
    emotion?: EmotionScores;
    sentiment?: FeatureSentimentResults;
    disambiguation?: DisambiguationResult;
  }

  export interface FeatureSentimentResults {
    score?: number;
  }

  export interface Features {
    concepts?: ConceptsOptions;
    emotion?: EmotionOptions;
    entities?: EntitiesOptions;
    keywords?: KeywordsOptions;
    metadata?: MetadataOptions;
    relations?: RelationsOptions;
    semantic_roles?: SemanticRolesOptions;
    sentiment?: SentimentOptions;
    categories?: CategoriesOptions;
  }

  export interface InlineResponse200 {
    deleted?: string;
  }

  export interface KeywordsOptions {
    limit?: number;
    sentiment?: boolean;
    emotion?: boolean;
  }

  export interface KeywordsResult {
    relevance?: number;
    text?: string;
    emotion?: EmotionScores;
    sentiment?: FeatureSentimentResults;
  }

  export interface ListModelsResults {
    models?: Model[];
  }

  export interface MetadataOptions {}

  export interface MetadataResult {
    authors?: Author[];
    publication_date?: string;
    title?: string;
  }

  export interface Model {
    status?: string;
    model_id?: string;
    language?: string;
    description?: string;
  }

  export interface RelationArgument {
    entities?: RelationEntity[];
    text?: string;
  }

  export interface RelationEntity {
    text?: string;
    type?: string;
  }

  export interface RelationsOptions {
    model?: string;
  }

  export interface RelationsResult {
    score?: number;
    sentence?: string;
    type?: string;
    arguments?: RelationArgument[];
  }

  export interface SemanticRolesAction {
    text?: string;
    normalized?: string;
    verb?: SemanticRolesVerb;
  }

  export interface SemanticRolesEntity {
    type?: string;
    text?: string;
  }

  export interface SemanticRolesKeyword {
    text?: string;
  }

  export interface SemanticRolesObject {
    text?: string;
    keywords?: SemanticRolesKeyword[];
  }

  export interface SemanticRolesOptions {
    limit?: number;
    keywords?: boolean;
    entities?: boolean;
  }

  export interface SemanticRolesResult {
    sentence?: string;
    subject?: SemanticRolesSubject;
    action?: SemanticRolesAction;
    object?: SemanticRolesObject;
  }

  export interface SemanticRolesSubject {
    text?: string;
    entities?: SemanticRolesEntity[];
    keywords?: SemanticRolesKeyword[];
  }

  export interface SemanticRolesVerb {
    text?: string;
    tense?: string;
  }

  export interface SentimentOptions {
    document?: boolean;
    targets?: string[];
  }

  export interface SentimentResult {
    document?: DocumentSentimentResults;
    targets?: TargetedSentimentResults[];
  }

  export interface TargetedEmotionResults {
    text?: string;
    emotion?: EmotionScores;
  }

  export interface TargetedSentimentResults {
    text?: string;
    score?: number;
  }

  export interface Usage {
    features?: number;
    text_characters?: number;
    text_units?: number;
  }

  export interface AnalysisResults {
    language?: string;
    analyzed_text?: string;
    retrieved_url?: string;
    usage?: Usage;
    concepts?: ConceptsResult[];
    entities?: EntitiesResult[];
    keywords?: KeywordsResult[];
    categories?: CategoriesResult[];
    emotion?: EmotionResult;
    metadata?: MetadataResult;
    relations?: RelationsResult[];
    semantic_roles?: SemanticRolesResult[];
    sentiment?: SentimentResult;
  }
}

export = NaturalLanguageUnderstandingV1;
