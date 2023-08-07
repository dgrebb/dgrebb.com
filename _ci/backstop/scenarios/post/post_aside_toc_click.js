const { URL } = require('../vars');
const POST_URL = `${URL}/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion/`;
const { aboveSmallViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Aside TOC Click',
  url: POST_URL,
  viewports: aboveSmallViewports,
  clickSelector:
    '.post-aside .page-navigation-list a[href="#step-2-caesar-dressing-the-holy-grail-of-salad-sauces"]',
  postInteractionWait: 800,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
