const serverConfig = {
  host: 'localhost',
  port: 3000,
  hot: true,
  open: false,
  compress: true,
  liveReload: true,
  static: ['public'],
  historyApiFallback: true,
  client: {
    logging: 'info',
    overlay: true,
    reconnect: 3,
  },
  watchFiles: {
    paths: ['src/**/*.*', 'public/**/*.*'],
  },
};

module.exports = serverConfig;
