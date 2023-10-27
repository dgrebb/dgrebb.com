const { URL } = require('../vars');

module.exports = {
  label: 'Posts - Navigate From Home',
  url: URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: `a[href*="/posts"]`,
  postInteractionWait: 333,
  selectors: ['document'],
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
