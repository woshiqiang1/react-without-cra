let options = { /* ... */}
module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH
  options.env = args.env
  return webpackMerge(require('./base.conf')(options), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      // 生成独立css文件
      new ExtractTextPlugin({
        filename: 'css/[name].css'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}