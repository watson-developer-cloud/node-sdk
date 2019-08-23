# Upgrading to ibm-watson@5.0

_Note: If migrating from a version less than 4.0, also see the [v4 migration guide wiki](https://github.com/watson-developer-cloud/node-sdk/wiki/v4-Migration-Guide)._

- [Breaking changes](#breaking-changes)
   - [Support for Node v6 and v8 dropped](#support-for-node-v6-and-v8-dropped)

## Breaking changes
### Support for Node v6 and v8 dropped
The SDK no longer supports Node versions 6 and 8, as reflected in the `engines` property in the package.json file. Version 6 reached end of life in April 2019 and Version 8 reaches end of life on 31 December 2019.

### WebSocket Methods
- All parameters are now lower camel case
- Support for the `token` parameter has been removed
- Support for the `customization_id` parameter has been removed
- Method `setAuthorizationHeaderToken` has been removed from the WebSocket Stream classes. It now exists as a shared function called `setAuthorizationHeader` in `lib/websocket-utils.ts`.
