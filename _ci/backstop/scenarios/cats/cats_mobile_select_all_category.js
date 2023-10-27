const { URL, upToMediumViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/thoughts/?roboto`;

module.exports = {
  label: 'Cats - Mobile - Select "All" Category',
  url: CATS_URL,
  viewports: upToMediumViewports,
  delay: 300,
  onReadyScript: 'playwright/onReadyCats.js',
  clickSelectors: [
    '.page-navigation.mini .page-navigation-toggle',
    '.mini .page-navigation-category-all a',
  ],
  postInteractionWait: 100,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
