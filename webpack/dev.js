const { merge } = require('webpack-merge');
const commonConfig = require('./common.js');
const serverConfig = require('./server.js');
const { createDotEnv } = require('./plugins');

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: serverConfig,
  plugins: [
    ...commonConfig.plugins,
    createDotEnv({ path: '.env/.dev' }),
  ].filter(Boolean),
});

module.exports = devConfig;
