const { URL } = require('../../vars');
const POST_URL = `${URL}/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion#step-2-caesar-dressing-the-holy-grail-of-salad-sauces`;
const { aboveSmallViewports } = require('../../vars.js');

module.exports = {
  label: 'Post - Anchor Active Aside',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'puppet/postScrollToTop.js',
  delay: 500,
  scrollToSelector: 'div.page-navigation-list a.active',
  postInteractionWait: 500,
  selectors: ['viewport'],
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
