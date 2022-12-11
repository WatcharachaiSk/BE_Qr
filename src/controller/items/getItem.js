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

// GET All
const getItemById = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findOne({
      where: { item_id: id },
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

const getItemByCategoryID = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { categoryCateId: id },
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
const getItemByTypeID = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { typeItemTypeId: id },
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

const getItemByFty_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { facultyFId: id },
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

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByDpm_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { departmentDId: id },
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

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByBud_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { buildingBId: id },
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

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getItemByLocat_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { locationLId: id },
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

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = {
  getItemById: getItemById,
  getItemByCategoryID: getItemByCategoryID,
  getItemByTypeID: getItemByTypeID,
  getItemByFty_Id: getItemByFty_Id,
  getItemByDpm_Id: getItemByDpm_Id,
  getItemByBud_Id: getItemByBud_Id,
  getItemByLocat_Id:getItemByLocat_Id
};
