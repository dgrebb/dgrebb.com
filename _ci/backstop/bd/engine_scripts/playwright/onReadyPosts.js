module.exports = async (
  page,
  scenario,
  viewport,
  isReference,
  browserContext
) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);
  await require('./colorScheme')(page, scenario);
  await require('./overridePostsCSS')(page, scenario);
  /** map all links to with automation querystring*/
  await page.evaluate((scenario) => {
    document.querySelectorAll('a').forEach((a) => {
      a.href += '?roboto';
    });
  }, scenario);
};
