module.exports = {
  apps: [
    {
      name: "local.dgrebb.com live-server :8080",
      namespace: "backstop",
      script: "live-server",
      args: "../../front/build --no-browser --port=8080",
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
