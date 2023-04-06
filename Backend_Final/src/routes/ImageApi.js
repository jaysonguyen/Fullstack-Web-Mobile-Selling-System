const express = require("express");
const router = express.Router();
const {
  getImage,
  createImage,
  deleteImage,
  updateImage,
} = require("../controller/ImageController");

router.route("/get").get(getImage);
router.route("/create").post(createImage);
router.route("/update/:id").put(updateImage);
router.route("/delete/:id").delete(deleteImage);

module.exports = router;
