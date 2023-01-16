const path = require("path");
const fs = require("fs");

const { Items, ImgItems } = require("../../../model/index.model");

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
          //console.log("delete", imagePath);
        }
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

module.exports = {
  createImgItems: createImgItems,
  deleteImgItems: deleteImgItems,
};
