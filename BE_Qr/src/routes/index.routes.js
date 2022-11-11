const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller.js");
const FacultyController = require("../controller/faculty.controller");

//User
router.post("/createUser", UserController.createUser);
router.post("/loginUser", UserController.loginUser);
router.get("/getUsers", UserController.getUsers);
router.put("/updateUser/:userId", UserController.updateUser);

//Faculty
router.post("/createFaculty", FacultyController.createFaculty);
router.get("/getFaculty", FacultyController.getFaculty);
router.put("/updateFaculty/:f_id", FacultyController.updateFaculty);
router.post("/deleteFaculty/:id", FacultyController.deleteFaculty);

module.exports = router;
