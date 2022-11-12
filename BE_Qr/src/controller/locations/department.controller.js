require("dotenv").config();

const { Departments } = require("../../model/index.model");
const { Facultys } = require("../../model/index.model");

const createDepartment = async (req, res) => {
  try {
    // const f_id = req.params.id;
    const { nameTH, nameEN, facultyFId } = req.body;

    const createDepartment = await Departments.create({
      nameTH: nameTH,
      nameEN: nameEN,
      facultyFId: facultyFId,
    });

    return res.send({ createDepartment });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getDepartment = async (req, res) => {
  try {
    const Department = await Departments.findAll({
      include: [
        {
          model: Facultys,
        },
      ],
      order: [["d_id", "ASC"]],
    });
    return res.send({ status: 1, data: Department });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const d_id = req.params.id;
    const { nameTH, nameEN, facultyFId } = req.body;

    const updateDepartment = await Departments.update(
      {
        nameTH: nameTH,
        nameEN: nameEN,
        facultyFId: facultyFId,
      },
      {
        where: {
          d_id: d_id,
        },
      }
    );
    return res.send({ updateDepartment });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const d_id = req.body.id;

    await Departments.destroy({
      where: {
        d_id: d_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createDepartment: createDepartment,
  getDepartment: getDepartment,
  updateDepartment: updateDepartment,
  deleteDepartment: deleteDepartment,
};
