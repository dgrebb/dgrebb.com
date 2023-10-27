const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto`;

module.exports = {
  label: 'Post - Mobile Expand Mininav',
  url: POST_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyPost.js',
  clickSelector: '.page-navigation.mini .page-navigation-toggle',
  postInteractionWait: 100,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
