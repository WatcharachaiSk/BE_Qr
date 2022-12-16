const path = require("path");
const fs = require("fs");

const deleteImage = (req, res) => {
  try {
    const { nameImage } = req.body;
    if (nameImage) {
      let imagePath = path.resolve("src/public/images/profiles/" + nameImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("delete", imagePath);
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
  deleteImage: deleteImage,
};
