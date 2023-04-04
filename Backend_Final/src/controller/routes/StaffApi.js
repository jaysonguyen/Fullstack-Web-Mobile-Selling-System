const express = require("express");
const router = express.Router();
const { getstaff, createstaff, deletestaff, updatestaff, getstaffbyid} = require("../controller/staffController");
router.route("/findall").get(getstaff);
router.route("/create").post(createstaff);
router.route("/delete").delete(deletestaff);
router.route("/update").put(updatestaff);
router.route("/findone/:id").get(getstaffbyid);
module.exports = router;
