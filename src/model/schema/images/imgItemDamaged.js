module.exports = (sequelize, Sequelize) => {
  const imgItemDamageds = sequelize.define(
    "img_items_damageds",
    {
      imgItemDm_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name_image_item_damaged: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: true,
      upadteAt: true,
      timestamp: true,
    }
  );
  return imgItemDamageds;
};
