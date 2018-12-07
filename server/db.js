const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false
});

database
  .authenticate()
  .then(() => {
    console.log('Successfully connected to Record History database.');
  })
  .catch(err => {
    console.error('Unable to connect to Record History database:', err);
  });

// ~~~~~~ //
// Player //
// ~~~~~~ //

const Player = database.define('player', {
  username: {type: Sequelize.STRING, unique: true, allowNull: false},
  realname: Sequelize.STRING
}, {
  freezeTableName: true
});

Player.sync({force: false});

// ~~~~ //
// User //
// ~~~~ //

const User = database.define('user', {
  username: {type: Sequelize.STRING, unique: true, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, unique: true, allowNull: false},
}, {
  freezeTableName: true
});

User.belongsTo(Player);

User.sync({force: false});

// ~~~~~~~ //
// Console //
// ~~~~~~~ //

const Console = database.define('console', {
  name: {type: Sequelize.STRING, unique: true, allowNull: false},
  abbrev: {type: Sequelize.STRING, unique: true, allowNull: false}
}, {
  freezeTableName: true
});

Console.sync({force: false});

// ~~~~ //
// Game //
// ~~~~ //

const Game = database.define('game', {
  title: {type: Sequelize.STRING, unique: true, allowNull: false},
  abbrev: {type: Sequelize.STRING, unique: true, allowNull: false},
  releaseDate: {type: Sequelize.DATEONLY, allowNull: false}
}, {
  freezeTableName: true
});

Game.sync({force: false});

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = database.define('document', {
  type: {type: Sequelize.STRING, allowNull: false},
  title: {type: Sequelize.STRING, allowNull: false},
  category: Sequelize.STRING,
  leaderboardUrl: Sequelize.STRING
}, {
  freezeTableName: true
});

Document.belongsTo(Game);

Document.sync({force: false});

// ~~~~~~ //
// Record //
// ~~~~~~ //

const Record = database.define('record', {
  type: {type: Sequelize.STRING, allowNull: false},
  mark: {type: Sequelize.DECIMAL, allowNull: false},
  year: {type: Sequelize.INTEGER, allowNull: false},
  month: {type: Sequelize.INTEGER, allowNull: false},
  day: {type: Sequelize.INTEGER, allowNull: false},
  hour: Sequelize.INTEGER,
  minute: Sequelize.INTEGER,
  vodurl: Sequelize.STRING,
  isMilestone: Sequelize.BOOLEAN,
  tooltipNote: Sequelize.STRING,
  labelText: Sequelize.STRING,
  detailedText: Sequelize.TEXT
}, {
  freezeTableName: true
});

Record.belongsTo(Player);
Record.belongsTo(Game);

Record.sync({force: false});

// ~~~~~~~ //
// Article //
// ~~~~~~~ //

const Article = database.define('article', {
  title: {type: Sequelize.STRING, allowNull: false}
}, {
  freezeTableName: true
});

Article.belongsTo(Player);
Article.belongsTo(User);

Article.sync({force: false});

// ~~~ //
// Tag //
// ~~~ //

const Tag = database.define('tag', {
  name: {type: Sequelize.STRING, allowNull: false},
  abbrev: Sequelize.STRING
}, {
  freezeTableName: true
});

Tag.belongsTo(Game);

Tag.sync({force: false});

// ~~~~~~~~~~~~~~~~~ //
// Document / Record //
// ~~~~~~~~~~~~~~~~~ //

const DocumentRecord = database.define('documentrecord', {
}, {
  freezeTableName: true
});

Document.belongsToMany(Record, {through: 'documentrecord'});
Record.belongsToMany(Document, {through: 'documentrecord'});

DocumentRecord.sync({force: false});

// ~~~~~~~~~~~~~~ //
// Document / Tag //
// ~~~~~~~~~~~~~~ //

const DocumentTag = database.define('documenttag', {
}, {
  freezeTableName: true
});

Document.belongsToMany(Tag, {through: 'documenttag'});
Tag.belongsToMany(Document, {through: 'documenttag'});

DocumentTag.sync({force: false});

// ~~~~~~~~~~~~~~ //
// Console / Game //
// ~~~~~~~~~~~~~~ //

const ConsoleGame = database.define('consolegame', {
}, {
  freezeTableName: true
});

Console.belongsToMany(Game, {through: 'consolegame'});
Game.belongsToMany(Console, {through: 'consolegame'})

ConsoleGame.sync({force: false});

// ~~~~~~~~~~~~~ //
// Article / Tag //
// ~~~~~~~~~~~~~ //

const ArticleTag = database.define('articletag', {
}, {
  freezeTableName: true
});

Article.belongsToMany(Tag, {through: 'articletag'});
Tag.belongsToMany(Article, {through: 'articletag'});

