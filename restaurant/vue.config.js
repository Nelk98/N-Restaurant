module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  lintOnSave: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8080',
    disableHostCheck: true,
    https: false,
    hotOnly: false,
    //代理
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:3000',
        target: 'http://10.96.150.56:3000',
        changeOrigin: true,
        ws: true,
      },
      '/public': {
        // target: 'http://127.0.0.1:3000',
        target: 'http://10.96.150.56:3000',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}