const Sequelize = require("sequelize");

const config = require("../config/config.json").development;

const db = {};

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, config);

db.sequelize = sequelize;

db.User = require("./user");
db.Calander = require("./calander");

db.User.init(sequelize);
db.Calander.init(sequelize);

db.User.associate(db);
db.Calander.associate(db);

module.exports = db;
