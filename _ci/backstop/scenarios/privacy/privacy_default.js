const { URL } = require('../../vars');
const PRIVACY_URL = URL + '/privacy';

module.exports = {
  label: 'Privacy Policy',
  url: URL + '/privacy',
  delay: 1500,
  misMatchThreshold: 0.1,
  requireSameDimensions: true,
};
