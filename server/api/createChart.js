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


// Insert a new Document into the database
router.post('/newDocument', (req, res) => {
  console.log('newDocument req.body:', req.body);

  Game.findOne({where: {title: req.body.gameTitle}})
    .then(gameEntry => {
      gameEntry = gameEntry.dataValues;

      return Document.create({
        type: req.body.chartType,
        title: req.body.gameTitle,
        category: req.body.category,
        leaderboardUrl: req.body.leaderboardUrl,
        gameId: gameEntry.id
      })
    })
    .then(newDocument => {
      newDocument = newDocument.dataValues;
      res.send(newDocument);
    })
    .catch(err => {
      console.log('Error inserting new Document into the database. Error:', err);
      res.send(err);
    });
});


// Insert a new Record into the database
router.post('/newRecord', (req, res) => {
  console.log('newRecord req.body:', req.body);
  let newRecordEntry;
  let playerEntry = Player.findOrCreate({where: {username: req.body.player}});
  let consoleEntry = Console.findOne({where: {name: req.body.console}});
  let playerName;

  Promise.all([playerEntry, consoleEntry])
    .then(data => {
      let playerId = data[0][0].dataValues.id;
      playerName = data[0][0].dataValues.username;
      let consoleId = data[1].dataValues.id;

      return Record.create({
        type: req.body.recordType,
        mark: req.body.mark,
        platform: req.body.platform,
        version: req.body.version,
        region: req.body.region,
        verified: req.body.verified,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        vodUrl: req.body.vodUrl,
        isMilestone: req.body.isMilestone,
        tooltipNote: req.body.tooltipNote,
        labelText: req.body.labelText,
        detailedText: req.body.detailedText,
        playerId,
        consoleId,
        gameId: req.body.gameId,
      });
    })
    .then(newRecord => {
      newRecordEntry = newRecord.dataValues;

      return DocumentRecord.create({
        documentId: req.body.documentId,
        recordId: newRecordEntry.id
      });
    })
    .then(newDocumentRecord => {
      res.send({...newRecordEntry, player: playerName});
    })
    .catch(err => {
      console.log('Error inserting new Record into the database:', err);
      res.send(err);
    });
})

module.exports = router;