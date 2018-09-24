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

// ~~~~ //
// Game //
// ~~~~ //

const Game = database.define('game', {
  title: Sequelize.STRING,
  abbrev: Sequelize.STRING,
  releasedate: Sequelize.DATEONLY,
  coverimage: Sequelize.STRING
}, {
  freezeTableName: true
});

Game.sync({force: false});

// ~~~~~ //
// Topic //
// ~~~~~ //

const Topic = database.define('topic', {
  name: Sequelize.STRING,
  abbrev: Sequelize.STRING,
}, {
  freezeTableName: true
});

Topic.sync({force: false});

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = database.define('document', {
  type: Sequelize.STRING,
  title: Sequelize.STRING,
  category: Sequelize.STRING,
  leaderboardurl: Sequelize.STRING
}, {
  freezeTableName: true
});

Document.belongsTo(Game);
Document.belongsTo(Topic);

Document.sync({force: false});

// ~~~~~~ //
// Record //
// ~~~~~~ //

const Record = database.define('record', {
  type: Sequelize.STRING,
  mark: Sequelize.INTEGER,
  verified: Sequelize.BOOLEAN,
  venue: Sequelize.STRING,
  date: Sequelize.DATE,
  vodurl: Sequelize.STRING,
  ismilestone: Sequelize.BOOLEAN,
  note: Sequelize.STRING,
  detailed: Sequelize.TEXT,
  version: Sequelize.STRING
}, {
  freezeTableName: true
});

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

// ~~~~~~~~ //
// Platform //
// ~~~~~~~~ //

const Platform = database.define('platform', {
  name: Sequelize.STRING
}, {
  freezeTableName: true
});

Platform.sync({force: false});

// ~~~ //
// Tag //
// ~~~ //

const Tag = database.define('tag', {
}, {
  freezeTableName: true
});

Tag.belongsTo(Game);
Tag.belongsTo(Topic);

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

// ~~~~~~~~~~~~~~~~~ //
// Platform / Record //
// ~~~~~~~~~~~~~~~~~ //

const PlatformRecord = database.define('platformrecord', {
}, {
  freezeTableName: true
});

Platform.belongsToMany(Record, {through: 'platformrecord'});
Record.belongsToMany(Platform, {through: 'platformrecord'});

PlatformRecord.sync({force: false});

// ~~~~~~~~~~~~~~~ //
// Platform / Game //
// ~~~~~~~~~~~~~~~ //

const PlatformGame = database.define('platformgame', {
}, {
  freezeTableName: true
});

Platform.belongsToMany(Game, {through: 'platformgame'});
Game.belongsToMany(Platform, {through: 'platformgame'})

PlatformGame.sync({force: false});

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



module.exports = {
  database,
  User,
  Player,
  Document,
  Record,
  Game,
  Topic,
  Article,
  Platform,
  Tag,
  DocumentRecord,
  PlatformRecord,
  PlatformGame,
  ArticleTag
};