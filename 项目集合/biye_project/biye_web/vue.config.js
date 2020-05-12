const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": 'jquery',
      })
    ],
  },
  devServer: {
    hotOnly: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    host: 'localhost',
    port: 9000,
    https: false,
    proxy: {
      '/api': {
        target: `http://49.234.21.254:8563`,
        ws: true, // proxy websockets
        changeOrigin: true, //是否跨域
        pathRewrite: { '^/api': '' }
      }
    }
  },

};
