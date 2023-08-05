const { URL } = require('../../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover Seventh Post',
  url: POSTS_URL,
  readyEvent: '',
  readySelector: '',
  onReadyScript: 'puppet/onReadyPosts.js',
  delay: 800,
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: '.posts-grid li:nth-child(7) .post-link',
  postInteractionWait: 1000,
  selectors: ['document'],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
