'use strict';

const readCredentialsFunctions = require('../../lib/read-credentials-file');

describe('read ibm credentials file', () => {
  const locationOfActualFile = __dirname + '/../resources/ibm-credentials.env';
  process.env.IBM_CREDENTIALS_FILE = locationOfActualFile;

  describe('construct filepath', () => {
    const expectedPath = '/path/to/file/ibm-credentials.env';
    const constructFilepath = readCredentialsFunctions.constructFilepath;

    it('should build filepath from absolute path', () => {
      const path = constructFilepath('/path/to/file/');
      expect(path).toBe(expectedPath);
    });

    it('should build filepath from relative path', () => {
      const path = constructFilepath('/path/to/file');
      expect(path).toBe(expectedPath);
    });

    it('should not alter path if ends with correct filename', () => {
      const path = constructFilepath(expectedPath);
      expect(path).toBe(expectedPath);
    });

    it('should append filename to existing filename', () => {
      const path = constructFilepath('/path/to/file/wrong-file.env');
      expect(path).toBe('/path/to/file/wrong-file.env/ibm-credentials.env');
    });
  });

  describe('file exists at path', () => {
    const fileExistsAtPath = readCredentialsFunctions.fileExistsAtPath;
    it('should return true if the file exists at the given path', () => {
      const path = locationOfActualFile;
      expect(fileExistsAtPath(path)).toBe(true);
    });

    it('should return false if the file does not exist at the given path', () => {
      const path = process.cwd();
      expect(fileExistsAtPath(path)).toBe(false);
    });

    it('should return false and not crash for a silly filepath', () => {
      const path = '/path/to/file/wrong-file.env';
      expect(fileExistsAtPath(path)).toBe(false);
    });
  });

  describe('read credentials file', () => {
    const readCredentialsFile = readCredentialsFunctions.readCredentialsFile;
    it('should return credentials as an object if file exists', () => {
      const obj = readCredentialsFile();
      expect(obj.TEST_USERNAME).toBe('123456789');
      expect(obj.TEST_PASSWORD).toBe('abcd');
    });

    it('should return empty object if file is not found', () => {
      delete process.env['IBM_CREDENTIALS_FILE'];
      const obj = readCredentialsFile();
      expect(obj).toEqual({});
    });
  });
});
