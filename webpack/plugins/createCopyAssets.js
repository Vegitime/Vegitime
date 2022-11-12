const CopyPlugin = require('copy-webpack-plugin');

exports.createCopyAssets = (options = {}) => {
  const config = Object.assign(
    {
      patterns: [{ from: 'public/assets', to: 'static' }],
    },
    options
  );

  return new CopyPlugin(config);
};
