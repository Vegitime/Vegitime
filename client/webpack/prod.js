const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common.js');
// const WorkboxPlugin = require('workbox-webpack-plugin');

const {
  createCopyAssets,
  createJsMinify,
  createImageMinify,
  createCleanup,
  createBundleAnalyzer,
  createDotEnv,
} = require('./plugins');

const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    ...commonConfig.output,
    path: resolve('build'),
    filename: '[name].min.js',
  },
  plugins: [
    ...commonConfig.plugins,
    createCopyAssets(),
    createBundleAnalyzer(),
    createDotEnv({ path: './.env/.prod' }),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
  ].filter(Boolean),

  optimization: {
    minimize: true,
    minimizer: [createJsMinify(), createImageMinify(), createCleanup()].filter(
      Boolean
    ),
  },
});

module.exports = prodConfig;
