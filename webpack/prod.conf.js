const webpackMerge = require('webpack-merge');
const CommonConfig = require('./base.conf.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

const config = webpackMerge(CommonConfig, {
  plugins: [
    //复制你的静态页面到指定位置
    new HtmlWebpackPlugin({
      title: "首页",
      // <!-- 指定模板位置 -->
      template: "./src/index.html",
      // <!-- 指定打包后的文件名字 -->
      filename: "index.html"
    }),
    //产生一个Manifest.json
    new ManifestPlugin(),
    //bundle 会随着自身的 module.id 的修改，而发生变化
    //vendor 的 hash 发生变化是我们要修复的,否则每次构建都会更改vendor的hash，使我们抽离的第三方公共代码缓存失效
    //使用 HashedModuleIdsPlugin 用于生产环境构建
    // new webpack.HashedModuleIdsPlugin(),
    //统一设置支持minimize的loader(防止不支持的，直接写loader里报错)
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    //DefinePlugin只是来执行process.env.NODE_ENV的查找和替换操作，
    //构建脚本 webpack.config.js 中的 process.env.NODE_ENV 并不会被设置为 "production"
    //可以通过cross-env在npm脚本中注入变量
    new webpack.DefinePlugin({
      'process.env': {
        'JS_ENV': JSON.stringify(process.env.JS_ENV)
      }
    }),

    // product提高环境打包速度，注释sourceMap配置
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[name].[chunkhash].js.map',
    //   //不给第三方代码做sourcemap
    //   exclude: /(vendor)/
    // }),

  ],
  optimization: {
    //代替原本的CommonsChunkPlugin的vendor
    splitChunks: {
      chunks: 'all',
    },
    //代替原本的CommonsChunkPlugin的runtime
    runtimeChunk: 'single',
    moduleIds: "hashed",
    // minimize: false
  },
})


if (process.env.NEED_REPORT) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.NEED_START) {
  const apiUrl = "https://bi-dev.icsoc.net"
  const makeMock = require('icsoc-mock');

  config.devServer = {
    //指定静态文件的路径
    // contentBase: './src',
    contentBase: path.join(__dirname, "build"),
    //通过setup方法，可以获得app对象,从而扩展devServer或添加中间件
    setup(app) {
      makeMock(app, {
        //mock目录
        mockPath: 'mock',
        //支持设置统一接口后缀，如：.do
        apiExt: ''
      });
    },
    allowedHosts: [ //白名单
      '.icsoc.net'
      // '.host.com',//可以匹配所有xx.host.com
      // 'subdomain.host.com',
    ],
    compress: true, //开启gzip
    port: 3001,
    proxy: {
      "^/api/**": {
        target: apiUrl,
        changeOrigin: true,
      }
    },
    // http://bi-app-dev.icsoc.net
    //当单页模式采用HTML5 History API 时  http://192.168.96.82:8888
    //开启此选项,任意的 404 响应都可能需要被替代为index.html,可以通过rewrites进一步详细指定
    historyApiFallback: true,
  }
}

module.exports = config