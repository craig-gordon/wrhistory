require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const api = require('./server/router.js');

server.use(bodyParser.json());
server.use(cors());

server.get('*.js', (req, res, next) => {
  let extension = req.headers['accept-encoding'].includes('br') ? '.br' : '.gz';
  req.url = req.url + extension;
  res.set({
    'Content-Encoding': extension === '.br' ? 'br' : 'gzip',
    'Content-Type': 'application/javascript'
  });
  console.log('Right before sendFile!');
  console.log('req.url:', req.url);
  console.log('req.headers:', req.headers);
  console.log('res.getHeaders:', res.getHeaders());
  console.log('filepath:', path.join(__dirname, '/client', req.url));
  res.sendFile(req.url, {root: path.join(__dirname, '/client')});
});

server.use(express.static(path.join(__dirname, '/client')));

server.use('/api', api);

server.get('/*', (req, res) => {
  let filepath = path.join(__dirname + '/index.html');
  res.sendFile(filepath);
});

server.listen(process.env.PORT, () => console.log(`WR History server listening on port ${process.env.PORT}`));