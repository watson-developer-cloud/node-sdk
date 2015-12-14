#!/bin/bash

# based on http://benlimmer.com/2013/12/26/automatically-publish-javadoc-to-gh-pages-with-travis-ci/
# todo: add    && [ "$TRAVIS_TAG" != "" ] after confirming it works otherwise

if [ "$TRAVIS_REPO_SLUG" == "watson-developer-cloud/node-sdk" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_TAG" ]; then

  echo "Publishing JSDoc..."

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/watson-developer-cloud/node-sdk gh-pages > /dev/null

  pushd gh-pages
    cp -Rf ../doc/watson-developer-cloud/* ./
    git add -f .
    git commit -m "JSDdoc for $TRAVIS_TAG"
    git push -fq origin gh-pages > /dev/null
  popd

  echo -e "Published JSDoc for $TRAVIS_TAG to gh-pages.\n"

else

  echo -e "Not publishing docs for tag $TRAVIS_TAG on branch $TRAVIS_BRANCH of repo $TRAVIS_REPO_SLUG"

fi
