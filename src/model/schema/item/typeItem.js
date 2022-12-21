module.exports = (sequelize, Sequelize) => {
  const typeItem = sequelize.define(
    "typeitems",
    {
      type_id: {
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
      quantity: {
        type: Sequelize.INTEGER(10),
      },
      unit: {
        type: Sequelize.STRING(10),
      },
      price_unit: {
        type: Sequelize.INTEGER(10),
      },
      total_price: {
        type: Sequelize.INTEGER(10),
      },
      purchase_date: {
        type: Sequelize.DATE,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return typeItem;
};
