// require("dotenv").config();
const path = require("path");
const fs = require("fs");

const {
  Items,
  Facultys,
  Departments,
  Buildings,
  Locations,
  Categorys,
  TypeItems,
  Profiles,
  UpDateStatuses,
  HistoryStatusItems,
} = require("../../model/index.model");

// async ==> await

// CREATE
const createItem = async (req, res) => {
  try {
    const name_image_item = req?.body?.images;
    /* name code status_item
     * facultyFId departmentDId buildingBId locationLId categoryCateId typeItemTypeId profilePfId
     */
    const profilePfId = await res.profilePfId;
    const {
      name,
      code,
      status_item,
      price,
      description,
      facultyFId,
      departmentDId,
      buildingBId,
      categoryCateId,
      locationLId,
      typeItemTypeId,
    } = req.body;

    const createItem = await Items.create({
      name: name,
      code: code,
      status_item: status_item,
      price: price,
      description: description,
      name_image_item: name_image_item ? name_image_item[0] : null,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
      buildingBId: buildingBId,
      categoryCateId: categoryCateId,
      locationLId: locationLId,
      typeItemTypeId: typeItemTypeId,
      profilePfId: profilePfId,
    });

    return res.send({ createItem });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// GET All
const getItem = async (req, res) => {
  // console.log(res.isAdmin);

  try {
    const user = await res.locals;
    let items;
    if (res.isAdmin) {
      items = await Items.findAll({
        include: [
          {
            model: Facultys,
          },
          {
            model: Departments,
          },
          {
            model: Buildings,
          },
          {
            model: Locations,
          },
          {
            model: Categorys,
          },
          {
            model: TypeItems,
          },
          {
            model: Profiles,
          },
          {
            model: UpDateStatuses,
          },
        ],
        order: [["item_id", "ASC"]],
      });
    } else {
      const userProfiles = await Profiles.findOne({
        where: { userUserId: user.user_id },
      });

      items = await Items.findAll({
        where: { departmentDId: userProfiles.departmentDId },
        include: [
          {
            model: Facultys,
          },
          {
            model: Departments,
          },
          {
            model: Buildings,
          },
          {
            model: Locations,
          },
          {
            model: Categorys,
          },
          {
            model: TypeItems,
          },
          {
            model: Profiles,
          },
          {
            model: UpDateStatuses,
          },
        ],
        order: [["item_id", "ASC"]],
      });
    }

    return res.send(items);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// UPDATE
const updateItem = async (req, res) => {
  const name_image = req?.body?.images;
  try {
    const item_id = req.params.id;
    const {
      name,
      code,
      // status_item,
      price,
      description,
      facultyFId,
      departmentDId,
      buildingBId,
      categoryCateId,
      // locationLId,
      typeitemTypeId,
      //
      nameImage_delete,
    } = req.body;

    // console.log("nameImage_delete = " + nameImage_delete);
    // console.log("name_image = " + name_image);

    const updateItem = await Items.update(
      {
        name: name,
        code: code,
        // status_item: status_item,
        price: price,
        description: description,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
        buildingBId: buildingBId,
        categoryCateId: categoryCateId,
        // locationLId: locationLId,
        typeitemTypeId: typeitemTypeId,
      },
      {
        where: {
          item_id: item_id,
        },
      }
    );
    //
    if (nameImage_delete) {
      let imagePath = path.resolve(
        "src/public/images/items/" + nameImage_delete
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        //console.log("delete", imagePath);
      }
    }
    if (name_image) {
      await Items.update(
        {
          name_image_item: name_image[0],
        },
        {
          where: {
            item_id: item_id,
          },
        }
      );
    }

    const Item = await Items.findOne({
      where: { item_id: item_id },
      include: [
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
        {
          model: Buildings,
        },
        {
          model: Locations,
        },
        {
          model: Categorys,
        },
        {
          model: TypeItems,
        },
        {
          model: Profiles,
        },
        {
          model: UpDateStatuses,
        },
      ],
      order: [["item_id", "ASC"]],
    });
    return res.send(Item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// DELETE
const deleteItem = async (req, res) => {
  try {
    const item_id = req.body.id;
    const item_name = req.body.name;
    const item = await Items.findOne({
      where: { item_id: item_id },
    });

    // console.log(item_name);
    // console.log(item.name_image_item);

    if (item_name === item?.name) {
      //
      if (item?.name_image_item) {
        let imagePath = path.resolve(
          "src/public/images/items/" + item?.name_image_item
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          //console.log("delete", imagePath);
        }
      }
      if (item?.name_image_damaged) {
        let imagePath = path.resolve(
          "src/public/images/items/" + item?.name_image_damaged
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          //console.log("delete", imagePath);
        }
      }
      //
      await HistoryStatusItems.destroy({
        where: {
          itemItemId: item_id,
        },
      });
      await UpDateStatuses.destroy({
        where: {
          itemItemId: item_id,
        },
      });
      await Items.destroy({
        where: {
          item_id: item_id,
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
  createItem: createItem,
  getItem: getItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
};
