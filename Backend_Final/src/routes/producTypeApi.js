const express = require("express");
const router = express.Router();
const {
  getType,
  createType,
  deleteType,
  updateType,
} = require("../controller/productTypeController");

router.route("/get").get(getType);
router.route("/create").post(createType);
router.route("/update/:id").put(updateType);
router.route("/delete/:id").delete(deleteType);

module.exports = router;
