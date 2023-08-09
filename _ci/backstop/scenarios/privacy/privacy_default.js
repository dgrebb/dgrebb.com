const { URL } = require('../vars');
const PRIVACY_URL = URL + '/privacy';

module.exports = {
  label: 'Privacy Policy',
  url: PRIVACY_URL,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
