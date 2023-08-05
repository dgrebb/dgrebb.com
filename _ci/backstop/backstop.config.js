const { homepage, privacy, posts, post } = require('./scenarios');
const { allViewports } = require('./vars.js');

module.exports = {
  id: 'dgrebb.com',
  viewports: allViewports,
  onReadyScript: 'playwright/onReady.js',
  scenarios: [
    homepage.homepage_default,
    homepage.theme_switch,
    privacy.privacy_default,
    posts.posts_navigate_from_home,
    posts.posts_hover_post_1,
    posts.posts_hover_post_7,
    post.post_navigate_from_posts,
    post.post_aside_anchor_click,
    post.post_anchor_active_aside,
  ],
  paths: {
    bitmaps_reference: 'bd/bitmaps_reference',
    bitmaps_test: 'bd/bitmaps_test',
    engine_scripts: 'bd/engine_scripts',
    html_report: 'bd/html_report',
    ci_report: 'bd/ci_report',
  },
  report: [],
  engine: 'playwright',
  engineOptions: {
    args: [],
    headless: true,
  },
  asyncCaptureLimit: 15,
  asyncCompareLimit: 100,
  debug: false,
  debugWindow: false,
  scenarioLogsInReports: true,
};
