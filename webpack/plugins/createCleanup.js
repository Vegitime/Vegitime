const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.createCleanup = (options = {}) => {
  const config = Object.assign(
    {
      verbose: true,
    },
    options
  );

  return new CleanWebpackPlugin(config);
};
