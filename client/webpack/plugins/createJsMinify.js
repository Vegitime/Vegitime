const TerserPlugin = require('terser-webpack-plugin');
exports.createJsMinify = (options = {}) => {
  const config = Object.assign({}, options);
  return new TerserPlugin(config);
};
