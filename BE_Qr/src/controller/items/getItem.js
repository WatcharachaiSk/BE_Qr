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

module.exports = {
  getItemById: getItemById,
  getItemByCategoryID: getItemByCategoryID,
};
