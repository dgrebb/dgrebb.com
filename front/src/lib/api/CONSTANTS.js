import { API_KEY } from '$env/static/private';

var headers = new Headers();
headers.append('Authorization', `Bearer ${API_KEY}`);
headers.append('Content-Type', 'application/json');

var OPTIONS = {
  method: 'GET',
  headers,
  redirect: 'follow',
};

export { OPTIONS };
