const Sequelize = require('sequelize');
const fs = require('fs');

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  define: {
    underscored: true,
    freezeTableName: true
  },
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(__dirname + '/../rds-combined-ca-bundle.pem')
    }
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false,
  language: 'en'
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
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING
  }
});

Player.sync({force: false});

// ~~~~ //
// User //
// ~~~~ //

const User = database.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  profileUrl: {
    type: Sequelize.STRING,
    unique: true,
    field: 'profile_url'
  }
});

User.belongsTo(Player);
Player.hasOne(User);

User.sync({force: false});

// ~~~~~~~~ //
// Platform //
// ~~~~~~~~ //

const Platform = database.define('platform', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  abbrev: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
    field: 'release_date'
  },
  description: {
    type: Sequelize.TEXT
  }
});

Platform.sync({force: false});

// ~~~~ //
// Game //
// ~~~~ //

const Game = database.define('game', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  abbrev: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'release_date'
  },
  coverImageUri: {
    type: Sequelize.STRING,
    unique: true,
    field: 'cover_image_uri'
  },
  longDescription: {
    type: Sequelize.TEXT,
    field: 'long_description'
  },
  shortDescription: {
    type: Sequelize.STRING,
    field: 'short_description'
  }
});

Game.sync({force: false});

// ~~~~~~~~~~~~ //
// Game Version //
// ~~~~~~~~~~~~ //

const GameVersion = database.define('game_version', {
  isOriginal: {
    type: Sequelize.BOOLEAN,
    field: 'is_original'
  },
  description: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.STRING
  }
});

Platform.belongsToMany(Game, {through: 'game_version'});
Game.belongsToMany(Platform, {through: 'game_version'})

GameVersion.sync({force: false});

// ~~~~~ //
// Level //
// ~~~~~ //

const Level = database.define('level', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  longDescription: {
    type: Sequelize.TEXT,
    field: 'long_description'
  },
  shortDescription: {
    type: Sequelize.STRING,
    field: 'short_description'
  }
});

Level.belongsTo(Game);
Game.hasMany(Level);

Level.sync({force: false});

// ~~~~~~~~ //
// Document //
// ~~~~~~~~ //

const Document = database.define('document', {
  type: {
    type: Sequelize.ENUM('speedrun', 'highscore', 'general'),
    allowNull: false
  },
  categoryName: {
    type: Sequelize.STRING,
    field: 'category_name'
  },
  categoryDescription: {
    type: Sequelize.TEXT,
    field: 'category_description'
  },
  categoryRules: {
    type: Sequelize.TEXT,
    field: 'category_rules'
  },
  leaderboardUrl: {
    type: Sequelize.STRING,
    field: 'leaderboard_url'
  },
  attributesOptions: {
    type: Sequelize.JSONB,
    field: 'attributes_options'
  },
  siteEndpoint: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'site_endpoint'
  }
});

Document.belongsTo(Game);
Game.hasMany(Document);

Document.belongsTo(Level);
Level.hasMany(Document);

Document.sync({force: false});

// ~~~~~~ //
// Record //
// ~~~~~~ //

const Record = database.define('record', {
  type: {
    type: Sequelize.ENUM('time', 'score'),
    allowNull: false
  },
  mark: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  score: {
    type: Sequelize.VIRTUAL(Sequelize.BIGINT, ['type', 'mark']),
    get() {
      return this.get('type') === 'score' ? this.get('mark') : null;
    }
  },
  totalMilliseconds: {
    type: Sequelize.VIRTUAL(Sequelize.BIGINT, ['type', 'mark']),
    get() {
      return this.get('type') === 'time' ? this.get('mark') : null;
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  attributes: {
    type: Sequelize.JSONB
  },
  vodUrl: {
    type: Sequelize.STRING,
    field: 'vod_url'
  },
  isMilestone: {
    type: Sequelize.BOOLEAN,
    field: 'is_milestone'
  },
  labelText: {
    type: Sequelize.STRING,
    field: 'label_text'
  },
  tooltipNote: {
    type: Sequelize.STRING,
    field: 'tooltip_note'
  },
  detailedText: {
    type: Sequelize.TEXT,
    field: 'detailed_text'
  }
});

Record.belongsTo(Player);
Player.hasMany(Record);

Record.belongsTo(GameVersion);
GameVersion.hasMany(Record);

Record.belongsTo(Document);
Document.hasMany(Record);

Record.sync({force: false});

// ~~~~~ //
// Event //
// ~~~~~ //

const Event = database.define('event', {
  type: {
    type: Sequelize.ENUM('rule change', 'new glitch', 'new strategy', 'paradigm shift', 'other event'),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'start_date'
  },
  endDate: {
    type: Sequelize.DATE,
    field: 'end_date'
  },
  labelText: {
    type: Sequelize.STRING,
    field: 'label_text'
  },
  tooltipNote: {
    type: Sequelize.STRING,
    field: 'tooltip_note'
  },
  detailedText: {
    type: Sequelize.TEXT,
    field: 'detailed_text'
  }
});

Event.belongsTo(Player);
Player.hasMany(Event);

Event.belongsTo(Document);
Document.hasMany(Event);

Event.belongsTo(Game);
Game.hasMany(Event);

Event.belongsTo(Level);
Level.hasMany(Event);

Event.sync({force: false});

// ~~~~~~~~~~~~~~~~ //
// Document Version //
// ~~~~~~~~~~~~~~~~ //

const DocumentVersion = database.define('document_version', {
  data: {
    type: Sequelize.JSONB,
    allowNull: false
  }
}, {
  createdAt: 'timestamp'
});

DocumentVersion.belongsTo(Document);
Document.hasMany(DocumentVersion);

DocumentVersion.belongsTo(User, {as: 'updater'});
User.hasMany(DocumentVersion, {as: 'updater'});

DocumentVersion.sync({force: false});


module.exports = {
  database,
  Player,
  User,
  Platform,
  Game,
  GameVersion,
  Level,
  Document,
  Record,
  Event,
  DocumentVersion
};