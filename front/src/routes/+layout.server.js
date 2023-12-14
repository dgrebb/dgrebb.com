import {
  PUBLIC_API_PATH_FOOTER as FOOT,
  PUBLIC_API_PATH_NAVIGATION as NAV,
  PUBLIC_API_PATH_HOME as HOME,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const trailingSlash = 'always';

export async function load({ url: { pathname } }) {
  try {
    const [navigationContent, socialContent, footerContent] = await Promise.all(
      [api(URL + NAV), api(URL + HOME), api(URL + FOOT)]
    );

    if (!navigationContent || !footerContent) {
      throw error(500, {
        message: 'Layout Error',
      });
    }

    let navItems = navigationContent.navItems.map((item) => ({
      ...item,
      childRoutes: item.childRoutes.split(',').map((child) => child.trim()),
    }));

    return {
      ...navigationContent,
      navItems,
      socialContent: socialContent.links,
      ...footerContent,
      pathname,
    };
  } catch (err) {
    throw error(500, {
      message: 'Error fetching data',
    });
  }
}
