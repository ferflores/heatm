import webpack from 'webpack';
const path = require('path');

module.exports = {
  entry: {
    'bundle': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module:{
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
            ]
  },
  plugins:  [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
