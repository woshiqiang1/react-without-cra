const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const PUBLICPATH = "/assets/";
const PORT = "8080";
const ENV = process.env.NODE_ENV || "dev";
let options = {
  // publicPath: '/', // for `ip:port`, not need `ip:port/${output}`
  publicPath: PUBLICPATH,
  loaders: {
    styles: ["style-loader", "css-loader", "less-loader"],
    imageAssets: "url-loader?limit=6000&name=[path][name].[ext]?[hash:8]",
    iconFonts: [
      {
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "[path][name].[ext]?[hash:8]"
        }
      }
    ]
  },
  globals: {
    "process.env": {
      NODE_ENV: JSON.stringify(ENV)
    },
    __DEV__: ENV === "dev",
    __PROD__: ENV === "production",
    __TEST__: ENV === "test"
  },
  beforePlugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = function(args) {
  options.ROOTPATH = args.ROOTPATH;
  options.env = args.env;
  return webpackMerge(require("./base.conf")(options), {
    devtool: "source-map",
    devServer: {
      contentBase: path.join(args.ROOTPATH, "./src"),
      historyApiFallback: true,
      inline: true,
      hot: false,
      port: PORT,
      host: "0.0.0.0",
      proxy: {
        "/": {
          bypass: function(req, res, proxyOptions) {
            console.log("Skipping proxy for browser request.");
            return `${PUBLICPATH}index.html`;
          }
        }
      }
    },
    plugins: []
  });
};
