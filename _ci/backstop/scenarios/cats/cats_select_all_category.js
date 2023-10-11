const { URL, aboveSmallViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/thoughts/`;

module.exports = {
  label: 'Cats - Select "All" Category',
  url: CATS_URL,
  viewports: aboveSmallViewports,
  delay: 1000,
  onReadyScript: 'playwright/onReadyCats.js',
  clickSelector:
    '.aside .page-navigation ul.page-navigation-list .page-navigation-category-all a',
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
