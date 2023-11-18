import { error } from '@sveltejs/kit';
import api from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_PRIVACY as PRIVACY,
} from '$env/static/public';
import { marked } from 'marked';
import { heading, link } from '@components/content/renderers';

const renderer = new marked.Renderer();
renderer.link = link;
renderer.heading = heading;

marked.use({ renderer });

const endpoint = URL + PRIVACY;

export async function load({ params }) {
  const privacyContent = await api(endpoint);
  if (!privacyContent) {
    throw error(500, {
      message: `Privacy Page Error: ${error}`,
    });
  }

  const { title, seo } = privacyContent;

  const pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || title,
    socialTitle: `${seo?.metaTitle || title} « Dan Grebb`,
    titleTemplate: '%s « Dan Grebb',
    metaDescription: seo?.metaDescription || 'Privacy Practices at dgrebb.com',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || {
    url: 'https://s.dgrebb.com/img/default_privacy_963504effe.webp',
    alternativeText: 'The Circuit of Life',
  };

  var markedPrivacyDetails = privacyContent
    ? marked.parse(privacyContent.details)
    : false;

  return {
    ...privacyContent,
    details: markedPrivacyDetails || false,
    pageMeta,
  };
}
