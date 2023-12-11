import { OPTIONS } from './CONSTANTS';

/**
 * Fetches data from the specified endpoint.
 *
 * @async
 * @function
 * @param {string} endpoint - The endpoint to fetch data from.
 * @returns {Promise<Object>} - A Promise that resolves to the first element of the fetched content or an error object.
 * @throws {Object} - An error object if there is an issue during the fetch operation.
 *
 * @example
 * const endpoint = 'https://api.example.com/categories';
 * const result = await categoryAPI(endpoint);
 * if (result.error) {
 *   console.error('Error:', result.error);
 * } else {
 *   console.log('Fetched data:', result);
 * }
 */
export async function categoryAPI(endpoint) {
  try {
    /**
     * Parses JSON response.
     *
     * @async
     * @function
     * @param {Response} resp - The response object.
     * @returns {Promise<Object>} - A Promise that resolves to the parsed JSON or the original response if parsing fails.
     */
    const parseJSON = async (resp) => (await resp.json()) || resp;

    /**
     * Checks the response status and throws an error if it's not within the success range.
     *
     * @function
     * @param {Response} resp - The response object.
     * @returns {Response} - The response object if the status is within the success range.
     * @throws {Object} - An error object if the status is outside the success range.
     */
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    // Use modern syntax and headers for better performance
    const content = await fetch(endpoint, {
      ...OPTIONS,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(checkStatus)
      .then(parseJSON);

    return content[0];
  } catch (error) {
    return { error };
  }
}
