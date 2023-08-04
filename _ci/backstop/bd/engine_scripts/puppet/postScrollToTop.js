module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);
  await require('./overrideCSS')(page, scenario);

  const selector = 'div.page-navigation-list a.active';
  await page.waitForSelector(selector);
  await page.evaluate((selector) => {
    document.querySelector(selector).scrollIntoView();
  }, selector);
};
