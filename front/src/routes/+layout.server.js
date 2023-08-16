import {
  PUBLIC_API_PATH_FOOTER as FOOT, PUBLIC_API_PATH_NAVIGATION as NAV, PUBLIC_API_URL as URL
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const trailingSlash = 'always';

const navigationEndpoint = URL + NAV;
const footerEndpoint = URL + FOOT;

export async function load({ url: { pathname } }) {
  const [navigationContent, footerContent] = await Promise.all([
    api(navigationEndpoint),
    api(footerEndpoint),
  ]);

  if (!navigationContent || !footerContent) {
    throw error(500, {
      message: 'Layout Error',
    });
  }

  return {
    ...navigationContent,
    ...footerContent,
    pathname,
  };
}
