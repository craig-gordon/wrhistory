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

router.post('/newGame', (req, res) => {
  console.log('newGame req.body:', req.body);

  Game.create({
    title: req.body.title,
    abbrev: req.body.abbrev,
    releaseDate: Date.UTC(req.body.year, req.body.month, req.body.day) + new Date().getTimezoneOffset() * 60 * 1000
  })
    .then(gameEntry => {
      gameEntry = gameEntry.dataValues;

      res.send(gameEntry);
    })
    .catch(err => {
      console.log('Error inserting new game into database:', err);
      res.send(err);
    });
});

module.exports = router;