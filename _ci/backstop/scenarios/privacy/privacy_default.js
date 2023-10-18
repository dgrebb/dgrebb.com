const { URL } = require('../vars');
const PRIVACY_URL = `${URL}/privacy/?roboto`;

module.exports = {
  label: 'Privacy Policy',
  url: PRIVACY_URL,
  delay: 1000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
