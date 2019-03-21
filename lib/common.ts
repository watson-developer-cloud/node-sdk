import os = require('os');

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

export function getSdkHeaders(serviceName: string, serviceVersion: string, operationId: string): any {
  const sdkName = 'watson-apis-node-sdk';
  const sdkVersion = pkg.version;
  const osName = os.platform();
  const osVersion = os.release();
  const nodeVersion = process.version;

  // note - all node methods are asynchronous, 'async' will always be true

  const headers = {
    'User-Agent': `${sdkName}-${sdkVersion} ${osName} ${osVersion} ${nodeVersion}`,
    'X-IBMCloud-SDK-Analytics': `service_name=${serviceName};service_version=${serviceVersion};operation_id=${operationId};async=true`,
  }

  return headers;
}
