require("dotenv").config();

const { Items } = require("../../model/index.model");

// CREATE
const createItem = async (req, res) => {
  try {
    /* name code status_item	
  facultyFId departmentDId buildingBId categoryCateId	typeItemTypeId */
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
// GET
const getItem = async (req, res) => {
  try {
    const Item = await Items.findAll({
      order: [["item_id", "ASC"]],
    });
    return res.send({ status: 1, data: Item });
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
