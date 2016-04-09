var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/demo/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'index.js',
    publicPath: '/demo/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loaders: ['style', 'css'], exclude: /node_modules/ },
      { test: /\.jpg$/, loader: 'file', exclude: /node_modules/ }
    ]
  }
};
