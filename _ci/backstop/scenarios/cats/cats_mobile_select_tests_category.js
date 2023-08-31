const { URL, upToMediumViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/development/`;

module.exports = {
  label: 'Cats - Select "Tests" Category',
  url: CATS_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReady.js',
  clickSelector: '.page-navigation.mini.top a[href="/posts/category/tests/"]',
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
