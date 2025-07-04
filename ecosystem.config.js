module.exports = {
  apps: [
    {
      name: '4G_panic_button-server',
      script: 'dist/app.js',         // Path to your compiled entry point
      instances: 1,                  // Or 'max' for clustering
      autorestart: true,
      watch: false,                  // Optional: set to true for dev
    }
  ]
};

