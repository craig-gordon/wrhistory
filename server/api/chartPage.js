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

router.post('/document', (req, res) => {
  let doc;

  Document.findOne({where: {uriEndpoint: req.body.uriEndpoint}})
    .then(documentEntry => {
      doc = documentEntry.dataValues;
      console.log('doc:', doc);

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
      res.send(doc);
    })
    .catch(err => {
      console.log('Error fetching Document from database:', err);
      res.send(err);
    });
});

module.exports = router;