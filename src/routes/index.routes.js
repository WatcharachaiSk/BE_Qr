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

const ImgItemsController = require("../controller/items/imgItem/img_item.controller");

const HistoryStItemController = require("../controller/history/historyStItem.controller");
const GetItem = require("../controller/items/getItem");
const GetByIdType = require("../controller/items/components/getByIdType");
// *  = (req, res, next) =>{ }
const auth = require("../middleware/auth");
const checkProfile = require("../controller/user/checkProfile");
const getIdProfile = require("../components/userIdProfile");
const verifyIsAdmin = require("../components/verify/verifyIsAdmin");
const verifyIsAdminGet = require("../components/verify/verifyIsAdminGet");

const uploadController = require("../controller/multer/multer");
const deleteImage = require("../controller/multer/deleteImage");

router.post(
  "/multiple_upload",
  uploadController.uploadImages,
  uploadController.resizeImagesItem,
  uploadController.getResult,

  (req, res) => {
    // console.log(req.body.images);
    return res.send(req.body.images);
  }
);

router.post("/deleteImageItem", deleteImage.deleteImageItem);
router.post("/deleteImageProfile", deleteImage.deleteImageProfile);

// test
router.get("/checkToken", auth, (req, res) => {
  res.status(200).send("Welcome");
});

//User
router.post("/createUser", UserController.createUser);
router.post(
  "/updateUserBlock",
  auth,
  verifyIsAdmin,
  UserController.updateUserBlock
);

//
router.post(
  "/createUserPhoto",
  uploadController.uploadImages,
  uploadController.resizeImagesProfile,
  uploadController.getResult,
  UserController.createUser
);
router.post(
  "/updateUserProfile",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImagesProfile,
  uploadController.getResult,
  UserController.updateUserProfile
);
//
router.post("/loginUser", UserController.loginUser);
router.get("/getUsers", auth, verifyIsAdmin, UserController.getUsers);
router.put(
  "/updateUser/:userId",
  auth,
  verifyIsAdmin,
  UserController.updateUser
);
//
router.put(
  "/updateUserPhoto/:userId",
  auth,
  verifyIsAdmin,
  uploadController.uploadImages,
  uploadController.resizeImagesProfile,
  uploadController.getResult,
  UserController.updateUser
);

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
router.get("/getFaculty/:id", auth, FacultyController.getFacultyById);
router.put("/updateFaculty/:f_id", auth, FacultyController.updateFaculty);
router.post("/deleteFaculty", auth, FacultyController.deleteFaculty);

//Department
router.post("/createDepartment", auth, DepartmentController.createDepartment);
router.get(
  "/getDepartment",
  auth,
  verifyIsAdminGet,
  DepartmentController.getDepartment
);
router.get(
  "/getDepartmentByFtyId/:id",
  auth,
  DepartmentController.getDepartmentByFty_Id
);
router.get("/getDepartment/:id", auth, DepartmentController.getDepartmentBy_Id);
router.put(
  "/updateDepartment/:id",
  auth,
  DepartmentController.updateDepartment
);
router.post("/deleteDepartment", auth, DepartmentController.deleteDepartment);

//Building
router.post("/createBuilding", auth, BuildingController.createBuilding);
router.get(
  "/getBuilding",
  auth,
  verifyIsAdminGet,
  BuildingController.getBuilding
);
router.get("/getBuilding/:id", auth, BuildingController.getBuildingBy_Id);
router.get(
  "/getBuildingByDpmId/:id",
  auth,
  BuildingController.getBuildingByDpm_Id
);
router.get(
  "/getBuildingByFtyId/:id",
  auth,
  BuildingController.getBuildingByFty_Id
);
router.put("/updateBuilding/:id", auth, BuildingController.updateBuilding);
router.post("/deleteBuilding", auth, BuildingController.deleteBuilding);

//Location
router.post("/createLocation", auth, LocationController.createLocation);
router.get(
  "/getLocation",
  auth,
  verifyIsAdminGet,
  LocationController.getLocation
);
router.get("/getLocation/:id", auth, LocationController.getLocationBy_Id);
router.get(
  "/getLocationByFty_Id/:id",
  auth,
  LocationController.getLocationByFty_Id
);
router.get(
  "/getLocationByDpm_Id/:id",
  auth,
  LocationController.getLocationByDpm_Id
);
router.get(
  "/getLocationByBud_Id/:id",
  auth,
  LocationController.getLocationByBud_Id
);
router.put("/updateLocation/:id", auth, LocationController.updateLocation);
router.post("/deleteLocation", auth, LocationController.deleteLocation);

// Category
router.post("/createCategory", auth, CategoryController.createCategory);
router.get(
  "/getCategory",
  auth,
  verifyIsAdminGet,
  CategoryController.getCategory
);
router.get(
  "/getCategory/:id",
  auth,
  verifyIsAdminGet,
  CategoryController.getCategory
);
router.get(
  "/getCategoryByDpm_Id/:id",
  auth,
  verifyIsAdminGet,
  CategoryController.getCategoryByDpm_Id
);
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
router.get("/getTypeItemByCate_Id/:id", auth, GetByIdType.getTypeItemByCate_Id);

router.get("/getTypeItemByDpmId/:id", auth, GetByIdType.getTypeItemByDpmId);

router.put("/updateTypeItem/:id", auth, TypeItemController.updateTypeItem);
router.put(
  "/updateTypeItemByOne/:id",
  auth,
  TypeItemController.updateTypeItemByOne
);

router.post("/deleteTypeItem", auth, TypeItemController.deleteTypeItem);

// Item
router.post("/createItem", auth, getIdProfile, ItemController.createItem);
router.post(
  "/createImgItems",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImagesItem,
  uploadController.getResult,
  ImgItemsController.createImgItems
);

router.post(
  "/createItemPhoto",
  auth,
  getIdProfile,
  uploadController.uploadImages,
  uploadController.resizeImagesItem,
  uploadController.getResult,
  ItemController.createItem
);
router.get("/getItem", auth, verifyIsAdminGet, ItemController.getItem);
router.get("/getItem/:id", GetItem.getItemById);
router.get("/getItemByFty_Id/:id", auth, GetItem.getItemByFty_Id);
router.get("/getItemByDpm_Id/:id", auth, GetItem.getItemByDpm_Id);
router.get("/getItemByBud_Id/:id", auth, GetItem.getItemByBud_Id);
router.get("/getItemByLocat_Id/:id", auth, GetItem.getItemByLocat_Id);

router.get("/getItemCategory/:id", auth, GetItem.getItemByCategoryID);
router.get("/getItemByTypeID/:id", auth, GetItem.getItemByTypeID);
router.put("/updateItem/:id", auth, ItemController.updateItem);
router.put(
  "/updateItemPhoto/:id",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImagesItem,
  uploadController.getResult,
  ItemController.updateItem
);
router.post("/deleteItem", auth, ItemController.deleteItem);
router.post("/deleteImgItems", auth, ImgItemsController.deleteImgItems);
router.post("/deleteImgItemsDamaged", auth, ImgItemsController.deleteImgItemsDamaged);


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
  verifyIsAdminGet,
  HistoryStItemController.updateStetus
);
//
router.post(
  "/updateStetusPhoto",
  auth,
  getIdProfile,
  verifyIsAdminGet,
  uploadController.uploadImages,
  uploadController.resizeImagesItemDamaged,
  uploadController.getResult,
  HistoryStItemController.updateStetus
);

module.exports = router;
