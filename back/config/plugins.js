module.exports = ({ env }) => {
  const upload =
    process.env.NODE_ENV === "development"
      ? {
          enabled: false,
        }
      : {
          enabled: true,
          config: {
            provider: "aws-s3",
            providerOptions: {
              baseUrl: `https://${env("CDN_BASE_URL")}`,
              rootPath: "img",
              sizeLimit: 536870912,
              s3Options: {
                accessKeyId: env("AWS_ACCESS_KEY_ID"),
                secretAccessKey: env("AWS_ACCESS_SECRET"),
                region: env("AWS_REGION"),
                params: {
                  ACL: env("AWS_ACL", "public-read"),
                  signedUrlExpires: env(
                    "AWS_SIGNED_URL_EXPIRES",
                    60 * 60 * 24 * 7
                  ),
                  Bucket: env("AWS_S3_BUCKET"),
                  CacheControl:
                    "max-age=8380800,public,s-maxage=31536000,immutable",
                },
              },
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
          },
        };

  return {
    dashboard: {
      enabled: true,
      resolve: "./src/plugins/dashboard",
    },
    upload,
    "config-sync": {
      syncDir: "config/sync/",
      enabled: true,
      config: {
        minify: false,
        importOnBootstrap: false,
        excludedTypes: ["admin-role", "i18n-locale", "user-role"],
        excludedConfig: [
          "core-store.core_admin_auth",
          "core-store.core_admin_project-settings",
          "core-store.plugin_users-permissions_grant",
          "core-store.plugin_i18n_default_locale",
          "core-store.plugin_open-ai_settings",
          "core-store.plugin_upload_metrics",
          "core-store.plugin_upload_settings",
          "core-store.plugin_upload_view_configuration",
          "core-store.plugin_users-permissions_advanced",
          "core-store.plugin_users-permissions_email",
          "core-store.strapi_content_types_schema",
        ],
      },
    },
    sentry: {
      enabled: true,
      config: {
        dsn: env("PUBLIC_SENTRY_DSN"),
        sendMetadata: true,
        init: {
          environment: env("PUBLIC_ENV"),
        },
      },
    },
    seo: {
      enabled: true,
    },
  };
};
