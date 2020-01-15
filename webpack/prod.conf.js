const webpackMerge = require('webpack-merge');
const CommonConfig = require('./base.conf.js');

const webpack = require('webpack');
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

const config = webpackMerge(CommonConfig, {
  plugins: [
    new CleanWebpackPlugin(
      {
        dry: false, //删除模式，true为模拟删除
        verbose: false, //true则显示日志
        cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
        root: process.cwd(),
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, '../dist'),
        ],
      }
    ),

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
    // minimize: false
  },
})

module.exports = config