"use strict";
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var IamTokenManagerV1 = /** @class */ (function () {
    /**
     * IAM Token Manager Service
     *
     * Retreives, stores, and refreshes IAM tokens.
     *
     * @param {Object} options
     * @param {String} options.iam_apikey
     * @param {String} options.access_token
     * @param {String} options.iam_url - url of the iam api to retrieve tokens from
     * @constructor
     */
    function IamTokenManagerV1(options) {
        this.url = options.iam_url || 'https://iam.ng.bluemix.net/identity/token';
        this.tokenInfo = {};
        if (options.iam_apikey) {
            this.apikey = options.iam_apikey;
        }
        if (options.access_token) {
            this.userAccessToken = options.access_token;
        }
    }
    /**
     * This function sends an access token back through a callback. The source of the token
     * is determined by the following logic:
     * 1. If user provides their own managed access token, assume it is valid and send it
     * 2. If this class is managing tokens and does not yet have one, make a request for one
     * 3. If this class is managing tokens and the token has expired, refresh it
     * 4. If this class is managing tokens and has a valid token stored, send it
     */
    IamTokenManagerV1.prototype.getManagedToken = function (cb) {
        var _this = this;
        if (this.userAccessToken) {
            console.log('using user token');
            return cb(this.userAccessToken);
        }
        else if (this.needToRequestToken()) {
            console.log('requesting token...');
            this.requestToken({}, function (tokenResponse) {
                _this.saveTokenInfo(tokenResponse);
                return cb(_this.tokenInfo.access_token);
            });
        }
        else if (this.tokenIsExpired()) {
            console.log('refreshing token...');
            this.refreshToken({}, function (tokenResponse) {
                // ***
                // could this be made into one function???
                _this.saveTokenInfo(tokenResponse);
                return cb(_this.tokenInfo.access_token);
            });
        }
        else {
            console.log('using valid token');
            this.tokenInfo.expiration = 1000; // *** bogus test statement
            return cb(this.tokenInfo.access_token);
        }
    };
    IamTokenManagerV1.prototype.requestToken = function (params, cb) {
        var contentType = params.contentType ||
            'application/x-www-form-urlencoded';
        var grantType = params.grantType ||
            'urn:ibm:params:oauth:grant-type:apikey';
        var authorization = params.authHeader || 'Basic Yng6Yng=';
        var responseType = params.responseType || 'cloud_iam';
        var requestOptions = {
            url: this.url,
            headers: {
                'Content-type': contentType,
                Authorization: authorization
            },
            form: {
                grant_type: grantType,
                apikey: this.apikey,
                response_type: responseType
            }
        };
        request.post(requestOptions, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            else if (res.statusCode < 200 || res.statusCode >= 300) {
                throw new Error(JSON.stringify(res, null, 2));
            }
            else {
                var tokenResponse = JSON.parse(body);
                cb(tokenResponse);
            }
        });
    };
    IamTokenManagerV1.prototype.refreshToken = function (params, cb) {
        var authorization = params.authHeader || 'Basic Yng6Yng=';
        var contentType = params.contentType ||
            'application/x-www-form-urlencoded';
        var requestOptions = {
            url: this.url,
            headers: {
                'Content-type': contentType,
                Authorization: authorization
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: this.tokenInfo.refresh_token
            }
        };
        request.post(requestOptions, function (err, res, body) {
            if (err) {
                throw new Error(err);
            }
            else if (res.statusCode < 200 || res.statusCode >= 300) {
                throw new Error(JSON.stringify(res, null, 2));
            }
            else {
                var tokenResponse = JSON.parse(body);
                cb(tokenResponse);
            }
        });
    };
    IamTokenManagerV1.prototype.setAccessToken = function (access_token) {
        this.userAccessToken = access_token;
    };
    IamTokenManagerV1.prototype.needToRequestToken = function () {
        return !this.tokenInfo.access_token;
    };
    IamTokenManagerV1.prototype.tokenIsExpired = function () {
        // use a buffer to prevent the edge case of the token
        // expiring before the request could be made
        // the buffer will be a fraction of the total TTL
        var fractionOfTtl = 0.8;
        var timeToLive = this.tokenInfo.expires_in;
        var expireTime = this.tokenInfo.expiration;
        return expireTime - (timeToLive * (1.0 - fractionOfTtl))
            < Math.floor(Date.now() / 1000);
    };
    IamTokenManagerV1.prototype.saveTokenInfo = function (tokenResponse) {
        this.tokenInfo = Object.assign({}, tokenResponse);
    };
    return IamTokenManagerV1;
}());
exports.IamTokenManagerV1 = IamTokenManagerV1;
//# sourceMappingURL=v1.js.map