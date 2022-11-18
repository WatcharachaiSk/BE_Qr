const express = require("express");
const router = express.Router();
const UserController = require("../controller/user/user.controller");
const FacultyController = require("../controller/locations/faculty.controller");
const DepartmentController = require("../controller/locations/department.controller");
const BuildingController = require("../controller/locations/building.controller");
const LocationController = require("../controller/locations/location.controller");
const CategoryController = require("../controller/items/category.controller");
const TypeItemController = require("../controller/items/typeItem.controller");
const ItemController = require("../controller/items/item.controller");

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

// Category
router.post("/createCategory", CategoryController.createCategory);
router.get("/getCategory", CategoryController.getCategory);
router.put("/updateCategory/:id", CategoryController.updateCategory);
router.post("/deleteCategory", CategoryController.deleteCategory);

// TypeItems
router.post("/createTypeItem", TypeItemController.createTypeItem);
router.get("/getTypeItem", TypeItemController.getTypeItem);
router.put("/updateTypeItem/:id", TypeItemController.updateTypeItem);
router.post("/deleteTypeItem", TypeItemController.deleteTypeItem);

// Item
router.post("/createItem", ItemController.createItem);
router.get("/getItem", ItemController.getItem);
router.put("/updateItem/:id", ItemController.updateItem);
router.post("/deleteItem", ItemController.deleteItem);

module.exports = router;
