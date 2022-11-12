const express = require("express");
const router = express.Router();
const UserController = require("../controller/user/user.controller");
const FacultyController = require("../controller/locations/faculty.controller");
const DepartmentController = require("../controller/locations/department.controller");
const BuildingController = require("../controller/locations/building.controller");
const LocationController = require("../controller/locations/location.controller");

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

//Department
router.post("/createDepartment", DepartmentController.createDepartment);
router.get("/getDepartment", DepartmentController.getDepartment);
router.put("/updateDepartment/:id", DepartmentController.updateDepartment);
router.post("/deleteDepartment", DepartmentController.deleteDepartment);

//Building
router.post("/createBuilding", BuildingController.createBuilding);
router.get("/getBuilding", BuildingController.getBuilding);
router.put("/updateBuilding/:id", BuildingController.updateBuilding);
router.post("/deleteBuilding", BuildingController.deleteBuilding);

//Location
router.post("/createLocation", LocationController.createLocation);
router.get("/getLocation", LocationController.getLocation);
router.put("/updateLocation/:id", LocationController.updateLocation);
router.post("/deleteLocation", LocationController.deleteLocation);

module.exports = router;
