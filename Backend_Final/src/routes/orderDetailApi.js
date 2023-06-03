const express = require("express");
const router = express.Router();
const {
  getOrderDetail,
  addDetails,
} = require("../controller/orderDetailController");
router.route("/getall").get(getOrderDetail);
router.route("/").post(addDetails);

module.exports = router;
