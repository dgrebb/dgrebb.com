"use strict";

const { sanitize } = require('@strapi/utils');
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findBySlug(ctx) {
    try {
      const { slug } = ctx.params;
      const query = {
        filters: { slug },
        ...ctx.query,
      };

      const post = await strapi.entityService.findMany("api::post.post", query);
      const schema = strapi.getModel("api::post.post");
      const sanitizedEntity = await sanitize.contentAPI.output(post, schema);

      return this.transformResponse(sanitizedEntity[0]);
    } catch (error) {
      ctx.body = error;
    }
  },
}));
