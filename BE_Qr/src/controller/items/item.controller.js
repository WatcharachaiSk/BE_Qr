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
} = require("../../model/index.model");

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
  try {
    const Item = await Items.findAll({
      include: [
        {
          model: Facultys,
          // attributes: ["f_id", "nameTH", "nameEN"],
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
      ],
      order: [["item_id", "ASC"]],
    });
    return res.send(Item);
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
      status_item,
      facultyFId,
      departmentDId,
      buildingBId,
      categoryCateId,
      locationLId,
      typeItemTypeId,
    } = req.body;

    const updateItem = await Items.update(
      {
        name: name,
        code: code,
        status_item: status_item,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
        buildingBId: buildingBId,
        categoryCateId: categoryCateId,
        locationLId: locationLId,
        typeItemTypeId: typeItemTypeId,
      },
      {
        where: {
          item_id: item_id,
        },
      }
    );
    return res.send({ updateItem });
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
