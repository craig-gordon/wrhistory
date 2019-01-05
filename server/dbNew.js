const Sequelize = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const database = new Sequelize('recordhistorynew', 'recordhistory', 'z94;cEB4o', {
  host: 'recordhistorynew.cz20nttxnlai.us-east-2.rds.amazonaws.com',
  port: 5433,
  define: {
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    hooks: {
      beforeDestroy: function(queryOptions) {
        console.log('beforeDestroy queryOptions', queryOptions);
      },
      // beforeBulkDestroy: function(queryOptions) {
      //   return new Promise((resolve, reject) => {
      //     this.findAll({
      //       where: queryOptions.where,
      //       include: [{all: true}]
      //     })
      //       .then(instances => {
      //         console.log('instances[0].get():', instances[0].get());
      //         console.log('associations:', this.associations);
      //         let allInstancesToBeUpdated = [];
      //         for (var key in instances[0]) {

      //         }
      //         // console.log('getGames:', instances[0].getGameVersions());
      //         resolve();
      //       })
      //       .catch(err => console.log('Error in beforeBulkDestroy findAll:', err));
      //   });
      // },
      beforeUpdate: function(instance) {
        console.log('beforeUpdate instance:', instance);
      },
      beforeBulkUpdate: function(instance) {
        console.log('beforeBulkUpdate instance:', instance);
      }
    }
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

// ~~~~~~~~~~~~ //
// Game Version //
// ~~~~~~~~~~~~ //

const GameVersion = database.define('game_version', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.STRING
  },
  isOriginal: {
    type: Sequelize.BOOLEAN,
    field: 'is_original'
  }
});

Platform.belongsToMany(Game, {through: 'game_version'});
Game.belongsToMany(Platform, {through: 'game_version'})

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
  variablesOptions: {
    type: Sequelize.JSONB,
    field: 'variables_options'
  },
  siteEndpoint: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'site_endpoint'
  }
});

Document.belongsTo(Player);
Player.hasMany(Document);

Document.belongsTo(Game);
Game.hasMany(Document);

Document.belongsTo(Level);
Level.hasMany(Document);

// ~~~~~~ //
// Record //
// ~~~~~~ //

const Record = database.define('record', {
  type: {
    type: Sequelize.ENUM('time', 'score'),
    allowNull: false
  },
  pbOrWr: {
    type: Sequelize.ENUM('pb', 'wr'),
    allowNull: false,
    field: 'pb_or_wr'
  },
  mark: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  totalMilliseconds: {
    type: Sequelize.VIRTUAL(Sequelize.BIGINT, ['type', 'mark']),
    get() {
      return this.get('type') === 'time' ? this.get('mark') : null;
    }
  },
  score: {
    type: Sequelize.VIRTUAL(Sequelize.BIGINT, ['type', 'mark']),
    get() {
      return this.get('type') === 'score' ? this.get('mark') : null;
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  vodUrl: {
    type: Sequelize.STRING,
    field: 'vod_url'
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
  },
  isMilestone: {
    type: Sequelize.BOOLEAN,
    field: 'is_milestone'
  },
  variables: {
    type: Sequelize.JSONB
  }
});

Record.belongsTo(Player);
Player.hasMany(Record);

Record.belongsTo(GameVersion, {foreignKey: 'game_version_id'});
GameVersion.hasMany(Record, {foreignKey: 'game_version_id'});

Record.belongsTo(Document);
Document.hasMany(Record);

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

DocumentVersion.belongsTo(User, {foreignKey: 'updater_id'});
User.hasMany(DocumentVersion, {foreignKey: 'updater_id'});



database.authenticate()
  .then(() => {
    console.log('Successfully connected to RH Test database.');
    return database.sync({ force: true });
  })
  .then(() => {
    console.log('Synced Sequelize models with the database.');
  })
  .catch(err => {
    console.error('Unable to connect to RH Test database:', err);
  });



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