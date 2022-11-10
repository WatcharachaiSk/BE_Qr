const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller.js");

router.post("/createUser", UserController.createUser);
router.post("/loginUser", UserController.loginUser);
router.get("/getUsers", UserController.getUsers);
router.put("/updateUser/:userId", UserController.updateUser);

module.exports = router;
