#!/bin/bash

# Looks for [semver major], [semver minor], and [semver patch] in the commit message, creates the appropriate tag when found

# pushing back to github will cause a new travis build to release the tag

# checking the build/job numbers allows it to only publish once even though we test against multiple node.js versions
# The ".1" job is the first on the list in .travis.yml. By convention, this is the oldest supported node.js version.
if [ "$TRAVIS_REPO_SLUG" == "watson-developer-cloud/node-sdk" ] \
  && [ "$TRAVIS_PULL_REQUEST" == "false" ] \
  && [ "$TRAVIS_BRANCH" == "master" ] \
  && [ "$TRAVIS_BUILD_NUMBER.1" == "$TRAVIS_JOB_NUMBER" ] \
  && [[ "$TRAVIS_COMMIT_MESSAGE" =~ \[semver\ (major|minor|patch)\] ]] \
  ; then

  export SEMVER=${BASH_REMATCH[1]};
  echo "Creating semver $SEMVER per commit message"

  git checkout master

  npm version $SEMVER

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git config remote.origin.url https://${GH_TOKEN}@github.com/watson-developer-cloud/node-sdk
  git push --follow-tags

else

  echo -e "Not creating a semver tag for build $TRAVIS_JOB_NUMBE on branch $TRAVIS_BRANCH of repo $TRAVIS_REPO_SLUG with commit message:"
  echo $TRAVIS_COMMIT_MESSAGE

fi
