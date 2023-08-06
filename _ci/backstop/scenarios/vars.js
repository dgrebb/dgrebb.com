const env = process.env.ENVIRONMENT;
let URL;
switch (env) {
  case 'staging':
    URL = 'https://stg.dgrebb.com';
    break;
  case 'production':
    URL = 'https://www.dgrebb.com';

  default:
    URL = 'http://local.dgrebb.com:8080';
    break;
}

module.exports = {
  URL: URL,
  allViewports: [
    {
      label: 'xs',
      width: 320,
      height: 480,
    },
    {
      label: 'sm',
      width: 375,
      height: 667,
    },
    {
      label: 'md',
      width: 768,
      height: 1024,
    },
    {
      label: 'lg',
      width: 1024,
      height: 768,
    },
    {
      label: 'xl',
      width: 1280,
      height: 960,
    },
    {
      label: '2xl',
      width: 1536,
      height: 1280,
    },
  ],
  upToSmallViewports: [
    {
      label: 'xs',
      width: 320,
      height: 480,
    },
  ],
  upToMediumViewports: [
    {
      label: 'xs',
      width: 320,
      height: 480,
    },
    {
      label: 'sm',
      width: 375,
      height: 667,
    },
  ],
  aboveSmallViewports: [
    {
      label: 'md',
      width: 768,
      height: 1024,
    },
    {
      label: 'lg',
      width: 1024,
      height: 768,
    },
    {
      label: 'xl',
      width: 1280,
      height: 960,
    },
    {
      label: '2xl',
      width: 1536,
      height: 1280,
    },
  ],
};
