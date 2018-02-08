# Release process

* Run the tests
* Update the changelog
* Run `npm version major`, `npm version minor`, or `npm version patch`
  to increment the version in package.json and create a git commit and tag.
* Run `git push --follow-tags` to push the commit and tag to github.
* Run `npm publish` to publish the changes to npm.
