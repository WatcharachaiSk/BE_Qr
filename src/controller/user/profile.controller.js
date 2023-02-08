require("dotenv").config();

const {
  Profiles,
  Facultys,
  Departments,
  Users,
} = require("../../model/index.model");
// const jwt = require("jsonwebtoken");

// Create
const createProfile = async (req, res) => {
  // firstname	lastname	nickname	telephone	email
  //	userUserId	facultyFId	departmentDId4;
  // console.log(res.profileId);
  const userUserId = await res.locals.user_id;
  // console.log(res.locals.user_id);

  try {
    const {
      firstname,
      lastname,
      nickname,
      telephone,
      email,
      facultyFId,
      departmentDId,
    } = req.body;

    const createProfile = await Profiles.create({
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      telephone: telephone,
      email: email.toLowerCase(),
      userUserId: userUserId,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
    });

    return res.send({ createProfile });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// GET
const getProfile = async (req, res) => {
  // console.log(res.locals);
  const userUserId = res?.locals?.user_id;
  try {
    const Profile = await Profiles.findOne({
      where: {
        userUserId: userUserId,
      },
      include: [
        {
          model: Users,
          attributes: [
            "username",
            "user_status",
            "admin",
            "createdAt",
            "updatedAt",
            "authentication_token",
            "web_token",
          ],
        },
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
      ],
    });
    return res.send(Profile);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Update
const updateProfile = async (req, res) => {
  try {
    const pf_id = req.params.id;
    const {
      firstname,
      lastname,
      nickname,
      telephone,
      email,
      userUserId,
      facultyFId,
      departmentDId,
    } = req.body;

    const updateProfile = await Profiles.update(
      {
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        telephone: telephone,
        email: email,
        userUserId: userUserId,
        facultyFId: facultyFId,
        departmentDId: departmentDId,
      },
      {
        where: {
          pf_id: pf_id,
        },
      }
    );
    return res.send({ updateProfile });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Delete
const deleteProfile = async (req, res) => {
  try {
    const pf_id = req.body.id;

    await Profiles.destroy({
      where: {
        pf_id: pf_id,
      },
    });
    return res.send({ status: 1, msg: "delete success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createProfile: createProfile,
  getProfile: getProfile,
  updateProfile: updateProfile,
  deleteProfile: deleteProfile,
};
