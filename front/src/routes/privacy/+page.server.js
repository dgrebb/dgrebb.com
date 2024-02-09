import { error } from '@sveltejs/kit';
import api from '@api';
import {
  API_URL as URL,
  API_PATH_PRIVACY as PRIVACY,
} from '$env/static/private';
import marked from '@components/content/markers/marker';

const endpoint = URL + PRIVACY;

export async function load() {
  try {
    const privacyContent = await api(endpoint);
    if (!privacyContent) {
      error(500, {
        message: 'Privacy Page Error: Content not available',
      });
    }

    const { title, seo } = privacyContent;

    const pageMeta = {
      ...seo,
      type: 'website',
      metaTitle: seo?.metaTitle || title,
      socialTitle: `${seo?.metaTitle || title} « Dan Grebb`,
      titleTemplate: '%s « Dan Grebb',
      metaDescription:
        seo?.metaDescription || 'Privacy Practices at dgrebb.com',
    };

    pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || {
      url: 'https://s.dgrebb.com/img/default_privacy_963504effe.webp',
      alternativeText: 'The Circuit of Life',
    };

    var markedPrivacyDetails = privacyContent
      ? marked(privacyContent.details)
      : false;

    return {
      ...privacyContent,
      details: markedPrivacyDetails || false,
      pageMeta,
    };
  } catch (error) {
    throw error(500, {
      message: `Privacy Page Error: ${error.message || error}`,
    });
  }
}
