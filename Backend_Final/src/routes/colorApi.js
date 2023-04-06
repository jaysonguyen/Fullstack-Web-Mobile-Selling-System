const express = require("express");
const router = express.Router();
const {
  getColor,
  createColor,
  deleteColor,
  updateColor,
} = require("../controller/colorController");

router.route("/get").get(getColor);
router.route("/create").post(createColor);
router.route("/update/:id").put(updateColor);
router.route("/delete/:id").delete(deleteColor);

module.exports = router;
