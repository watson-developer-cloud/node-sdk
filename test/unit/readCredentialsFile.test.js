'use strict';

const readCredentialsFunctions = require('../../lib/read-credentials-file');
const constructFilepath = readCredentialsFunctions.constructFilepath;
const fileExistsAtPath = readCredentialsFunctions.fileExistsAtPath;
const readCredentialsFile = readCredentialsFunctions.readCredentialsFile;

describe('read ibm credentials file', () => {
  const locationOfActualFile = __dirname + '/../resources';
  process.env.IBM_CREDENTIALS_FILE = locationOfActualFile;

  describe('construct filepath', () => {
    const expectedPath = '/path/to/file/ibm-credentials.env';

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
  });

  describe('file exists at path', () => {
    it('should return true if the file exists at the given path', () => {
      const path = constructFilepath(locationOfActualFile);
      expect(fileExistsAtPath(path)).toBe(true);
    });

    it('should return false if path is correct but is not a file', () => {
      const path = locationOfActualFile;
      expect(fileExistsAtPath(path)).toBe(false);
    });

    it('should return false if the file does not exist at the given path', () => {
      const path = constructFilepath(process.cwd());
      expect(fileExistsAtPath(path)).toBe(false);
    });

    it('should return false and not crash for a silly filepath', () => {
      const path = '/path/to/file/wrong-file.env';
      expect(fileExistsAtPath(path)).toBe(false);
    });
  });

  describe('read credentials file', () => {
    it('should return credentials as an object if file exists', () => {
      const obj = readCredentialsFile();
      expect(obj.TEST_USERNAME).toBe('123456789');
      expect(obj.TEST_PASSWORD).toBe('abcd');
    });

    it('should return credentials as an object for alternate filename', () => {
      process.env['IBM_CREDENTIALS_FILE'] = __dirname + '/../../examples/.env.example';
      const obj = readCredentialsFile();
      expect(obj.NATURAL_LANGUAGE_UNDERSTANDING_USERNAME).toBe('username');
      expect(obj.NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD).toBe('password');
    });

    it('should return empty object if file is not found', () => {
      delete process.env['IBM_CREDENTIALS_FILE'];
      const obj = readCredentialsFile();
      expect(obj).toEqual({});
    });
  });
});
