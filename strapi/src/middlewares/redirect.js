"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path === "/") {
      ctx.redirect(strapi.config.get("server.admin.url", "/admin"));
      return;
    }
    await next();
  };
};
