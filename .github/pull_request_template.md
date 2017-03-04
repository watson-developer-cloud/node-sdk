<!--
Thank you for your pull request! 

Please provide a description above and review the requirements below.

Bug fixes and new features should include tests whenever possible.
-->

##### Checklist
<!-- Remove items that do not apply. For completed items, change [ ] to [x]. -->

- [ ] `npm test` passes (tip: `npm run autofix` can correct most style issues)
- [ ] tests are included
- [ ] documentation is changed or added
- [ ] link to public docs when adding new a service or new features for an existing service

##### New version_date Checklist
<!-- These only apply when adding a new version_date to a service - delete this section otherwise -->
- [ ] A new constant is avaliable with the version_date - [example](https://github.com/watson-developer-cloud/node-sdk/blob/d1418ac2f9774194aaff0c8bd80f0d3722beef72/conversation/v1.js#L77)
- [ ] The new constant has a comment that summarizes the changes and/or links to relevant doc pages
- [ ] Any older version_date constants remain intact
- [ ] The error message thrown if the service is created without a version_date indicates the new version_date constant
- [ ] The example in the README includes the new version_date constant
- [ ] Any relevant code in the examples/ folder has been updated to use the new version_date constant
- [ ] Most tests are updated to the new version_date
- [ ] 1-2 new tests are added that use the old version_date (optional, but preferred)
