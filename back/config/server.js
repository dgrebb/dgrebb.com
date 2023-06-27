const { PUBLIC_ENV } = process.env;
const ref = PUBLIC_ENV === "production" ? "main" : "develop";

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    defaultHeaders: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env("DISPATCH_TOKEN")}`,
    },
    extraBody: {
      ref,
    },
  },
});
