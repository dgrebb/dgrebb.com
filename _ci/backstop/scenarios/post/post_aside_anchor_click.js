const { URL } = require('../../vars');
const POST_URL = `${URL}/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion/`;

module.exports = {
  label: 'Post - Aside Anchor Click',
  // cookiePath: "backstop/backstop_data/engine_scripts/cookies.json",
  url: POST_URL,
  readyEvent: '',
  readySelector: '',
  delay: 800,
  onReadyScript: 'puppet/onReadyPosts.js',
  hideSelectors: [],
  removeSelectors: [],
  clickSelector: '.post-aside a[href="#step-2-caesar-dressing-the-holy-grail-of-salad-sauces"]',
  postInteractionWait: 1000,
  selectors: [],
  selectorExpansion: false,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
