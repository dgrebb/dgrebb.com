const env = process.env.ENVIRONMENT;
let URL;
let envDir;

switch (env) {
  case 'staging':
    ID = 'Staging';
    URL = 'https://stg.dgrebb.com';
    envDir = 'stg';
    break;

  case 'gh-staging':
    ID = 'Github STG';
    URL = 'https://stg.dgrebb.com';
    envDir = 'gh-stg';
    break;

  case 'production':
    ID = 'Production';
    URL = 'https://www.dgrebb.com';
    envDir = 'prd';
    break;

  case 'gh-production':
    ID = 'Github PRD';
    URL = 'https://www.dgrebb.com';
    envDir = 'gh-prd';
    break;

  default:
    ID = 'Local';
    URL = 'https://local.dgrebb.com:443';
    envDir = 'local';
    break;
}

// Viewport Definitions
const xs = {
  label: 'xs',
  width: 320,
  height: 480,
};

const tallXS = {
  label: 'tall xs',
  width: 320,
  height: 568,
};

const sm = {
  label: 'sm',
  width: 375,
  height: 667,
};

const md = {
  label: 'md',
  width: 768,
  height: 1024,
};

const lg = {
  label: 'lg',
  width: 1024,
  height: 768,
};

const xl = {
  label: 'xl',
  width: 1280,
  height: 960,
};

const xxl = {
  label: '2xl',
  width: 1536,
  height: 1280,
};

module.exports = {
  ID: ID,
  URL: URL,
  envDir: envDir,
  allViewports: [xs, sm, md, lg, xl, xxl],
  upToSmallViewports: [xs],
  upToMediumViewports: [xs, sm],
  aboveSmallViewports: [md, lg, xl, xxl],
  xs: xs,
  tallXS: tallXS,
  sm: sm,
  md: md,
  lg: lg,
  xl: xl,
  xxl: xxl,
};
