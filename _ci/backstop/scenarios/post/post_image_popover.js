const { URL } = require('../vars.js');
const POST_URL = `${URL}/post/strapi-cms-admin-panel-customization-post-version-4-15-0/?roboto`;
const { aboveSmallViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Popover Image',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyPopover.js',
  delay: 300,
  clickSelector: '.dashboard-with-plausible .popover--image',
  postInteractionWait: 250,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
