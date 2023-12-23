/**
 * @description: Handler entry point.
 *               - Note AWS CloudFront Functions use a modified ECMAScript 5.1 compatible runtime and NOT NodeJS.
 *               - Use var, not const or let
 *               - Use string concatenation and not template literals
 *               - Beware that the CloudFront Functions Console editor and test environment do NOT mimic CloudFront 100%
 * @date 2022-01-26
 * @param {object} event: A CloudFront Function event (expecting a Viewer Request event)
 * @return {object}:      A CloudFront response or request object (depends whether conditions allow pass through or 301 redirect)
 */
function handler(event) {
  var request = event.request;
  var queryString = queryStringObjectToString(request.querystring);
  var uri = request.uri;

  // Copy request.headers since it is read-only and we want to return a modified set of headers
  var headers = JSON.parse(JSON.stringify(request.headers));
  var host = headers.host.value;

  // Check to see if we have a properly formed or naked domain request
  if (host.startsWith("www.")) {
    // All good, nothing to change, pass on the request as is

    // Check whether the URI is missing a file name.
    if (uri.endsWith("/")) {
      request.uri += "index.html";
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes(".")) {
      request.uri += "/index.html";
    }

    return request;
  } else {
    // Prefix the host with the missing www.
    host = "www." + host;
    // Construct the url with assumed/forced https://www. prefix plus, path and any query string parameters
    var url = "https://" + host + uri + queryString;
    // Append the new 301 location header
    headers.location = { value: url };
    // Remove the original host header to avoid a circular reference of never ending redirects
    delete headers.host;

    // Return a CloudFront specific response object that includes original path, query string, (most) headers and cookies
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers,
      cookies: request.cookies,
    };
  }
}

/**
 * @description: Converts an event.request.querystring object back to a query string
 * @date 2022-01-26
 * @param {object} queryStringObject: Query string object as provided by event.request
 * @return {string}:                  A normalised query string in the form ?key1=valn&key2=val2...
 */
function queryStringObjectToString(queryStringObject) {
  // Convert the query string object to an array of entries and reduce to a single string
  return (
    Object.entries(queryStringObject)
      .reduce((p, q) => {
        if (!q[1].multiValue) {
          // Process a single key/value property
          return (p += q[0] + "=" + q[1].value + "&");
        } else {
          // Process multiValue properties. E.g arrays
          return (p +=
            q[1].multiValue.map((v) => q[0] + "=" + v.value).join("&") + "&");
        }
      }, "?")
      // Remove the trailing ampersand
      .slice(0, -1)
  );
}
