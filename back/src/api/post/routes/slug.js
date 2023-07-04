module.exports = {
  routes: [
    {
      method: "GET",
      path: "/post/:slug",
      handler: "post.findBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
