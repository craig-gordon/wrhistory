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

router.get('/allDocuments', (req, res) => {
  Document.findAll()
    .then(documentEntries => {
      res.send(documentEntries.map(doc => doc.dataValues));
    })
    .catch(err => {
      console.log('Error retrieving all documents from database:', err);
      res.send(err);
    });
});

module.exports = router;