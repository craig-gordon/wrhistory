const express = require('express');
const router = express.Router();
const db = require('../db.js');

const User = db.User,
      Player = db.Player,
      Document = db.Document,
      Record = db.Record,
      Console = db.Record,
      Game = db.Game,
      Tag = db.Tag,
      DocumentRecord = db.DocumentRecord,
      DocumentTag = db.DocumentTag,
      ConsoleGame = db.ConsoleGame;


router.post('/newDocument', (req, res) => {
  console.log('newDocument req.body:', req.body);

  Document.create({
    title: req.body.title,
    category: req.body.category,
    leaderboardurl: req.body.leaderboardUrl
  })
    .then(newDocument => {
      console.log('inside Document.create .then block, newDocument:', newDocument);
      newDocument = newDocument.dataValues;
      res.send(newDocument);
    })
    .catch(err => {
      console.log('Error inserting new Document into the database. Error:', err);
      res.send(err);
    });
});

module.exports = router;