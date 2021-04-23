#!/bin/bash

# This is the Github Actions version based on the travis version

if [ "$GHA_REPO_SLUG" == "watson-developer-cloud/node-sdk" ] && [ "$GHA_PULL_REQUEST" == "" ] && [ "$GHA_BRANCH" ]; then

  echo "Publishing JSDoc..."

  export GHA_BRANCH=${GHA_BRANCH##*/}    # Get the last part for true branch name - "refs/heads/9260_gha"

  git config --global user.email "watdevex@us.ibm.com"
  git config --global user.name "watdevex"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/watson-developer-cloud/node-sdk gh-pages > /dev/null

  pushd gh-pages
    # make a directory named after the branch/tag for the current build, replacing the previous one if present
    # on tagged builds, $GHA_BRANCH is the tag (e.g. v1.2.3), otherwise it's the branch name (e.g. master)
    rm -rf $GHA_BRANCH
    mkdir $GHA_BRANCH
    cp -Rf ../doc/. ./$GHA_BRANCH

    # update the latest/ symlink
    # on tagged builds, $GHA_TAG is set to the tag, but it's blank on regular builds, unlike $GHA_BRANCH
    if [ $GHA_TAG ]; then
      rm latest
      ln -s ./$GHA_TAG latest
    fi

    # todo: automatically delete folders that don't have a matching git branch

    echo "tags:"
    # sorted list of tags, newest first:
    git tag --sort -version:refname

    echo ""
    echo "branches:"
    # list branches
    git branch --remote | grep --invert-match gh-pages | sed -e 's/.*origin\/\(.*\)/\1/' | uniq

    # generate an incdex file listing all of the versions
    ../scripts/jsdoc/generate_index_html.sh > index.html

    # add all changes to git, including deleted files
    git add -f -A .
    git commit -m "Doc for $GHA_BRANCH ($GHA_COMMIT)"
    git push -fq origin gh-pages > /dev/null

  popd

  echo -e "Published Doc for $GHA_BRANCH to gh-pages.\n"

else

  echo -e "Not publishing docs for build $GHA_BUILD_NUMBER ($GHA_JOB_NUMBER) on branch $GHA_BRANCH of repo $GHA_REPO_SLUG"

fi
