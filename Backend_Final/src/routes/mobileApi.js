const express = require("express");
const router = express.Router();
const { getMobile, createMobile, deleteMB, updateMB, getMobileById} = require("../controller/mobileController");

router.route("/").get(getMobile);
router.route("/").post(createMobile);
router.route("/:id").delete(deleteMB);
router.route("/:id").put(updateMB);
router.route("/:id").get(getMobileById);


module.exports = router;
