// require("dotenv").config();

const {
  TypeItems,
  Facultys,
  Departments,
  Categorys,
  Profiles,
  Items,
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
    const user = await res.locals;
    let TypeItem;
    if (res.isAdmin) {
      TypeItem = await TypeItems.findAll({
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
          {
            model: Items,
          },
        ],
        order: [["type_id", "ASC"]],
      });
    } else {
      const userProfiles = await Profiles.findOne({
        where: { userUserId: user.user_id },
      });

      TypeItem = await TypeItems.findAll({
        where: { departmentDId: userProfiles.departmentDId },
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
          {
            model: Items,
          },
        ],
        order: [["type_id", "ASC"]],
      });
    }

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

// Update
const updateTypeItemByOne = async (req, res) => {
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

    const typeItem = await TypeItems.findOne({
      where: { type_id: type_id },
    });

    const updateTypeItem = await TypeItems.update(
      {
        name: name ? name : typeItem.name,
        code: code ? code : typeItem.code,
        quantity: quantity ? quantity : typeItem.quantity,
        unit: unit ? unit : typeItem.unit,
        price_unit: price_unit ? price_unit : typeItem.price_unit,
        total_price: total_price ? total_price : typeItem.total_price,
        purchase_date: purchase_date ? purchase_date : typeItem.purchase_date,
        departmentDId: departmentDId ? departmentDId : typeItem.departmentDId,
        categoryCateId: categoryCateId
          ? categoryCateId
          : typeItem.categoryCateId,
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
  updateTypeItemByOne: updateTypeItemByOne,
  deleteTypeItem: deleteTypeItem,
};
