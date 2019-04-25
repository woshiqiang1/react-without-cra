const path = require("path");
const webpack = require("webpack");
// 打包时自动生成html文件，并在有多个入口时，自动加入script标签到html
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(options) {
  const PUBLICPATH = options.publicPath || "/assets/";
  const ROOTPATH = options.ROOTPATH;
  const entry = ["@babel/polyfill","./index.js"];
  return {
    name: "browser",
    context: path.resolve(ROOTPATH, "src/"),
    entry: {
      app: options._DEV_
        ? entry.concat(
            `webpack-hot-middleware/client?path=${PUBLICPATH}__webpack_hmr`
          )
        : entry
    },
    output: {
      publicPath: PUBLICPATH,
      filename: "scripts/[name].js",
      path: path.resolve(ROOTPATH, "dist/"),
      chunkFilename: "[name].js"
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
          test: /\.less$/,
          use: options.loaders.styles
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: options.loaders.imageAssets
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: options.loaders.iconFonts
        }
      ]
    },
    resolve: {
      modules: ["node_modules/"],
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
      extensions: [".js", ".jsx", ".json"]
    },
    plugins: (options.beforePlugins || []).concat([
      // 创建编译时可以配置的一些全局变量
      new webpack.DefinePlugin(options.globals),

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
    ]),
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
  };
};
