const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  output: {
    path: path.join(__dirname, '/../client/'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, '/../client/')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: [ ['transform-object-rest-spread', 'transform-react-jsx-source', 'react-hot-loader/babel'] ]
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new DotenvPlugin({
      path: './.env',
      safe: false
    })
  ],
  node: {
    fs: 'empty'
  }
};