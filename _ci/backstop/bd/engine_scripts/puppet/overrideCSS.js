const BACKSTOP_TEST_CSS_OVERRIDE = `html {background-image: none;} .main section, .main section .flourish, .header, .main, .footer { -webkit-transition-duration: 0s !important; -moz-transition-duration: 0s !important; -o-transition-duration: 0s !important; transition-duration: 0s !important; opacity: 1 !important;}`;

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