ArticleTag.sync({force: false});



// ~~~~~~~~~~~~~~~~~ //
// HARD DATA INSERTS //
// ~~~~~~~~~~~~~~~~~ //

// Game.findOrCreate({where: {
//   title: 'Mega Man 2',
//   abbrev: 'mm2',
//   releaseDate: Date.UTC(1988, 11, 24)
// }});

// Game.findOrCreate({where: {
//   title: 'Donkey Kong',
//   abbrev: 'dk',
//   releaseDate: Date.UTC(1981, 6, 9)
// }});

// Console.findOrCreate({where: {
//   name: 'Atari 2600',
//   abbrev: 'A2600'
// }});

// Console.findOrCreate({where: {
//   name: 'Atari 5200',
//   abbrev: 'A5200'
// }});

// Console.findOrCreate({where: {
//   name: 'Atari 7800',
//   abbrev: 'A7800'
// }});

// Console.findOrCreate({where: {
//   name: 'Nintendo Entertainment System',
//   abbrev: 'NES'
// }});

// Console.findOrCreate({where: {
//   name: 'Super Nintendo Entertainment System',
//   abbrev: 'SNES'
// }});

// Console.findOrCreate({where: {
//   name: 'Nintendo 64',
//   abbrev: 'N64'
// }});

// Console.findOrCreate({where: {
//   name: 'GameCube',
//   abbrev: 'GC'
// }});

// Console.findOrCreate({where: {
//   name: 'Wii',
//   abbrev: 'Wii'
// }});

// Console.findOrCreate({where: {
//   name: 'Wii Virtual Console',
//   abbrev: 'WiiVC'
// }});

// Console.findOrCreate({where: {
//   name: 'Wii U',
//   abbrev: 'WiiU'
// }});

// Console.findOrCreate({where: {
//   name: 'Wii U Virtual Console',
//   abbrev: 'WiiUVC'
// }});

// Console.findOrCreate({where: {
//   name: 'Switch',
//   abbrev: 'Switch'
// }});

// Console.findOrCreate({where: {
//   name: 'Game Boy',
//   abbrev: 'GB'
// }});

// Console.findOrCreate({where: {
//   name: 'Game Boy Color',
//   abbrev: 'GBC'
// }});

// Console.findOrCreate({where: {
//   name: 'Game Boy Advance',
//   abbrev: 'GBA'
// }});

// Console.findOrCreate({where: {
//   name: 'Nintendo DS',
//   abbrev: 'DS'
// }});

// Console.findOrCreate({where: {
//   name: 'Nintendo 3DS',
//   abbrev: '3DS'
// }});

// Console.findOrCreate({where: {
//   name: 'Nintendo 3DS Virtual Console',
//   abbrev: '3DSVC'
// }});

// Console.findOrCreate({where: {
//   name: 'Master System',
//   abbrev: 'SMS'
// }});

// Console.findOrCreate({where: {
//   name: 'Genesis',
//   abbrev: 'GEN'
// }});

// Console.findOrCreate({where: {
//   name: 'Sega CD',
//   abbrev: 'SegaCD'
// }});

// Console.findOrCreate({where: {
//   name: 'Sega 32X',
//   abbrev: '32X'
// }});

// Console.findOrCreate({where: {
//   name: 'Saturn',
//   abbrev: 'Saturn'
// }});

// Console.findOrCreate({where: {
//   name: 'Dreamcast',
//   abbrev: 'Dreamcast'
// }});

// Console.findOrCreate({where: {
//   name: 'Game Gear',
//   abbrev: 'GameGear'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation',
//   abbrev: 'PS1'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation 2',
//   abbrev: 'PS2'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation 3',
//   abbrev: 'PS3'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation 4',
//   abbrev: 'PS4'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation Portable',
//   abbrev: 'PSP'
// }});

// Console.findOrCreate({where: {
//   name: 'PlayStation Vita',
//   abbrev: 'Vita'
// }});

// Console.findOrCreate({where: {
//   name: 'Xbox',
//   abbrev: 'Xbox'
// }});

// Console.findOrCreate({where: {
//   name: 'Xbox 360',
//   abbrev: 'Xbox360'
// }});

// Console.findOrCreate({where: {
//   name: 'Xbox One',
//   abbrev: 'XboxOne'
// }});

// Console.findOrCreate({where: {
//   name: 'Arcade',
//   abbrev: 'Arcade'
// }});

// Console.findOrCreate({where: {
//   name: 'PC',
//   abbrev: 'PC'
// }});



module.exports = {
  database,
  User,
  Player,
  Document,
  Record,
  Console,
  Game,
  Article,
  Tag,
  DocumentRecord,
  DocumentTag,
  ConsoleGame,
  ArticleTag
};