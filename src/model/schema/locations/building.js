module.exports = (sequelize, Sequelize) => {
  const building = sequelize.define(
    "buildings",
    {
      b_id: {
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
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return building;
};
