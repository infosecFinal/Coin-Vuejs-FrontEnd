module.exports = {
  apps : [{
    script: "./node_modules/@vue/cli-service/bin/vue-cli-service.js",
    watch: "./node_modules/@vue/cli-service/bin/vue-cli-service.js",
    args: "serve",
    env: {
      PORT: 88
    }
  }
],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
