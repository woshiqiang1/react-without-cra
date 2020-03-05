const path = require("path");
const webpack = require("webpack");
// 打包时自动生成html文件，并在有多个入口时，自动加入script标签到html
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOTPATH = __dirname + '/../'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  name: "browser",
  entry: {
    app: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    sourceMapFilename: isProd ? '[name].[chunkhash].map' : '[name].map',
    path: path.resolve(ROOTPATH, "build"),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.less$/,
        use:  ["style-loader", "css-loader", {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "url-loader?limit=10000&name=[path][name].[ext]?[hash:8]",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:  [
          {
            loader: "url-loader",
            query: {
              limit: 10000,
              name: "[path][name].[ext]?[hash:8]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    modules: ["node_modules/"], // 设置搜索模块的目录
    alias: {
      EntryHtml$: path.resolve(ROOTPATH, "src/index.html"),
      Components: path.resolve(ROOTPATH, "src/components"),
      Containers: path.resolve(ROOTPATH, "src/containers"),
      Routes: path.resolve(ROOTPATH, "src/routes/"),
      Store: path.resolve(ROOTPATH, "src/store"),
      Api: path.resolve(ROOTPATH, "src/api"),
      Config: path.resolve(ROOTPATH, "src/config"),
      Constants: path.resolve(ROOTPATH, "src/constants/"),
      Helper: path.resolve(ROOTPATH, "src/helper/"),
      Styles: path.resolve(ROOTPATH, "src/styles/")
    },
    extensions: [".js", ".jsx", ".json"] // 同文件名，不同扩展名的文件处理顺序
  },

  plugins: [

    new CleanWebpackPlugin(
      {
        dry: false, //删除模式，true为模拟删除
        verbose: false, //true则显示日志
        cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
        root: process.cwd(),
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, '../build'),
        ],
      }
    ),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: "./static"
      }
    ]),

    // 创建编译时可以配置的一些全局变量
    // DefinePlugin只是来执行process.env.NODE_ENV的查找和替换操作，
    // 构建脚本 webpack.config.js 中的 process.env.NODE_ENV 并不会被设置为 "production"
    // 可以通过cross-env在npm脚本中注入变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    //复制你的静态页面到指定位置
    new HtmlWebpackPlugin({
      title: '首页',
      // <!-- 指定模板位置 -->
      template: path.resolve(ROOTPATH, "src/index.html"),
      favicon: path.resolve(ROOTPATH, "public/favicon.ico"),
      // <!-- 指定打包后的文件名字 -->
      filename: "index.html",
      inject: "body",
    })

  ],


  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  // 一般在lib开发中才会使用到
  // externals: {
  //   jquery: 'jQuery'
  // }
}
