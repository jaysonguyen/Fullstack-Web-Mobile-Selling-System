const express = require("express");
const router = express.Router();
const { getallvoucher, createvoucher, deletevoucher, updatevoucher, getonevoucher} = require("../controller/VoucherController");
router.route("/findall").get(getallvoucher);
router.route("/create").post(createvoucher);
router.route("/delete").delete(deletevoucher);
router.route("/update").put(updatevoucher);
router.route("/findone/:id").get(getonevoucher);
module.exports = router;
