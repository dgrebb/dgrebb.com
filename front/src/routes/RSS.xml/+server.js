import { xml } from '@utils/rss';
import api from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
} from '$env/static/public';

export const prerender = true;
const postsEndpoint = URL + POSTS + '?populate[0]=hero';

export async function GET() {
  var posts = await api(postsEndpoint);

  const feedItems = posts
    .filter((p) => p.attributes.publishedAt)
    .toSorted((a, b) => {
      return a.attributes.publishedAt > b.attributes.publishedAt ? -1 : 1;
    });
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };

  const body = xml(feedItems);

  return new Response(body, { headers });
}
