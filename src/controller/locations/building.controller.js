require("dotenv").config();

const {
  Facultys,
  Profiles,
  Departments,
  Buildings,
} = require("../../model/index.model");

const createBuilding = async (req, res) => {
  try {
    const { nameTH, nameEN, facultyFId, departmentDId } = req.body;

    const createBuilding = await Buildings.create({
      nameTH: nameTH,
      nameEN: nameEN,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
    });

    return res.send({ createBuilding });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getBuilding = async (req, res) => {
  try {
    let isAdmin = res.isAdmin;
    const user = await res.locals;

    if (isAdmin) {
      const Building = await Buildings.findAll({
        include: [
          {
            model: Facultys,
          },
          {
            model: Departments,
          },
        ],
        order: [["b_id", "ASC"]],
      });
      if (Building) return res.send(Building);
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

      const Building = await Buildings.findAll({
        where: { departmentDId: userProfiles.departmentDId },
        include: [
          {
            model: Facultys,
          },
          {
            model: Departments,
          },
        ],
        order: [["b_id", "ASC"]],
      });
      if (Building) return res.send(Building);
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
const getBuildingBy_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Building = await Buildings.findOne({
      where: { b_id: id },
      include: [
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
      ],
      order: [["b_id", "ASC"]],
    });
    if (Building) return res.send(Building);
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

const getBuildingByFty_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Building = await Buildings.findAll({
      where: { facultyFId: id },
      include: [
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
      ],
      order: [["b_id", "ASC"]],
    });
    if (Building) return res.send(Building);
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

const getBuildingByDpm_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const Building = await Buildings.findAll({
      where: { departmentDId: id },
      include: [
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
      ],
      order: [["b_id", "ASC"]],
    });
    if (Building) return res.send(Building);
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

const updateBuilding = async (req, res) => {
  try {
    const b_id = req.params.id;
    const { nameTH, nameEN, departmentDId, facultyFId } = req.body;

    const updateBuilding = await Buildings.update(
      {
        nameTH: nameTH,
        nameEN: nameEN,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
      },
      {
        where: {
          b_id: b_id,
        },
      }
    );
    return res.send({ updateBuilding });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const b_id = req.body.id;

    await Buildings.destroy({
      where: {
        b_id: b_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createBuilding: createBuilding,
  getBuilding: getBuilding,
  getBuildingBy_Id: getBuildingBy_Id,
  updateBuilding: updateBuilding,
  deleteBuilding: deleteBuilding,
  getBuildingByDpm_Id: getBuildingByDpm_Id,
  getBuildingByFty_Id: getBuildingByFty_Id,
};
