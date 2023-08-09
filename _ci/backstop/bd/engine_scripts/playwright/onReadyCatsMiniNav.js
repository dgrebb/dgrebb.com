module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);
  await require('./colorScheme')(page, scenario);
  await require('./overrideCatsCSS')(page, scenario);
  await require('./expandMiniNav')(page, scenario);
};
