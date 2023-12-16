import { PUBLIC_API_URL as URL } from '$env/static/public';
import api from '@api';
import {
  shapeAwardData,
  shapeCertificationData,
  shapeClassificationData,
  shapeIndustryData,
  shapeOrganizationData,
  shapeExperienceData,
  shapeProjectData,
  shapeSkillData,
} from '@shape-shifters';
import { error } from '@sveltejs/kit';

async function requestContent(endpoint, collection) {
  let responseData;
  try {
    responseData = await api(endpoint);
  } catch (error) {
    console.warn(`${collection} Collection Item page API error.`);
    console.error(error);
  }
  return responseData;
}

export async function load({ params: { collection, slug } }) {
  var endpoint = `${URL}/${collection}s`;
  let data, itemData;

  switch (collection) {
    case 'award':
      endpoint += `?populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[p]=*&populate[experiences]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeAwardData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeAwardData(data) : false;
      break;
    case 'certification':
      endpoint += `?populate[seo]=*&populate[skills]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeCertificationData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeCertificationData(data) : false;
      break;
    case 'classification':
      endpoint += `?populate[seo]=*&populate[skills]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeClassificationData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeClassificationData(data) : false;
      break;
    case 'industry':
      endpoint = `${URL}/industries?populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[awards]=*&populate[experiences]=*&populate[images]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeIndustryData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeIndustryData(data) : false;
      break;
    case 'organization':
      endpoint += `?populate[seo]=*&populate[skills]=*&populate[projects]=*&populate[industries]=*&populate[experiences]=*&populate[images]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeOrganizationData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeOrganizationData(data) : false;
      break;
    case 'experience':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeExperienceData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeExperienceData(data) : false;
      break;
    case 'project':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[classification]=*&populate[experiences]=*&populate[artifacts][on][artifacts.websites][populate]=*&populate[artifacts][on][artifacts.videos][populate]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeProjectData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeProjectData(data) : false;
      break;
    case 'skill':
      endpoint += `?populate[hero]=*&populate[icon]=*&populate[seo]=*&populate[certifications]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[classifications]=*&populate[experiences]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      // itemData = await shapeSkillData(data);
      // TODO: Remove the ternaries when page-ready
      itemData = data.length ? await shapeSkillData(data) : false;
      break;
  }

  if (!data) {
    error(500, `${collection} Collection Item Page Error`);
  }

  return {
    slug: slug || false,
    collection: collection || false,
    itemData: itemData || {},
  };
}
