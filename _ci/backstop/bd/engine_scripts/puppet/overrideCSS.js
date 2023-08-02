module.exports = async (page, scenario) => {
  const BACKSTOP_TEST_CSS_OVERRIDE = `
    html {background-image: none;}

    .main section,
    .main section .flourish,
    .header,
    .main,
    .footer {
      -webkit-transition-duration: 0s;
      -moz-transition-duration: 0s;
      -o-transition-duration: 0s;
      transition-duration: 0s;
      opacity: 1;
    }
  `;
  // inject arbitrary css to override styles
  // await page.evaluate(`window._styleData = '${BACKSTOP_TEST_CSS_OVERRIDE}'`);
  await page.evaluate(() => {
    const style = document.createElement("style");
    // style.type = 'text/css';
    // const styleNode = document.createTextNode(window._styleData);
    style.innerHTML = this.BACKSTOP_TEST_CSS_OVERRIDE;
    document.head.appendChild(style);
  });

  console.log("BACKSTOP_TEST_CSS_OVERRIDE injected for: " + scenario.label);
};
