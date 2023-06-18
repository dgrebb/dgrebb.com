import { API_KEY } from "$env/static/private";

export default async function content(endpoint) {
  var headers = new Headers();
  headers.append("Authorization", `Bearer ${API_KEY}`);
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers,
    // ...cache,
    redirect: "follow",
  };

  try {
    // Parses the JSON returned by a network request
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    // Checks if a network request came back fine, and throws an error if not
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

    return content.data;
  } catch (error) {
    return { error };
  }
}
