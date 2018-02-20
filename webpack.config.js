'use strict';

const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname + '/client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: ['es2015', 'react'],
          plugins: [[
            'transform-object-rest-spread',
            'transform-react-jsx-source'
          ]]
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  node: {
    fs: 'empty'
  },
  watch: true
}

module.exports = config;