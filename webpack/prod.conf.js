const webpackMerge = require('webpack-merge');
const CommonConfig = require('./base.conf.js');
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = webpackMerge(CommonConfig, {
  plugins: [
   
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css"
    }),
   
    //产生一个Manifest.json
    new ManifestPlugin(),
    
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NEED_REPORT ? 'static' : 'disabled',
      openAnalyzer: true
    })
  ],

  optimization: {
    //代替原本的CommonsChunkPlugin的vendor
    splitChunks: {
      chunks: 'all',
    },
    //代替原本的CommonsChunkPlugin的runtime
    runtimeChunk: 'single',
    moduleIds: "hashed",
    // minimize: false, // default true
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true, // 生产打包，移除console.log
          }
        }
      })
    ]
  },
})

module.exports = config