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
  await page.evaluate((scenario) => {
    /** force load lazy images */
    const lazyImages = document.querySelectorAll('img[loading="lazy"');
    lazyImages.forEach((i) => {
      i.removeAttribute('loading');
    });
    /** map all links to with automation querystring*/
    document.querySelectorAll('a:not(.toc-link)').forEach((a) => {
      a.href += '?roboto';
    });
  }, scenario);
};
