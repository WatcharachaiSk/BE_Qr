const path = require("path");
const fs = require("fs");

const {
  Items,
  ImgItems,
  HistoryStatusItems,
  ImgItemDamageds,
} = require("../../../model/index.model");

const createImgItems = async (req, res) => {
  try {
    const name_image_item = req?.body?.images;
    /* name code status_item
     * facultyFId departmentDId buildingBId locationLId categoryCateId typeItemTypeId profilePfId
     */
    // const profilePfId = await res.profilePfId;
    const { itemItemId } = req.body;

    const createItem = await ImgItems.create({
      name_image_item: name_image_item ? name_image_item[0] : null,
      itemItemId: itemItemId,
    });

    await Items.update(
      {
        name_image_item: name_image_item ? name_image_item[0] : null,
      },
      {
        where: { item_id: itemItemId },
      }
    );

    const item = await Items.findOne({
      where: { item_id: itemItemId },
      include: [
        {
          model: ImgItems,
          attributes: ["imgItem_Id", "name_image_item", "itemItemId"],
        },
      ],
    });

    return res.send({ item });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// DELETE
const deleteImgItems = async (req, res) => {
  try {
    const { name_image_item } = req.body;

    const imgItems = await ImgItems.findOne({
      where: { name_image_item: name_image_item },
    });
    const imgItemsAll = await ImgItems.findAll({
      where: { itemItemId: imgItems.itemItemId },
    });

    const item = await Items.findOne({
      where: { item_id: imgItems.itemItemId },
    });

    // console.log(name_image_item);
    // console.log(imgItems.name_image_item);

    if (name_image_item === imgItems?.name_image_item) {
      //
      if (imgItems?.name_image_item) {
        let imagePath = path.resolve(
          "src/public/images/items/" + imgItems?.name_image_item
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          //console.log("d elete", imagePath);
        }
      }

      if (item.name_image_item == name_image_item)
        if (imgItemsAll.length > 1) {
          await Items.update(
            {
              name_image_item: imgItemsAll[0].name_image_item,
            },
            {
              where: { item_id: imgItems.itemItemId },
            }
          );
        } else {
          await Items.update(
            {
              name_image_item: null,
            },
            {
              where: { item_id: imgItems.itemItemId },
            }
          );
        }

      //
      await ImgItems.destroy({
        where: {
          name_image_item: name_image_item,
        },
      });
    } else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }

    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteImgItemsDamaged = async (req, res) => {
  try {
    const { name_image_item_damaged } = req.body;

    //
    const hitItem = await ImgItemDamageds.findOne({
      where: { name_image_item_damaged: name_image_item_damaged },
    });

    // console.log(name_image_item);
    // console.log(imgItems.name_image_item);
    if (name_image_item_damaged === hitItem?.name_image_item_damaged) {
      //
      if (hitItem?.name_image_item_damaged) {
        let imagePath = path.resolve(
          "src/public/images/damaged/" + hitItem?.name_image_item_damaged
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          //console.log("d elete", imagePath);
        }
      }
      // const imgItems = await ImgItems.findOne({
      //   where: { item_id: hitItem.itemItemId },
      // });

      await Items.update(
        {
          name_image_damaged: null,
        },
        {
          where: { item_id: hitItem.itemItemId },
        }
      );
      await ImgItemDamageds.destroy({
        where: {
          imgItemDm_id: hitItem.imgItemDm_id,
        },
      });
    } else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }

    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createImgItems: createImgItems,
  deleteImgItems: deleteImgItems,
  deleteImgItemsDamaged: deleteImgItemsDamaged,
};
