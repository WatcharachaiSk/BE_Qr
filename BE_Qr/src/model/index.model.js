const Sequelize = require("sequelize");

const {
  username_db,
  password_db,
  host_db,
  database_name,
} = require("../config/config.js");

const sequelize = new Sequelize(database_name, username_db, password_db, {
  dialect: "mysql",
  host: host_db,
  charset: "utf8",
  collate: "utf8_general_ci",
  operatorsAliaces: 0,
  timezone: "+07:00",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./schema/user.js")(sequelize, Sequelize);
module.exports = db;
