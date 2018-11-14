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
  username: {type: Sequelize.STRING, unique: true},
  realname: Sequelize.STRING
}, {
  freezeTableName: true
});

Player.sync({force: false});

// ~~~~ //
// User //
// ~~~~ //

const User = database.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true},
}, {
  freezeTableName: true
});

User.belongsTo(Player);

User.sync({force: false});

// ~~~~~~~ //
// Console //
// ~~~~~~~ //

const Console = database.define('console', {
  name: Sequelize.STRING,
  abbrev: Sequelize.STRING
}, {
  freezeTableName: true
});

Console.sync({force: false});

// ~~~~ //
// Game //
// ~~~~ //

const Game = database.define('game', {
  title: Sequelize.STRING,
  abbrev: Sequelize.STRING,
  releaseDate: Sequelize.DATEONLY
}, {
  freezeTableName: true
});

Game.sync({force: false});

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = database.define('document', {
  type: Sequelize.STRING,
  title: Sequelize.STRING,
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
  type: Sequelize.STRING,
  mark: Sequelize.DECIMAL,
  platform: Sequelize.STRING,
  version: Sequelize.STRING,
  region: Sequelize.STRING,
  verified: Sequelize.BOOLEAN,
  venue: Sequelize.STRING,
  date: Sequelize.DATE,
  vodurl: Sequelize.STRING,
  isMilestone: Sequelize.BOOLEAN,
  tooltipNote: Sequelize.STRING,
  labelText: Sequelize.STRING,
  detailedText: Sequelize.TEXT
}, {
  freezeTableName: true
});

Record.belongsTo(Player);
Record.belongsTo(Console);
Record.belongsTo(Game);

Record.sync({force: false});

// ~~~~~~~ //
// Article //
// ~~~~~~~ //

const Article = database.define('article', {
  title: Sequelize.STRING
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
  name: Sequelize.STRING,
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


Game.findOrCreate({where: {
  title: 'Mega Man 2',
  abbrev: 'mm2',
  releaseDate: Date.UTC(1988, 11, 24),
}});

Game.findOrCreate({where: {
  title: 'Donkey Kong',
  abbrev: 'dk',
  releaseDate: Date.UTC(1981, 6, 9)
}});

Console.findOrCreate({where: {
  name: 'Nintendo Entertainment System',
  abbrev: 'NES'
}});


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