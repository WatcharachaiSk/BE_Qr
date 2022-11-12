require("dotenv").config();

const { Users } = require("../../model/index.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      nickname,
      telephone,
      email,
      university,
      faculty,
      department,
      admin,
    } = req.body;

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await Users.findOne({ username });
    // console.log("oldUser ", oldUser);
    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username: username,
      password: encryptedPassword,
      user_status: true,
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      telephone: telephone,
      email: email.toLowerCase(),
      university: university,
      faculty: faculty,
      department: department,
      admin: admin,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user.user_id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    const autToken = jwt.sign(
      { user_id: user.user_id, username },
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

    // save user token
    user.web_token = token;

    return res.send({ user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//login
const loginUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.user_id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.web_token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
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
    const username = req.body.username;
    const password = req.body.password;

    const updateUser = await Users.update(
      {
        username: username,
        password: password,
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
