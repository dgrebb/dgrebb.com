import { OPTIONS } from './CONSTANTS';

/**
 * Fetches content from the specified endpoint.
 * @param {string} endpoint - The endpoint to fetch data from.
 * @returns {Promise<Array|Object>} - A promise that resolves to an array or an object representing the fetched content.
 */
export default async function content(endpoint) {
  try {
    /**
     * Parses the response as JSON.
     * @param {Response} resp - The response object.
     * @returns {Promise} - A promise that resolves to the parsed JSON.
     */
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);

    /**
     * Checks the status of the response. Throws an error for non-successful statuses.
     * @param {Response} resp - The response object.
     * @returns {Response} - The response object if successful.
     * @throws {Object} - The parsed JSON error object if unsuccessful.
     */
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    // Using Promise.all to parallelize the fetch and parse operations
    const [rawResponse, parsedContent] = await Promise.all([
      fetch(endpoint, OPTIONS).then(checkStatus),
      fetch(endpoint, OPTIONS).then(parseJSON),
    ]);

    // Ensure the response is valid before attempting to parse
    checkStatus(rawResponse);

    return Array.isArray(parsedContent?.data)
      ? parsedContent.data
      : parsedContent.data.attributes;
  } catch (error) {
    return { error };
  }
}
