import { OPTIONS } from './CONSTANTS';

export default async function content(endpoint) {
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

    return Array.isArray(content?.data)
      ? content.data
      : content.data.attributes;
  } catch (error) {
    return { error };
  }
}
