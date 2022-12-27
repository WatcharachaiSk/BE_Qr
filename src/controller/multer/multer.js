const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("images", 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

const resizeImagesItem = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      // const filename = file.originalname.replace(/\..+$/, "");
      const newFilename =
        Date.now() + Math.round(Math.random() * 1000) + ".jpg";

      await sharp(file.buffer)
        .resize(600, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        //
        .toFile(`src/public/images/items/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};
const resizeImagesItemDamaged = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      // const filename = file.originalname.replace(/\..+$/, "");
      const newFilename =
        Date.now() + Math.round(Math.random() * 1000) + ".jpg";

      await sharp(file.buffer)
        .resize(600, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        //
        .toFile(`src/public/images/damaged/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

const resizeImagesProfile = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename =
        Date.now() + Math.round(Math.random() * 1000) + ".jpg";

      await sharp(file.buffer)
        .resize(600, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        //
        .toFile(`src/public/images/profiles/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

const getResult = async (req, res, next) => {
  if (req.body.images.length <= 0) {
    return res.status(404).send(`You must select at least 1 image.`);
  }

  const images = req.body.images.map((image) => "" + image + "").join("");

  next();
  // return res.send(`Images were uploaded:${images}`);
};

module.exports = {
  uploadImages: uploadImages,
  resizeImagesItem: resizeImagesItem,
  resizeImagesItemDamaged: resizeImagesItemDamaged,
  resizeImagesProfile: resizeImagesProfile,
  getResult: getResult,
};
