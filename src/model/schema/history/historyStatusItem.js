module.exports = (sequelize, Sequelize) => {
  const historyStatusItem = sequelize.define(
    "history_status_items",
    {
      hs_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      note: {
        type: Sequelize.STRING,
      },
      updater_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return historyStatusItem;
};
