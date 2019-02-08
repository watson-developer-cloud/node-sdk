import dotenv = require('dotenv');
import fs = require('fs');
import os = require('os');
import path = require('path');

const filename: string = 'ibm-credentials.env';

export function readCredentialsFile() {
  // first look for an env variable called IBM_CREDENTIALS_FILE
  // it should be the path to the file

  const givenFilepath: string = process.env['IBM_CREDENTIALS_FILE'] || '';
  const homeDir: string = constructFilepath(os.homedir());
  const workingDir: string = constructFilepath(process.cwd());

  let filepathToUse: string;

  if (givenFilepath) {
    if (fileExistsAtPath(givenFilepath)) {
      // see if user gave a path to a file named something other than `ibm-credentials.env`
      filepathToUse = givenFilepath;
    } else if (fileExistsAtPath(constructFilepath(givenFilepath))) {
      // see if user gave a path to the directory where file is located
      filepathToUse = constructFilepath(givenFilepath);
    }
  } else if (fileExistsAtPath(homeDir)) {
    filepathToUse = homeDir;
  } else if (fileExistsAtPath(workingDir)) {
    filepathToUse = workingDir;
  } else {
    // file does not exist anywhere, will not be used
    return {};
  }

  const credsFile = fs.readFileSync(filepathToUse);

  return dotenv.parse(credsFile);
}

export function fileExistsAtPath(filepath): boolean {
  return fs.existsSync(filepath) && fs.lstatSync(filepath).isFile();
}

export function constructFilepath(filepath): string {
  // ensure filepath includes the filename
  if (!filepath.endsWith(filename)) {
    filepath = path.join(filepath, filename);
  }

  return filepath;
}