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
  await require('./overridePostCSS')(page, scenario);
  /** map all links to with automation querystring*/
  await page.evaluate((scenario) => {
    const popoverLink = document.querySelector('.popover--image:first-of-type');
    document.querySelectorAll('a:not(.toc-link)').forEach((a) => {
      a.href += '?roboto';
    });
    popoverLink.scrollIntoView();
    popoverLink.classList.toggle('backstop-popover', true);
  }, scenario);
};
