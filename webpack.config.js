'use strict';

const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname + '/client'),
    filename: 'bundle.js'
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: ['es2015', 'react'],
          plugins: [
            [
              'transform-object-rest-spread',
              'transform-react-jsx-source'
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: { 
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  // devServer: {
  //   port: 3000
  // },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8
    })
  ],
  node: {
    fs: 'empty'
  },
  watch: true
};