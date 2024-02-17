import { PATHS } from '$lib/CONSTANTS';
const website = 'https://www.dgrebb.com';
const path = PATHS.one.post;
const feedTitle = 'Dan Grebb | Computer Programmer';
const feedDescription = 'Thoughts, learnings, and updates from Dan Grebb.';
const feedLink = 'https://www.dgrebb.com';
const feedUpdated = new Date();

export const xml = (posts) => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <link href="${feedLink}/RSS.xml" rel="self"/>
    <link href="${feedLink}"/>
    <id>${feedLink}/</id>
    <updated>${feedUpdated.toISOString()}</updated>
    <author>
      <name>Dan Grebb</name>
    </author>
    <subtitle>${feedDescription}</subtitle>
    <generator>JavaScript</generator>
${posts
  .map((post) => {
    const { slug, publishedAt, summary } = post.attributes;

    const image =
      post?.attributes?.hero?.data?.attributes?.formats?.thumbnail?.url ||
      false;

    const { altText } = post?.attributes?.hero?.data?.attributes || false;

    return `<entry>
        <title>${post.attributes.title.replaceAll('&', '&amp;')}</title>
        <link href="${website}${path}/${slug}/"/>
        <id>${website}${path}/${slug}/</id>
        <updated>${new Date(publishedAt).toISOString()}</updated>
        <published>${new Date(publishedAt).toISOString()}</published>
        ${
          summary ? `<content type="html"><![CDATA[${summary}]]></content>` : ''
        }
        ${
          image
            ? `<image>
                <url>${image}</url>
                <title>${altText}</title>
                <link>${slug}</link>
              </image>`
            : ''
        }
      </entry>`;
  })
  .join('\n')}
  </feed>`;
