"use strict";

module.exports = (_config, { strapi }) => {
  const redirects = ["/", "/index.html", "/admin/"].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect("/admin/plugins/dashboard"),
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};
