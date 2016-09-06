const path = require('path');

module.exports = {
  entry: {
    'bundle': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
  }
}
