/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
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

'use strict';

/**
 * if VCAP_SERVICES exists then it return the username, password, api_key and url for
 * a service that stars with 'name' or {} otherwise
 * @param  String name The service name
 * @return service credentials or {} if
 * name is not found in VCAP_SERVICES
 */
module.exports.serviceStartsWith = function(name) {
  if (process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    for (var service_name in services) {
      if (service_name.indexOf(name) === 0) {
        var serv = services[service_name][0];
        var cred = serv.credentials;
        cred.api_key = new Buffer(cred.username + ':' + cred.password).toString('base64');
        return serv;
      }
    }
  }
  return {};
};