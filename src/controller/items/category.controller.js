require("dotenv").config();

const {
  Categorys,
  Items,
  Profiles,
  Departments,
} = require("../../model/index.model");

// Create
const createCategory = async (req, res) => {
  try {
    const { name, departmentDId } = req.body;

    const createCategory = await Categorys.create({
      name: name,
      departmentDId: departmentDId,
    });

    return res.send({ createCategory });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// Get
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await res.locals;
    let Category;
    if (res.isAdmin) {
      if (id) {
        Category = await Categorys.findOne({
          where: { cate_id: id },
          include: [
            {
              model: Items,
            },
            {
              model: Departments,
            },
          ],
          order: [["cate_id", "ASC"]],
        });
      } else {
        Category = await Categorys.findAll({
          include: [
            {
              model: Items,
              // attributes: ["item_id", "name"],
            },
            {
              model: Departments,
            },
          ],
          order: [["cate_id", "ASC"]],
        });
      }
    } else {
      const userProfiles = await Profiles.findOne({
        where: { userUserId: user.user_id },
      });
      Category = await Categorys.findAll({
        where: {
          departmentDId: userProfiles.departmentDId,
        },
        include: [
          {
            model: Items,
            // attributes: ["item_id", "name"],
          },
          {
            model: Departments,
          },
        ],
        order: [["cate_id", "ASC"]],
      });
    }

    return res.send(Category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getCategoryByDpm_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await res.locals;
    let Category;
    if (res.isAdmin) {
      Category = await Categorys.findAll({
        where: { departmentDId: id },
        include: [
          {
            model: Items,
          },
          {
            model: Departments,
          },
        ],
        order: [["cate_id", "ASC"]],
      });
    } else {
      const userProfiles = await Profiles.findOne({
        where: { userUserId: user.user_id },
      });
      Category = await Categorys.findAll({
        where: {
          departmentDId: userProfiles.departmentDId,
        },
        include: [
          {
            model: Items,
            // attributes: ["item_id", "name"],
          },
          {
            model: Departments,
          },
        ],
        order: [["cate_id", "ASC"]],
      });
    }

    return res.send(Category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// Update
const updateCategory = async (req, res) => {
  try {
    const cate_id = req.params.id;
    const { name, departmentDId } = req.body;

    const updateCategory = await Categorys.update(
      {
        name: name,
        departmentDId: departmentDId,
      },
      {
        where: {
          cate_id: cate_id,
        },
      }
    );
    return res.send({ updateCategory });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const cate_id = req.body.id;

    await Categorys.destroy({
      where: {
        cate_id: cate_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createCategory: createCategory,
  getCategory: getCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  getCategoryByDpm_Id: getCategoryByDpm_Id,
};
