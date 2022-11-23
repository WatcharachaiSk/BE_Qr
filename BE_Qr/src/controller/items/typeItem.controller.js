// require("dotenv").config();

const {
  TypeItems,
  Facultys,
  Departments,
  Categorys,
  Profiles,
} = require("../../model/index.model");

// name	code quantity	unit	price_unit
//total_price	purchase_date
//*   departmentDId	categoryCateId profilePfId

// Create
const createTypeItem = async (req, res) => {
  //console.log("res.profilePfId = " + res.profilePfId);
  const profilePfId = await res.profilePfId;
  try {
    const {
      name,
      code,
      quantity,
      unit,
      price_unit,
      total_price,
      purchase_date,
      departmentDId,
      categoryCateId,
    } = req.body;

    const createTypeItem = await TypeItems.create({
      name: name,
      code: code,
      quantity: quantity,
      unit: unit,
      price_unit: price_unit,
      total_price: total_price,
      purchase_date: purchase_date,
      departmentDId: departmentDId,
      categoryCateId: categoryCateId,
      profilePfId: profilePfId,
    });

    return res.send({ createTypeItem });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// GET ALL
const getTypeItem = async (req, res) => {
  try {
    const TypeItem = await TypeItems.findAll({
      include: [
        {
          model: Departments,
          attributes: ["d_id", "nameTH", "nameEN", "facultyFId"],
        },
        {
          model: Categorys,
          attributes: ["cate_id", "name"],
        },

        {
          model: Profiles,
          attributes: [
            "pf_id",
            "firstname",
            "lastname",
            "nickname",
            "telephone",
            "email",
            "userUserId",
            "facultyFId",
            "departmentDId",
          ],
        },
      ],
      order: [["type_id", "ASC"]],
    });

    return res.send(TypeItem);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// Update
const updateTypeItem = async (req, res) => {
  try {
    const type_id = req.params.id;
    const {
      name,
      code,
      quantity,
      unit,
      price_unit,
      total_price,
      purchase_date,
      departmentDId,
      categoryCateId,
    } = req.body;

    const updateTypeItem = await TypeItems.update(
      {
        name: name,
        code: code,
        quantity: quantity,
        unit: unit,
        price_unit: price_unit,
        total_price: total_price,
        purchase_date: purchase_date,
        departmentDId: departmentDId,
        categoryCateId: categoryCateId,
      },
      {
        where: {
          type_id: type_id,
        },
      }
    );
    return res.send({ updateTypeItem });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Delete
const deleteTypeItem = async (req, res) => {
  try {
    const type_id = req.body.id;

    await TypeItems.destroy({
      where: {
        type_id: type_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createTypeItem: createTypeItem,
  getTypeItem: getTypeItem,
  updateTypeItem: updateTypeItem,
  deleteTypeItem: deleteTypeItem,
};
