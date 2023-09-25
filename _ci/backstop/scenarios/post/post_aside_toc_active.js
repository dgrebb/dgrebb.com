const { URL } = require('../vars');
const POST_URL = `${URL}/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion#step-2-caesar-dressing-the-holy-grail-of-salad-sauces`;
const { aboveSmallViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Aside TOC Active Item Onload',
  url: POST_URL,
  viewports: aboveSmallViewports,
  delay: 500,
  selectors: ['.post .aside'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
