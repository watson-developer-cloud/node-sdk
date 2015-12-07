# Questions

If you are having problems using the APIs or have a question about the IBM
Watson Services, please ask a question on
[dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson)
or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson).

# Code

* The code should follow: https://github.com/airbnb/javascript
* 2 spaces identation
* `snake_case` for parameters and same name as in swagger
* camelCase for method names. For example:
  ```
  personality_insights.getProfile()
  ```

# Issues

If you encounter an issue with the Node.js library, you are welcome to submit
a [bug report](https://github.com/watson-developer-cloud/node-sdk/issues).
Before that, please search for similar issues. It's possible somebody has
already encountered this issue.

# Pull Requests

If you want to contribute to the repository, follow these steps:

1. Fork the repo.
1. Develop and test your code changes: `npm install -d && npm test`. Make sure you work in the `dev` branch. PLEASE don't do your work in `master`.
1. Travis-CI will run the integration tests for all services once your changes are merged.
If you wish to run integration tests locally you must provide service credentials for all the services. See `test/test.integration-all-services.js`.
1. Add a test for your changes. Only refactoring and documentation changes require no new tests.
1. Make the test pass.
1. Commit your changes.
1. Push to your fork and submit a pull request.

# Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
   have the right to submit it under the open source license
   indicated in the file; or

(b) The contribution is based upon previous work that, to the best
   of my knowledge, is covered under an appropriate open source
   license and I have the right under that license to submit that
   work with modifications, whether created in whole or in part
   by me, under the same open source license (unless I am
   permitted to submit under a different license), as indicated
   in the file; or

(c) The contribution was provided directly to me by some other
   person who certified (a), (b) or (c) and I have not modified
   it.

(d) I understand and agree that this project and the contribution
   are public and that a record of the contribution (including all
   personal information I submit with it, including my sign-off) is
   maintained indefinitely and may be redistributed consistent with
   this project or the open source license(s) involved.
