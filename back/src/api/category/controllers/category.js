"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findBySlug(ctx) {
      try {
        const { slug } = ctx.params;
        const query = {
          filters: { slug },
          ...ctx.query,
        };

        const category = await strapi.entityService.findMany(
          "api::category.category",
          query
        );
        // const schema = strapi.getModel("api::category.category");
        // const sanitizedEntity = await sanitize.contentAPI.output(category, schema);

        // return this.transformResponse(sanitizedEntity[0]);

        return category;
      } catch (error) {
        ctx.body = error;
      }
    },
  })
);
