#!/bin/bash

# Looks for [semver major], [semver minor], and [semver patch] in the commit message,
# and run npm version {version} to bump and tag if found.
# Then pushes back to github to cause a new travis build that will publish the new version.

# checking the build/job numbers allows it to only publish once even though we test against multiple node.js versions
# The ".1" job is the first on the list in .travis.yml. By convention, this is the oldest supported node.js version.

#config
# get a token from https://github.com/settings/tokens with the `public_repo` scope and encrypt it like so:
# travis encrypt --add -r user-org-name/repo-name 'GH_TOKEN=xxxxxxxxxxxxxxxxxxx'
# (or enter it into the travis web ui)
# then set the below vars and make sure travis runs this script in the "after_success" section
export REPO="watson-developer-cloud/node-sdk"
export BRANCH="master"


if [ "$TRAVIS_REPO_SLUG" == "$REPO" ] \
  && [ "$TRAVIS_PULL_REQUEST" == "false" ] \
  && [ "$TRAVIS_BRANCH" == "$BRANCH" ] \
  && [ "$TRAVIS_BUILD_NUMBER.1" == "$TRAVIS_JOB_NUMBER" ] \
  && [[ "$TRAVIS_COMMIT_MESSAGE" =~ \[semver\ (major|minor|patch)\] ]] \
  ; then

  export SEMVER=${BASH_REMATCH[1]};
  echo "Creating semver $SEMVER per commit message"

  # checkout the branch that the commit is actually on instead of "detached head" state
  git checkout $BRANCH

  npm version $SEMVER

  git config --global push.default simple
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git config remote.origin.url https://${GH_TOKEN}@github.com/${REPO}
  git push --follow-tags

else

  echo -e "Not creating a semver tag for build $TRAVIS_JOB_NUMBER on branch $TRAVIS_BRANCH of repo $TRAVIS_REPO_SLUG with commit message:"
  echo $TRAVIS_COMMIT_MESSAGE

fi
