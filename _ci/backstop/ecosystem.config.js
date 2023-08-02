module.exports = {
  apps: [
    {
      name: "local.dgrebb.com http.server :8080",
      namespace: "backstop",
      script: "npm",
      args: "run serve",
    },
    {
      name: "BackstopJS Remote :3000",
      namespace: "backstop",
      script: "npm",
      args: "run remote",
      env: {
        "ENVIRONMENT": process.env.ENVIRONMENT,
      }
    },
  ],
};
