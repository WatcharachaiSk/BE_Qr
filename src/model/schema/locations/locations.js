module.exports = (sequelize, Sequelize) => {
  const location = sequelize.define(
    "locations",
    {
      l_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nameTH: {
        type: Sequelize.STRING(50),
      },
      nameEN: {
        type: Sequelize.STRING(50),
      },
      floor: {
        type: Sequelize.INTEGER(20),
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return location;
};
