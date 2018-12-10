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

router.get('/getRandomFeaturedChart', (req, res) => {
  let doc;

  Document.findOne({where: {title: 'Mega Man 2'}})
    .then(documentEntry => {
      console.log('documentEntry:', documentEntry);
      doc = documentEntry.dataValues;

      return Record.findAll({
        include: [{
          model: Document,
          where: {
            id: doc.id
          }
        }]
      });
    })
    .then(recordEntries => {
      doc.records = recordEntries.map(recordEntry => recordEntry.dataValues);
      doc.records.sort((a, b) => Date.UTC(a.year, a.month, a.day) > Date.UTC(b.year, b.month, b.day) ? 1 : -1);
      res.send(doc);
    })
    .catch(err => {
      console.log('Error retrieving Document from the database:', err);
      res.send(err);
    });
});

module.exports = router;