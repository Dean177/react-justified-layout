var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['./src/demo/index'],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'index.js',
    publicPath: '/demo/'
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  })],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        includes: [path.join(__dirname, 'src')]
      },
      { test: /\.css$/, loaders: ['style', 'css'], exclude: /node_modules/ },
      { test: /\.jpg$/, loader: 'file', exclude: /node_modules/ }
    ]
  }
};
