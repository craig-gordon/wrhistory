const express = require('express');
const router = express.Router();
const db = require('../db.js');

const User = db.User,
      Player = db.Player,
      Document = db.Document,
      Record = db.Record,
      Console = db.Console,
      Game = db.Game,
      Tag = db.Tag,
      DocumentRecord = db.DocumentRecord,
      DocumentTag = db.DocumentTag,
      ConsoleGame = db.ConsoleGame;

// Get a specified document

router.get('/document', (req, res) => {
  Document.findOne({
    where: {
      abbrev: req.query.code,
      category: req.query.category
    }}
  )
    .then(documentEntry => {
      documentEntry = documentEntry.dataValues;
      console.log('documentEntry:', documentEntry);
      res.send(documentEntry);
    })
    .catch(err => {
      console.log('Error fetching Document from database:', err);
      res.send(err);
    });
});

module.exports = router;