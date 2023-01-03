const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
exports.createImageMinify = (options = {}) => {
  const config = Object.assign(
    {
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          // 맞춤형 옵션을 통한 무손실 최적화
          // 보다 나은 결과는 다양한 실험이 필요합니다.
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 7 }],
            // Svgo 설정 참고: https://github.com/svg/svgo#configuration
            [
              'svgo',
              {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [
                              { xmlns: 'http://www.w3.org/2000/svg' },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    },
    options
  );
  return new ImageMinimizerPlugin(config);
};
