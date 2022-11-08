const { Users } = require("../model/index.model");

const createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const create = await Users.create({
      username: username,
      password: password,
      user_status: true,
    });

    return res.send({ status: 1, msg: "created success" });
  } catch (err) {
    return res.status(500).send(err.message);
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
};
