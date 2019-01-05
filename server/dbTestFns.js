const db = require('./dbNew.js');

const Player = db.Player,
      User = db.User,
      Platform = db.Platform,
      Game = db.Game,
      GameVersion = db.GameVersion,
      Level = db.Level,
      Document = db.Document,
      Record = db.Record,
      Event = db.Event,
      DocumentVersion = db.DocumentVersion;

setTimeout(() => {
  let platform = Platform.create({
    name: 'Nintendo Entertainment System',
    abbrev: 'NES',
    releaseDate: new Date(1983, 6, 15),
    description: 'The one and only.'
  });

  let game = Game.create({
    title: 'Super Mario Bros.',
    abbrev: 'smb1',
    releaseDate: new Date(1985, 5, 1)
  });

  Promise.all([platform, game])
    .then(([platform, game]) => {
      let version = GameVersion.create({
        isOriginal: true,
        platform_id: platform.get('id'),
        game_id: game.get('id')
      });
      return Promise.all([platform, game, version]);
    })
    // .then(([platform, game, version]) => {
    //   return Promise.all([platform, game, version, Platform.destroy({where: {id: platform.get('id')}})]);
    // })
    // .then(([platform, game, version, dCount]) => {
    //   console.log('# of instances destroyed:', dCount);
    //   return Promise.all([
    //     Game.findOne({where: {id: game.get('id')}, include: [{all: true}]}),
    //     Platform.findOne({where: {id: platform.get('id')}, include: [{all: true}]}),
    //     GameVersion.findOne({where: {id: version.get('id')}, include: [{all: true}]})
    //   ]);
    // })
    .then(([game, platform, version]) => {
      let player = Player.create({
        username: 'andrewg',
        country: 'USA'
      });

      return Promise.all([platform, game, version, player]);
    })
    .then(([game, platform, version, player]) => {
      let document = Document.create({
        type: 'speedrun',
        categoryName: 'Any%',
        categoryDescription: 'Beat The Game',
        categoryRules: 'Dont Cheat',
        variablesOptions: {
          "Used Emulator": [true, false],
          "Flagpole Glitches": ["no", "yes", "maybe"]
        },
        siteEndpoint: '/smb1/any',
        game_id: game.get('id')
      });
      return Promise.all([platform, game, version, player, document]);
    })
    .then(([game, platform, version, player, document]) => {
      let record = Record.create({
        type: 'time',
        pbOrWr: 'wr',
        mark: 1,
        date: new Date(Date.now()),
        labelText: 'yeaaaa',
        tooltipNote: 'yeaaaaaaaaaa',
        detailedText: 'yeaaaaaaaaaaaaaaa',
        isMilestone: true,
        variables: {
          "Used Emulator": true,
          "Flagpole Glitches": "yes"
        },
        player_id: player.get('id'),
        game_version_id: version.get('id'),
        document_id: document.get('id')
      }, {include: [{all: true}]});
      return Promise.all([platform, game, version, player, document, record]);
    })
    .then(([game, platform, version, player, document, record]) => {
      return Promise.all([platform, game, version, player, document, record, Game.destroy({where: {id: game.get('id')}})]);
    })
    .then(([game, platform, version, player, document, record, dCount]) => {
      console.log('# of game instances destroyed:', dCount);
      return Promise.all([
        Game.findOne({where: {id: game.get('id')}, include: [{all: true}]}),
        Platform.findOne({where: {id: platform.get('id')}, include: [{all: true}]}),
        GameVersion.findOne({where: {id: version.get('id')}, include: [{all: true}]}),
        Player.findOne({where: {id: player.get('id')}, include: [{all: true}]}),
        Document.findOne({where: {id: document.get('id')}, include: [{all: true}]}),
        Record.findOne({where: {id: record.get('id')}, include: [{all: true}]}),
      ]);
    })
    .then(([game, platform, version, player, document, record]) => {
      console.log('Game:', game);
      console.log('Platform:', platform.get());
      console.log('GameVersion:', version.get());
      console.log('Player:', player.get());
      console.log('Document:', document);
      console.log('Record:', record.get());
    })
    .catch(err => console.log('Error inserting into DB:', err));
}, 4000);