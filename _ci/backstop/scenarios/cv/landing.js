const { URL } = require('../vars');
const CV_URL = `${URL}/cv/?roboto`;

module.exports = {
  label: 'CV',
  url: CV_URL,
  colorScheme: 'dark',
  onReadyScript: 'playwright/onReadyCV.js',
  delay: 333,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
