const { URL, aboveSmallViewports } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto`;

module.exports = {
  label: 'Post - Aside TOC Click',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyPost.js',
  delay: 333,
  clickSelector: '.post .aside .page-navigation-list a[href*="#what"]',
  postInteractionWait: 100,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
