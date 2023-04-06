const express = require("express");
const router = express.Router();
const {
  getProductColor,
  createProductColor,
  deleteProductColor,
  updateProductColor,
} = require("../controller/colorProductController");

router.route("/get").get(getProductColor);
router.route("/create").post(createProductColor);
router.route("/update").put(updateProductColor);
router.route("/delete").delete(deleteProductColor);

module.exports = router;
