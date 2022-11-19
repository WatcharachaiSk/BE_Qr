const express = require("express");
const router = express.Router();
const UserController = require("../controller/user/user.controller");
const ProfileController = require("../controller/user/profile.controller");
const FacultyController = require("../controller/locations/faculty.controller");
const DepartmentController = require("../controller/locations/department.controller");
const BuildingController = require("../controller/locations/building.controller");
const LocationController = require("../controller/locations/location.controller");
const CategoryController = require("../controller/items/category.controller");
const TypeItemController = require("../controller/items/typeItem.controller");
const ItemController = require("../controller/items/item.controller");
const auth = require("../middleware/auth");
const checkProfile = require("../controller/user/checkProfile");
const getIdProfile = require("../components/userIdProfile");

// test
router.post("/welcome", auth, (req, res) => {
  console.log(res.locals.user_id, res.locals.amdin);
  // console.log(res.locals);
  res
    .status(200)
    .send("Welcome 🙌 " + res.locals.user_id + " " + res.locals.amdin);
});

//User
router.post("/createUser", UserController.createUser);
router.post("/loginUser", UserController.loginUser);
router.get("/getUsers", auth, UserController.getUsers);
router.put("/updateUser/:userId", auth, UserController.updateUser);

// Profile
router.post(
  "/createProfile",
  auth,
  checkProfile,
  ProfileController.createProfile
);
router.get("/getProfile", auth, ProfileController.getProfile);
router.put("/updateProfile/:id", auth, ProfileController.updateProfile);
router.post("/deleteProfile", auth, ProfileController.deleteProfile);

//Faculty
router.post("/createFaculty", auth, FacultyController.createFaculty);
router.get("/getFaculty", auth, FacultyController.getFaculty);
router.put("/updateFaculty/:f_id", auth, FacultyController.updateFaculty);
router.post("/deleteFaculty/:id", auth, FacultyController.deleteFaculty);

//Department
router.post("/createDepartment", auth, DepartmentController.createDepartment);
router.get("/getDepartment", auth, DepartmentController.getDepartment);
router.put(
  "/updateDepartment/:id",
  auth,
  DepartmentController.updateDepartment
);
router.post("/deleteDepartment", auth, DepartmentController.deleteDepartment);

//Building
router.post("/createBuilding", auth, BuildingController.createBuilding);
router.get("/getBuilding", auth, BuildingController.getBuilding);
router.put("/updateBuilding/:id", auth, BuildingController.updateBuilding);
router.post("/deleteBuilding", auth, BuildingController.deleteBuilding);

//Location
router.post("/createLocation", auth, LocationController.createLocation);
router.get("/getLocation", auth, LocationController.getLocation);
router.put("/updateLocation/:id", auth, LocationController.updateLocation);
router.post("/deleteLocation", auth, LocationController.deleteLocation);

// Category
router.post("/createCategory", auth, CategoryController.createCategory);
router.get("/getCategory", auth, CategoryController.getCategory);
router.put("/updateCategory/:id", auth, CategoryController.updateCategory);
router.post("/deleteCategory", auth, CategoryController.deleteCategory);

// TypeItems
router.post(
  "/createTypeItem",
  auth,
  getIdProfile,
  TypeItemController.createTypeItem
);
router.get("/getTypeItem", auth, TypeItemController.getTypeItem);
router.put("/updateTypeItem/:id", auth, TypeItemController.updateTypeItem);
router.post("/deleteTypeItem", auth, TypeItemController.deleteTypeItem);

// Item
router.post("/createItem", auth, getIdProfile, ItemController.createItem);
router.get("/getItem", auth, ItemController.getItem);
router.put("/updateItem/:id", auth, ItemController.updateItem);
router.post("/deleteItem", auth, ItemController.deleteItem);

module.exports = router;
