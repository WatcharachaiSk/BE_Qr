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
// User
db.Users = require("./schema/user/user.js")(sequelize, Sequelize);
db.Profiles = require("./schema/user/profile.js")(sequelize, Sequelize);

// Locations
db.Facultys = require("./schema/faculty.js")(sequelize, Sequelize);
db.Departments = require("./schema/department.js")(sequelize, Sequelize);
db.Buildings = require("./schema/building.js")(sequelize, Sequelize);
db.Locations = require("./schema/locations.js")(sequelize, Sequelize);
// Item
db.Categorys = require("./schema/category.js")(sequelize, Sequelize);
db.TypeItems = require("./schema/item/typeItem")(sequelize, Sequelize);
db.Items = require("./schema/item/item.js")(sequelize, Sequelize);

const {
  Users,
  Profiles,
  Facultys,
  Departments,
  Buildings,
  Locations,
  Categorys,
  TypeItems,
  Items,
} = db;

// Users
Users.hasMany(Profiles);
Profiles.hasMany(Users);
Facultys.hasMany(Profiles);
Departments.hasMany(Profiles);
Profiles.belongsTo(Facultys);
Profiles.belongsTo(Departments);

// Departments
Facultys.hasMany(Departments);
Departments.belongsTo(Facultys);

// Buildings
Facultys.hasMany(Buildings);
Departments.hasMany(Buildings);
Buildings.belongsTo(Facultys);
Buildings.belongsTo(Departments);

// Locations
Facultys.hasMany(Locations);
Departments.hasMany(Locations);
Buildings.hasMany(Locations);
Locations.belongsTo(Facultys);
Locations.belongsTo(Departments);
Locations.belongsTo(Buildings);

// TypeItems
Categorys.hasMany(TypeItems);
TypeItems.belongsTo(Categorys);

// Items
Categorys.hasMany(Items);
TypeItems.hasMany(Items);
Items.belongsTo(TypeItems);
Items.belongsTo(Categorys);

module.exports = db;
