const { resolve } = require('path');
const { createHtmlTemplate } = require('./plugins');
const {
  typeScriptLoader,
  assetsLoader,
  svgAssetsLoader,
} = require('./loaders');

const commonConfig = {
  target: 'browserslist',
  resolve: {
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
    alias: {
      '@': resolve('src'),
    },
  },

  entry: {
    main: {
      import: resolve('src/main.tsx'),
    },
  },
  output: {
    path: resolve('build'),
    filename: '[name].[contenthash].bundle.js',
  },

  module: {
    rules: [typeScriptLoader, assetsLoader, svgAssetsLoader],
  },
  plugins: [createHtmlTemplate()].filter(Boolean),
};

module.exports = commonConfig;
