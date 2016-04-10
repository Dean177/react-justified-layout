var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  hot: true,
  publicPath: config.output.publicPath,
  // quiet: true,
  stats: { colors: true }
}).listen(3000, 'localhost', function (err, result) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000/');
});
