# Release process

Standard practice with node.js modules is to commit all of the changes for a release except updating the package.json version, and then run the following:

```
npm version major|minor|patch
git push --tags
git push origin master
```

`npm version *` will update the package.json version field appropriately and create a git commit and tag for the version.
`git push --tags` will publish the tag to github., and then immediately.
`git push origin master` will publish the changes to package.json.
`npm publish` will publish the npm package (this is run automatically on Travis CI after the tests pass).

The reason for this is that it allows someone to easily view the source code (and readme) for whatever version they happen to have downloaded from npm. This is particularly helpful when github is ahead of npm.


### Pre-release process

This puts out a beta version that can be downloaded from npm if the specific version is specified but won't be treated as the latest version for users that don't explicitly install the beta:

First version it with the version number that it will be eventually followed by -beta.number after the version number. Then publish with `--tag beta`.

For example, this was the commands for publishing the third beta of v1.0.0:
```
npm version 1.0.0-beta.3
npm publish --tag beta
git push origin master
git push --tags
```
