# Release process

* Run the tests
* Update the changelog
* Include `[semver major]`, `[semver minor]`, or `[semver patch]` in the commit message.

On Travis CI, the `create_semver_tag.sh` script will read the message,
and run the matching `npm version` command, and push the new tag to GitHub.
The tag will trigger a second travis build that automatically releases to npm.


# Manual process

After performing the above steps:

* Run `npm version major`, `npm version minor`, or `npm version patch`
  to increment the version in package.json and create a git commit and tag.
* Run `git push --follow-tags` to push the commit and tag to github.
* Run `npm publish` to publish the changes to npm.
