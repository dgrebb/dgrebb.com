const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/posts/category/thoughts/?roboto`;

module.exports = {
  label: 'Cats - Mobile',
  url: POST_URL,
  viewports: upToMediumViewports,
  delay: 333,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
