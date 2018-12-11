const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const api = require('./router.js');
const db = require('./db.js');

app.use(bodyParser.json());
app.use(cors());

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.join(__dirname + '/../client/')));

app.use('/api', api);

app.get('/*', (req, res) => {
  let filepath = path.join(__dirname + '/../client/index.html');
  res.sendFile(filepath);
});

module.exports = app;