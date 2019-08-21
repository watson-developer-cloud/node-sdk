import os = require('os');

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

export type SdkHeaders = {
  'User-Agent': string;
  'X-IBMCloud-SDK-Analytics': string;
}

export function getSdkHeaders(serviceName: string, serviceVersion: string, operationId: string): SdkHeaders | {} {
  // disable analytics headers in the browser - they cause cors issues
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    return {};
  }

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
