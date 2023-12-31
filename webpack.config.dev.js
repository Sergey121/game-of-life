const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      hash: true,
    }),
  ],
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
});
