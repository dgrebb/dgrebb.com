const { URL } = require('../../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover First Post',
  // cookiePath: "backstop/backstop_data/engine_scripts/cookies.json",
  url: POSTS_URL,
  readyEvent: '',
  readySelector: '',
  delay: 800,
  onReadyScript: 'puppet/onReadyPosts.js',
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: '.posts-grid li:nth-child(1) .post-link',
  postInteractionWait: 500,
  selectors: [],
  selectorExpansion: false,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
