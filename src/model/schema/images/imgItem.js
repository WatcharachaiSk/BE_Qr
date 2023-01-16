module.exports = (sequelize, Sequelize) => {
  const imgItem = sequelize.define(
    "img_items",
    {
      imgItem_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name_image_item: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return imgItem;
};
