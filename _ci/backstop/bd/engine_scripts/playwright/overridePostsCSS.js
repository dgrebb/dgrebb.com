const BACKSTOP_TEST_CSS_OVERRIDE = `* {transition: none !important; transition-duration: 0 !important; transition-delay: 0 !important;} html {background-image: none; overflow: auto !important; min-height: 1500px !important; height: 1500px !important;} body {overflow: visible !important; min-height: 1500px !important; height: 1500px !important;}`;

module.exports = async (page, scenario) => {
  // inject arbitrary css to override styles
  await page.evaluate(`window._styleData = '${BACKSTOP_TEST_CSS_OVERRIDE}'`);
  await page.evaluate(() => {
    const style = document.createElement('style');
    const styleNode = document.createTextNode(window._styleData);
    style.appendChild(styleNode);
    document.head.appendChild(style);
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};