const { URL } = require('../../vars');
const POST_URL = `${URL}/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion/`;

module.exports = {
  label: 'Post - Thagin',
  // cookiePath: "backstop/backstop_data/engine_scripts/cookies.json",
  url: POST_URL,
  readyEvent: '',
  readySelector: '',
  delay: 800,
  onReadyScript: 'puppet/onReadyPosts.js',
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: '.posts-grid li:nth-child(7) .post-link',
  postInteractionWait: 2500,
  selectors: [],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
