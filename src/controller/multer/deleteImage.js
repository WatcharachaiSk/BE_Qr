const path = require("path");
const fs = require("fs");

const deleteImageProfile = (req, res, next) => {
  try {
    const { nameImage_delete } = req.body;
    if (nameImage_delete) {
      let imagePath = path.resolve(
        "src/public/images/profiles/" + nameImage_delete
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        next()
        // console.log("delete", imagePath);
      } else {
        return res.status(404).json({
          message: "Image not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteImageItem = (req, res) => {
  try {
    const { nameImage_delete } = req.body;
    if (nameImage_delete) {
      let imagePath = path.resolve(
        "src/public/images/items/" + nameImage_delete
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        next()
        // console.log("delete", imagePath);
      } else {
        return res.status(404).json({
          message: "Image not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  deleteImageProfile: deleteImageProfile,
  deleteImageItem: deleteImageItem,
};
