const { URL, aboveSmallViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/development/`;

module.exports = {
  label: 'Cats - Select "Tests" Category',
  url: CATS_URL,
  viewports: aboveSmallViewports,
  clickSelector: '.category-aside a[href="/posts/category/tests/"]',
  postInteractionWait: 1000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
