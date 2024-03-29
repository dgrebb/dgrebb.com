module.exports = {
  apps: [
    {
      name: 'UI http-server :443',
      namespace: 'backstop',
      script: 'npm',
      args: 'run serve',
    },
    {
      name: 'BackstopJS Remote :3000',
      namespace: 'backstop',
      script: 'npm',
      args: 'run remote',
      watch: ['backstop.config.js', 'scenarios', 'bd/engine_scripts'],
      watch_delay: 1000,
      env: {
        ENVIRONMENT: process.env.ENVIRONMENT,
      },
    },
  ],
};
