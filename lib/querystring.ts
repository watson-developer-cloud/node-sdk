/**
 * Stringify query params, Watson-style
 *
 * Why? The server that processes auth tokens currently only accepts the *exact* string, even if it's invalid for a URL.
 * Properly url-encoding percent characters causes it to reject the token
 * So, this is a custom qs.stringify function that properly encodes everything except watson-token, passing it along verbatim
 *
 * @param {Object} queryParams
 * @return {String}
 */
const stringify = (queryParams: Object): string => {
  return Object.keys(queryParams)
    .map(function(key) {
      return (
        key +
        '=' +
        (key === 'watson-token'
          ? queryParams[key]
          : encodeURIComponent(queryParams[key]))
      ); // the server chokes if the token is correctly url-encoded
    })
    .join('&');
};

export = {
  stringify
};
