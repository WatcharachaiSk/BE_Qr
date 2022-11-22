module.exports = (sequelize, Sequelize) => {
  const item = sequelize.define(
    "items",
    {
      item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING(50),
      },
      status_item: {
        type: Sequelize.BOOLEAN(1),
      },
      update_Stetus_Id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return item;
};
