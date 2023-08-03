const { URL } = require('../../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover Seventh Post',
  // cookiePath: "backstop/backstop_data/engine_scripts/cookies.json",
  url: POSTS_URL,
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
