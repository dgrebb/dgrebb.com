const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto#what`;

module.exports = {
  label: 'Post - Mobile Mininav TOC Active Onload',
  url: POST_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyPost.js',
  delay: 333,
  clickSelector: '.page-navigation.mini .page-navigation-toggle',
  postInteractionWait: 100,
  selectors: ['.page-navigation.mini'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
