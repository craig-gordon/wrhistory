const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: [ ['transform-object-rest-spread', 'transform-react-jsx-source'] ]
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
    }),
    new BrotliGzipPlugin({
      asset: '[path].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11
    }),
    new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ],
  node: {
    fs: 'empty'
  }
};