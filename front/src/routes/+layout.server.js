import {
  API_PATH_FOOTER as FOOT,
  API_PATH_NAVIGATION as NAV,
  API_PATH_HOME as HOME,
  API_URL as URL,
} from '$env/static/private';
import api from '@api';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const trailingSlash = 'always';

export async function load({ url: { pathname } }) {
  try {
    const [navigationContent, generalContent, footerContent] =
      await Promise.all([api(URL + NAV), api(URL + HOME), api(URL + FOOT)]);

    if (!navigationContent || !footerContent) {
      error(500, {
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
      generalContent: generalContent.links,
      ...footerContent,
      pathname,
    };
  } catch (err) {
    error(500, {
      message: 'Error fetching data',
    });
  }
}
