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
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        //重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
        pathRewrite: {
          // '^/api': ''
        }
      },
      '/public': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          // '^/api': ''
        }
      },
      '/socket.io': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }
}