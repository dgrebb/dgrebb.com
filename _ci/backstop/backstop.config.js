const { ID, envDir, allViewports } = require('./scenarios/vars.js');
const { homepage, privacy, posts, post, cats } = require('./scenarios');

/**TODO: fix me: 
  cats.cats_mobile_select_all_category, */

let scenarios = [
  homepage.homepage_default,
  homepage.theme_switch,
  privacy.privacy_default,
  posts.posts_navigate_from_home,
  posts.posts_hover_post_1,
  posts.posts_hover_post_7,
  post.post_navigate_from_posts,
  post.post_syntax_highlighter,
  post.post_animated_image,
  post.post_aside_toc_click,
  post.post_aside_toc_active,
  post.post_mobile_mininav_expand,
  post.post_mobile_mininav_expand_toc_active,
  cats.cats_mobile,
  cats.cats_navigate_from_post,
  cats.cats_mobile_mini_nav_active,
  cats.cats_mobile_select_all_category,
  cats.cats_select_all_category,
];

let captureLimit = 5;
let compareLimit = 100;

if (process.env.ENVIRONMENT.includes('gh-')) {
  captureLimit = 5;
  compareLimit = 100;
}

module.exports = {
  id: ID,
  viewports: allViewports,
  onReadyScript: 'playwright/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: `bd/bitmaps_reference/${envDir}`,
    bitmaps_test: `bd/bitmaps_test/${envDir}`,
    engine_scripts: 'bd/engine_scripts',
    html_report: `bd/html_report/${envDir}`,
    ci_report: `bd/ci_report/${envDir}`,
  },
  report: [],
  engine: 'playwright',
  engineOptions: {
    args: [],
    headless: true,
  },
  asyncCaptureLimit: captureLimit,
  asyncCompareLimit: compareLimit,
  debug: false,
  debugWindow: false,
  scenarioLogsInReports: true,
};
