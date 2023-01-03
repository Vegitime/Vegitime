const DotEnv = require('dotenv-webpack');
exports.createDotEnv = (options = {}) => {
  const config = Object.assign(
    {
      path: './.env',
    },
    options
  );
  return new DotEnv(config);
};
