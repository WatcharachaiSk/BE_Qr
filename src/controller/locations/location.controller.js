require("dotenv").config();

const { Facultys } = require("../../model/index.model");
const { Departments } = require("../../model/index.model");
const { Buildings } = require("../../model/index.model");
const { Locations,Profiles } = require("../../model/index.model");

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
    let isAdmin = res.isAdmin;
    const user = await res.locals;
    // console.log(isAdmin);
    if (isAdmin) {
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

      if (Location) return res.send(Location);
      else {
        return res.status(404).send({
          status: "404",
          error: "Not Found",
        });
      }
    } else {
      const userProfiles = await Profiles.findOne({
        where: { userUserId: user.user_id },
      });
      console.log(userProfiles);
      const Location = await Locations.findAll({
        where: { departmentDId: userProfiles.departmentDId },
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

      if (Location) return res.send(Location);
      else {
        return res.status(404).send({
          status: "404",
          error: "Not Found",
        });
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getLocationBy_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Location = await Locations.findOne({
      where: { l_id: id },
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

    if (Location) return res.send(Location);
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
const getLocationByFty_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Location = await Locations.findAll({
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
      ],

      order: [["l_id", "ASC"]],
    });
    if (Location) return res.send(Location);
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
const getLocationByDpm_Id = async (req, res) => {
  const { id } = req.params;

  try {
    const Location = await Locations.findAll({
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
      ],

      order: [["l_id", "ASC"]],
    });
    if (Location) return res.send(Location);
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
const getLocationByBud_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Location = await Locations.findAll({
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
      ],

      order: [["l_id", "ASC"]],
    });
    if (Location) return res.send(Location);
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

const updateLocation = async (req, res) => {
  try {
    const l_id = req.params.id;
    const { nameTH, nameEN, floor, facultyFId, departmentDId, buildingBId } =
      req.body;

    const updateLocation = await Locations.update(
      {
        nameTH: nameTH,
        nameEN: nameEN,
        floor: floor,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
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
  getLocationBy_Id: getLocationBy_Id,
  updateLocation: updateLocation,
  deleteLocation: deleteLocation,
  getLocationByFty_Id: getLocationByFty_Id,
  getLocationByDpm_Id: getLocationByDpm_Id,
  getLocationByBud_Id: getLocationByBud_Id,
};
