module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    "categorys",
    {
      cate_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return category;
};
