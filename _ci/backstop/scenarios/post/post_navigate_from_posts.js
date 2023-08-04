const { URL } = require('../../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Post - Navigate From Posts',
  url: POSTS_URL,
  readyEvent: '',
  readySelector: '',
  delay: 0,
  onReadyScript: 'puppet/onReadyPosts.js',
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: '',
  clickSelector: 'a[href="/post/chicken-caesar-salad-an-overrated-concoction-of-lettuce-and-delusion/"]',
  postInteractionWait: 1500,
  selectors: ['document'],
  selectorExpansion: false,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
