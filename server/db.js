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
}, {
  freezeTableName: true
});

Player.sync({force: true});

// ~~~~ //
// User //
// ~~~~ //

const User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true},
}, {
  freezeTableName: true
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
}, {
  freezeTableName: true
});

Game.sync({force: true});

// ~~~~~ //
// Topic //
// ~~~~~ //

const Topic = sequelize.define('topic', {
  name: Sequelize.STRING,
  abbrev: Sequelize.STRING,
}, {
  freezeTableName: true
});

Topic.sync({force: true});

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = sequelize.define('document', {
  type: Sequelize.STRING,
  title: Sequelize.STRING,
  category: Sequelize.STRING,
  leaderboardurl: Sequelize.STRING
}, {
  freezeTableName: true
});

Document.belongsTo(Game);
Document.belongsTo(Topic);

Document.sync({force: true});

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
}, {
  freezeTableName: true
});

Record.belongsTo(Game);

Record.sync({force: true});

// ~~~~~~~ //
// Article //
// ~~~~~~~ //

const Article = sequelize.define('article', {
  title: Sequelize.STRING
}, {
  freezeTableName: true
});

Article.belongsTo(Player);
Article.belongsTo(User);

Article.sync({force: true});

// ~~~~~~~~ //
// Platform //
// ~~~~~~~~ //

const Platform = sequelize.define('platform', {
  name: Sequelize.STRING
}, {
  freezeTableName: true
});

Platform.sync({force: true});

// ~~~ //
// Tag //
// ~~~ //

const Tag = sequelize.define('tag', {
}, {
  freezeTableName: true
});

Tag.belongsTo(Game);
Tag.belongsTo(Topic);

Tag.sync({force: true});

// ~~~~~~~~~~~~~~~~~ //
// Document / Record //
// ~~~~~~~~~~~~~~~~~ //

const DocumentRecord = sequelize.define('documentrecord', {
}, {
  freezeTableName: true
});

Document.belongsToMany(Record, {through: 'documentrecord'});
Record.belongsToMany(Document, {through: 'documentrecord'});

DocumentRecord.sync({force: true});

// ~~~~~~~~~~~~~~~~~ //
// Platform / Record //
// ~~~~~~~~~~~~~~~~~ //

const PlatformRecord = sequelize.define('platformrecord', {
}, {
  freezeTableName: true
});

Platform.belongsToMany(Record, {through: 'platformrecord'});
Record.belongsToMany(Platform, {through: 'platformrecord'});

PlatformRecord.sync({force: true});

// ~~~~~~~~~~~~~~~ //
// Platform / Game //
// ~~~~~~~~~~~~~~~ //

const PlatformGame = sequelize.define('platformgame', {
}, {
  freezeTableName: true
});

Platform.belongsToMany(Game, {through: 'platformgame'});
Game.belongsToMany(Platform, {through: 'platformgame'})

PlatformGame.sync({force: true});

// ~~~~~~~~~~~~~ //
// Article / Tag //
// ~~~~~~~~~~~~~ //

const ArticleTag = sequelize.define('articletag', {
}, {
  freezeTableName: true
});

Article.belongsToMany(Tag, {through: 'articletag'});
Tag.belongsToMany(Article, {through: 'articletag'});

ArticleTag.sync({force: true});



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