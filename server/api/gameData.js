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

  let game,
      consoles;

  let newGameEntry = Game.create({
    title: req.body.title,
    abbrev: req.body.abbrev,
    releaseDate: Date.UTC(req.body.year, req.body.month, req.body.day) + new Date().getTimezoneOffset() * 60 * 1000
  })
    .then(gameEntry => {
      return gameEntry;
    })
    .catch(err => {
      console.log('Error creating new game entry in the database:', err);
    })

  let consoleEntries = req.body.consoles.map(abbrev => {
    return Console.findOne({where: {abbrev}})
      .then(consoleEntry => {
        return consoleEntry.dataValues;
      })
      .catch(err => {
        console.log('Error retrieving console from the database:', err)
      });
  });
  
  Promise.all([newGameEntry].concat(consoleEntries))
    .then(allEntries => {
      console.log('allEntries:', allEntries);
      game = allEntries[0].dataValues;
      consoles = allEntries.slice(1);

      return Promise.all(consoles.map(console => {
        ConsoleGame.create({
          consoleId: console.id,
          gameId: game.id
        })
          .then(consoleGameEntry => {
            return consoleGameEntry.dataValues;
          })
          .catch(err => {
            console.log('Error inserting ConsoleGame join table data into the database:', err);
          })
      }));
    })
    .then(consoleGameEntries => {
      res.send(game);
    })
    .catch(err => {
      console.log('Error inserting new game into database:', err);
      res.send(err);
    });
});

module.exports = router;