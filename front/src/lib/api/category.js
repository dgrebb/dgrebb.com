import { OPTIONS } from './CONSTANTS';

export async function categoryAPI(endpoint) {
  try {
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    const content = await fetch(endpoint, OPTIONS)
      .then(checkStatus)
      .then(parseJSON);

    return content[0];
  } catch (error) {
    return { error };
  }
}
