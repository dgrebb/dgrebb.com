const { URL, aboveSmallViewports } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto`;

module.exports = {
  label: 'Post - Aside TOC Click',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: `.post .aside .page-navigation-list a[href*="${URL}/post/hello-world/#what"]`,
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
