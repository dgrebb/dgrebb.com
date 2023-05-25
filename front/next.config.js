/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "local.c.dgrebb.com",
      "local.s.dgrebb.com",
      "stg.c.dgrebb.com",
      "stg.s.dgrebb.com",
      "c.dgrebb.com",
      "s.dgrebb.com",
    ],
  },
};

module.exports = nextConfig;
