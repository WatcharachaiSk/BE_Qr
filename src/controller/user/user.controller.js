require("dotenv").config();
const path = require("path");
const fs = require("fs");

const {
  Users,
  Profiles,
  Facultys,
  Departments,
} = require("../../model/index.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      admin,
      firstname,
      lastname,
      nickname,
      telephone,
      email,
      facultyFId,
      departmentDId,
    } = req.body;
    // console.log(req.body.images);
    const name_image = req?.body?.images;
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ where: { username: username } });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // username	password	user_status	admin
    //authentication_token	web_token
    const user = await Users.create({
      username: username,
      password: encryptedPassword,
      user_status: true,
      admin: admin,
    });

    // Create token autToken for App
    const autToken = jwt.sign(
      { user_id: user.user_id, username, admin: user.admin },
      process.env.TOKEN_KEY
    );
    const updateUser = await Users.update(
      {
        authentication_token: autToken,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );

    const userSend = await Users.findOne({
      where: { user_id: user.user_id },
      attributes: [
        "user_id",
        "username",
        "user_status",
        "admin",
        "createdAt",
        "updatedAt",
        "authentication_token",
        // "web_token",
      ],
      order: [["user_id", "ASC"]],
    });
    const createProfile = await Profiles.create({
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      telephone: telephone,
      email: email.toLowerCase(),
      name_image: name_image ? name_image[0] : null,
      userUserId: userSend.user_id,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
    });
    // user
    return res.status(200).json({ userSend, createProfile });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
//updateUserProfile
const updateUserProfile = async (req, res) => {
  try {
    const { pf_id } = req.body;
    // console.log(req.body.images);
    const name_image = req?.body?.images;

    const profile = await Profiles.findOne({
      where: {
        pf_id: pf_id,
      },
    });
    // Dle Photo Profile
    if (profile.name_image) {
      let imagePath = path.resolve(
        "src/public/images/profiles/" + profile.name_image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        //console.log("delete", imagePath);
      }
    }

    //
    await Profiles.update(
      {
        name_image: name_image[0],
      },
      {
        where: {
          pf_id: pf_id,
        },
      }
    );
    // user
    return res
      .status(200)
      .json({ status: 1, msg: "updateUserProfile success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
//login
const loginUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;
    //console.log("username = " + username + " password " + password);
    // // Validate user input
    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Users.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.user_id, username, admin: user.admin },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      
      const autToken = jwt.sign(
        { user_id: user.user_id, username, admin: user.admin },
        process.env.TOKEN_KEY
      );
      await Users.update(
        {
          authentication_token: autToken,
        },
        {
          where: {
            user_id: user.user_id,
          },
        }
      );



      const userSend = await Users.findOne({
        where: { user_id: user.user_id },
        include: [
          {
            model: Profiles,
          },
        ],
        order: [["user_id", "ASC"]],
      });


      // user
      const profiles = await Profiles.findOne({
        where: { userUserId: userSend.user_id },
        attributes: [
          "firstname",
          "lastname",
          "nickname",
          "telephone",
          "email",
          "name_image",
          "createdAt",
          "facultyFId",
          "departmentDId",
        ],
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
        order: [["pf_id", "ASC"]],
      });
      // save user token
      profiles.user.web_token = token;
      return res.status(200).json(profiles);
    }
    return res.status(404).send("Invalid Credentials");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const profiles = await Profiles.findAll({
      include: [
        {
          model: Users,
          attributes: [
            "username",
            "user_status",
            "admin",
            "createdAt",
            "updatedAt",
          ],
        },
        {
          model: Facultys,
        },
        {
          model: Departments,
        },
      ],
      order: [["pf_id", "ASC"]],
    });

    return res.send(profiles);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const name_image = req?.body?.images;
  try {
    const userId = req.params.userId;
    const {
      username,
      password,
      admin,
      user_status,
      firstname,
      lastname,
      nickname,
      telephone,
      email,
      facultyFId,
      departmentDId,
      //
      nameImage_delete,
    } = req.body;

    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
      const updateUser = await Users.update(
        {
          username: username,
          password: encryptedPassword,
          user_status: user_status,
          admin: admin,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
    } else {
      const updateUser = await Users.update(
        {
          username: username,
          user_status: user_status,
          admin: admin,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
    }

    //  name_image: name_image ? name_image[0] : null,

    const updateProfile = await Profiles.update(
      {
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        telephone: telephone,
        email: email.toLowerCase(),
        facultyFId: facultyFId,
        departmentDId: departmentDId,
      },
      {
        where: {
          userUserId: userId,
        },
      }
    );

    if (nameImage_delete) {
      let imagePath = path.resolve(
        "src/public/images/profiles/" + nameImage_delete
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        //console.log("delete", imagePath);
      }
    }

    if (name_image) {
      await Profiles.update(
        {
          name_image: name_image[0],
        },
        {
          where: {
            userUserId: userId,
          },
        }
      );
    }

    return res.send({ status: 1, msg: "updated success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateUserBlock = async (req, res) => {
  try {
    // const isAdmin = res.isAdmin;
    const { user_id, user_status } = req.body;
    await Users.update(
      {
        user_status: user_status,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );

    return res.send({ status: 1, msg: "updateUserBlock success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  updateUser: updateUser,
  loginUser: loginUser,
  updateUserBlock: updateUserBlock,
  updateUserProfile: updateUserProfile,
};
