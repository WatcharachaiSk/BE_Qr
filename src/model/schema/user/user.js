module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(30),
      },
      password: {
        type: Sequelize.STRING,
      },
      user_status: {
        type: Sequelize.BOOLEAN,
      },
      admin: {
        type: Sequelize.BOOLEAN,
      },
      authentication_token: {
        type: Sequelize.STRING,
      },
      web_token: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return user;
};
