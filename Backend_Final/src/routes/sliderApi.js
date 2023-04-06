const express = require("express");
const router = express.Router();
const { getallslider, createslider, deleteslider, updateslider, getoneslider} = require("../controller/sliderController");
router.route("/findall").get(getallslider);
router.route("/create").post(createslider);
router.route("/delete").delete(deleteslider);
router.route("/update/:id").put(updateslider);
router.route("/findone/:id").get(getoneslider);
module.exports = router;
