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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
    alias: {
      '@': resolve('src'),
    },
  },

  entry: {
    main: {
      import: resolve('src/main.tsx'),
      dependOn: 'vendors',
    },
    vendors: ['react', 'react-dom'],
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
