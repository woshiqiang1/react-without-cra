const path = require("path");
const webpack = require("webpack");
// 打包时自动生成html文件，并在有多个入口时，自动加入script标签到html
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOTPATH = __dirname + '/../'
const PUBLICPATH = '/assets/'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  name: "browser",
  entry: {
    app: ["@babel/polyfill","./src/index.js"]
  },
  output: {
    filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    sourceMapFilename: isProd ? '[name].[chunkhash].map' : '[name].map',
    path: path.resolve(ROOTPATH, "dist"),
    publicPath: PUBLICPATH,
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
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
        // exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.less$/,
        use:  ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "url-loader?limit=6000&name=[path][name].[ext]?[hash:8]",
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
      entryHtml$: path.resolve(ROOTPATH, "src/index.html"),
      components: path.resolve(ROOTPATH, "src/components"),
      containers: path.resolve(ROOTPATH, "src/containers"),
      routes: path.resolve(ROOTPATH, "src/routes/"),
      store: path.resolve(ROOTPATH, "src/store"),
      api: path.resolve(ROOTPATH, "src/api"),
      config: path.resolve(ROOTPATH, "src/config"),
      constants: path.resolve(ROOTPATH, "src/constants/"),
      helper: path.resolve(ROOTPATH, "src/helper/"),
      styles: path.resolve(ROOTPATH, "src/styles/")
    },
    extensions: [".js", ".jsx", ".json"] // 同文件名，不同扩展名的文件处理顺序
  },
  plugins: [
    // 创建编译时可以配置的一些全局变量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('dev')
      }
    }),

    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(ROOTPATH, "src/index.html"),
      hash: false,
      favicon: path.resolve(ROOTPATH, "public/favicon.ico"),
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ],
  // 使用webpack的SplitChunksPlugin插件做代码分离
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: {
    hignlight: "hljs"
  }
}
