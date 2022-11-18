require("dotenv").config();

const { Categorys } = require("../../model/index.model");

// Create
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const createCategory = await Categorys.create({
      name: name,
    });

    return res.send({ createCategory });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// Get
const getCategory = async (req, res) => {
  try {
    const Category = await Categorys.findAll({
      order: [["cate_id", "ASC"]],
    });
    return res.send({ status: 1, data: Category });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// Update
const updateCategory = async (req, res) => {
  try {
    const cate_id = req.params.id;
    const { name } = req.body;

    const updateCategory = await Categorys.update(
      {
        name: name,
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
};
