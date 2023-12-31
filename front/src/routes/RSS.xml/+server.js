import { xml } from '@utils/rss';
import api from '@api';
import { API_URL as URL, API_PATH_POSTS as POSTS } from '$env/static/private';

export const prerender = true;
const postsEndpoint = URL + POSTS + '?populate[0]=hero';

export async function GET() {
  let body, headers;
  var posts = await api(postsEndpoint);

  try {
    const feedItems = posts
      .filter((p) => p.attributes.publishedAt)
      .toSorted((a, b) => {
        return a.attributes.publishedAt > b.attributes.publishedAt ? -1 : 1;
      });
    headers = {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    };

    body = xml(feedItems);
  } catch (error) {
    console.error(error);
  }

  return new Response(body, { headers });
}
