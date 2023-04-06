const express = require("express");
const router = express.Router();
const { getMobile, createMobile, deleteMB, updateMB, getMobileById} = require("../controller/productController");
router.route("/findall").get(getMobile);
router.route("/create").post(createMobile);
router.route("/delete").delete(deleteMB);
router.route("/update/:id").put(updateMB);
router.route("/findone/:id").get(getMobileById);
module.exports = router;
