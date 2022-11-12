const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

exports.createBundleAnalyzer = (options = {}) => {
  const config = Object.assign(
    {
      openAnalyzer: true,
      generateStatsFile: true,
    },
    options
  );
  return new BundleAnalyzerPlugin(config);
};
