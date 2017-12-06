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
   * @constructor
   * @returns {NaturalLanguageUnderstandingV1}
   * @throws {Error}
   */
  constructor(options: NaturalLanguageUnderstandingV1.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * analyze
   ************************/

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
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * modelManagement
   ************************/

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
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
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
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const parameters = {
      options: {
        url: '/v1/models',
        method: 'GET'
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

NaturalLanguageUnderstandingV1.prototype.name =
  'natural-language-understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace NaturalLanguageUnderstandingV1 {
  /** Options for the `NaturalLanguageUnderstandingV1` constructor. **/
  export type Options = {
    version_date: string;
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  /** The callback for a service request. **/
  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  /** The body of a service request that returns no response data. **/
  export interface Empty {}

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `analyze` operation. **/
  export interface AnalyzeParams {
    /** Specific features to analyze the document for. **/
    features: Features;
    /** The plain text to analyze. **/
    text?: string;
    /** The HTML file to analyze. **/
    html?: string;
    /** The web page to analyze. **/
    url?: string;
    /** Remove website elements, such as links, ads, etc. **/
    clean?: boolean;
    /** XPath query for targeting nodes in HTML. **/
    xpath?: string;
    /** Whether to use raw HTML content if text cleaning fails. **/
    fallback_to_raw?: boolean;
    /** Whether or not to return the analyzed text. **/
    return_analyzed_text?: boolean;
    /** ISO 639-1 code indicating the language to use in the analysis. **/
    language?: string;
    /** Sets the maximum number of characters that are processed by the service. **/
    limit_text_characters?: number;
  }

  /** Parameters for the `deleteModel` operation. **/
  export interface DeleteModelParams {
    /** model_id of the model to delete. **/
    model_id: string;
  }

  /** Parameters for the `listModels` operation. **/
  export interface ListModelsParams {}

  /*************************
   * model interfaces
   ************************/

  /** The author of the analyzed content. **/
  export interface Author {
    /** Name of the author. **/
    name?: string;
  }

  /** The hierarchical 5-level taxonomy the content is categorized into. **/
  export interface CategoriesOptions {}

  /** The hierarchical 5-level taxonomy the content is categorized into. **/
  export interface CategoriesResult {
    /** The path to the category through the taxonomy hierarchy. **/
    label?: string;
    /** Confidence score for the category classification. Higher values indicate greater confidence. **/
    score?: number;
  }

  /** Whether or not to analyze content for general concepts that are referenced or alluded to. **/
  export interface ConceptsOptions {
    /** Maximum number of concepts to return. **/
    limit?: number;
  }

  /** The general concepts referenced or alluded to in the specified content. **/
  export interface ConceptsResult {
    /** Name of the concept. **/
    text?: string;
    /** Relevance score between 0 and 1. Higher scores indicate greater relevance. **/
    relevance?: number;
    /** Link to the corresponding DBpedia resource. **/
    dbpedia_resource?: string;
  }

  /** Disambiguation information for the entity. **/
  export interface DisambiguationResult {
    /** Common entity name. **/
    name?: string;
    /** Link to the corresponding DBpedia resource. **/
    dbpedia_resource?: string;
    /** Entity subtype information. **/
    subtype?: string[];
  }

  /** An object containing the emotion results of a document. **/
  export interface DocumentEmotionResults {
    /** An object containing the emotion results for the document. **/
    emotion?: EmotionScores;
  }

  /** DocumentSentimentResults. **/
  export interface DocumentSentimentResults {
    /** Indicates whether the sentiment is positive, neutral, or negative. **/
    label?: string;
    /** Sentiment score from -1 (negative) to 1 (positive). **/
    score?: number;
  }

  /** Whether or not to return emotion analysis of the content. **/
  export interface EmotionOptions {
    /** Set this to false to hide document-level emotion results. **/
    document?: boolean;
    /** Emotion results will be returned for each target string that is found in the document. **/
    targets?: string[];
  }

  /** The detected anger, disgust, fear, joy, or sadness that is conveyed by the content. Emotion information can be returned for detected entities, keywords, or user-specified target phrases found in the text. **/
  export interface EmotionResult {
    /** The returned emotion results across the document. **/
    document?: DocumentEmotionResults;
    /** The returned emotion results per specified target. **/
    targets?: TargetedEmotionResults[];
  }

  /** EmotionScores. **/
  export interface EmotionScores {
    /** Anger score from 0 to 1. A higher score means that the text is more likely to convey anger. **/
    anger?: number;
    /** Disgust score from 0 to 1. A higher score means that the text is more likely to convey disgust. **/
    disgust?: number;
    /** Fear score from 0 to 1. A higher score means that the text is more likely to convey fear. **/
    fear?: number;
    /** Joy score from 0 to 1. A higher score means that the text is more likely to convey joy. **/
    joy?: number;
    /** Sadness score from 0 to 1. A higher score means that the text is more likely to convey sadness. **/
    sadness?: number;
  }

  /** Whether or not to return important people, places, geopolitical, and other entities detected in the analyzed content. **/
  export interface EntitiesOptions {
    /** Maximum number of entities to return. **/
    limit?: number;
    /** Set this to true to return locations of entity mentions. **/
    mentions?: boolean;
    /** Enter a custom model ID to override the standard entity detection model. **/
    model?: string;
    /** Set this to true to return sentiment information for detected entities. **/
    sentiment?: boolean;
    /** Set this to true to analyze emotion for detected keywords. **/
    emotion?: boolean;
  }

  /** The important people, places, geopolitical entities and other types of entities in your content. **/
  export interface EntitiesResult {
    /** Entity type. **/
    type?: string;
    /** The name of the entity. **/
    text?: string;
    /** Relevance score from 0 to 1. Higher values indicate greater relevance. **/
    relevance?: number;
    /** Entity mentions and locations. **/
    mentions?: EntityMention[];
    /** How many times the entity was mentioned in the text. **/
    count?: number;
    /** Emotion analysis results for the entity, enabled with the "emotion" option. **/
    emotion?: EmotionScores;
    /** Sentiment analysis results for the entity, enabled with the "sentiment" option. **/
    sentiment?: FeatureSentimentResults;
    /** Disambiguation information for the entity. **/
    disambiguation?: DisambiguationResult;
  }

  /** EntityMention. **/
  export interface EntityMention {
    /** Entity mention text. **/
    text?: string;
    /** Character offsets indicating the beginning and end of the mention in the analyzed text. **/
    location?: number[];
  }

  /** FeatureSentimentResults. **/
  export interface FeatureSentimentResults {
    /** Sentiment score from -1 (negative) to 1 (positive). **/
    score?: number;
  }

  /** Analysis features and options. **/
  export interface Features {
    /** Whether or not to return the concepts that are mentioned in the analyzed text. **/
    concepts?: ConceptsOptions;
    /** Whether or not to extract the emotions implied in the analyzed text. **/
    emotion?: EmotionOptions;
    /** Whether or not to extract detected entity objects from the analyzed text. **/
    entities?: EntitiesOptions;
    /** Whether or not to return the keywords in the analyzed text. **/
    keywords?: KeywordsOptions;
    /** Whether or not the author, publication date, and title of the analyzed text should be returned. This parameter is only available for URL and HTML input. **/
    metadata?: MetadataOptions;
    /** Whether or not to return the relationships between detected entities in the analyzed text. **/
    relations?: RelationsOptions;
    /** Whether or not to return the subject-action-object relations from the analyzed text. **/
    semantic_roles?: SemanticRolesOptions;
    /** Whether or not to return the overall sentiment of the analyzed text. **/
    sentiment?: SentimentOptions;
    /** Whether or not to return the high level category the content is categorized as (i.e. news, art). **/
    categories?: CategoriesOptions;
  }

  /** InlineResponse200. **/
  export interface InlineResponse200 {
    /** model_id of the deleted model. **/
    deleted?: string;
  }

  /** An option indicating whether or not important keywords from the analyzed content should be returned. **/
  export interface KeywordsOptions {
    /** Maximum number of keywords to return. **/
    limit?: number;
    /** Set this to true to return sentiment information for detected keywords. **/
    sentiment?: boolean;
    /** Set this to true to analyze emotion for detected keywords. **/
    emotion?: boolean;
  }

  /** The most important keywords in the content, organized by relevance. **/
  export interface KeywordsResult {
    /** Relevance score from 0 to 1. Higher values indicate greater relevance. **/
    relevance?: number;
    /** The keyword text. **/
    text?: string;
    /** Emotion analysis results for the keyword, enabled with the "emotion" option. **/
    emotion?: EmotionScores;
    /** Sentiment analysis results for the keyword, enabled with the "sentiment" option. **/
    sentiment?: FeatureSentimentResults;
  }

  /** Models available for Relations and Entities features. **/
  export interface ListModelsResults {
    models?: Model[];
  }

  /** The Authors, Publication Date, and Title of the document. Supports URL and HTML input types. **/
  export interface MetadataOptions {}

  /** The Authors, Publication Date, and Title of the document. Supports URL and HTML input types. **/
  export interface MetadataResult {
    /** The authors of the document. **/
    authors?: Author[];
    /** The publication date in the format ISO 8601. **/
    publication_date?: string;
    /** The title of the document. **/
    title?: string;
  }

  /** Model. **/
  export interface Model {
    /** Shows as available if the model is ready for use. **/
    status?: string;
    /** Unique model ID. **/
    model_id?: string;
    /** ISO 639-1 code indicating the language of the model. **/
    language?: string;
    /** Model description. **/
    description?: string;
  }

  /** RelationArgument. **/
  export interface RelationArgument {
    entities?: RelationEntity[];
    /** Text that corresponds to the argument. **/
    text?: string;
  }

  /** The entities extracted from a sentence in a given document. **/
  export interface RelationEntity {
    /** Text that corresponds to the entity. **/
    text?: string;
    /** Entity type. **/
    type?: string;
  }

  /** An option specifying if the relationships found between entities in the analyzed content should be returned. **/
  export interface RelationsOptions {
    /** Enter a custom model ID to override the default model. **/
    model?: string;
  }

  /** The relations between entities found in the content. **/
  export interface RelationsResult {
    /** Confidence score for the relation. Higher values indicate greater confidence. **/
    score?: number;
    /** The sentence that contains the relation. **/
    sentence?: string;
    /** The type of the relation. **/
    type?: string;
    /** The extracted relation objects from the text. **/
    arguments?: RelationArgument[];
  }

  /** SemanticRolesAction. **/
  export interface SemanticRolesAction {
    /** Analyzed text that corresponds to the action. **/
    text?: string;
    /** normalized version of the action. **/
    normalized?: string;
    verb?: SemanticRolesVerb;
  }

  /** SemanticRolesEntity. **/
  export interface SemanticRolesEntity {
    /** Entity type. **/
    type?: string;
    /** The entity text. **/
    text?: string;
  }

  /** SemanticRolesKeyword. **/
  export interface SemanticRolesKeyword {
    /** The keyword text. **/
    text?: string;
  }

  /** SemanticRolesObject. **/
  export interface SemanticRolesObject {
    /** Object text. **/
    text?: string;
    keywords?: SemanticRolesKeyword[];
  }

  /** An option specifying whether or not to identify the subjects, actions, and verbs in the analyzed content. **/
  export interface SemanticRolesOptions {
    /** Maximum number of semantic_roles results to return. **/
    limit?: number;
    /** Set this to true to return keyword information for subjects and objects. **/
    keywords?: boolean;
    /** Set this to true to return entity information for subjects and objects. **/
    entities?: boolean;
  }

  /** The object containing the actions and the objects the actions act upon. **/
  export interface SemanticRolesResult {
    /** Sentence from the source that contains the subject, action, and object. **/
    sentence?: string;
    /** The extracted subject from the sentence. **/
    subject?: SemanticRolesSubject;
    /** The extracted action from the sentence. **/
    action?: SemanticRolesAction;
    /** The extracted object from the sentence. **/
    object?: SemanticRolesObject;
  }

  /** SemanticRolesSubject. **/
  export interface SemanticRolesSubject {
    /** Text that corresponds to the subject role. **/
    text?: string;
    entities?: SemanticRolesEntity[];
    keywords?: SemanticRolesKeyword[];
  }

  /** SemanticRolesVerb. **/
  export interface SemanticRolesVerb {
    /** The keyword text. **/
    text?: string;
    /** Verb tense. **/
    tense?: string;
  }

  /** An option specifying if sentiment of detected entities, keywords, or phrases should be returned. **/
  export interface SentimentOptions {
    /** Set this to false to hide document-level sentiment results. **/
    document?: boolean;
    /** Sentiment results will be returned for each target string that is found in the document. **/
    targets?: string[];
  }

  /** The sentiment of the content. **/
  export interface SentimentResult {
    /** The document level sentiment. **/
    document?: DocumentSentimentResults;
    /** The targeted sentiment to analyze. **/
    targets?: TargetedSentimentResults[];
  }

  /** An object containing the emotion results for the target. **/
  export interface TargetedEmotionResults {
    /** Targeted text. **/
    text?: string;
    /** An object containing the emotion results for the target. **/
    emotion?: EmotionScores;
  }

  /** TargetedSentimentResults. **/
  export interface TargetedSentimentResults {
    /** Targeted text. **/
    text?: string;
    /** Sentiment score from -1 (negative) to 1 (positive). **/
    score?: number;
  }

  /** Usage information. **/
  export interface Usage {
    /** Number of features used in the API call. **/
    features?: number;
    /** Number of text characters processed. **/
    text_characters?: number;
    /** Number of 10,000-character units processed. **/
    text_units?: number;
  }

  /** Results of the analysis, organized by feature. **/
  export interface AnalysisResults {
    /** Language used to analyze the text. **/
    language?: string;
    /** Text that was used in the analysis. **/
    analyzed_text?: string;
    /** URL that was used to retrieve HTML content. **/
    retrieved_url?: string;
    /** API usage information for the request. **/
    usage?: Usage;
    /** The general concepts referenced or alluded to in the specified content. **/
    concepts?: ConceptsResult[];
    /** The important entities in the specified content. **/
    entities?: EntitiesResult[];
    /** The important keywords in content organized by relevance. **/
    keywords?: KeywordsResult[];
    /** The hierarchical 5-level taxonomy the content is categorized into. **/
    categories?: CategoriesResult[];
    /** The anger, disgust, fear, joy, or sadness conveyed by the content. **/
    emotion?: EmotionResult;
    /** The metadata holds author information, publication date and the title of the text/HTML content. **/
    metadata?: MetadataResult;
    /** The relationships between entities in the content. **/
    relations?: RelationsResult[];
    /** The subjects of actions and the objects the actions act upon. **/
    semantic_roles?: SemanticRolesResult[];
    /** The sentiment of the content. **/
    sentiment?: SentimentResult;
  }
}

export = NaturalLanguageUnderstandingV1;
