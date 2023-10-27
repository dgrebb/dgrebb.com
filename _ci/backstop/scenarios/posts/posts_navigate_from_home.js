const { URL } = require('../vars');

module.exports = {
  label: 'Posts - Navigate From Home',
  url: URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  delay: 100,
  clickSelector: `a[href*="/posts"]`,
  postInteractionWait: 500,
  selectors: ['document'],
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
