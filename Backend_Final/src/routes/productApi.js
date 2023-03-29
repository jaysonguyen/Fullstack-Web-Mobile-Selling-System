const express = require("express");
const router = express.Router();
const { getallptype, createoneptype, deleteptype, updateptype, getoneptype, getallptype } = require("../controller/ptypeController");
router.route("/findall").get(getallptype);
router.route("/create").post(createoneptype);
router.route("/delete").delete(deleteptype);
router.route("/update").put(updateptype);
router.route("/findone/:id").get(getoneptype);
module.exports = router;
