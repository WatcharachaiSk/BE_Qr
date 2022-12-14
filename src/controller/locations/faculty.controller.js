require("dotenv").config();

const { Facultys } = require("../../model/index.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const createFaculty = async (req, res) => {
  try {
    const { nameTH, nameEN } = req.body;

    const createFaculty = await Facultys.create({
      nameTH: nameTH,
      nameEN: nameEN,
    });

    return res.send({ createFaculty });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getFaculty = async (req, res) => {
  try {
    const Faculty = await Facultys.findAll({
      order: [["f_id", "ASC"]],
    });
    return res.send(Faculty);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
//
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const Faculty = await Facultys.findOne({
      where: { f_id: id },
    });
    return res.send(Faculty);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
//
const updateFaculty = async (req, res) => {
  try {
    const f_id = req.params.f_id;
    const { nameTH, nameEN } = req.body;

    const updateFaculty = await Facultys.update(
      {
        nameTH: nameTH,
        nameEN: nameEN,
      },
      {
        where: {
          f_id: f_id,
        },
      }
    );
    return res.send({ updateFaculty });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const f_id = req.body.id;

    await Facultys.destroy({
      where: {
        f_id: f_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createFaculty: createFaculty,
  getFaculty: getFaculty,
  getFacultyById: getFacultyById,
  updateFaculty: updateFaculty,
  deleteFaculty: deleteFaculty,
};
