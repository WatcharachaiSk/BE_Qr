// require("dotenv").config();

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
} = require("../../model/index.model");

// async ==> await

// CREATE
const createItem = async (req, res) => {
  try {
    /* name code status_item
     * facultyFId departmentDId buildingBId locationLId categoryCateId typeItemTypeId profilePfId
     */
    const profilePfId = await res.profilePfId;
    const {
      name,
      code,
      status_item,
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
  try {
    const item_id = req.params.id;
    const {
      name,
      code,
      // status_item,
      facultyFId,
      departmentDId,
      buildingBId,
      categoryCateId,
      // locationLId,
      typeItemTypeId,
    } = req.body;

    const updateItem = await Items.update(
      {
        name: name,
        code: code,
        // status_item: status_item,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
        buildingBId: buildingBId,
        categoryCateId: categoryCateId,
        // locationLId: locationLId,
        typeItemTypeId: typeItemTypeId,
      },
      {
        where: {
          item_id: item_id,
        },
      }
    );
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

    await Items.destroy({
      where: {
        item_id: item_id,
      },
    });
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
