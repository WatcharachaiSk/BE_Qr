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
db.Facultys = require("./schema/locations/faculty.js")(sequelize, Sequelize);
db.Departments = require("./schema/locations/department.js")(
  sequelize,
  Sequelize
);
db.Buildings = require("./schema/locations/building.js")(sequelize, Sequelize);
db.Locations = require("./schema/locations/locations.js")(sequelize, Sequelize);
// Item
db.Categorys = require("./schema/item/category.js")(sequelize, Sequelize);
db.TypeItems = require("./schema/item/typeItem")(sequelize, Sequelize);
db.Items = require("./schema/item/item.js")(sequelize, Sequelize);
// Update Item
db.HistoryStatusItems = require("./schema/history/historyStatusItem")(
  sequelize,
  Sequelize
);
db.UpDateStatuses = require("./schema/history/upDateStatuses")(
  sequelize,
  Sequelize
);

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
  HistoryStatusItems,
  UpDateStatuses,
} = db;

// Users
Users.hasMany(Profiles);
Profiles.belongsTo(Users);
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

// Categorys
Departments.hasMany(Categorys);
Categorys.belongsTo(Departments);

// TypeItems
Departments.hasMany(TypeItems);
Categorys.hasMany(TypeItems);
Profiles.hasMany(TypeItems);
TypeItems.belongsTo(Profiles);
TypeItems.belongsTo(Categorys);
TypeItems.belongsTo(Departments);

// Items
Facultys.hasMany(Items);
Departments.hasMany(Items);
Buildings.hasMany(Items);
Categorys.hasMany(Items);
Locations.hasMany(Items);
TypeItems.hasMany(Items);
Profiles.hasMany(Items);
Items.belongsTo(Profiles);
Items.belongsTo(TypeItems);
Items.belongsTo(Categorys);
Items.belongsTo(Facultys);
Items.belongsTo(Departments);
Items.belongsTo(Buildings);
Items.belongsTo(Locations);

// History Item UpdateItem
Items.hasMany(HistoryStatusItems);
Locations.hasMany(HistoryStatusItems);
HistoryStatusItems.belongsTo(Items);
HistoryStatusItems.belongsTo(Locations);
// Update
Items.hasMany(UpDateStatuses);
Locations.hasMany(UpDateStatuses);
UpDateStatuses.belongsTo(Items);
UpDateStatuses.belongsTo(Locations);

module.exports = db;
