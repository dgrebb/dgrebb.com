import {
  PUBLIC_API_PATH_HOME as HOME,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { link } from '@components/content/renderers';

const renderer = new marked.Renderer();
renderer.link = link;

marked.use({ renderer });

const endpoint = URL + HOME;

export async function load() {
  var home;
  let seo, bioPicture, headline, image, intro;

  try {
    home = await api(endpoint);
  } catch (error) {
    console.warn('Homepage API error.');
    console.error(error);
  }

  if (!home) {
    throw error(500, 'Home Page Error');
  }

  ({ seo, bioPicture, headline, image, intro } = home);

  image = { ...bioPicture?.data?.attributes?.formats?.thumbnail } || {
    url: '/bio.jpg',
    alternativeText: 'A picture of Dan smiling',
  };

  image.height = '120';
  image.width = '120';

  const page = {
    headline,
    image,
    intro: intro ? marked.parse(intro) : false,
  };
  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || headline,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || image;

  return {
    ...page,
    pageMeta,
  };
}
