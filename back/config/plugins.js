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
    upload,
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
    "strapi-blurhash": {
      enabled: true,
      config: {
        regenerateOnUpdate: true,
      },
    },
    seo: {
      enabled: true,
    },
    "open-ai": {
      enabled: true,
      config: {
        API_TOKEN: env("OPEN_AI_TOKEN"),
      },
    },
  };
};
