require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const api = require('./server/router.js');

server.use(bodyParser.json());
server.options('*', cors());

server.get('*/__webpack_hmr', (req, res, next) => {
  res.set('Content-Type', 'text/event-stream');
  res.status(404).end();
});

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js')({mode: 'development'});
  const compiler = webpack(webpackConfig);

  server.use(
    require('webpack-dev-middleware')(compiler, {
      methods: [ 'GET', 'POST' ],
      publicPath: webpackConfig.output.publicPath,
      writeToDisk: true,
      stats: false,
      logLevel: 'silent'
    })
  );

  server.use(
    require('webpack-hot-middleware')(compiler, {
      path: '__webpack_hmr'
    })
  );
}

server.get('*/bundle.js', (req, res) => {
  // if mode is development, send normal bundle.js, as compression plugins are not being used
  if (process.env.NODE_ENV !== 'development') {
    let extension = req.headers['accept-encoding'].includes('br') ? '.br' : '.gz';
    req.url = req.url + extension;
    res.set({
      'Content-Encoding': extension === '.br' ? 'br' : 'gzip',
      'Content-Type': 'application/javascript'
    });
  }
  
  res.sendFile(req.url, {root: path.join(__dirname, '/client')});
});

server.use(express.static(path.join(__dirname, '/client')));

server.use('/api', api);

server.get('/*', (req, res) => {
  if (req.headers.accept === 'text/event-stream') return;
  let filepath = path.join(__dirname + '/index.html');
  res.sendFile(filepath);
});

server.listen(process.env.PORT, () => console.log(`WR History server listening on port ${process.env.PORT}`));