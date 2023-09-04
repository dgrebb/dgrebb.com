import { API_KEY } from '$env/static/private';

var headers = new Headers();
headers.append('Authorization', `Bearer ${API_KEY}`);
headers.append('Content-Type', 'application/json');

var requestOptions = {
  method: 'GET',
  headers,
  redirect: 'follow',
};

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

    const content = await fetch(endpoint, requestOptions)
      .then(checkStatus)
      .then(parseJSON);

    return Array.isArray(content?.data)
      ? content.data
      : content.data.attributes;
  } catch (error) {
    return { error };
  }
}

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

    const content = await fetch(endpoint, requestOptions)
      .then(checkStatus)
      .then(parseJSON);

    return content[0];
  } catch (error) {
    return { error };
  }
}
