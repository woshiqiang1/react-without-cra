const baseConfig = require('./base.conf')
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const PORT = '8080';

const config = webpackMerge(baseConfig, {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true, // 使用browserHistory时，把404重定向到/index.html
    inline: true, // bundle里会插入script来处理热重载，build info会出现在浏览器控制台
    hot: false, // hot: true, 或者命令行带 --hot, webpack.HotModuleReplacementPlugin会自动加入配置
    // hotOnly: true, 如果build失败页面不刷新
    // liveReload: true 文件变更时刷新/重载页面，hot: false，或者设置devServer.watchContentBase才会生效
    // headers: {'X-Custom-Foo': 'bar'} 设置响应头
    // lazy: true ,只有被请求的文件才会重新编译，否则即使文件变了也不重新编译
    // filename: 'abc.js' 指定lazy模式下，懒编译的文件
    port: PORT,
    host: '0.0.0.0',// 默认loaclhost
    proxy: { // 代理urls 当后台开发接口分散，而你只想往一个域里发送API请求时会用到
      "/api": 'http://abc.com',
      "/api2": { 
        target: "https://bcd.com",
        pathRewrite: {'^/api2': ''}, //不传递 /api2 会自动过滤掉/api2 /api2/user => /user
        changeOrigin: true, //代理服务器会更改HTTP头Host字段为目标服务器，主要用在后台服务托管在虚拟主机的情况，也就是一个IP对应多个域名，需要域名区分服务
        secure: true //是否验证SSL证书
      },

    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config
