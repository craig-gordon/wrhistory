const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false
});

sequelize
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

const Player = sequelize.define('player', {
  username: {type: Sequelize.STRING, unique: true},
  realname: Sequelize.STRING
});

Player.sync({force: true});

// ~~~~ //
// User //
// ~~~~ //

const User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true},
});

User.belongsTo(Player);

User.sync({force: true});

// ~~~~ //
// Game //
// ~~~~ //

const Game = sequelize.define('game', {
  title: Sequelize.STRING,
  abbrev: Sequelize.STRING,
  releasedate: Sequelize.DATEONLY,
  coverimage: Sequelize.STRING
});

Game.sync({force: true});

// ~~~~~ //
// Topic //
// ~~~~~ //

const Topic = sequelize.define('topic', {
  name: Sequelize.STRING,
  abbrev: Sequelize.STRING,
});

Topic.sync({force: true});

console.log('after Topic model definition');

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = sequelize.define('document', {
  type: Sequelize.STRING,
  title: Sequelize.STRING,
  category: Sequelize.STRING,
  leaderboardurl: Sequelize.STRING
});

Document.belongsTo(Game);
Document.belongsTo(Topic);

Document.sync({force: true});

console.log('after Document model definition');

// ~~~~~~ //
// Record //
// ~~~~~~ //

const Record = sequelize.define('record', {
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
});

Record.belongsTo(Game);

Record.sync({force: true});

console.log('after Record model definition');

// ~~~~~~~ //
// Article //
// ~~~~~~~ //

const Article = sequelize.define('article', {
  title: Sequelize.STRING
});

Article.belongsTo(Player);
Article.belongsTo(User);

Article.sync({force: true});

console.log('after Article model definition');

// ~~~~~~~~ //
// Platform //
// ~~~~~~~~ //

const Platform = sequelize.define('platform', {
  name: Sequelize.STRING
});

Platform.sync({force: true});

// ~~~ //
// Tag //
// ~~~ //

const Tag = sequelize.define('tag', {
});

Tag.belongsTo(Game);
Tag.belongsTo(Topic);

Tag.sync({force: true});

console.log('before all join table definitions');

// ~~~~~~~~~~~~~~~~~ //
// Document / Record //
// ~~~~~~~~~~~~~~~~~ //

const DocumentRecord = sequelize.define('documentrecord', {
});

Document.belongsToMany(Record, {through: 'documentrecord'});
Record.belongsToMany(Document, {through: 'documentrecord'});

DocumentRecord.sync({force: true});

// ~~~~~~~~~~~~~~~~~ //
// Platform / Record //
// ~~~~~~~~~~~~~~~~~ //

const PlatformRecord = sequelize.define('platformrecord', {
});

Platform.belongsToMany(Record, {through: 'platformrecord'});
Record.belongsToMany(Platform, {through: 'platformrecord'});

PlatformRecord.sync({force: true});

// ~~~~~~~~~~~~~~~ //
// Platform / Game //
// ~~~~~~~~~~~~~~~ //

const PlatformGame = sequelize.define('key', {
});

Platform.belongsToMany(Game, {through: 'platformgame'});
Game.belongsToMany(Platform, {through: 'platformgame'})

PlatformGame.sync({force: true});

// ~~~~~~~~~~~~~ //
// Article / Tag //
// ~~~~~~~~~~~~~ //

const ArticleTag = sequelize.define('articletag', {
});

Article.belongsToMany(Tag, {through: 'articletag'});
Tag.belongsToMany(Article, {through: 'articletag'});

ArticleTag.sync({force: true});

console.log('after all Model definitions');


module.exports = {
  sequelize,
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