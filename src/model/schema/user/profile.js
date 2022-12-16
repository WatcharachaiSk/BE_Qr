module.exports = (sequelize, Sequelize) => {
  const profile = sequelize.define(
    "profiles",
    {
      pf_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING(50),
      },
      lastname: {
        type: Sequelize.STRING(50),
      },
      nickname: {
        type: Sequelize.STRING(30),
      },
      telephone: {
        type: Sequelize.STRING(15),
      },
      email: {
        type: Sequelize.STRING(50),
      },
      name_image: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return profile;
};
