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

db.Facultys = require("./schema/faculty.js")(sequelize, Sequelize);
db.Departments = require("./schema/department.js")(sequelize, Sequelize);
db.Buildings = require("./schema/building.js")(sequelize, Sequelize);
db.Locations = require("./schema/locations.js")(sequelize, Sequelize);

const { Facultys, Departments, Buildings, Locations } = db;

Facultys.hasMany(Departments);
Departments.belongsTo(Facultys);

Departments.hasMany(Buildings);
Buildings.belongsTo(Departments);

Buildings.hasMany(Locations);
Locations.belongsTo(Buildings);

module.exports = db;
