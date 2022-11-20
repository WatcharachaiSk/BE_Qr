require("dotenv").config();

const { Facultys } = require("../../model/index.model");
const { Departments } = require("../../model/index.model");
const { Buildings } = require("../../model/index.model");
const { Locations } = require("../../model/index.model");

const createLocation = async (req, res) => {
  try {
    const { nameTH, nameEN, floor, facultyFId, departmentDId, buildingBId } =
      req.body;

    const createLocation = await Locations.create({
      nameTH: nameTH,
      nameEN: nameEN,
      floor: floor,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
      buildingBId: buildingBId,
    });

    return res.send({ createLocation });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getLocation = async (req, res) => {
  try {
    const Location = await Locations.findAll({
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
      ],

      order: [["l_id", "ASC"]],
    });
    return res.send(Location);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateLocation = async (req, res) => {
  try {
    const l_id = req.params.id;
    const { nameTH, nameEN, buildingBId } = req.body;

    const updateLocation = await Locations.update(
      {
        nameTH: nameTH,
        nameEN: nameEN,
        buildingBId: buildingBId,
      },
      {
        where: {
          l_id: l_id,
        },
      }
    );
    return res.send({ updateLocation });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteLocation = async (req, res) => {
  try {
    const l_id = req.body.id;

    await Locations.destroy({
      where: {
        l_id: l_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createLocation: createLocation,
  getLocation: getLocation,
  updateLocation: updateLocation,
  deleteLocation: deleteLocation,
};
