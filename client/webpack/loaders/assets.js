exports.assetsLoader = {
  test: /\.(jpe?g|png|gif|webp|bmp)$/i,
  type: 'asset/resource',
  // 로더 별, 개별 설정
  generator: {
    filename: 'static/[name].[contenthash][ext][query]',
  },
  parser: {
    dataUrlCondition: 8 * 1024, // 8kb
  },
};
