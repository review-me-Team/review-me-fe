const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1',
    port: process.env.PORT,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
});
