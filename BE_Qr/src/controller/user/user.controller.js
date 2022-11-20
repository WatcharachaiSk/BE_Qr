require("dotenv").config();

const { Users } = require("../../model/index.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
const createUser = async (req, res) => {
  try {
    const { username, password, admin } = req.body;

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await Users.findOne({ username });
    // console.log("oldUser ", oldUser);
    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

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
        "web_token",
      ],
      order: [["user_id", "ASC"]],
    });

    // user
    return res.status(200).json(userSend);
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
      res.status(400).send("All input is required");
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
          expiresIn: "2h",
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
          "web_token",
        ],
        order: [["user_id", "ASC"]],
      });
      // save user token
      userSend.web_token = token;
      // user
      return res.status(200).json(userSend);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "user_id",
        "username",
        "user_status",
        "admin",
        "createdAt",
        "updatedAt",
      ],
      order: [["user_id", "ASC"]],
    });
    return res.send({ status: 1, data: users });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password, user_status, admin } = req.body;

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
    return res.send({ status: 1, msg: "updated success" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  updateUser: updateUser,
  loginUser: loginUser,
};
