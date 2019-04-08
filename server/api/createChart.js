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

const autoGenerateAbbrev = (title) => {
  const charsMap = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'o',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    v: 'v',
    w: 'w',
    x: 'x',
    y: 'y',
    z: 'z',
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
    E: 'e',
    F: 'f',
    G: 'g',
    H: 'h',
    I: 'i',
    J: 'j',
    K: 'k',
    L: 'l',
    M: 'm',
    N: 'n',
    O: 'o',
    P: 'p',
    Q: 'q',
    R: 'r',
    S: 's',
    T: 't',
    U: 'u',
    V: 'v',
    W: 'w',
    X: 'x',
    Y: 'y',
    Z: 'z',
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    ' ': '-'
  };

  let abbrev = '';
  for (var i = 0; i < title.length; i++) {
    let char = title[i];
    if (charsMap[char] !== undefined) abbrev = abbrev + (charsMap[char]);
  }
  return abbrev;
};

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

  // information used later in the function
  const recordType = req.body.chartType === 'speedrun' ? 'time' : 'score';
  let gameId;
  let documentId;

  // first Find or Create all the players who have records in the new document
  // allPlayers: {playerName: null || playerId}
  const allPlayers = {};

  req.body.records.forEach(record => allPlayers[record.playerName] = null);
  const allPlayerEntries = Object.keys(allPlayers)
                            .map(playerName => {
                              return Player.findOrCreate({
                                where: {username: playerName}
                              })
                            });

  // next get the Game the new document is being created for
  const gameEntry = Game.findOne({where: {title: req.body.gameTitle}});

  // when the Game entry and all Player entries are accounted for, create new Document and Record entries
  Promise.all([gameEntry, ...allPlayerEntries])
    .then(entries => {
      const gameEntry = entries[0].get({plain: true});
      gameId = gameEntry.id;

      // add all player IDs to allPlayers Object
      entries.slice(1).forEach(playerEntry => {
        allPlayers[playerEntry.username] = playerEntry.get({plain: true}).id;
      });

      const docObj = {
        type: req.body.chartType,
        gameTitle: req.body.gameTitle,
        category: req.body.category,
        leaderboardUrl: req.body.leaderboardUrl,
        uriEndpoint: `/${gameEntry.abbrev}${req.body.category ? '/' + autoGenerateAbbrev(req.body.category) : ''}`,
        gameReleaseDate: gameEntry.releaseDate,
        gameId
      };

      // insert new Document
      return Document.create(docObj);
    })
    .then(documentEntry => {
      documentId = documentEntry.get({plain: true}).id;

      // insert all new Records
      const recordEntries = req.body.records.map(record => {
        const recordObj = {
          type: recordType,
          mark: record.mark,
          playerName: record.playerName,
          year: record.year,
          month: record.month,
          day: record.day,
          vodUrl: record.vodUrl,
          isMilestone: record.isMilestone,
          tooltipNote: record.tooltipNote,
          labelText: record.labelText,
          detailedText: record.detailedText,
          playerId: allPlayers[record.playerName],
          gameId,
          documentId
        };
        return Record.create(recordObj);
      });

      return Promise.all([documentEntry, ...recordEntries]);
    })
    .then(entries => {
      entries = entries.map(entry => entry.get({plain: true}));
      const newDocument = entries[0];
      newDocument.records = entries.slice(1);
      res.send(newDocument);
    })
    .catch(err => {
      console.log('Error inserting new Document into the database. Error:', err);
      res.send(err);
    });
});


// Insert a new Record into the database
router.post('/editDocument', (req, res) => {
  // TODO
});

module.exports = router;