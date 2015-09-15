# Release process

Standard practice with node.js modules is to commit all of the changes for a release except updating the package.json version, and then run the following:

```
npm version major|minor|patch
git push --tags
git push origin master
npm publish
```

`npm version *` will update the package.json version field appropriately and create a git commit and tag for the version.  
`git push --tags` will publish the tag to github., and then immediately.  
`git push origin master` will publish the changes to package.json.  
`npm publish` will publish the npm package.

The reason for this is that it allows someone to easily view the source code (and readme) for whatever version they happen to have downloaded from npm. This is particularly helpful when github is ahead of npm.