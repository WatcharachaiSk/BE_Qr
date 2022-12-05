const express = require("express");
const router = express.Router();
// * controller
const UserController = require("../controller/user/user.controller");
const ProfileController = require("../controller/user/profile.controller");
const FacultyController = require("../controller/locations/faculty.controller");
const DepartmentController = require("../controller/locations/department.controller");
const BuildingController = require("../controller/locations/building.controller");
const LocationController = require("../controller/locations/location.controller");
const CategoryController = require("../controller/items/category.controller");
const TypeItemController = require("../controller/items/typeItem.controller");
const ItemController = require("../controller/items/item.controller");
const HistoryStItemController = require("../controller/history/historyStItem.controller");
const GetItem = require("../controller/items/getItem");
const GetByIdType = require("../controller/items/components/getByIdType");

// *  = (req, res, next) =>{ }
const auth = require("../middleware/auth");
const checkProfile = require("../controller/user/checkProfile");
const getIdProfile = require("../components/userIdProfile");
const verifyIsAdmin = require("../components/verify/verifyIsAdmin");
const verifyIsAdminGet = require("../components/verify/verifyIsAdminGet");

// test
router.post("/welcome", auth, (req, res) => {
  // console.log(res.locals.user_id, res.locals.amdin);
  // console.log(res.locals);
  res
    .status(200)
    .send("Welcome 🙌 " + res.locals.user_id + " " + res.locals.amdin);
});

//User
router.post("/createUser", UserController.createUser);
router.post("/loginUser", UserController.loginUser);
router.get("/getUsers", auth, verifyIsAdmin, UserController.getUsers);
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
router.get(
  "/getDepartmentByFtyId/:id",
  auth,
  DepartmentController.getDepartmentByFty_Id
);
router.get(
  "/getDepartmentById/:id",
  auth,
  DepartmentController.getDepartmentBy_Id
);
router.put(
  "/updateDepartment/:id",
  auth,
  DepartmentController.updateDepartment
);
router.post("/deleteDepartment", auth, DepartmentController.deleteDepartment);

//Building
router.post("/createBuilding", auth, BuildingController.createBuilding);
router.get("/getBuilding", auth, BuildingController.getBuilding);
router.get(
  "/getBuildingByDpmId/:id",
  auth,
  BuildingController.getBuildingByDpm_Id
);
router.put("/updateBuilding/:id", auth, BuildingController.updateBuilding);
router.post("/deleteBuilding", auth, BuildingController.deleteBuilding);

//Location
router.post("/createLocation", auth, LocationController.createLocation);
router.get("/getLocation", auth, LocationController.getLocation);
router.get(
  "/getLocationByBudId/:id",
  auth,
  LocationController.getLocationByBud_Id
);
router.put("/updateLocation/:id", auth, LocationController.updateLocation);
router.post("/deleteLocation", auth, LocationController.deleteLocation);

// Category
router.post("/createCategory", auth, CategoryController.createCategory);
router.get("/getCategory", auth, verifyIsAdminGet, CategoryController.getCategory);
router.put("/updateCategory/:id", auth, CategoryController.updateCategory);
router.post("/deleteCategory", auth, CategoryController.deleteCategory);

// TypeItems
router.post(
  "/createTypeItem",
  auth,
  getIdProfile,
  TypeItemController.createTypeItem
);
router.get(
  "/getTypeItem",
  auth,
  verifyIsAdminGet,
  TypeItemController.getTypeItem
);
router.get("/getTypeItemByDpmId/:id", auth, GetByIdType.getTypeItemByDpmId);

router.put("/updateTypeItem/:id", auth, TypeItemController.updateTypeItem);
router.post("/deleteTypeItem", auth, TypeItemController.deleteTypeItem);

// Item
router.post("/createItem", auth, getIdProfile, ItemController.createItem);
router.get("/getItem", auth, verifyIsAdminGet, ItemController.getItem);
router.get("/getItem/:id", auth, GetItem.getItemById);
router.get("/getItemCategory/:id", auth, GetItem.getItemByCategoryID);
router.get("/getItemByTypeID/:id", auth, GetItem.getItemByTypeID);
router.put("/updateItem/:id", auth, ItemController.updateItem);
router.post("/deleteItem", auth, ItemController.deleteItem);

// HistoryStItem
router.get(
  "/getHistoryStatusItem",
  auth,
  HistoryStItemController.getHistoryStItem
);
router.get(
  "/getHistoryStatusItem/:id",
  auth,
  HistoryStItemController.getHistoryStItemByItemId
);
router.post(
  "/updateStetus",
  auth,
  getIdProfile,
  HistoryStItemController.updateStetus
);

module.exports = router;
