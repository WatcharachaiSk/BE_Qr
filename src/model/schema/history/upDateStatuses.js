module.exports = (sequelize, Sequelize) => {
  const upDateStatuses = sequelize.define(
    "up_date_statuses",
    {
      updateSt_id: {
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
      inspected_at: {
        type: Sequelize.DATE,
      },
    },
    {
      createdAt: false,
      // upadteAt: false,
      // timestamp: false,
    }
  );
  return upDateStatuses;
};
