const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const app = express();

const db = require('./db.js');

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname + '/../client/')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
})

module.exports = app;