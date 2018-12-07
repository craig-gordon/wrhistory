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

// Get the full list of games in the database
router.get('/allGames', (req, res) => {
  Game.findAll()
    .then(allGameEntries => {
      res.send(allGameEntries);
    })
    .catch(err => {
      console.log('Error retrieving all game entries from the database:', err);
      res.send(err);
    });
});

// Get the full list of players in the database
router.get('/allPlayers', (req, res) => {
  Player.findAll()
    .then(allPlayerEntries => {
      console.log('allPlayerEntries:', allPlayerEntries);
      res.send(allPlayerEntries);
    })
    .catch(err => {
      console.log('Error retrieving all player entries from the database:', err);
      res.send(err);
    });
});

// Get the full list of consoles in the database
router.get('/allConsoles', (req, res) => {
  Console.findAll()
    .then(allConsoleEntries => {
      console.log('allConsoleEntries:', allConsoleEntries);
      res.send(allConsoleEntries);
    })
    .catch(err => {
      console.log('Error retrieving all console entries from the database:', err);
      res.send(err);
    });
});

// Insert a new Document into the database
router.post('/newDocument', (req, res) => {
  console.log('newDocument req.body:', req.body);
  let gameReleaseDate;

  Game.findOne({where: {title: req.body.gameTitle}})
    .then(gameEntry => {
      gameEntry = gameEntry.dataValues;
      gameReleaseDate = gameEntry.releaseDate;

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
      res.send({...newDocument, gameReleaseDate});
    })
    .catch(err => {
      console.log('Error inserting new Document into the database. Error:', err);
      res.send(err);
    });
});


// Insert a new Record into the database
router.post('/newRecord', (req, res) => {
  console.log('newRecord req.body:', req.body);
  let newRecordEntry,
      playerName;

  Player.findOrCreate({where: {username: req.body.player}})
    .then(playerEntry => {
      console.log('playerEntry:', playerEntry);
      let playerId = playerEntry[0].dataValues.id;
      playerName = playerEntry[0].dataValues.username;

      return Record.create({
        type: req.body.recordType,
        mark: req.body.mark,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        vodUrl: req.body.vodUrl,
        isMilestone: req.body.isMilestone,
        tooltipNote: req.body.tooltipNote,
        labelText: req.body.labelText,
        detailedText: req.body.detailedText,
        playerId,
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